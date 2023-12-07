import { useEffect, useState } from "react";
import axios from "axios";
import "./css/Home.css";

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
      {isLoading && 
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      }
    <div className="container">
      {products.map(({ id, title, description, price, category, image }) => (
        <a href={`/product/${id}` } key={id}>
          <div className="card mb-3">
            <div className="row g-0">
              <div className="col-md-4">
                <img src={image} className="img-fluid rounded-start" alt={title}></img>
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{title}</h5>
                  <p className="card-text">{price}</p>
                  <p className="card-text"><small className="text-body-secondary">{category}</small></p>
                </div>
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
    </div>
  );
}

export default Home;