import { memo, useState } from 'react';

import { sortBy } from 'lodash';

import TableHeader from './TableHeader.jsx';

const SORTS = {
  NONE: (list) => list,
  TITLE: (list) => sortBy(list, 'title'),
  AUTHOR: (list) => sortBy(list, 'author'),
  COMMENT: (list) => sortBy(list, 'num_comments').reverse(),
  POINT: (list) => sortBy(list, 'points').reverse(),
};

function List({ list, onRemoveItem }) {
  const [sort, setSort] = useState({
    sortKey: 'NONE',
    isReverse: false,
  });

  const handleSort = (sortKey) => {
    const isReverse = sort.sortKey === sortKey && !sort.isReverse;
    setSort({ sortKey, isReverse });
  };

  const sortFunction = SORTS[sort.sortKey];
  const sortedList = sort.isReverse
    ? sortFunction(list).reverse()
    : sortFunction(list);

  return (
    <table>
      <thead>
        <tr>
          <TableHeader
            header='Title'
            onClick={() => handleSort('TITLE')}
            isActive={sort.sortKey === 'TITLE'}
            isReverse={sort.sortKey === 'TITLE' && !sort.isReverse}
          />
          <TableHeader
            header='Author'
            onClick={() => handleSort('AUTHOR')}
            isActive={sort.sortKey === 'AUTHOR'}
            isReverse={sort.sortKey === 'AUTHOR' && !sort.isReverse}
          />
          <TableHeader
            header='Comments'
            onClick={() => handleSort('COMMENT')}
            isActive={sort.sortKey === 'COMMENT'}
            isReverse={sort.sortKey === 'COMMENT' && sort.isReverse}
          />
          <TableHeader
            header='Points'
            onClick={() => handleSort('POINT')}
            isActive={sort.sortKey === 'POINT'}
            isReverse={sort.sortKey === 'POINT' && sort.isReverse}
          />
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {sortedList.map((item) => {
          return (
            <Item key={item.objectID} {...item} onRemoveItem={onRemoveItem} />
          );
        })}
      </tbody>
    </table>
  );
}

export default memo(List);

function Item({
  objectID,
  title,
  author,
  num_comments,
  points,
  url,
  onRemoveItem,
}) {
  return (
    <tr key={objectID}>
      <td>
        <a href={url} target='_blank'>
          {title}
        </a>
      </td>
      <td>{author}</td>
      <td>{num_comments}</td>
      <td>{points}</td>
      <td>
        <button onClick={() => onRemoveItem(objectID)}>Delete</button>
      </td>
    </tr>
  );
}
