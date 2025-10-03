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

export default function Profile() {

    const [isLoading, setIsLoading] = useState(true)
    const [form, setForm] = useState ({
        image:'',
    })
    
    let { data : user } = useQuery("userCache", async () => {
        const response = await API.get ("/user")
        return response.data.data
    })

    const handleChange = (e) => {
        setForm({
            form,
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
            if (form.image) {
                formData.set('image', form?.image[0], form?.image[0].name)
            }

            const response = await API.patch('/user', formData, config)
            console.log(response.data)

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
                             <Col>{user?.fullname}
                                <p>Full name</p>
                             </Col>
                             </Row>
                        </div>
                        <div>
                            <Row>
                             <Col xs={1} className="pt-2"><img src={Email} alt="email" /></Col>
                             <Col>{user?.email}
                                <p>email</p>
                             </Col>
                             </Row>
                        </div>
                        <div>
                            <Row>
                             <Col xs={1} className="pt-2"><img src={Status} alt="status" /></Col>
                             <Col>Active
                                <p>Status</p>
                             </Col>
                             </Row>
                        </div>
                        <div>
                            <Row>
                             <Col xs={1} className="pt-2"><img src={Gender} alt="gender" /></Col>
                             <Col>{user?.gender}
                                <p>Gender</p>
                             </Col>
                             </Row>
                        </div>
                        <div>
                            <Row>
                             <Col xs={1} className="pt-2"><img src={Phone} alt="phone" /></Col>
                             <Col>{user?.phone}
                                <p>Mobile Phone</p>
                             </Col>
                             </Row>
                        </div>
                        <div>
                            <Row>
                             <Col xs={1} className="pt-2"><img src={Location} alt="location" /></Col>
                             <Col>{user?.address}
                                <p>Address</p>
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
    )
}