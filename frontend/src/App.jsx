import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { DataProvider } from '@/context/DataContext'
import Layout from '@/components/layout/Layout'
import Landing from '@/pages/Landing'
import Dashboard from '@/pages/Dashboard'
import Customers from '@/pages/Customers'
import Segmentation from '@/pages/Segmentation'
import Recommendations from '@/pages/Recommendations'
import Insights from '@/pages/Insights'

export default function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
          {/* Landing — no sidebar/navbar */}
          <Route path="/" element={<Landing />} />

          {/* App shell with sidebar + navbar */}
          <Route element={<Layout />}>
            <Route path="/dashboard"       element={<Dashboard />} />
            <Route path="/customers"       element={<Customers />} />
            <Route path="/segmentation"    element={<Segmentation />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/insights"        element={<Insights />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DataProvider>
  )
}
