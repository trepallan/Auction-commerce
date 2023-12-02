import React, { useState, useEffect } from 'react';
import axios from 'axios';
function Navbar() {
  // Logic to check if user is logged in or not
  const [Username, setUsername] = useState('');
  useEffect(() => {
    axios.get('http://localhost:8000/getUser/')
    .then(response => {
      setUsername(response.data.user);
    })
    .catch(error => {
      console.log(error);
    });
  }, []);
  return (
    <>
      {Username !== '' ? ( 
        <div>
          <h1>Hello {Username}</h1>
          <ul className='nav'>
             <li className="nav-item">
                    <a className="nav-link" href="/logout">Log Out</a>
                </li>
                <li>
                    <a className="nav-link" href="/create">Create Listing</a>
                </li>
                <li>
                    <a className="nav-link" href="/watchlist">Watchlist</a>
                </li>
                <li>
                    <a className="nav-link" href="/categories"> search for Categories</a>
                </li>
            
          </ul>
        </div>
      ) : (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
            <a className="navbar-brand" href="/">Commerce</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" href="/login">log in</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/register">Register</a>
                </li>
                </ul>
            </div>
            </div>
      </nav>
      )}
    </>
  )
}

export default Navbar;