import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { loadStripe } from "@stripe/stripe-js";
import { useParams } from "react-router-dom";

function StripePayment() {
  const { userId, cuponId } = useParams();
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/cursos")
      .then((response) => response.json())
      .then((data) => setCursos(data))
      .catch((error) => console.error("Error al obtener los cursos:", error));
  }, []);

  const makePayment = async (cursoId) => {
    const stripe = await loadStripe("");
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmE3ZmJmZThhMGIxMTI5Y2M5MDhkMzMiLCJlbWFpbCI6ImFsaTEyM0BnbWFpbC5jb20iLCJwZXJtaXNzaW9uTGV2ZWwiOjEsInByb3ZpZGVyIjoiZW1haWwiLCJuYW1lIjoiQWxpc29uIE1lcmEiLCJyZWZyZXNoS2V5IjoiSGErc3RWTDVzZkVJSHFIOEZkelZldz09IiwiaWF0IjoxNzIyMzk1MDcxfQ.DIzPXWxTZb1FxyLFYFH03sjsGtPWm9_k4mJVWgC05WY";
    const body = { cursoId, userId, cuponId };
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,

    };

    const response = await fetch("http://localhost:8000/api/create-checkout-session", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const session = await response.json();

    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(result.error);
    } else {
        window.location.href = session.success_url;
      }
    
  };

  return (
    <div className="d-flex flex-wrap">
      {cursos.map((curso) => (
        <Card style={{ width: "20rem", margin: "10px" }} key={curso._id}>
          <Card.Img variant="top" src={curso.img}/>
          <Card.Body>
            <Card.Title>{curso.nombre}</Card.Title>
            <Card.Text>{curso.descripcion}</Card.Text>
            <Button variant="primary" onClick={() => makePayment(curso._id)}>
            Comprar {curso.valor}
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default StripePayment;
