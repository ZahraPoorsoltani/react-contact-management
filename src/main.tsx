import { createRoot } from 'react-dom/client'
import {BrowserRouter} from "react-router-dom"

import './index.css'
import App from './App.tsx'
import 'react-confirm-alert/src/react-confirm-alert.css'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <App/>
</BrowserRouter>
)
