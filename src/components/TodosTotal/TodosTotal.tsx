import { Typography } from "@mui/material";
import React, { memo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/hooks";
import styles from "./todosTotal.module.css";

export default function TodosTotal() {
  console.log("TodosTotal");
  const todos = useSelector((state: RootState) => state.todos.todos);

  const completeTodo = todos.filter((todo) => todo.completed);

  return (
    <>
      {todos.length !== 0 && (
        <div className={styles.totalContainer}>
          <Typography variant="h6">Всего задач: {todos.length}</Typography>
          <Typography variant="h6">Выполнено: {completeTodo.length}</Typography>
        </div>
      )}
    </>
  );
}
