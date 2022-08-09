import { v1 } from "uuid";
import { TasksStateType } from "../App not used/App";
import {
  addTaskAC,
  changeStatusAC,
  editTaskTitleAC,
  removeTaskAC,
  tasksReducer,
} from "./tasks-reducer";
import { addTodolistAC, removeTodolistAC } from "./todolists-reducer";

let todolistID1: string;
let todolistID2: string;
let startState: TasksStateType = {};

beforeEach(() => {
  todolistID1 = v1();
  todolistID2 = v1();
  startState = {
    [todolistID1]: [
      { id: "1", title: "HTML&CSS", isDone: true },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "ReactJS", isDone: false },
      { id: "4", title: "Rest API", isDone: false },
      { id: "5", title: "GraphQL", isDone: false },
    ],
    [todolistID2]: [
      { id: "1", title: "HTML&CSS2", isDone: true },
      { id: "2", title: "JS2", isDone: true },
      { id: "3", title: "ReactJS2", isDone: false },
      { id: "4", title: "Rest API2", isDone: false },
      { id: "5", title: "GraphQL2", isDone: false },
    ],
  };
});

test("correct task should be removed", () => {
  const endState = tasksReducer(startState, removeTaskAC(todolistID1, "3"));

  expect(endState[todolistID1].length).toBe(4);
  expect(endState[todolistID2].length).toBe(5);
  expect(endState).toEqual({
    [todolistID1]: [
      { id: "1", title: "HTML&CSS", isDone: true },
      { id: "2", title: "JS", isDone: true },

      { id: "4", title: "Rest API", isDone: false },
      { id: "5", title: "GraphQL", isDone: false },
    ],
    [todolistID2]: [
      { id: "1", title: "HTML&CSS2", isDone: true },
      { id: "2", title: "JS2", isDone: true },
      { id: "3", title: "ReactJS2", isDone: false },
      { id: "4", title: "Rest API2", isDone: false },
      { id: "5", title: "GraphQL2", isDone: false },
    ],
  });
});

test("correct task should be added to correct array", () => {
  const endState = tasksReducer(startState, addTaskAC(todolistID2, "juce"));

  expect(endState[todolistID1].length).toBe(5);
  expect(endState[todolistID2].length).toBe(6);
  expect(endState[todolistID2][0].id).toBeDefined();
  expect(endState[todolistID2][0].title).toBe("juce");
  expect(endState[todolistID2][0].isDone).toBe(false);
});

test("correct status should be placed in task", () => {
  const endState = tasksReducer(
    startState,
    changeStatusAC(todolistID2, "2", false)
  );

  expect(endState[todolistID2][1].isDone).toBe(false);
  expect(endState[todolistID1][1].isDone).toBe(true);
});

test("title of the task should be changed correctly", () => {
  const endState = tasksReducer(
    startState,
    editTaskTitleAC(todolistID2, "2", "new-title")
  );

  expect(endState[todolistID2][1].title).toBe("new-title");
});

test("new array of tasks should be added when new todolsit is added", () => {
  const endState = tasksReducer(startState, addTodolistAC("new todolist"));
  const keys = Object.keys(endState);
  const newKey = keys.find((k) => k !== todolistID1 && k !== todolistID2);
  if (!newKey) {
    throw Error("new key should be added");
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});

test("correct array of tasks should be removed when todolist is removed", () => {
  const endState = tasksReducer(startState, removeTodolistAC(todolistID2));
  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState[todolistID2]).not.toBeDefined();
});
