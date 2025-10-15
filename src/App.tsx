import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import PhotosPage from './pages/PhotoList'
import PhotoDetail from './pages/PhotoDetail'
import Header from './components/Header'

/**
 * App entry - mounts Router and top-level layout pieces.
 * Routes:
 *  - /photos : list view
 *  - /photos/:id : photo detail
 */

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/photos" replace />} />
        <Route path="/photos" element={<PhotosPage />} />
        <Route path="/photos/:id" element={<PhotoDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
