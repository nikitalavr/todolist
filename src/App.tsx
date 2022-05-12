import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type FilterValuesType = "all" | "active" | "completed";

function App() {
    let [tasks, setTasks] = useState([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React JS', isDone: true},
        {id: 4, title: 'Rest API', isDone: false},
        {id: 5, title: 'graphQL', isDone: false},

    ]);

    function removeTask(id: number) {
        let filtredTasks = tasks.filter(t => t.id !== id);
        setTasks(filtredTasks)
    }

    /*function addTask(newTask: object) {
        let newTasksArray = tasks.push(newTask);
        setTasks(newTasksArray);
    };*/

    let [filter, setFilter] = useState<FilterValuesType>("all")

    let tasksForTodolist = tasks;

    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => !t.isDone);
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone)
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    return (
        <div className="App">
            <Todolist title='What to learn'
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />
        </div>
    );
};

export default App;
