import { useEffect, useState } from "react";
import axios from "axios";
import "./css/Home.css";
import Auctionslist from "./Auctionslist";

function Home() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('access_token') === null) {
      window.location.href = '/login';
    } else {
      (async () => {
        try {
          const response = await axios.get('http://localhost:8000/home/', {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
          });

          setIsLoading(false);
          setProducts(response.data);
        } catch (error) {
          console.log(error);
          setIsLoading(false);
        }
      })();
    }
  }, []);

  return (
    <>
    
    {<Auctionslist products={products} isLoading={isLoading} />}

    </>
  );
}

export default Home;