import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        fetch("/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        })
            .then((response) => {
                if (response.ok) return response.json();
                throw new Error("User Login Error.");
            })
            .then((data) => {
                localStorage.setItem("username", data.username);
                localStorage.setItem("token", data.token);

                navigate("/");
                console.log("User Successfully logged in!");
            })
            .catch((error) => console.error(error.message));
    };

    return (
        <div>
            <h2>Log In</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handleLogin}>Log In</button>
        </div>
    );
};

export default Login;
