import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/backendServices";

export const Register = () => {

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
        register(user, navigate)
        
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
            <div className="text-center mb-4"><h1>Register Page</h1></div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="inputEmail1" className="form-label">Email address</label>
                    <input type="email" name="email" className="form-control" id="email" aria-describedby="emailHelp" value={user.email} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputPassword1" className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" id="password" value={user.password} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary w-100 mt-3">Submit</button>
            </form>
        </div>
    )
}