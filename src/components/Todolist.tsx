import { Delete } from "@mui/icons-material";
import { Button, Checkbox, IconButton } from "@mui/material";
import React, { ChangeEvent, useCallback } from "react";
import { FilterValuesType } from "../App not used/App";
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

type TaskPropsType = {
  removeTask: (todolistID: string, taskID: string) => void;
  changeStatus: (todolistID: string, taskID: string, isDone: boolean) => void;
  editTask: (todolistID: string, taskID: string, newTitle: string) => void;
  task: TaskType;
  todolistID: string;
};

const Task = React.memo((props: TaskPropsType) => {
  const onClickHandler = () =>
    props.removeTask(props.todolistID, props.task.id);
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    props.changeStatus(
      props.todolistID,
      props.task.id,
      e.currentTarget.checked
    );
  };
  const editTaskHandler = useCallback(
    (newTitle: string) => {
      props.editTask(props.todolistID, props.task.id, newTitle);
    },
    [props.editTask, props.todolistID, props.task.id]
  );

  return (
    <li key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
      <Checkbox onChange={onChangeHandler} checked={props.task.isDone} />
      <EditableSpan callBack={editTaskHandler} title={props.task.title} />

      <IconButton aria-label="delete">
        <Delete onClick={onClickHandler} />
      </IconButton>
    </li>
  );
});

export const Todolist = React.memo((props: PropsType) => {
  console.log("Todolist is called");

  const onAllClickHandler = useCallback(() => {
    props.changeFilter(props.todolistID, "all");
  }, [props.changeFilter, props.todolistID]);
  const onActiveClickHandler = useCallback(() => {
    props.changeFilter(props.todolistID, "active");
  }, [props.changeFilter, props.todolistID]);
  const onCompletedClickHandler = useCallback(() => {
    props.changeFilter(props.todolistID, "completed");
  }, [props.changeFilter, props.todolistID]);

  const removeTodolistHandler = () => {
    props.removeTodolist(props.todolistID);
  };

  const addTaskHandler = useCallback(
    (title: string) => {
      props.addTask(props.todolistID, title);
    },
    [props.addTask, props.todolistID]
  );

  const editHandler = useCallback(
    (newTitle: string) => {
      props.editTodolist(props.todolistID, newTitle);
    },
    [props.editTodolist, props.todolistID]
  );

  let tasksToRender = props.tasks;

  if (props.filter === "active") {
    tasksToRender = tasksToRender.filter((t) => t.isDone === false);
  }
  if (props.filter === "completed") {
    tasksToRender = tasksToRender.filter((t) => t.isDone === true);
  }

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
        {tasksToRender.map((t) => (
          <Task
            key={t.id}
            todolistID={props.todolistID}
            task={t}
            editTask={props.editTask}
            changeStatus={props.changeStatus}
            removeTask={props.removeTask}
          />
        ))}
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
});
