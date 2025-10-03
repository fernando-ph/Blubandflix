import React, { useState } from "react";
import { Form, FloatingLabel, Alert } from "react-bootstrap";
import { useMutation } from "react-query"
import { API } from '../../Config/Api'

export default function Register() {

    const [message, setMessage] = useState(null)

    const [form, setForm] = useState ({
        email:'',
        password:'',
        fullname:'',
        gender:'',
        phone:'',
        address:'',
    })

    const {email, password, fullname, gender, phone, address } = form

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = useMutation (async (e) => {
        try {
            e.preventDefault()

            const response = await API.post('/register', form)
            console.log("register success", response)

            const alert = (
                <Alert variant="success" className="py-1">
                    Register Success
                </Alert>
            )

            setMessage(alert)
            setForm ({
                email:'',
                password:'',
                fullname:'',
                gender:'',
                phone:'',
                address:'',
            })
        } catch (error) {
            const alert = (
                <Alert variant="danger" className="py-1">
                    Register Failed !
                </Alert>
            )
            setMessage(alert)
            console.log("register failed : ", error)
        }
    })


    return (
        <div style={{padding:"10px"}}>
                <div style={{fontSize:"30px", marginBottom:"20px", color:"white", fontWeight:"bold"}}>Register</div>
                { message && message }
            <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                <div>
                    <FloatingLabel controlId="fullname"label="Fullname"className="mb-3">
                        <Form.Control type="text" placeholder='Fullname' name="fullname" value={fullname} onChange={handleChange}/>
                    </FloatingLabel>
                    <FloatingLabel controlId="email"label="Email"className="mb-3">
                        <Form.Control type="email" placeholder='Email' name="email" value={email} onChange={handleChange}/>
                    </FloatingLabel>
                    <FloatingLabel controlId="password"label="Password"className="mb-3">
                        <Form.Control type="password" placeholder='Password' name="password"  value={password} onChange={handleChange}/>
                    </FloatingLabel>
                    <Form.Select className="mb-3" name="gender" value={gender} onChange={handleChange}>
                        <option hidden>Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                    </Form.Select>
                    <FloatingLabel controlId="phone"label="Phone"className="mb-3">
                        <Form.Control type="text" placeholder='Phone' name="phone" value={phone} onChange={handleChange} />
                    </FloatingLabel>
                    <FloatingLabel controlId="address"label="Address"className="mb-3">
                        <Form.Control type="text" placeholder='Address' name="address" value={address} onChange={handleChange} />
                    </FloatingLabel>
                        <div className='containerRegisterButton'>
                            <button type="submit" className='loginButton'>Register</button>
                        </div>               
                </div>
            </Form>
        </div>
    )
}