import { Delete } from "@mui/icons-material";
import { Button, Checkbox, IconButton } from "@mui/material";
import React, { ChangeEvent } from "react";
import { FilterValuesType } from "../App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  todolistID: string;
  title: string;
  tasks: TaskType[];
  filter: FilterValuesType;
  removeTask: (todolistID: string, taskId: string) => void;
  changeFilter: (todolistID: string, value: FilterValuesType) => void;
  addTask: (todolistID: string, taskTitle: string) => void;
  changeStatus: (todolistID: string, taskId: string, isDone: boolean) => void;
  removeTodolist: (todolistID: string) => void;
  editTodolist: (todolistID: string, newTitle: string) => void;
  editTask: (todolistID: string, taskID: string, newTitle: string) => void;
};

export function Todolist(props: PropsType) {
  const onAllClickHandler = () => props.changeFilter(props.todolistID, "all");
  const onActiveClickHandler = () =>
    props.changeFilter(props.todolistID, "active");
  const onCompletedClickHandler = () =>
    props.changeFilter(props.todolistID, "completed");

  const removeTodolistHandler = () => {
    props.removeTodolist(props.todolistID);
  };

  const addTaskHandler = (title: string) => {
    props.addTask(props.todolistID, title);
  };

  const editHandler = (newTitle: string) => {
    props.editTodolist(props.todolistID, newTitle);
  };

  return (
    <div>
      <h3>
        <EditableSpan title={props.title} callBack={editHandler} />
        <IconButton aria-label="delete">
          <Delete onClick={removeTodolistHandler} />
        </IconButton>
      </h3>
      <AddItemForm callBack={addTaskHandler} />
      <ul>
        {props.tasks.map((t) => {
          const onClickHandler = () => props.removeTask(props.todolistID, t.id);
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(props.todolistID, t.id, e.currentTarget.checked);
          };
          const editTaskHandler = (newTitle: string) => {
            props.editTask(props.todolistID, t.id, newTitle);
          };

          return (
            <li key={t.id} className={t.isDone ? "is-done" : ""}>
              {/* <input
                type="checkbox"
                onChange={onChangeHandler}
                checked={t.isDone}
              /> */}
              <Checkbox
                
                onChange={onChangeHandler}
                checked={t.isDone}
                
              />
              <EditableSpan callBack={editTaskHandler} title={t.title} />

              <IconButton aria-label="delete">
                <Delete onClick={onClickHandler} />
              </IconButton>
            </li>
          );
        })}
      </ul>
      <div>
        <Button
          variant={props.filter === "all" ? "contained" : "outlined"}
          onClick={onAllClickHandler}
        >
          All
        </Button>
        <Button
          variant={props.filter === "active" ? "contained" : "outlined"}
          color="success"
          onClick={onActiveClickHandler}
        >
          Active
        </Button>
        <Button
          variant={props.filter === "completed" ? "contained" : "outlined"}
          color="error"
          onClick={onCompletedClickHandler}
        >
          Completed
        </Button>
      </div>
    </div>
  );
}
