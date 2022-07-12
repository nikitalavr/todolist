import { TextField } from "@mui/material";
import React, { ChangeEvent, useState } from "react";

type EditableSpanType = {
  callBack: (newTitle: string) => void;
  title: string;
};

export const EditableSpan = (props: EditableSpanType) => {
  let [newTitle, setNewTitle] = useState(props.title);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value);
  };

  const addTask = () => {
    if (newTitle.trim() !== "") {
      props.callBack(newTitle.trim());
    }
  };

  const [edit, setEdit] = useState(false);
  const EditTrueHandler = () => {
    setEdit(!edit);
    addTask();
  };
  return edit ? (
    <TextField
      id="outlined-basic"
      label="Change name"
      variant="outlined"
      onBlur={EditTrueHandler}
      onChange={onChangeHandler}
      autoFocus
      value={newTitle}
      size="small"
    />
  ) : (
    // <input
    //   onBlur={EditTrueHandler}
    //   onChange={onChangeHandler}
    //   autoFocus
    //   type="text"
    //   value={newTitle}
    // />
    <span onDoubleClick={EditTrueHandler}> {props.title}</span>
  );
};
