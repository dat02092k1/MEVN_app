const Task = require('../task/taskModel');
const Student = require('../user/userModel');

const assignTask = async (req, res) => {
  try {
    const { title, task, assignedStudents, duration } = req.body;   
     
    console.log(req.body); 

    for (const item of assignedStudents) {
        const studentAssign = await Student.findById(item.student);
        if (!studentAssign) {
            return res.status(404).json({
              message: "Không tìm thấy sinh viên.",
            });
          }
      };
    
    const newTask = new Task({
        title,
        task,
        assignedStudents,
        duration
    });

    await newTask.save();  

    res.status(200).json({ newTask });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const editTask = async (req, res) => {
    try {
        const taskId = req.params.id; 
        const taskDetails = req.body;
        console.log(taskId, taskDetails); 

        const task = await Task.findByIdAndUpdate(taskId, taskDetails, { new: true });  

        if (!task) res.status(500).json({ message: 'update task failed' });

        res.status(200).json({ task });;
        
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id; 

        const task = await Task.findByIdAndDelete(taskId);  

        if (!task) res.status(500).json({ message: 'delete task failed' });

        res.status(200).json({ message: 'success', task });;
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getTasks = async (req, res) => {
    try {  
        const tasks = await Task.find();  

        if (!tasks) res.status(500).json({ message: 'cant find task' });

        res.status(200).json({ tasks });;
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}
module.exports = { assignTask, editTask, deleteTask, getTasks };  