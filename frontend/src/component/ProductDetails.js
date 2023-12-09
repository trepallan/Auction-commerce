import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";

function Details() {
    const [auction, setAuction] = useState([]);
    const id = useParams().id;
    
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`http://localhost:8000/auction/${id}`);
                setAuction(response.data);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [id]);
  return (
    <>
        {auction.map(({ id, title, price, category, image, watchlist,description, comments, bid }) => (
            <div key={id}>

            </div>
        ))}
    </>
  )
}

export default Details;