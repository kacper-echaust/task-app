import { useTaskApp } from '../../../hooks/useTaskApp'
import css from './Form.module.scss'

const Form = () => {
	const { addTask, getTask, task, error } = useTaskApp()

	return (
		<div className={css.formContainer}>
			<form
				onSubmit={event => {
					event.preventDefault()
					addTask()
				}}>
				<input type='text' onChange={getTask} placeholder='ENTER THE CONTENT OF THE TASK!' value={task} />
				{error && <span className={css.error}>{error}</span>}
			</form>
		</div>
	)
}

export { Form }
