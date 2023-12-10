import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";

function Details() {
    const [auction, setAuction] = useState(null);
    const [watchlist, setWatchlist] = useState(false);
    const [watchlistInProgress, setWatchlistInProgress] = useState(false);
    const { id } = useParams();
  
    useEffect(() => {
      (async () => {
        try {
          const response = await axios.get(`http://localhost:8000/auction/${id}`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
          });
          setAuction(response.data);
          setWatchlist(response.data.watchlist);
        } catch (error) {
          console.log(error);
        }
      })();
    }, [id]);
  
    async function aplowdWatchlist() {
        if (watchlistInProgress) {
          alert("Please wait...")
          return;
        }
        setWatchlistInProgress(true); 
        watchlist ? setWatchlist(false) : setWatchlist(true)
        const {response}= await axios.post(`http://localhost:8000/watchlist/`,
        auction.id, {
          headers: {
            'Content-Type': 'application/json',
          }
        }
       );
       setWatchlistInProgress(false);
        return;
    }
  
    if (auction === null) {
      return <p>Loading...</p>;
    }
  
    return (
      <>
        <div className='d-flex'>
          <img src={auction.image} className="img-thumbnail" alt="" />
        </div>
        <div>
          <h1><strong>{auction.title}</strong></h1>
          <p>{auction.price}</p>
          <p className='text-muted'><small>{auction.category}</small></p>
          <p>{auction.description}</p>
          {watchlist ? (
            <button type="button" className="btn btn-outline-warning" onClick={aplowdWatchlist}> Remove from watchlist</button>
          ) : (
            <button type="button" className="btn btn-outline-info" onClick={aplowdWatchlist}> Add to watchlist</button>
          )}
        </div>
      </>
    );
  }
  
  export default Details;