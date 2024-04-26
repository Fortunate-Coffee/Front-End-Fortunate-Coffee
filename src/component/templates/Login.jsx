import { useState } from "react";
import Logo from "../atoms/Logo";
import { Link } from "react-router-dom";

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Lakukan sesuatu dengan username dan password
        console.log('Username:', username);
        console.log('Password:', password);
        // Lakukan proses login dan simpan token di sini
        // Setelah login berhasil, panggil fungsi onLogin
        onLogin();
    };

    return(
        <div className="flex flex-col">
            <div className="w-11/12 mt-32 mb-12">
                <Logo sizeImg={48} sizeText={`xl`}/>
            </div>
            <div className="mx-auto w-4/12">
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
                    <Link to={'/admin'} className="flex">
                        <button type="submit" className="mx-auto w-48 bg-[#00864B] text-white text-center mt-5 py-2 rounded-xl shadow-xl hover:bg-[#00864B] focus:outline-none focus:bg-[#00864B]">Login</button>
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default Login;