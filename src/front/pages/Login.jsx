import React, { useState } from "react";
import { login } from "../services/backendServices";
import { useNavigate } from "react-router-dom";

export const Login = () => {

    const navigate = useNavigate()
    const [user, setUser] = useState({
        "email": "",
        "password": ""
    })

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        console.log(user);

        e.preventDefault()
        if (!user.email || !user.password) {
            alert("All fields are required")
            return
        }
        login(user, navigate)
    }

    return (

        <div style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background: "#111",
            color: "#fff",
            fontFamily: "system-ui, sans-serif",
            textAlign: "center",
            padding: "2rem"
        }}>
            <div className="text-center mb-4"><h1>Login Page</h1></div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="inputEmail1" className="form-label">Email address</label>
                    <input type="email" name="email" className="form-control" id="email" aria-describedby="emailHelp" value={user.email} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputPassword1" className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" id="password" value={user.password} onChange={handleChange} />
                </div>
                <div className="mt-5 mb-1 text-start">Not registered yet?<br /> Register <a href="/register">here</a></div>
                <button type="submit" className="btn btn-primary w-100 mt-2">Submit</button>
            </form>
        </div>
    )
}