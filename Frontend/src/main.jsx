import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import './index.css'
import App from './App.jsx'
import DashboardEmployee from './pages/admin/employee/dashboardEmployee.jsx'
import AdminLayout from './pages/layouts/admin.jsx'
import CreateEmployee from './pages/admin/employee/CreateEmployee.jsx'
import EditEmployee from './pages/admin/employee/EditEmployee.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Layout admin */}
        <Route element={<AdminLayout />} path='/admin'>
          <Route element={<DashboardEmployee />} path='/admin/employee' />
          <Route element={<CreateEmployee />} path='/admin/employee/create' />
          <Route element={<EditEmployee />} path='/admin/employee/edit/:id' />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
