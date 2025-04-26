import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Login } from './components/login'
import { SeeReq } from './components/SeeReq'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SeeReq />
  </StrictMode>,
)
