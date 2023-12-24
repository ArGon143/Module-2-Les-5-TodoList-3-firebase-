import React, { useEffect, useState } from 'react';
import styles from './TodosPage.module.css';
import todosImg from './todos100x100.png';
import TodoList from '../TodoList/TodoList';
import CreatingTodo from '../CreatingTodo/CreatingTodo';

import { ref, onValue, push, set, remove } from 'firebase/database';
import { db } from '../../firebase';

const TodoPage = () => {
	const [todos, setTodos] = useState([]);

	const [isCreatingTodo, setIsCreatingTodo] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [isUpdatingTodo, setIsUpdatingTodo] = useState(false);
	const [isDeletingTodo, setIsDeletingTodo] = useState(false);

	useEffect(() => {
		const todosDbRef = ref(db, 'todos');

		return onValue(todosDbRef, (snapshot) => {
			const loadedTodos = snapshot.val() || [];
			setTodos(loadedTodos);
			setIsLoading(false);
		});
	}, []);

	const editTodo = (id, isEditTodo) => {
		const todosDbRef = ref(db, `todos/${id}`);

		set(todosDbRef, {
			title: isEditTodo,
		})
			.then((response) => {
				console.log('Дело отредактировано', response);
			})
			.finally(() => setIsUpdatingTodo(false));
	};

	const creatingNewTodo = (inputValue) => {
		const todosDbRef = ref(db, 'todos');

		push(todosDbRef, {
			title: inputValue,
		})
			.then((response) => {
				console.log('Новое дело добавлено. Ответ сервера:', response);
			})

			.finally(() => {
				setIsCreatingTodo(false);
			});
	};

	const deleteTodo = (id) => {
		const todosDbRef = ref(db, `todos/${id}`);

		remove(todosDbRef)
			.then((response) => {
				console.log('Дело удалено', response);
			})
			.finally(() => {
				setIsDeletingTodo(false);
			});
	};

	return (
		<main className={styles.TodoPage}>
			<section className={styles.PageHeader}>
				<img src={todosImg} alt="todos" />
				<h1 className={styles.TitlePageHeader}>Список дел</h1>
			</section>
			<section className={styles.formContainer}>
				<CreatingTodo creatingNewTodo={creatingNewTodo} />
			</section>

			{isLoading ? (
				<div className={styles.loader}></div>
			) : (
				<TodoList data={todos} editTodo={editTodo} deleteTodo={deleteTodo} />
			)}
		</main>
	);
};

export default TodoPage;
