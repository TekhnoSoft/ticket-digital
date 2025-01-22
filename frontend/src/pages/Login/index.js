import React, { useState } from 'react';
import './style.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Email: ${email}\nSenha: ${password}`);
    };

    return (
        <div className='login-body'>
            <div className="login-container">
                <form className="login-form" onSubmit={handleSubmit}>
                    <h2 className="login-title">Bem-vindo</h2>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="login-input"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="login-input"
                        required
                    />
                    <button type="submit" className="login-button">Entrar</button>
                </form>
            </div>
        </div>
    );
}
