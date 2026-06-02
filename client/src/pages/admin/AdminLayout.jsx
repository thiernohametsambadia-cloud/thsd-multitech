import { Outlet } from 'react-router-dom'
import AdminSidebar from '../../components/AdminSidebar'

const AdminLayout = () => {
  return (
    <div className="d-flex" style={{ minHeight: '80vh' }}>
      <div className="d-none d-md-block" style={{ width: '250px', flexShrink: 0 }}>
        <AdminSidebar />
      </div>
      <div className="flex-grow-1 p-4 bg-light">
        <Outlet />
      </div>
    </div>
  )
}

export default AdminLayout
