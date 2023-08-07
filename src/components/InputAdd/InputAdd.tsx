import { Button, TextField } from "@mui/material";
import React, { memo, useState, FormEvent } from "react";
import styles from "./inputAdd.module.css";
import { addTodo } from "../../redux/todos.slice";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useAppDispatch } from "../../redux/hooks";
import { Todo } from "../../types/types";

export default memo(function InputAdd(): React.FC {
  const [inputText, setInputText] = useState<string>("");

  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
