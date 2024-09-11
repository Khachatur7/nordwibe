"use client";

import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";

type FormInputProps = {
  name?: string;
  id: string;
  onChange?: (value: string) => void;
};

export default function FileInput(props: FormInputProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value;

    props.onChange && props.onChange(inputValue);
  }

  return (
    <>
      <label className={styles.label} htmlFor={props.id}>
        Загрузить
      </label>
      <input
        className={styles.input}
        name={props.name}
        type="file"
        id={props.id}
        onChange={(e) => handleChange(e)}
      />
    </>
  );
}
