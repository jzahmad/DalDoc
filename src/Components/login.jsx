import React, { useState } from "react";
import { useAuth } from "./context";
import { Link } from 'react-router-dom';

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
    });
    const auth = useAuth();
    const [message, setMessage] = useState("");

    const handleSubmitEvent = async (e) => {
        e.preventDefault();
        try {
            const res = await auth.loginAction(input);
            setMessage(res.data.error);
        } catch (error) {
        }
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <form onSubmit={handleSubmitEvent} style={{ backgroundColor: '#20ebe4be', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', width: '300px' }}>
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="user-email" style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
                        <input
                            type="email"
                            id="user-email"
                            name="email"
                            placeholder="example@dal.ca"
                            onChange={handleInput}
                            value={input.email}
                            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '16px' }}
                        />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={handleInput}
                            value={input.password}
                            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '16px' }}
                        />
                    </div>
                    <button type="submit" className="btnsubmit" style={{ backgroundColor: '#4caf50', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}>Submit</button>
                </form>
            </div>
            {message && <div>{message}</div>}
            <Link to={`\create`} style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)' }}>Create Account</Link>
        </div>
    );
};

export default Login;
