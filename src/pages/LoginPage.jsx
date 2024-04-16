import Login from '../component/templates/Login';

const LoginPage = ({ onLogin }) => {
    return(
        <div className="">
            <Login onLogin={onLogin} />
        </div>
    );
}

export default LoginPage;