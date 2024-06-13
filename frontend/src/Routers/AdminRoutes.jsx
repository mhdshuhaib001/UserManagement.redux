import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from '../components/admin/AdminLogin.jsx';
import AdminDashboard from '../components/admin/AdminDashboard.jsx';

const AdminRoutes = ()=>{
    return(
        <Routes>
            <Route path='/login' element={<AdminLogin/>}/>
            <Route path='/dashboard' element={<AdminDashboard/>}/>

        </Routes>
    )
}

export default AdminRoutes