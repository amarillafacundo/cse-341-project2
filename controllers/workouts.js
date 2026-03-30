const { getDb } = require("../db/connect");
const { ObjectId } = require("mongodb");

// GET all
const getAll = async (req, res) => {
  try {
    const db = getDb();
    const data = await db.collection("workouts").find().toArray();
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

    const data = await db.collection("workouts").findOne({ _id: id });

    if (!data) {
      return res.status(404).json({ message: "Workout not found" });
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST
const create = async (req, res) => {
  try {
    const { name, difficulty, duration, equipment, exercises, calories, createdBy } = req.body;

    // validation
    if (!name || !difficulty) {
      return res.status(400).json({ message: "Missing required fields" });
    }

     if (!difficulty || typeof difficulty !== "string") {
      return res.status(400).json({ message: "Difficulty is required and must be a string" });
    }

    if (duration && typeof duration !== "number") {
      return res.status(400).json({ message: "Duration must be a number" });
    }

    if (calories && typeof calories !== "number") {
      return res.status(400).json({ message: "Calories must be a number" });
    }

    const workout = {
      name,
      difficulty,
      duration,
      equipment,
      exercises,
      calories,
      createdBy
    };

    const db = getDb();
    const result = await db.collection("workouts").insertOne(workout);

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const update = async (req, res) => {
  try {
    const db = getDb();
    const id = new ObjectId(req.params.id);

    const updatedWorkout = req.body;

      const { name, difficulty, duration } = updatedWorkout;

    if (!name || !difficulty || !duration) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    

    const result = await db
      .collection("workouts")
      .replaceOne({ _id: id }, updatedWorkout);

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "Workout not found" });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const remove = async (req, res) => {
  try {
    const db = getDb();
    const id = new ObjectId(req.params.id);

    const result = await db.collection("workouts").deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Workout not found" });
    }

    res.status(200).json({ message: "Workout deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




module.exports = {
  getAll,
  getSingle,
  create,
  update,
  remove,
};
