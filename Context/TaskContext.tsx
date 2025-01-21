import { createContext, ReactNode, useState } from 'react'

type taskListType = {
	text: string | null
	completed: boolean
	id: string
	isEditing: boolean
	year: number
	month: number
	day: number
	hour: number
	minute: number
	error?:string
}
type TaskContextType = {
	taskList: taskListType[]
	setTaskList: React.Dispatch<React.SetStateAction<taskListType[]>>
}
type Props = {
	children: ReactNode
}
const TaskContext = createContext<TaskContextType>({
	taskList: [],
	setTaskList: () => {},
})

const TaskContextProvider = ({ children }: Props) => {
	const [taskList, setTaskList] = useState<taskListType[]>([])

	return <TaskContext.Provider value={{ taskList, setTaskList }}>{children}</TaskContext.Provider>
}
export { TaskContextProvider, TaskContext }
