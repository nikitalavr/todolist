import { Button, TextField } from "@mui/material";
import React, { ChangeEvent, useState, KeyboardEvent } from "react";

type AddItemFormType = {
  callBack: (taskTitle: string) => void;
};

export const AddItemForm = React.memo(function (props: AddItemFormType) {
  console.log("AddItemForm called");

  let [title, setTitle] = useState("");
  let [error, setError] = useState<string | null>(null);

  const addTask = () => {
    if (title.trim() !== "") {
      props.callBack(title.trim());
      setTitle("");
    } else {
      setError("Title is required");
    }
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) setError(null);
    if (e.key === "Enter") {
      addTask();
    }
  };

  return (
    <div>
      <TextField
        label={!!error ? error : ""}
        value={title}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        id="outlined-basic"
        variant="outlined"
        size="small"
        error={!!error}
      />
      <Button
        size="small"
        variant="contained"
        onClick={addTask}
        style={{
          maxWidth: "35px",
          maxHeight: "35px",
          minWidth: "35px",
          minHeight: "35px",
          backgroundColor: "coral",
        }}
      >
        +
      </Button>
    </div>
  );
});
