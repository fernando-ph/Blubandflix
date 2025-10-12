import React, { useState } from "react";
import { Form, FloatingLabel, Button,} from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useQuery } from "react-query" // Keep useQuery for categories
import useCategoryStore from "../../Store/categoryStore"
import { useEffect } from "react"
import useMovieStore from "../../Store/movieStore"


export default function AddMovie() {

    let Navigate = useNavigate()

    const [form, setForm] = useState ({
        title:"",
        image:"", // This will now be a URL string
        year:"",
        category_id:"",
        description:"",
        link:"",
    })

    const { categories, fetchCategories } = useCategoryStore();
    const { addMovie } = useMovieStore();

    useEffect(() => {
        fetchCategories();
        console.log("Categories fetched:", categories); // Debugging line
    }, [fetchCategories]);

    const handleChange = (e) => {
        setForm({
        ...form,
        [e.target.name] : e.target.value, // Handle all inputs as text
        })
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            const movieData = {
                title: form.title,
                image: form.image,
                year: parseInt(form.year),
                category_id: parseInt(form.category_id),
                description: form.description,
                link: form.link,
            };

            await addMovie(movieData);
            console.log("Add Film Success");
            Navigate("/filmadmin");
        } catch (err) {
            console.log("add film failed : ", err);
        }
    };

    return (
        <>
        <div style={{backgroundColor:"black", height:"1000px"}}> 
            <div style={{color:"white", width:"80%", margin:"auto", padding:"20px"}}>
                <h1>Add Movie</h1>
                <Form onSubmit={handleSubmit}>
                <div className="mt-5" style={{width:"85%", margin:"auto"}}>
                        <FloatingLabel controlId="title" label="Title" className="text-dark mb-3">
                            <Form.Control type="text" placeholder="Title" className="mb-3" name="title" onChange={handleChange}/>
                        </FloatingLabel>                       
                        <FloatingLabel controlId="image" label="Image URL" className="text-dark mb-3">
                            <Form.Control type="text" placeholder="Image URL" className="mb-3" name="image" onChange={handleChange}/>
                        </FloatingLabel>
                        <FloatingLabel controlId="year" label="Year" className="text-dark mb-3">
                            <Form.Control type="text" placeholder="Year" name="year"  onChange={handleChange} />
                        </FloatingLabel>
                   <Form.Select aria-label="Default select example" className="mb-3" size="lg" name="category_id" onChange={handleChange}>
                                         <option hidden>Category</option>
                                         {categories?.map((data) => (
                                             <option key={data?.id} value={data?.id}>{data.name}</option>
                                         ))}
                                     </Form.Select>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={5} name="description"  onChange={handleChange}/>
                    </Form.Group>
                    <FloatingLabel controlId="link" label="Link Film" className="text-dark mb-3">
                        <Form.Control type="text" placeholder="Link Film" name="link" onChange={handleChange} />
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
