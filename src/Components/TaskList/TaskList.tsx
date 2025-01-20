import { useContext, useState } from 'react'
import { useTaskApp } from '../TaskApp/useTaskApp'
import css from './TaskList.module.scss'
import { TaskContext } from '../../Context/TaskContext'

const TaskList = () => {
	const { checkComplete, deleteTask, renameTask, error } = useTaskApp()
	const { taskList, setTaskList } = useContext(TaskContext)
	const [value, setValue] = useState('')

	const handleRenameTask = (id: string, text: string) => {
		setValue(text)
		setTaskList(prevTaskList =>
			prevTaskList.map(task => {
				return task.id === id ? { ...task, isEditing: true } : task
			})
		)
	}
	const handleAcceptRenameTask = (id: string, event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			renameTask(id, value)
			if(value.length === 0) return
			setTaskList(prevTaskList =>
				prevTaskList.map(task => (task.id === id ? { ...task, isEditing: false } : task))
			)
		}
	}
	return (
		<div className={css.listContainer}>
			<ul>
				{taskList.map(task => {
					return (
						<li key={task.id}>
							{task.isEditing ? (
								<input
									type='text'
									value={value}
									onChange={event => {
										setValue(event?.target.value)
									}}
									autoFocus
									onKeyDown={e => handleAcceptRenameTask(task.id, e)}
								/>
							) : (
								<span
									className={task.completed ? css.completed : ''}
									onClick={() => {
										handleRenameTask(task.id, task.text)
									}}>
									{task.text}
								</span>
							)}
							<div>
								<input
									type='checkbox'
									checked={task.completed ? true : false}
									onChange={() => checkComplete(task.id)}
								/>
								<button onClick={() => deleteTask(task.id)}>x</button>
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
