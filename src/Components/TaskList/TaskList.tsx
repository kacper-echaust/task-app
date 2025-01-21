import { ChangeEvent, useContext, useState } from 'react'
import { useTaskApp } from '../../../hooks/useTaskApp'
import css from './TaskList.module.scss'
import { TaskContext } from '../../../Context/TaskContext'
import { Arrow } from '../Icons/Arrow'

const TaskList = () => {
	const { checkComplete, deleteTask, renameTask, sortTask } = useTaskApp()
	const { taskList, setTaskList } = useContext(TaskContext)
	const [value, setValue] = useState('')

	const handleRenameTask = (id: string, text: string | null) => {
		if (text) {
			setValue(text)
			setTaskList(prevTaskList =>
				prevTaskList.map(task => {
					return task.id === id ? { ...task, isEditing: true } : task
				})
			)
		}
	}
	const handleAcceptRenameTask = (id: string, event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			renameTask(id, value)
		}
	}
	const handleSort = (e: ChangeEvent<HTMLSelectElement>) => {
		e.target.blur()
		sortTask(e.target.value)
	}
	return (
		<div className={css.listContainer}>
			<div className={css.sortSelectContainer}>
				<select className={css.sortSelect} name='sort' id='sort' onChange={handleSort}>
					<option value=''>Sort by</option>
					<option value='old date'>old date</option>
					<option value='newest date'>newest date</option>
				</select>
				<Arrow className={css.arrow} />
			</div>
			<ul>
				{taskList.map(task => {
					const { id, isEditing, completed, text, year, month, day, hour, minute, error } = task
					return (
						<li key={id}>
							{isEditing ? (
								<input
									type='text'
									value={value}
									onChange={event => {
										setValue(event?.target.value)
									}}
									autoFocus
									onKeyDown={e => handleAcceptRenameTask(id, e)}
								/>
							) : (
								<span
									className={completed ? css.completed : ''}
									onClick={() => {
										handleRenameTask(id, text)
									}}>
									{text}
								</span>
							)}
							<div>
								<span className={css.date}>{`${year}-${month}-${day} ${hour}:${minute}`}</span>
								<input
									type='checkbox'
									checked={completed ? true : false}
									onChange={() => checkComplete(id)}
								/>
								<button onClick={() => deleteTask(id)}>x</button>
							</div>
							{error && <span className={css.error}>{error}</span>}
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export { TaskList }
