const Todo = require('../models/Todo');

// @desc  Get all todos for logged-in user
// @route GET /api/todos
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc  Create a new todo
// @route POST /api/todos
const createTodo = async (req, res) => {
  const { title, priority, dueDate } = req.body;

  if (!title || title.trim() === '') {
    return res.status(400).json({ message: 'Title is required' });
  }

  try {
    const todo = await Todo.create({
      title: title.trim(),
      priority: priority || 'Low',
      dueDate: dueDate || null,
      userId: req.user.id,
    });
    res.status(201).json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc  Update a todo
// @route PUT /api/todos/:id
const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, userId: req.user.id });
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    const { title, completed, priority, dueDate } = req.body;

    if (title !== undefined) todo.title = title.trim();
    if (completed !== undefined) todo.completed = completed;
    if (priority !== undefined) todo.priority = priority;
    if (dueDate !== undefined) todo.dueDate = dueDate;

    const updated = await todo.save();
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc  Delete a todo
// @route DELETE /api/todos/:id
const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, userId: req.user.id });
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    await todo.deleteOne();
    res.json({ message: 'Todo deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getTodos, createTodo, updateTodo, deleteTodo };
