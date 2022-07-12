import React, { useState } from "react";
import "./App.css";
import { TaskType, Todolist } from "./components/Todolist";
import { v1 } from "uuid";
import { AddItemForm } from "./components/AddItemForm";
import ButtonAppBar from "./components/ButtonAppBar";
import { Container } from "@mui/system";
import { Grid, Paper } from "@mui/material";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistsType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

type TasksStateType = {
  [key: string]: Array<TaskType>;
};

function App() {
  let todolistID1 = v1();
  let todolistID2 = v1();
  let [todolists, setTodolists] = useState<Array<TodolistsType>>([
    { id: todolistID1, title: "What to learn", filter: "all" },
    { id: todolistID2, title: "What to buy", filter: "all" },
  ]);
  let [tasks, setTasks] = useState<TasksStateType>({
    [todolistID1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
      { id: v1(), title: "Rest API", isDone: false },
      { id: v1(), title: "GraphQL", isDone: false },
    ],
    [todolistID2]: [
      { id: v1(), title: "HTML&CSS2", isDone: true },
      { id: v1(), title: "JS2", isDone: true },
      { id: v1(), title: "ReactJS2", isDone: false },
      { id: v1(), title: "Rest API2", isDone: false },
      { id: v1(), title: "GraphQL2", isDone: false },
    ],
  });

  function removeTask(todolistID: string, taskID: string) {
    setTasks({
      ...tasks,
      [todolistID]: tasks[todolistID].filter((el) => el.id !== taskID),
    });
  }

  function addTask(todolistID: string, title: string) {
    let newTask = { id: v1(), title: title, isDone: false };
    setTasks({ ...tasks, [todolistID]: [newTask, ...tasks[todolistID]] });
  }

  function changeStatus(todolistID: string, taskId: string, isDone: boolean) {
    setTasks({
      ...tasks,
      [todolistID]: tasks[todolistID].map((el) =>
        el.id === taskId ? { ...el, isDone } : el
      ),
    });
  }

  function changeFilter(todolistID: string, value: FilterValuesType) {
    setTodolists(
      todolists.map((el) =>
        el.id === todolistID ? { ...el, filter: value } : el
      )
    );
  }

  function removeTodolist(todolistID: string) {
    setTodolists(todolists.filter((el) => el.id !== todolistID));
  }
  const addTodolist = (title: string) => {
    const newID = v1();
    let newTodolist: TodolistsType = { id: newID, title: title, filter: "all" };
    setTodolists([newTodolist, ...todolists]);
    
    setTasks({ ...tasks, [newID]: [] });
  };

  const editTodolist = (todolistID: string, newTitle: string) => {
    setTodolists(
      todolists.map((el) =>
        el.id === todolistID ? { ...el, title: newTitle } : el
      )
    );
  };

  const editTask = (todolistID: string, taskID: string, newTitle: string) => {
    setTasks({
      ...tasks,
      [todolistID]: tasks[todolistID].map((t) =>
        taskID === t.id ? { ...t, title: newTitle } : t
      ),
    });
  };
  return (
    <div className="App">
      <ButtonAppBar />

      <Container fixed>
        <Grid container style={{ padding: "20px" }}>
          <AddItemForm callBack={addTodolist} />
        </Grid>
        <Grid container spacing={3}>
          {todolists.map((el) => {
            let tasksForTodolist = tasks[el.id];

            if (el.filter === "active") {
              tasksForTodolist = tasks[el.id].filter((t) => t.isDone === false);
            }
            if (el.filter === "completed") {
              tasksForTodolist = tasks[el.id].filter((t) => t.isDone === true);
            }

            return (
              <Grid item>
                <Paper style={{ padding: "10px" }}>
                  <Todolist
                    removeTodolist={removeTodolist}
                    key={el.id}
                    todolistID={el.id}
                    title={el.title}
                    tasks={tasksForTodolist}
                    filter={el.filter}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeStatus={changeStatus}
                    editTodolist={editTodolist}
                    editTask={editTask}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
