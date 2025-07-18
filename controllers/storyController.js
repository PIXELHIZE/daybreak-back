import * as Story from "../models/story.js";
import * as Reads from "../models/readHistory.js";
import { getRandomInt } from "../utils/random.js";
import db from "../db/sqlite.js";

export const createStory = async (req, res, next) => {
  try {
    const { id } = await Story.create({
      user_id: req.user?.id || null,
      content: req.body.content,
    });
    res.status(201).json({ id });
  } catch (err) {
    next(err);
  }
};

export const getStory = (req, res, next) => {
  db.get("SELECT * FROM stories WHERE id=?", [req.params.id], (err, row) => {
    if (err) return next(err);
    if (!row) return res.status(404).json({ message: "Not found" });
    res.json(row);
  });
};

export const listStories = (_req, res, next) => {
  db.all("SELECT * FROM stories ORDER BY created_at DESC", [], (err, rows) =>
    err ? next(err) : res.json(rows)
  );
};

export const myStories = (req, res, next) => {
  db.all(
    `
    SELECT s.*, (SELECT COUNT(*) FROM reactions WHERE story_id=s.id) AS likes
    FROM stories s WHERE user_id=? ORDER BY created_at DESC
  `,
    [req.user.id],
    (err, rows) => (err ? next(err) : res.json(rows))
  );
};

export const deleteStory = (req, res, next) => {
  db.run(
    "DELETE FROM stories WHERE id=? AND user_id=?",
    [req.params.id, req.user.id],
    function (err) {
      if (err) return next(err);
      if (!this.changes) return res.status(404).json({ message: "Not found" });
      res.status(204).end();
    }
  );
};

export const randomStory = async (req, res, next) => {
  try {
    const user_id = req.user?.id || null;
    const guest_id = req.headers["x-guest-id"] || null;

    // 1) 안 읽은 사연부터 시도
    let stories = await Reads.unreadStoriesFor({ user_id, guest_id });

    // 2) 다 읽었으면 전체 풀에서 랜덤
    if (!stories.length) stories = await Story.list();

    // 3) 그래도 없으면 (DB 비어 있음)
    if (!stories.length)
      return res.status(404).json({ message: "No stories available" });

    res.json(stories[getRandomInt(stories.length)]);
  } catch (err) {
    next(err);
  }
};
