const { getDb } = require("../db/connect");
const { ObjectId } = require("mongodb");

// GET all
const getAll = async (req, res) => {
  try {
    const db = getDb();
    const data = await db.collection("habits").find().toArray();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET one
const getSingle = async (req, res) => {
  try {
    const db = getDb();
    const id = new ObjectId(req.params.id);

    const data = await db.collection("habits").findOne({ _id: id });

    if (!data) {
      return res.status(404).json({ message: "Habit not found" });
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST
const create = async (req, res) => {
  try {
    const { title, category, frequency, goal, completed, streak, createdAt } = req.body;

    if (!title || !category) {
      return res.status(400).json({ message: "Missing required fields" });
    }

      if (!title || typeof title !== "string") {
      return res.status(400).json({ message: "Title is required and must be a string" });
    }

    if (!category || typeof category !== "string") {
      return res.status(400).json({ message: "Category is required and must be a string" });
    }

    if (completed !== undefined && typeof completed !== "boolean") {
      return res.status(400).json({ message: "Completed must be true or false" });
    }

    if (streak !== undefined && typeof streak !== "number") {
      return res.status(400).json({ message: "Streak must be a number" });
    }

    const habit = {
      title,
      category,
      frequency,
      goal,
      completed,
      streak,
      createdAt
    };

    const db = getDb();
    const result = await db.collection("habits").insertOne(habit);

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT
const update = async (req, res) => {
  try {
    const db = getDb();
    const id = new ObjectId(req.params.id);

    const updatedHabit = req.body;

    
    const { title, category, frequency } = updatedHabit;

    if (!title || !category || !frequency) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const result = await db
      .collection("habits")
      .replaceOne({ _id: id }, req.body);

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "Habit not found" });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
const remove = async (req, res) => {
  try {
    const db = getDb();
    const id = new ObjectId(req.params.id);

    const result = await db.collection("habits").deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Habit not found" });
    }

    res.status(200).json({ message: "Habit deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = {
  getAll,
  getSingle,
  create,
  update,
  remove
};
