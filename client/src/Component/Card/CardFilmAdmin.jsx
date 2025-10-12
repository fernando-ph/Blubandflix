import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom"


export default function CardFilm({item}) {
    return (
      <Link to={`/detailfilmadmin/` + item.id} style={{ textDecoration:"none"}}>
        <Card style={{ width: '10rem', background:"black", color:"white",}}>
      <Card.Img variant="top" src={item?.image} style={{backgroundSize:"cover", height:"18rem"}} />
      <Card.Body>
        <Card.Title>{item?.title}</Card.Title>
        <Card.Text>
          <i>{item?.year}</i>
        </Card.Text>
      </Card.Body>
    </Card>
    </Link>
    )
}