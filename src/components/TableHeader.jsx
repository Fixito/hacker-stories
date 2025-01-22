import { FaCaretDown, FaCaretUp } from 'react-icons/fa';

import styles from '../App.module.css';

export default function TableHeader({ isActive, isReverse, onClick, header }) {
  return (
    <th onClick={onClick} className={isActive ? styles.active : null}>
      {header}
      {isReverse ? <FaCaretDown /> : <FaCaretUp />}
    </th>
  );
}
