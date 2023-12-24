import React, { useEffect, useState } from 'react';
import styles from './TodoList.module.css';
import TodoItem from '../TodoItem/TodoItem';

const TodoList = ({ deleteTodo, editTodo, data }) => {
	const [searchResults, setSearchResults] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');

	const [sortTodosState, setSortTodosState] = useState([]);
	const [checkedSortCheckbox, setCheckedSortCheckbox] = useState(false);

	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value);
	};

	const sortCheckboxChange = () => {
		setCheckedSortCheckbox(!checkedSortCheckbox);
	};

	useEffect(() => {
		let results = Object.entries(data).filter(([id, item]) =>
			item.title.toLowerCase().includes(searchTerm),
		);
		setSearchResults(Object.fromEntries(results));
	}, [searchTerm, data]);

	useEffect(() => {
		let sortTodosList;

		if (checkedSortCheckbox === false) {
			sortTodosList = Object.entries(data).sort(([i, a], [c, b]) => null);
		} else if (checkedSortCheckbox === true) {
			sortTodosList = Object.entries(data).sort(([i, a], [c, b]) =>
				a.title.localeCompare(b.title),
			);
		}
		setSortTodosState(Object.fromEntries(sortTodosList));
	}, [checkedSortCheckbox, data]);

	let todoList;

	if (searchTerm) {
		if (checkedSortCheckbox) {
			let sortSearchResults = Object.entries(searchResults).sort(([i, a], [c, b]) =>
				a.title.localeCompare(b.title),
			);
			todoList = Object.fromEntries(sortSearchResults);
		} else todoList = searchResults;
	} else if (checkedSortCheckbox) {
		todoList = sortTodosState;
	} else if (checkedSortCheckbox && searchTerm) {
		todoList = sortTodosState;
	} else todoList = data;

	return (
		<>
			{data < 1 ? (
				<></>
			) : (
				<>
					<input
						className={styles.todoInput}
						type="text"
						placeholder="Найти дело"
						value={searchTerm}
						onChange={handleSearchChange}
					/>
					<label>
						<input
							type="checkbox"
							checked={checkedSortCheckbox}
							onChange={sortCheckboxChange}
						/>
						Отсортировать дела по алфавиту
					</label>
				</>
			)}
			{Object.entries(todoList).map(([id, todo]) => (
				<div key={id} className={styles.todoContainer}>
					<TodoItem
						key={id}
						id={id}
						{...todo}
						editTodo={editTodo}
						deleteTodo={deleteTodo}
					/>
				</div>
			))}
		</>
	);
};

export default TodoList;
