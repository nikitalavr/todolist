import React, { useReducer } from "react";
import "./App.css";
import { TaskType, Todolist } from "./components/Todolist";
import { v1 } from "uuid";
import { AddItemForm } from "./components/AddItemForm";
import ButtonAppBar from "./components/ButtonAppBar";
import { Container } from "@mui/system";
import { Grid, Paper } from "@mui/material";
import {
  addTodolistAC,
  changeFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todolistsReducer,
} from "./state/todolists-reducer";
import {
  addTaskAC,
  changeStatusAC,
  editTaskTitleAC,
  removeTaskAC,
  tasksReducer,
} from "./state/tasks-reducer";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistsType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

function AppWithReducers() {
  let todolistID1 = v1();
  let todolistID2 = v1();
  let [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
    { id: todolistID1, title: "What to learn", filter: "all" },
    { id: todolistID2, title: "What to buy", filter: "all" },
  ]);
  let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
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
    dispatchToTasks(removeTaskAC(todolistID, taskID));
  }

  function addTask(todolistID: string, title: string) {
    dispatchToTasks(addTaskAC(todolistID, title));
  }

  function changeStatus(todolistID: string, taskId: string, isDone: boolean) {
    dispatchToTasks(changeStatusAC(todolistID, taskId, isDone));
  }
  const editTask = (todolistID: string, taskID: string, newTitle: string) => {
    dispatchToTasks(editTaskTitleAC(todolistID, taskID, newTitle));
  };

  function changeFilter(todolistID: string, value: FilterValuesType) {
    dispatchToTodolists(changeFilterAC(todolistID, value));
  }

  function removeTodolist(todolistID: string) {
    const action =  removeTodolistAC(todolistID)
    dispatchToTodolists(action);
    dispatchToTasks(action);
  }
  const addTodolist = (title: string) => {
    const action = addTodolistAC(title)
    dispatchToTodolists(action);
    dispatchToTasks(action);
  };

  const editTodolist = (todolistID: string, newTitle: string) => {
    dispatchToTodolists(changeTodolistTitleAC(todolistID, newTitle));
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

export default AppWithReducers;
