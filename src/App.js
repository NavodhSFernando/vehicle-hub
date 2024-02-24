import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AdminLayout from './components/admin/Layout'
import FrontLayout from './components/front/Layout'
import Dashboard from './views/admin/Dashboard'
import Reservation from './views/admin/Reservation'
import Home from './views/front/Home'
import Account from './views/front/Account'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<FrontLayout />}>
                    <Route index element={<Home />} />
                    <Route path="account" element={<Account />} />
                </Route>
                <Route path="/admin" element={<AdminLayout />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="reservations" element={<Reservation />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default App
