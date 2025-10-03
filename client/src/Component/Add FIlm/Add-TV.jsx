import React, { useState } from "react";
import { Form, FloatingLabel, Button,} from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useMutation, useQuery } from "react-query"
import { API } from "../../Config/Api"

export default function AddTV() {


    let Navigate = useNavigate()

    const [form, setForm] = useState ({
        title:"",
        image:"",
        year:"",
        category_id:"",
        description:"",
        link:"",
    })

    let {data : categories } = useQuery("categoryCache", async () => {
        const response = await API.get("/categories")
        return response.data.data
    })



    const handleChange = (e) => {
        setForm({
        ...form,
        [e.target.name] : e.target.type === "file" ? e.target.files : e.target.value,
        })

        if (e.target.type === "file") {
            let url = URL.createObjectURL(e.target.files[0])
            console.log('data foto', url)
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
            formData.set("year", form.year)
            formData.set("category_id", form.category_id)
            formData.set("description", form.description)
            formData.set("link", form.link)

            const response = await API.post("/tv", formData, config)
            console.log("Add Film Success : ", response)

            Navigate("/filmadmin")
        } catch (err) {
            console.log("add film failed : " , err)
        }
    })

    return (
        <>
        <div style={{backgroundColor:"black", height:"1000px"}}> 
            <div style={{color:"white", width:"80%", margin:"auto", padding:"20px"}}>
                <h1>Add TV Series</h1>
                <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                <div className="mt-5" style={{width:"85%", margin:"auto"}}>
                        <FloatingLabel controlId="title" label="Title" className="text-dark mb-3">
                            <Form.Control type="text" placeholder="Title" className="mb-3" name="title" onChange={handleChange}/>
                        </FloatingLabel>                       
                            <Form.Control type="file" placeholder="image" className="mb-3" size="lg" name="image" onChange={handleChange}/>                      
                        <FloatingLabel controlId="year" label="Year" className="text-dark mb-3">
                            <Form.Control type="text" placeholder="Year" name="year"  onChange={handleChange} />
                        </FloatingLabel>
                    <Form.Select aria-label="Default select example" className="mb-3" size="lg" name="category_id" onChange={handleChange}>
                        <option hidden>Category</option>
                        {categories?.map((data) => (
                            <option key={data?.id} value={data?.id}>{data.name}</option>
                        ))}
                    </Form.Select>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={5} name="description"  onChange={handleChange}/>
                    </Form.Group>
                    <FloatingLabel controlId="link" label="Link Film" className="text-dark mb-3">
                        <Form.Control type="text" placeholder="Link Film" name="link"  onChange={handleChange} />
                    </FloatingLabel>
                    <div className="text-end pe-5">
                        <Button style={{backgroundColor:"red", border:"none", width:"30%"}} type="submit">Save</Button>
                    </div>
                </div>
                </Form>
            </div>
        </div>
        </>
    )
}