import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import UserProfile from "../../Assets/img/profile.svg"
import Email from "../../Assets/img/email.svg"
import Status from "../../Assets/img/status.svg"
import Gender from "../../Assets/img/gender.svg"
import Phone from "../../Assets/img/phone.svg"
import Location from "../../Assets/img/location.svg"
import NavUser from "../../Component/NavbarUser";
import { API } from "../../Config/Api";
import { useMutation, useQuery } from "react-query";
import useRegisterStore from "../../Store/registerStore";

export default function Profile() {

    const { form: registerForm } = useRegisterStore();

    const [form, setForm] = useState ({
        fullName: registerForm.fullname || '',
        email: registerForm.email || '',
        gender: registerForm.gender || '',
        phone: registerForm.phone || '',
        address: registerForm.address || '',
        image: registerForm.image || '',
    })
    
    let { data : user, refetch: userRefetch } = useQuery("userCache", async () => {
        const response = await API.get ("users/register")
        return response.data.data
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name] :
            e.target.type === 'file' ? e.target.files : e.target.value,
        })

        if (e.target.type === 'file') {
            let url = URL.createObjectURL(e.target.files[0])
        }
    }

    const handleSubmit = useMutation( async (e) => {
        try {
            e.preventDefault()

            const config = {
                headers: {
                    'Content-type' : 'multipart/form-data'
                }
            }

            const formData = new FormData()
            formData.set('fullName', form.fullName)
            formData.set('email', form.email)
            formData.set('gender', form.gender)
            formData.set('phone', form.phone)
            formData.set('address', form.address)
            if (form.image) {
                formData.set('image', form?.image[0], form?.image[0].name)
            }

            // Update the API endpoint to match the new backend PATCH endpoint
            const response = await API.patch('/users', formData, config)
            console.log(response.data)
            userRefetch()

        } catch (error) {
            console.log(error)
        }
    })

    console.log("data user : ", user)

    return (
        <div style={{background:"black", color:"white", height:"1300px"}}>
            <NavUser />
            <div className="mt-5" style={{width:"65%", border:"white 1px solid", margin:"auto", padding:"20px", backgroundColor:"#1F1F1F", borderRadius:"10px"}}>
                <Row>
                    <Col>
                        <div>
                            <Row>
                             <Col xs={1} className="pt-2"><img src={UserProfile} alt="profile" /></Col>
                             <Col>
                                <input 
                                    type="text" 
                                    name="fullName" 
                                    value={form.fullName} 
                                    onChange={handleChange} 
                                    style={{background:"none", border:"none", color:"white"}}
                                />
                            
                             </Col>
                             </Row>
                        </div>
                        <div>
                            <Row>
                             <Col xs={1} className="pt-2"><img src={Email} alt="email" /></Col>
                             <Col>
                                <input 
                                    type="email" 
                                    name="email" 
                                    value={form.email} 
                                    onChange={handleChange} 
                                    style={{background:"none", border:"none", color:"white"}}
                                />
                               
                             </Col>
                             </Row>
                        </div>
                   
                        <div>
                            <Row>
                             <Col xs={1} className="pt-2"><img src={Gender} alt="gender" /></Col>
                             <Col>
                                <input 
                                    type="text" 
                                    name="gender" 
                                    value={form.gender} 
                                    onChange={handleChange} 
                                    style={{background:"none", border:"none", color:"white"}}
                                />
                        
                             </Col>
                             </Row>
                        </div>
                        <div>
                            <Row>
                             <Col xs={1} className="pt-2"><img src={Phone} alt="phone" /></Col>
                             <Col>
                                <input 
                                    type="text" 
                                    name="phone" 
                                    value={form.phone} 
                                    onChange={handleChange} 
                                    style={{background:"none", border:"none", color:"white"}}
                                />
                        
                             </Col>
                             </Row>
                        </div>
                        <div>
                            <Row>
                             <Col xs={1} className="pt-2"><img src={Location} alt="location" /></Col>
                             <Col>
                                <textarea 
                                    name="address" 
                                    value={form.address} 
                                    onChange={handleChange} 
                                    style={{background:"none", border:"none", color:"white", width:"100%"}}
                                />
                              
                             </Col>
                             </Row>
                        </div>
                    </Col>
                    <Col xs={5}>
                    <div style={{width:"280px", height:"345px", border:"1 px solid", overflow:"hidden", borderRadius:"10px"}}>
                        <img src={user?.image} alt="userphoto" style={{width:"100%", height:"100%", objectFit:"cover"}}/>
                    </div>
                    <div style={{marginTop:"10px"}}>
                    <form onSubmit={(e) => handleSubmit.mutate(e)}>
                        <input type="file" name="image" onChange={handleChange} />
                        <Button style={{width:"85%", background:"red", border:"none"}} type="submit">Change Photo Profile</Button>
                    </form>
                    
                    </div>
                    
                    </Col>
                </Row>
            </div>
        </div>
    )}
