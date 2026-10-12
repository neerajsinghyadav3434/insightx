import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-surface-soft">
      <Sidebar />

      {/* Main content shifts right by sidebar width */}
      <div className="flex flex-col flex-1 ml-60 min-w-0">
        <Navbar />
        <main className="flex-1 p-6 overflow-auto animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
