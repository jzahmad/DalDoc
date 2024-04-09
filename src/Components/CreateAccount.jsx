import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from "./context";

function CreateAccount() {
    const [email, setEmail] = useState("");
    const [messages, setMessages] = useState("");
    const { auth, url } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const res = await axios.post(`${url}/create`, { email });
            console.log(res.data.message);

            setMessages(`Your Password is :${res.data.message}`);
        } catch (error) {
            console.error("Error sending email:", error);
            setMessages("An error occurred while sending the email.");
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2>Create an Account</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <label htmlFor="email" style={{ marginBottom: '10px' }}>Email address:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ marginBottom: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
                <button type="submit" style={{ backgroundColor: '#4caf50', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Send Email</button>
            </form>
            {messages && <div style={{ marginTop: '10px' }}>{messages}</div>}
        </div>
    );
}

export default CreateAccount;
