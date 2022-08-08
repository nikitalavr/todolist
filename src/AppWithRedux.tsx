import React, { useReducer } from "react";
import "./App.css";
import { TaskType, Todolist } from "./components/Todolist";
//import { v1 } from "uuid";
import { AddItemForm } from "./components/AddItemForm";
import ButtonAppBar from "./components/ButtonAppBar";
import { Container } from "@mui/system";
import { Grid, Paper } from "@mui/material";
import {
  addTodolistAC,
  changeFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
} from "./state/todolists-reducer";
import {
  addTaskAC,
  changeStatusAC,
  editTaskTitleAC,
  removeTaskAC,
} from "./state/tasks-reducer";
import { useSelector } from "react-redux";
import { AppRootStateType } from "./state/store";
import { useDispatch } from "react-redux";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistsType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

function AppWithRedux() {
  const todolists = useSelector<AppRootStateType, Array<TodolistsType>>(
    (state) => state.todolists
  );
  const tasks = useSelector<AppRootStateType, TasksStateType>(
    (state) => state.tasks
  );
  const dispatch = useDispatch();

  function removeTask(todolistID: string, taskID: string) {
    dispatch(removeTaskAC(todolistID, taskID));
  }

  function addTask(todolistID: string, title: string) {
    dispatch(addTaskAC(todolistID, title));
  }

  function changeStatus(todolistID: string, taskId: string, isDone: boolean) {
    dispatch(changeStatusAC(todolistID, taskId, isDone));
  }
  const editTask = (todolistID: string, taskID: string, newTitle: string) => {
    dispatch(editTaskTitleAC(todolistID, taskID, newTitle));
  };

  function changeFilter(todolistID: string, value: FilterValuesType) {
    dispatch(changeFilterAC(todolistID, value));
  }

  function removeTodolist(todolistID: string) {
    const action = removeTodolistAC(todolistID);
    dispatch(action);
  }
  const addTodolist = (title: string) => {
    const action = addTodolistAC(title);
    dispatch(action);
  };

  const editTodolist = (todolistID: string, newTitle: string) => {
    dispatch(changeTodolistTitleAC(todolistID, newTitle));
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

export default AppWithRedux;
