import React, { useState } from 'react';
import styles from './TodoItem.module.css';
import EditTodo from '../EditTodo/EditTodo';
import Button from '../Button/Button';

const TodoItem = ({ setCheckedSortCheckbox, id, deleteTodo, editTodo, ...props }) => {
	const [isEdit, setIsEdit] = useState(false);
	const [checked, setChecked] = useState(false);

	const handleEdit = () => {
		setIsEdit((prevState) => !prevState);
		// setCheckedSortCheckbox(false);
	};

	const handleDelete = () => {
		deleteTodo(id);
		// setCheckedSortCheckbox(false);
	};

	const checkboxChange = () => {
		setChecked(!checked);
	};

	return (
		<>
			{isEdit ? (
				<EditTodo
					{...props}
					handleEdit={handleEdit}
					editTodo={editTodo}
					id={id}
				/>
			) : (
				<>
					<div className={styles.todo}>{props.title}</div>
					<input type="checkbox" checked={checked} onChange={checkboxChange} />
					{checked ? (
						<Button onClick={handleDelete} titleButton="Удалить" />
					) : (
						<></>
					)}
					<Button onClick={handleEdit} titleButton="Редактировать" />
				</>
			)}
		</>
	);
};

export default TodoItem;
