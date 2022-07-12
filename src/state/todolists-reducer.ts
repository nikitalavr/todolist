import { v1 } from "uuid";
import { TodolistsType } from "../App";

export const todolistsReducer = (
  state: Array<TodolistsType>,
  action: todolistsReducerType
) => {
  switch (action.type) {
    case "REMOVE-TODOLIST":
      return state.filter((el) => el.id !== action.payload.todolistId);
    case "ADD-TODOLIST":
      return [
        ...state,
        { id: v1(), title: action.payload.newTodolistTitle, filter: "all" },
      ];
    case "CHANGE-TODOLIST-TITLE":
      return state.map((el) =>
        el.id === action.payload.todolistId2
          ? { ...el, title: action.payload.newTodolistTitle }
          : el
      );
      case "CHANGE-TODOLIST-FILTER":
        return state.map(el => el.id === action.payload.id ? {...el, filter: action.payload.filter} : el)
    default:
      return state;
  }
};

type todolistsReducerType =
  | removeTodolistACType
  | addTodolistACType
  | changeTodolistTitleACType
  | changeFilterACType;
type removeTodolistACType = ReturnType<typeof removeTodolistAC>;
type addTodolistACType = ReturnType<typeof addTodolistAC>;
type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>;
type changeFilterACType = ReturnType<typeof changeFilterAC>;


export const removeTodolistAC = (todolistId: string) => {
  return {
    type: "REMOVE-TODOLIST",
    payload: { todolistId },
  } as const;
};

export const changeTodolistTitleAC = (
  todolistId2: string,
  newTodolistTitle: string
) => {
  return {
    type: "CHANGE-TODOLIST-TITLE",
    payload: {
      todolistId2,
      newTodolistTitle,
    },
  } as const;
};

export const addTodolistAC = (newTodolistTitle: string) => {
  return {
    type: "ADD-TODOLIST",
    payload: { newTodolistTitle },
  } as const;
};

export const changeFilterAC = (todolistId: string, newFilter: string ) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            id: todolistId,
            filter: newFilter
        }     
    }as const
};
