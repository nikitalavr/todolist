import { v1 } from "uuid";
import { TasksStateType } from "../App";
import {
  addTaskAC,
  changeStatusAC,
  removeTaskAC,
  tasksReducer,
  editTaskAC,
} from "./tasks-reducer";
import { addTodolistAC, removeTodolistAC } from "./todolists-reducer";

test("correct task should be removed", () => {
  let todolistID1 = v1();
  let todolistID2 = v1();

  const startState: TasksStateType = {
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
  const startState: TasksStateType = {
    todolistId1: [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
    ],
    todolistId2: [
      { id: "1", title: "bread", isDone: false },
      { id: "2", title: "milk", isDone: true },
      { id: "3", title: "tea", isDone: false },
    ],
  };

  const endState = tasksReducer(startState, addTaskAC("todolistId2", "juce"));

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(4);
  expect(endState["todolistId2"][0].id).toBeDefined();
  expect(endState["todolistId2"][0].title).toBe("juce");
  expect(endState["todolistId2"][0].isDone).toBe(false);
});

test("correct status should be placed in task", () => {
  const startState: TasksStateType = {
    todolistId1: [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
    ],
    todolistId2: [
      { id: "1", title: "bread", isDone: false },
      { id: "2", title: "milk", isDone: true },
      { id: "3", title: "tea", isDone: false },
    ],
  };
  const endState = tasksReducer(
    startState,
    changeStatusAC("todolistId2", "2", false)
  );

  expect(endState["todolistId2"][1].isDone).toBe(false);
  expect(endState["todolistId1"][1].isDone).toBe(true);
});

test("title of the task should be changed correctly", () => {
  const startState: TasksStateType = {
    todolistId1: [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
    ],
    todolistId2: [
      { id: "1", title: "bread", isDone: false },
      { id: "2", title: "milk", isDone: true },
      { id: "3", title: "tea", isDone: false },
    ],
  };
  const endState = tasksReducer(
    startState,
    editTaskAC("todolistId2", "2", "new-title")
  );

  expect(endState["todolistId2"][1].title).toBe("new-title");
});

test("new array of tasks should be added when new todolsit is added", () => {
  const startState: TasksStateType = {
    todolistId1: [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
    ],
    todolistId2: [
      { id: "1", title: "bread", isDone: false },
      { id: "2", title: "milk", isDone: true },
      { id: "3", title: "tea", isDone: false },
    ],
  };
  const endState = tasksReducer(startState, addTodolistAC("new todolist"));
  const keys = Object.keys(endState);
  const newKey = keys.find((k) => k !== "todolistId1" && k !== "todolistId2");
  if (!newKey) {
    throw Error("new key should be added");
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});

test("correct array of tasks should be removed when todolist is removed", () => {
  const startState: TasksStateType = {
    todolistId1: [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
    ],
    todolistId2: [
      { id: "1", title: "bread", isDone: false },
      { id: "2", title: "milk", isDone: true },
      { id: "3", title: "tea", isDone: false },
    ],
  };
  const endState = tasksReducer(startState, removeTodolistAC("todolistId2"));
  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState["todolistId2"]).not.toBeDefined();
});
//test()
