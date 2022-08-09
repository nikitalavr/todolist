import { v1 } from "uuid";
import { TasksStateType } from "../App not used/App";
import { addTodolistAC, removeTodolistAC } from "./todolists-reducer";


const initialState:TasksStateType = {};

export const tasksReducer = (
  state: TasksStateType = initialState,
  action: TasksReducerType
): TasksStateType => {
  switch (action.type) {
    case "REMOVE-TASK":
      return {
        ...state,
        [action.payload.todolistID]: state[action.payload.todolistID].filter(
          (t) => t.id !== action.payload.taskID
        ),
      };
    case "ADD-TASK":
      return {
        ...state,
        [action.payload.todolistID]: [
          { id: v1(), title: action.payload.title, isDone: false },
          ...state[action.payload.todolistID],
        ],
      };
    case "CHANGE-STATUS":
      return {
        ...state,
        [action.payload.todolistID]: state[action.payload.todolistID].map((t) =>
          t.id === action.payload.taskID
            ? { ...t, isDone: action.payload.isDone }
            : t
        ),
      };
    case "EDIT-TASK-TITLE":
      return {
        ...state,
        [action.payload.todolistID]: state[action.payload.todolistID].map((t) =>
          action.payload.taskID === t.id
            ? { ...t, title: action.payload.newTitle }
            : t
        ),
      };
    case "REMOVE-TODOLIST":
      let copyState = { ...state };
      delete copyState[action.payload.todolistId];
      return { ...copyState };
    case "ADD-TODOLIST":
      return { ...state, [action.payload.todolistID]: [] };
    default:
      return state;
  }
};

type TasksReducerType =
  | removeTaskACType
  | addTaskACType
  | changeStatusACType
  | editTaskACType
  | addTodolistACType
  | removeTodolistACType;
type removeTaskACType = ReturnType<typeof removeTaskAC>;
type addTaskACType = ReturnType<typeof addTaskAC>;
type changeStatusACType = ReturnType<typeof changeStatusAC>;
type editTaskACType = ReturnType<typeof editTaskTitleAC>;

type addTodolistACType = ReturnType<typeof addTodolistAC>;
type removeTodolistACType = ReturnType<typeof removeTodolistAC>;

export const removeTaskAC = (todolistID: string, taskID: string) => {
  return {
    type: "REMOVE-TASK",
    payload: { todolistID, taskID },
  } as const;
};

export const addTaskAC = (todolistID: string, title: string) => {
  return {
    type: "ADD-TASK",
    payload: { todolistID, title },
  } as const;
};

export const changeStatusAC = (
  todolistID: string,
  taskID: string,
  isDone: boolean
) => {
  return {
    type: "CHANGE-STATUS",
    payload: { todolistID, taskID, isDone },
  } as const;
};

export const editTaskTitleAC = (
  todolistID: string,
  taskID: string,
  newTitle: string
) => {
  return {
    type: "EDIT-TASK-TITLE",
    payload: { todolistID, taskID, newTitle },
  } as const;
};
