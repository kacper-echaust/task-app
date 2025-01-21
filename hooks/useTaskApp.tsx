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
		const hour = date.getHours()
		const minute = date.getMinutes()
		const newTask = [
			...taskList,
			{ text: task, completed: false, id: unicalId, isEditing: false, year, month, day, hour, minute },
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
	const sortTask = (sortBy: string) => {
		const sortedData = [...taskList]
		if (sortBy === 'old date') {
			sortedData.sort((a, b) => {
				const dateA = Number(new Date(a.year, a.month - 1, a.day, a.hour, a.minute))
				const dateB = Number(new Date(b.year, b.month - 1, b.day, b.hour, b.minute))
				return dateB - dateA
			})
		} else if (sortBy === 'newest date') {
			sortedData.sort((a, b) => {
				const dateA = Number(new Date(a.year, a.month - 1, a.day, a.hour, a.minute))
				const dateB = Number(new Date(b.year, b.month - 1, b.day, b.hour, b.minute))
				return dateA - dateB
			})
		}
		setTaskList(sortedData)
	}
	return {
		addTask,
		getTask,
		checkComplete,
		deleteTask,
		renameTask,
		sortTask,
		task,
		error,
	}
}
export { useTaskApp }
