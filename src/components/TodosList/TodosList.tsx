import React, { memo, useEffect, useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  deleteTodo,
  toggleTodo,
  editTodo,
  updateTodos,
  Todo,
} from "../../redux/todos.slice";
import { Button, List, ListItemText, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import CreateIcon from "@mui/icons-material/Create";
import ClearIcon from "@mui/icons-material/Clear";
import styles from "./todusList.module.css";

export default memo(function TodosList(): React.FC {
  const [editMode, setEditMode] = useState<string>("");
  const [editText, setEditText] = useState<string>("");
  const todos = useAppSelector((state: RootState) => state.todos.todos);
  const dispatch = useAppDispatch();

  //удаление записи
  const handleDeleteTodo = (id: string) => {
    dispatch(deleteTodo(id));
  };

  //отметка о выполнении
  const handleToggleTodo = (id: string) => {
    dispatch(toggleTodo(id));
  };

  //редактирование записи
  const handleEditTodo = (id: string, newText: string) => {
    dispatch(editTodo({ id, newText }));
  };
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

  // Загрузка задач из localStorage
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      dispatch(updateTodos(JSON.parse(savedTodos) as Todo[]));
    }
  }, []);

  // Сохраняю задач задач в localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      {todos.length === 0 && (
        <h1 className={styles.containerListEmpty}>Нет записей</h1>
      )}
      <List>
        {todos.map((todo: Todo) => (
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
                    className={
                      todo.completed
                        ? styles.listItem__textСompleted
                        : styles.listItem__text
                    }
                    primary={todo.text}
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
});
