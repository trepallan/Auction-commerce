import axios from 'axios';
import './css/ProductDetails.css';
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
        await axios.post(`http://localhost:8000/watchlist/`,
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
        <div className='imgContainer'>
          <img src={auction.image} id="productImg" className="img-thumbnail" alt="" />
        </div>
        <div className="detailsContainer">
          <h1><strong>{auction.title}</strong></h1>
          <p className='text-muted'><small>{auction.category}</small></p>
          <p >{auction.description}</p>
          <h3>${auction.price}</h3>
          <p className='text-muted'><small>Posted by <strong>{auction.seller}</strong></small></p>
          <div id='watchlistBtn'>
          {watchlist ? (
            <button type="button" className="btn btn-warning" onClick={aplowdWatchlist}> Remove from watchlist</button>
          ) : (
            <button type="button" className="btn btn-info" onClick={aplowdWatchlist}> Add to watchlist</button>
          )}
          </div>
        </div>

        
        <div className='auctionComments'>
          <h3>Comments</h3>
          <ul>
            {auction.comments.map((comment) => (
              <li key={comment.id}>
                <p><strong>{comment.user}</strong></p>
                <p>{comment.comment}</p>
              </li>
            ))}
          </ul>
        </div> 
      </>
    );
  }
  
  export default Details;