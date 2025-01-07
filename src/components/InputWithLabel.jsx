import { useId } from 'react';

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
      <label htmlFor={id}>{children}</label>
      <input
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={onInputChange}
        autoFocus={isFocused}
      />
    </>
  );
}
