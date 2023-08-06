import { Button, TextField } from "@mui/material";
import React, { memo, useState } from "react";
import styles from "./inputAdd.module.css";
import { addTodo } from "../../redux/todos.slice";
import { useDispatch } from "react-redux";

import AddBoxIcon from "@mui/icons-material/AddBox";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export default memo(function InputAdd() {
  console.log("InputAdd");
  const [inputText, setInputText] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() !== "") {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text: inputText.trim(),
        completed: false,
      };
      dispatch(addTodo(newTodo));
      setInputText("");
    }
  };

  return (
    <form className={styles.addTodoContainer} onSubmit={handleSubmit}>
      <TextField
        className={styles.addTodoContainer__input}
        label="Добавьте новую запись"
        size="medium"
        variant="outlined"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <Button
        className={styles.addTodoContainer__button}
        size="medium"
        variant="contained"
        type="submit"
      >
        <AddBoxIcon />
      </Button>
    </form>
  );
});
