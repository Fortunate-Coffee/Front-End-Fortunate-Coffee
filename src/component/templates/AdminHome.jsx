import { Outlet } from 'react-router-dom';
import Sidebar from '../organisms/Sidebar';

const AdminHome = () => {
    return(
        <div>
            <div>
                <Sidebar />
            </div>
            <div className="ms-64 w-10/12">
                <Outlet />
            </div>
        </div>
    )
}

export default AdminHome;