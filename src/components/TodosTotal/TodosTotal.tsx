import { Typography } from "@mui/material";
import React, { memo } from "react";
import { RootState, useAppSelector } from "../../redux/hooks";
import styles from "./todosTotal.module.css";

export default memo(function TodosTotal(): React.FC {
  console.log("TodosTotal");
  const todos = useAppSelector((state: RootState) => state.todos.todos);

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
});
