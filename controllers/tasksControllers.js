const Task = require("../models/taskModel");

// Create Task
exports.createTask = async (req, res) => {
  try {
    const { body: payload, user } = req;

    const finalPayload = {
      ...payload,
      userId: user && user._id ? user._id : null
    }
    const newTask = await Task.create(finalPayload);

    res.status(201).json({ message: "Task added", task: newTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create task." });
  }
};

// Update Task
exports.updateTask = async (req, res) => {
  try {
    const { params, body: payload } = req;

    const task = await Task.findOne({ _id: params.id }).lean()
    if (!task) {
        res.status(500).json({ error: "Task not found" });
    }

    const updateTask = await Task.findOneAndUpdate(
      { _id: params.id },
      payload,
      { new: true }
    );

    res.status(201).json({ message: "Task updated.", task: updateTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update task" });
  }
};

// Get Task list
exports.getAllTask = async (req, res) => {
  try {
    const { query, user } = req;
    const allTasks = await Task.find({ userId: user._id }).lean();

    res.status(201).json(allTasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get task list." });
  }
};

// Get By Id
exports.getById = async (req, res) => {
  try {
    const { params, user } = req;

    const task = await Task.findOne({ _id: params.id, userId: user._id }).lean()
    if (!task) {
        res.status(500).json({ error: "Task not found" });
    }

    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get task list." });
  }
};

// delete Task
exports.deleteTask = async (req, res) => {
  try {
    const { params } = req;

    const task = await Task.findOne({ _id: params.id }).lean()
    if (!task) {
        res.status(500).json({ error: "Task not found" });
    }

    await Task.findOneAndDelete({ _id: params.id })

    res.status(201).json({ message: "Task deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete task." });
  }
};
