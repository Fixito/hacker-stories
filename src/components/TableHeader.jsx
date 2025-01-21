export default function TableHeader({ isActive, header, onClick }) {
  return (
    <th className={isActive ? 'active' : ''} onClick={onClick}>
      {header}
    </th>
  );
}
