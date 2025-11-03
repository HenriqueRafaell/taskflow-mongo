const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
  try{
    const tasks = await Task.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(tasks);
  }catch(err){
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createTask = async (req, res) => {
  try{
    const { title, description } = req.body;
    if(!title) return res.status(400).json({ message: 'Title required' });
    const task = await Task.create({ userId: req.user.id, title, description });
    res.json(task);
  }catch(err){
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateTask = async (req, res) => {
  try{
    const { id } = req.params;
    const updates = req.body;
    const task = await Task.findOneAndUpdate({ _id: id, userId: req.user.id }, updates, { new: true });
    if(!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  }catch(err){
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteTask = async (req, res) => {
  try{
    const { id } = req.params;
    const task = await Task.findOneAndDelete({ _id: id, userId: req.user.id });
    if(!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  }catch(err){
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
