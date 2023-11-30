import React, { useState, useEffect } from 'react';
import axios from 'axios';

function HelloWorld() {
  const [products, setProducts] = useState([]);

useEffect(() => {
  axios.get('http://localhost:8000/hello-world/')
    .then(response => {
      console.log(response.data);
      setProducts(response.data);
    })
    .catch(error => {
      console.log(error);
    });
}, []);

return (
  <div>
    <h1>Hello, World!</h1>
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

export default HelloWorld;