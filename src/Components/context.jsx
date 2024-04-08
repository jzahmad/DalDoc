import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("site") || "");
    const navigate = useNavigate();

    const url = "http://localhost:2000";

    const loginAction = async (data) => {
        try {
            const res = await axios.post(`${url}/auth/login`, data);
            setToken(res.data.token); // Assuming token is in res.data.token
            localStorage.setItem("site", res.data.token);
            navigate("/homepage");
            return;
        } catch (err) {
            console.error(err);
        }
    };

    const logOut = () => {
        setToken("");
        localStorage.removeItem("site");
        navigate("/");
    };

    return (
        <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
            {children}
        </AuthContext.Provider>
    );

};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};