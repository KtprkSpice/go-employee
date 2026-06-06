import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import './index.css'
import App from './App.jsx'
import DashboardEmployee from './pages/admin/employee/dashboardEmployee.jsx'
import AdminLayout from './pages/layouts/admin.jsx'
import CreateEmployee from './pages/admin/employee/CreateEmployee.jsx'
import EditEmployee from './pages/admin/employee/EditEmployee.jsx'
import DashboardDivision from './pages/admin/division/DashboardDivision.jsx'
import CreateDivision from './pages/admin/division/CreateDivision.jsx'
import EditDivision from './pages/admin/division/EditDivsion.jsx'
import DashboardPosition from './pages/admin/position/DashboardPosition.jsx'
import CreatePosition from './pages/admin/position/CreatePosition.jsx'
import EditPosition from './pages/admin/position/EditPosition.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Layout admin */}
        <Route element={<AdminLayout />} path='/admin'>
          {/* Employee */}
          <Route element={<DashboardEmployee />} path='/admin/employees' />
          <Route element={<CreateEmployee />} path='/admin/employee/create' />
          <Route element={<EditEmployee />} path='/admin/employee/edit/:id' />
          {/* Divisions */}
          <Route element={<DashboardDivision />} path='/admin/divisions' />
          <Route element={<CreateDivision />} path='/admin/division/create' />
          <Route element={<EditDivision />} path='/admin/division/edit/:id' />
          {/* Postions */}
          <Route element={<DashboardPosition />} path='/admin/positions' />
          <Route element={<CreatePosition />} path='/admin/position/create' />
          <Route element={<EditPosition />} path='/admin/position/edit/:id' />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
