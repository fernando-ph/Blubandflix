import { useMutation } from "react-query";
import React, { useState } from "react";
import { Form, FloatingLabel, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { API, setAuthToken } from '../../Config/Api';
import useAuthStore from '../../Store/authStore';

export default function Login() {

    const navigate = useNavigate();
    const loginZustand = useAuthStore((state) => state.login);

    const [message, setMessage] = useState(null)
    const [form, setForm] = useState({
        username: '',
        password: '',
    });

    const { username, password } = form;
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault()

            const response = await API.post("/users/login", form);

            console.log("login success : ", response);
            const { accessToken, tokenType } = response.data; 

            loginZustand(accessToken, tokenType);
            setAuthToken(accessToken); 

            navigate('/'); // Redirect to home page after successful login

            const alert = (
                <Alert variant="success" className="py-1">
                    Login success
                </Alert>
            )
            setMessage(alert)
        } catch (error) {
            const alert = (
                <Alert variant="danger" className="py-1">
                    Login Failed
                </Alert>
            )
            setMessage(alert)
            console.log("login failed : ", error)
        }
    })

    return (
        <div className="Modal-login">
        <div style={{ fontSize: "40px", marginBottom: "10px", color: "white", fontWeight: "bold" }}>Login</div>
        {message && message}
        <Form onSubmit={(e) => handleSubmit.mutate(e)}>
            <div>
            <FloatingLabel controlId="username" label="Username" className="mb-3">
                <Form.Control type="text" placeholder='Username' className='formControl' name="username" value={username} onChange={handleChange} />
            </FloatingLabel>
                <FloatingLabel controlId="password" label="Password" className="mb-3">
                    <Form.Control type="password" placeholder='Password' name="password" value={password} onChange={handleChange} />
                </FloatingLabel>
            </div>
            <div className='containerLoginButton'>
                <button className='loginButton'>Login</button>
            </div>
        </Form>
    </div>
    );
}
