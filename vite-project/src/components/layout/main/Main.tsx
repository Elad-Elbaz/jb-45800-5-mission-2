import { Navigate, Route, Routes } from 'react-router-dom'
import City from '../../City'
import HistorySearch from '../../HistorySearch'
import About from '../../About'

export default function Main() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/City" />} />
      <Route path="/City" element={<City />} />
      <Route path="/HistorySearch" element={<HistorySearch />} />
      <Route path="/About" element={<About />} />

    </Routes>
  )
}
