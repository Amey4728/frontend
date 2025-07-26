import React, { useEffect, useMemo, useState } from 'react'
import Button from './add';
import todo from "./assets/th.jpg"
import bg from "./assets/tbg.webp"
import axios from "axios";



function ToDoList() {

    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    useEffect(() => {
        axios
            .get("mongodb+srv://ameyraghuvanshi70:FOW4eRxbCfqltzyx@demo123.xls94fe.mongodb.net/amey")

            .then((response) => {
                console.log(response.data)
                setTasks(response.data);
            })
            .catch((err) => console.error(err));
    }, [newTask]);

    const onSubmit = async (taskText) => {
        try {
            const response = await fetch('http://localhost:8080/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ task: taskText }),
            });

            const result = await response.text();
            console.log('Server response:', result);
        } catch (error) {
            console.error('Error posting task:', error);
        }
    };


    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function addTask() {
        if (newTask !== "") {
            setTasks(t => [...t, newTask]);
            onSubmit(newTask);
            setNewTask("");
        }
    }

    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }


    return (
        <div className='flex-col flex justify-up items-center    w-full h-screen gap-8 relative'>
            <img className= 'bg-cover h-full w-full relative'src={bg} alt="" />
           <div className='absolute'>
                <div  >
                    <img src={todo} />
                </div>
                <h1 className='text-2xl font-bold italic py-5'>To-Do-List</h1>
                
                <div className='flex-col flex justify-center items-center gap-4 bg-red'>
                    <textarea className=' w-171 h-16 bg-white flex '
                        type="text"
                        placeholder="Enter a task..."
                        value={newTask}
                        onChange={handleInputChange} />

                </div>
                <ol >
                    {tasks.map((task, index) =>
                        <li key={index}>
                            <span className='flex-col gap-y-4 py-2 px-2 place-content-center' >{task.task}</span>
                            <button
                                className='bg-red-600 px-1 py-2 rounded'
                                onClick={() => deleteTask(index)}>
                                Delete
                            </button>


                        </li>
                    )}
                </ol>
            
            <Button abc={addTask} />
            </div>
        </div>);

}
export default ToDoList;