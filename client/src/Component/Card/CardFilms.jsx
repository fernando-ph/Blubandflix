import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom"


export default function CardFilm({item}) {
    return (
      <Link to={`/detailmovie/` + item.id} style={{ textDecoration:"none"}}>
        <Card className="h-100" style={{ background:"black", color:"white",}}>
      <Card.Img variant="top" src={item?.image} style={{backgroundSize:"cover", height:"auto", maxHeight:"18rem"}} />
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

