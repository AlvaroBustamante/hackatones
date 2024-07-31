import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Success() {
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const ordenId = query.get("orden_id");
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmE3ZmJmZThhMGIxMTI5Y2M5MDhkMzMiLCJlbWFpbCI6ImFsaTEyM0BnbWFpbC5jb20iLCJwZXJtaXNzaW9uTGV2ZWwiOjEsInByb3ZpZGVyIjoiZW1haWwiLCJuYW1lIjoiQWxpc29uIE1lcmEiLCJyZWZyZXNoS2V5IjoiSGErc3RWTDVzZkVJSHFIOEZkelZldz09IiwiaWF0IjoxNzIyMzk1MDcxfQ.DIzPXWxTZb1FxyLFYFH03sjsGtPWm9_k4mJVWgC05WY";
    if (ordenId) {
      fetch(`http://localhost:8000/ordenes/${ordenId}/pagar`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`,
        },
      })
        .then(response => response.json())
        .then(data => {
          console.log('Pago completado:', data);
        })
        .catch(error => {
          console.error('Error completando el pago:', error);
        });
    }
  }, [location]);

  return (
    <>
      <h2>Gracias por tu orden!</h2>
      <h4>Tu pago se ha realizado satisfactoriamente.</h4>
      <p>
        Si tienes alguna duda contactarnos al:
        <a href="mailto:orders-prueba@prueba.com">orders-prueba@prueba.com</a>.
      </p>
      <div>
      </div>
    </>
  );
}

export default Success;
