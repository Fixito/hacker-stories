import { useId } from 'react';

import styles from '../App.module.css';

export default function InputWithLabel({
  children,
  isFocused,
  name,
  onInputChange,
  type = 'text',
  value,
}) {
  const id = useId();

  return (
    <>
      <label htmlFor={id} className={styles.label}>
        {children}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        className={styles.input}
        value={value}
        onChange={onInputChange}
        autoFocus={isFocused}
      />
    </>
  );
}
