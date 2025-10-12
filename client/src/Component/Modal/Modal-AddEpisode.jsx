import React, {useState} from "react";
import { Button, Row, Col, Form, FloatingLabel } from "react-bootstrap";
import { API } from "../../Config/Api"
import { useQuery, useMutation } from "react-query";
import { useParams } from "react-router-dom";



export default function AddEps() {

    let {id} = useParams()

    let {data : tvepisode } = useQuery("tvEpisodeCache", async () => {
        const response = await API.get(`/tv/${id}`)
        return response.data.data
    })

    console.log("data episode :", tvepisode?.id)

    const [form, setForm] = useState ({
        title:"",
        image:"",
        link:"",
        tv_id:"",
    })

    const handleChange = (e) => {
        setForm({
        ...form,
        [e.target.name] : e.target.type === "file" ? e.target.files : e.target.value,
        })

        if (e.target.type === "file") {
            let url = URL.createObjectURL(e.target.files[0])
            console.log("data foto :", url)
        }
    }

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault()

            const config = {
                headers: {
                    "Content-Type" : "multipart/form-data"
                }
            }

            const formData = new FormData()
            formData.set("title", form.title)
            formData.set("image", form?.image[0], form?.image[0].name)
            formData.set("link", form.link)
            formData.set("tv_id", tvepisode?.id)

            const response = await API.post("/episode", formData, config)
            console.log("Add episode Success : ", response)

        } catch (err) {
            console.log("add episode failed : " , err)
        }
    })

    return (
        <div>
            <h2 className="text-white mb-3">Add Episode</h2>
            <Form onSubmit={(e) => handleSubmit.mutate(e)}>
            <Row className="mb-3">
                <Col>
                <FloatingLabel controlId="title" label="Title Episode">
                    <Form.Control type="text" placeholder="Title Episode" onChange={handleChange} name="title" />
                </FloatingLabel>
                </Col>
                <Col>
                <FloatingLabel controlId="floatingInputGrid">
                    <Form.Control type="file" onChange={handleChange} name="image"/>
                </FloatingLabel>
                </Col>
            </Row>
            <FloatingLabel controlId="link" label="Link Film">
                    <Form.Control type="text" placeholder="Link Film" onChange={handleChange} name="link"/>
            </FloatingLabel>
            <div style={{width :"100%", textAlign:"end", marginTop:"20px", paddingRight:"30px"}}>
                <Button className="fs-5 fw-bold" style={{ backgroundColor:"red", width:"40%", border:"none"}} type="submit">Add</Button>
            </div>
            </Form>
        </div>
    )
}