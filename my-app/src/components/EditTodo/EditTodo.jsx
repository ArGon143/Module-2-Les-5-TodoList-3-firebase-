import React, { useState } from 'react';
import styles from './EditTodo.module.css';
import Button from '../Button/Button';

function EditTodo({ id, editTodo, handleEdit, ...props }) {
	const [isEditTodo, setIsEditTodo] = useState(props.title);

	const handleChange = (event) => {
		setIsEditTodo(event.target.value);
	};

	const handleEditTodo = () => {
		editTodo(id, isEditTodo);
		handleEdit();
	};

	return (
		<>
			<input
				className={styles.todoInput}
				type="text"
				autoFocus
				name={id}
				defaultValue={props.title}
				onChange={handleChange}
			/>
			<Button onClick={handleEditTodo} titleButton="Сохранить" />
			<Button onClick={handleEdit} titleButton="Отмена" />
		</>
	);
}

export default EditTodo;
