import { Form } from '../Form/Form'
import { TaskList } from '../TaskList/TaskList'
import css from './TaskApp.module.scss'
import { TaskContextProvider } from '../../../Context/TaskContext'

const TaskApp = () => {
	return (
		<TaskContextProvider>
			<div className={css.taskAppContainer}>
				<h1>Task App</h1>
				<Form />
				<TaskList />
			</div>
		</TaskContextProvider>
	)
}

export { TaskApp }
