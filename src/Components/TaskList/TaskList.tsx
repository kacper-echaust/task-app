import { useContext, useState } from 'react'
import { useTaskApp } from '../../../hooks/useTaskApp'
import css from './TaskList.module.scss'
import { TaskContext } from '../../../Context/TaskContext'

const TaskList = () => {
	const { checkComplete, deleteTask, renameTask } = useTaskApp()
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
	return (
		<div className={css.listContainer}>
			<ul>
				{taskList.map(task => {
					const { id, isEditing, completed, text, year, month, day, hours, minutes,error } = task
					console.log(error)
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
								<span className={css.date}>{`${year}-${month}-${day} ${hours}:${minutes}`}</span>
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
