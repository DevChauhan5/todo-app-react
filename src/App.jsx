import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

function App() {
  const [task, setTask] = useState();
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  const addTodo = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, { text: task, completd: false }]);
      setTask("");
      toast.success("Todo Added ✔")
    }
  };

  const setEditTodo = (index)=>{
    setTask(tasks[index].text)
    setEditIndex(index)
  }

  const updateTodo=()=>{
    if(task.trim() !== ''){
      const updatedTasks = [...tasks]
      updatedTasks[editIndex].text = task.trim()
      setTasks(updatedTasks)
      setTask('')
      setEditIndex(-1)
    }
  }

  const removeTodo=(index)=>{
    const removeTodoList = [...tasks]
    removeTodoList.splice(index, 1)
    setTasks(removeTodoList)
    toast.success(`Todo-${index+1} Removed`)
  }

  const markComplete = (index)=>{
    const taskCompleted = [...tasks]
    taskCompleted[index].completed = !taskCompleted[index].completed
    setTasks(taskCompleted) 
    toast.success(`TODO-${index+1} Updated`)
  }
  return (
    <div>
      <Toaster />
      <div className="bg-slate-300 p-2 flex justify-center items-center space-x-2">
        <input
          type="text"
          placeholder="TO MAKE TABLE..."
          className="border-2 border-black p-2 rounded-2xl w-80"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        {editIndex === -1 ? (
          <button
            className="bg-blue-500 p-2 text-white rounded-lg"
            onClick={addTodo}
          >
            Add
          </button>
        ) : (
          <button 
          onClick={updateTodo}
          className="bg-orange-400 p-2 text-white rounded-lg"
          >
            Update
          </button>
        )}
      </div>
      {tasks.map((task, index) => (
        <div key={index} className="flex justify-between items-center bg-slate-200 m-1 rounded-xl p-2">
          <h4 className={`font-bold ${task.completed ? "line-through font-normal": ""}`}>
            {index+1}. {task.text}
          </h4>
          <div className="space-x-2">
            <button onClick={()=> setEditTodo(index)} className="bg-orange-400 rounded-md p-1 ">Edit</button>
            <button onClick={()=> removeTodo(index)} className="bg-red-500 rounded-md p-1">Remove</button>
            <button onClick={()=> markComplete(index)} className={`${task.completed ? "bg-orange-300": "bg-green-400"} rounded-md p-1`}>{task.completed ? 'Undo' : '✔'}</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
