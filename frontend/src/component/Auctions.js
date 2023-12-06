import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Auctions() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  axios.get('http://localhost:8000/Getauctions/')
    .then(response => {
      setIsLoading(false);
      setProducts(response.data);
    })
    .catch(error => {
      console.log(error);
      setIsLoading(false);
    });
}, []);

return (
  <div>
    <h1>Hello, World!</h1>
    
    {isLoading && 
    <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
    </div>}

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

export default Auctions;