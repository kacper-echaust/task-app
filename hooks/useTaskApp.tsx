import { useState, ChangeEvent, useEffect, useContext } from 'react'
import { TaskContext } from '../Context/TaskContext'

const useTaskApp = () => {
	const [task, setTask] = useState('')
	const [error, setError] = useState('')
	const { setTaskList, taskList } = useContext(TaskContext)
	const unicalId = Date.now().toString(36) + Math.random().toString(36).substr(2)

	useEffect(() => {
		const localData = localStorage.getItem('taskList')
		if (localData) {
			setTaskList(JSON.parse(localData))
		}
	}, [setTaskList])

	const getTask = (event: ChangeEvent<HTMLInputElement>) => {
		setTask(event.target.value)
	}

	const addTask = () => {
		if (task.length === 0) {
			return setError('Task need min 1 character')
		}
		const date = new Date(Date.now())
		const year = date.getFullYear()
		const month = date.getMonth() + 1
		const day = date.getDate()
		const hours = date.getHours()
		const minutes = date.getMinutes()
		const newTask = [
			...taskList,
			{ text: task, completed: false, id: unicalId, isEditing: false, year, month, day, hours, minutes },
		]
		setTaskList(newTask)
		setTask('')
		localStorage.setItem('taskList', JSON.stringify(newTask))
		setError('')
	}

	const checkComplete = (id: string) => {
		const updateTaskComplete = [...taskList]
		updateTaskComplete.map(task => {
			if (task.id === id) {
				task.completed = !task.completed
			}
		})
		setTaskList(updateTaskComplete)
		localStorage.setItem('taskList', JSON.stringify(updateTaskComplete))
	}

	const deleteTask = (id: string) => {
		const updateTask = [...taskList]
		const newArr = updateTask.filter(task => task.id !== id)
		setTaskList(newArr)
		localStorage.setItem('taskList', JSON.stringify(newArr))
	}

	const renameTask = (id: string, newText: string | null) => {
		const updateTaskList = taskList.map(task => {
			if (task.id === id) {
				if (newText?.length === 0) return { ...task, error: 'Task need min 1 character' }
				return { ...task, text: newText, isEditing: false, error: '' }
			}
			return task
		})
		setTaskList(updateTaskList)
		localStorage.setItem('taskList', JSON.stringify(updateTaskList))
	}
	return {
		addTask,
		getTask,
		checkComplete,
		deleteTask,
		renameTask,
		task,
		error,
	}
}
export { useTaskApp }
