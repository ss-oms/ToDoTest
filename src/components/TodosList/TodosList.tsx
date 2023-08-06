import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTodo,
  toggleTodo,
  editTodo,
  updateTodos,
} from "../../redux/todos.slice";
import { Button, List, ListItem, ListItemText, TextField } from "@mui/material";
import { RootState } from "../../redux/hooks";

import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import CreateIcon from "@mui/icons-material/Create";
import ClearIcon from "@mui/icons-material/Clear";

import styles from "./todusList.module.css";

export default function TodosList() {
  console.log("TodosList");
  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch();

  const handleDeleteTodo = (id: string) => {
    dispatch(deleteTodo(id));
  };

  const handleToggleTodo = (id: string) => {
    dispatch(toggleTodo(id));
  };

  const handleEditTodo = (id: string, newText: string) => {
    dispatch(editTodo({ id, newText }));
  };

  const [editMode, setEditMode] = useState("");
  const [editText, setEditText] = useState("");

  const startEditMode = (id: string, text: string) => {
    setEditMode(id);
    setEditText(text);
  };

  const handleCancelEdit = () => {
    setEditMode("");
    setEditText("");
  };

  const handleSaveEdit = (id: string, newText: string) => {
    if (newText.trim() !== "") {
      handleEditTodo(id, newText);
      setEditMode("");
      setEditText("");
    }
  };

  // Загрузка задач из localStorage при загрузке компонента
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      dispatch(updateTodos(JSON.parse(savedTodos)));
    }
  }, []);

  // Сохранение задач в localStorage при обновлении состояния todos
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      {todos.length === 0 && (
        <h1 className={styles.containerListEmpty}>Нет записей</h1>
      )}
      <List>
        {todos.map((todo) => (
          <div key={todo.id} className={styles.containerList}>
            {editMode === todo.id ? (
              <div className={styles.listItemEdit}>
                <div>
                  <TextField
                    value={editText}
                    className={styles.listItem__ediit}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                </div>
                <div>
                  <Button onClick={() => handleSaveEdit(todo.id, editText)}>
                    <CheckIcon />
                  </Button>
                  <Button onClick={handleCancelEdit}>
                    <ClearIcon />
                  </Button>
                </div>
              </div>
            ) : (
              <div className={styles.listItem}>
                <div>
                  <ListItemText
                    className={styles.listItem__text}
                    primary={todo.text}
                    primaryTypographyProps={{
                      style: {
                        textDecoration: todo.completed
                          ? "line-through"
                          : "none",
                      },
                    }}
                  />
                </div>
                <div>
                  <Button onClick={() => handleToggleTodo(todo.id)}>
                    <CheckIcon />
                  </Button>
                  <Button onClick={() => handleDeleteTodo(todo.id)}>
                    <DeleteIcon />
                  </Button>
                  <Button onClick={() => startEditMode(todo.id, todo.text)}>
                    <CreateIcon />
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </List>
    </>
  );
}
