import styles from "./app.module.css";
import React, { useState } from "react";

import InputAdd from "./InputAdd/InputAdd";
import TodosList from "./TodosList/TodosList";
import TodosTotal from "./TodosTotal/TodosTotal";

export default function App(): React.FC {
  console.log("App");

  return (
    <article className={styles.container}>
      <h1 className={styles.container__title}>Список дел на день</h1>
      <section className={styles.container__section}>
        <InputAdd />
      </section>
      <hr />

      <section className={styles.container__section}>
        <TodosList />
      </section>

      <section className={styles.container__section}>
        <TodosTotal />
      </section>
    </article>
  );
}
