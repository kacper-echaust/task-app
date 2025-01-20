import React from 'react'
import ReactDOM from 'react-dom/client'
import './main.module.scss'
import { TaskApp } from './Components/TaskApp/TaskApp'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<TaskApp />
	</React.StrictMode>
)
