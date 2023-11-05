import { useState } from 'react';
import { postTodo } from '../../api/todos';
import { Todo } from '../../types/Todo';

// {
//   "title": "Learn JS",
//   "userId": 4,
//   "completed": false
// }

type Props = {
  userId: number;
  setTodos: (value: Todo[]) => void;
  currentTodos: Todo[];
};

export const Header: React.FC<Props> = ({ userId, setTodos, currentTodos }) => {
  const [query, setQuery] = useState('');

  const createTodo = (event: React.KeyboardEvent<object>) => {
    event.preventDefault();
    setQuery('');
    postTodo({
      title: query,
      userId,
      completed: false,
    })
      .then(newTodo => {
        setTodos([...currentTodos, newTodo]);
      });
  };

  return (
    <header className="todoapp__header">
      {/* this buttons is active only if there are some active todos */}
      <button
        type="button"
        data-cy="ToggleAllButton"
        aria-label="toggle button"
        className="todoapp__toggle-all active"
      />

      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={event => setQuery(event.target.value)}
          onKeyDown={event => {
            if (event.key === 'Enter') {
              createTodo(event);
            }
          }}
        />
      </form>
    </header>
  );
};