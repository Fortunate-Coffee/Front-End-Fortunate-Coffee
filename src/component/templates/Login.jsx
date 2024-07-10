import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Logo from "../atoms/Logo";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        if (params.get('showAlert') === 'true') {
            setShowAlert(true);
            const timer = setTimeout(() => setShowAlert(false), 9000);
            return () => clearTimeout(timer);
        }
    }, [location]);

    useEffect(() => {
        const checkLoginExpiration = () => {
            const loginTimestamp = localStorage.getItem("loginTimestamp");
            if (loginTimestamp) {
                const currentTime = new Date().getTime();
                const timeElapsed = currentTime - loginTimestamp;
                const threeHoursInMillis = 2 * 60 * 60 * 1000;
                if (timeElapsed > threeHoursInMillis) {
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("userRole");
                    localStorage.removeItem("loginTimestamp");
                }
            }
        };

        checkLoginExpiration();
        const interval = setInterval(checkLoginExpiration, 1000 * 60); // Check every minute
        return () => clearInterval(interval);
    }, []);

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("https://backend-fortunate-coffee.up.railway.app/v1/auth/login", {
                username: username,
                password: password
            });

            const data = response.data;
            console.log("Response data:", data);
            // Simpan token yang diterima di sini
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("userRole", data.user); 

            // Save the login timestamp
            localStorage.setItem("loginTimestamp", new Date().getTime());
            setLoading(false);
            
            // Set success message and redirect
            setSuccess("Login successful!");
            setError(''); // Clear any previous error
            setTimeout(() => {
                navigate('/admin');
            }, 2000);
        } catch (error) {
            console.error("Login error:", error);
            setError(error.response?.data?.error?.message || "Failed to login");
            setSuccess('');
        } finally {
            setLoading(false);
        }
    };

    return(
        <div className="flex flex-col">
            <div className="w-11/12 mt-32 mb-12">
                <Logo sizeImg={48} sizeText={`xl`}/>
            </div>
            <div className="mx-auto lg:w-4/12 xl:w-4/12 md:w-4/12 w-10/12">
                {showAlert && (
                    <div className="flex justify-center w-full">
                        <div className="fixed z-40 top-5 bg-yellow-500 text-white px-4 py-2 rounded-md shadow-xl flex items-center">
                            <i className="fa-solid fa-triangle-exclamation mr-2"></i>
                            <p>Login First to Access the Administrator Page.</p>
                        </div>
                    </div>
                )}
                <form onSubmit={handleSubmit} className="flex flex-col justify-center">
                    <div className="mb-4">
                    <label htmlFor="username" className="text-[#00864B] font-semibold block mb-1">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-3 py-2 border border-[#00864B] rounded-lg focus:outline-[#00864B] focus:border-[#00864B]"
                        placeholder="Enter your username"
                        required
                    />
                    </div>
                    <div className="mb-4">
                    <label htmlFor="password" className="text-[#00864B] block font-semibold mb-1">Password</label>
                    <div className="relative">
                        <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-[#00864B] rounded-lg focus:outline-[#00864B] focus:border-[#00864B]"
                        placeholder="Enter your password"
                        required
                        />
                        <button
                        type="button"
                        onClick={handleTogglePasswordVisibility}
                        className="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none"
                        >
                        {showPassword ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00864B]" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4zM3 10a7 7 0 1114 0 7 7 0 01-14 0zm15 0a8 8 0 10-16 0 8 8 0 0016 0z" clipRule="evenodd" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00864B]" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            <path fillRule="evenodd" d="M2.636 4.636a8 8 0 0112.728 0l1.06 1.061 1.414-1.414-1.06-1.061A10 10 0 0010 2c-1.55 0-3.045.353-4.405 1.01l-.822-.822-1.415 1.414 1.06 1.061zm12.728 10.728a8 8 0 01-12.728 0l-1.06-1.061-1.414 1.414 1.06 1.061A10 10 0 0010 18c1.55 0 3.045-.353 4.405-1.01l.822.822 1.415-1.414-1.06-1.061zM10 14a4 4 0 100-8 4 4 0 000 8z" clipRule="evenodd" />
                            </svg>
                        )}
                        </button>
                    </div>
                    </div>
                    {error && <p className="text-red-500">{error}</p>} {/* Tampilkan pesan kesalahan jika ada */}
                    {success && <p className="text-green-500">{success}</p>}
                    <button type="submit" className="mx-auto w-48 bg-[#00864B] text-white text-center mt-5 py-2 rounded-xl shadow-xl hover:bg-green-800 hover:scale-105 focus:outline-none focus:bg-[#00864B]">
                    {loading ? (
                        <svg className="animate-spin h-5 w-5 text-white flex mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C6.477 0 0 6.477 0 12h4zm2 5.291l-2.162-.88A8.015 8.015 0 014 12H0c0 2.021.388 3.936 1.081 5.627L6 17.29z"></path>
                        </svg>
                        ) : (
                            'Login'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;