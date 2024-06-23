import { Link, useLocation } from 'react-router-dom';
import Logo from '../atoms/Logo';

const Sidebar = () => {
    const location = useLocation();
    const userRole = localStorage.getItem('userRole');

    const items = [
        { route: '/admin/menu', icon: 'fa-book-open fa-beat fa-lg', text: 'Menu', roles: ['admin', 'owner'] },
        { route: '/admin/stock', icon: 'fa-box fa-beat fa-lg', text: 'Stock', roles: ['admin', 'owner'] },
        { route: '/admin/order-history', icon: 'fa-clock-rotate-left fa-beat fa-lg', text: 'Order History', roles: ['cashier', 'owner'] }
    ];

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userRole');
        window.location.href = '/login';
    };

    return(
        <div className="fixed z-0 w-2/12 h-screen shadow-xl border py-5 px-6">
            <Logo sizeImg={20}/>
            <div className="flex flex-col h-[92%] justify-between">
                <ul className='mt-6'>
                    {items.map((item, index) => (
                        item.roles.includes(userRole) && (
                            <li key={index} className='my-3'>
                                <Link
                                    to={item.route}
                                    className={`block rounded-2xl ${
                                        location.pathname === item.route ? "bg-[#43745B] text-white border border-[#43745B]" : "text-[#43745B]"
                                    } transition-colors duration-300 hover:bg-[#43745B] hover:text-white hover:border-[#43745B]`}
                                >
                                    <div className="flex px-3 py-2 border border-[#43745B] rounded-2xl">
                                        <i className={`flex items-center justify-between mx-3 fa-solid ${item.icon}`}></i>
                                        <p>{item.text}</p>
                                    </div>
                                </Link>
                            </li>
                        )
                    ))}
                </ul>
                <div className="">
                    <Link
                        onClick={handleLogout}
                        className={`block rounded-2xl text-[#43745B] transition-colors duration-300 hover:bg-[#43745B] hover:text-white hover:border-[#43745B]`}
                    >
                        <div className="flex my-2 px-3 py-2 border border-[#43745B] rounded-2xl">
                            <i className="flex items-center justify-between mx-3 fa-solid fa-door-open fa-beat fa-lg"></i>
                            <p>Logout</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
