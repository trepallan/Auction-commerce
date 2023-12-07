import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";

function Details() {
    const [product, setProduct] = useState([]);
    const id = useParams().id;
    
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`http://localhost:8000/product/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.log(error);
            }
        })();
    })
  return (
    <div>ProductDetails</div>
  )
}

export default Details;