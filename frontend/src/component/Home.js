import { useEffect, useState } from "react";
import axios from "axios";

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
    <div>
      <h1>Hello, World!</h1>

      {isLoading && 
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      }

      {products.map(({ id, title, description, price, category, image }) => (
        <div key={id}>
          <h2>{title}</h2>
          <p>{description}</p>
          <p>{price}</p>
          <p>{category}</p>
          <img src={image} alt={title} />
        </div>
      ))}
    </div>
  );
}

export default Home;