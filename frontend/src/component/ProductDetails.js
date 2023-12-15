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

  
    function handleBidDiv() {
      let f = document.getElementsByClassName("makeBid");
      if (f[0].style.display === "none") {
        f[0].style.display = "block";
      }
      else {
        f[0].style.display = "none";
      }
    }

    function handleBidSubmit(e) {
      e.preventDefault();
      const inputStr = document.getElementById("bidAmount").value;
      const inputFloat = parseFloat(inputStr / 100);
      const currentPrice = parseFloat(auction.price);
      if (inputFloat === "" || inputFloat <= currentPrice) {
        alert("Please enter a valid bid amount");
        return;
      }
      (async () => {
        try {
          const response = await axios.post(`http://localhost:8000/bid/${auction.id}/`, inputStr, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
          });
          if (response.status === 200)
          {
            alert("Bid placed successfully");
            window.location.reload(); 
          }
          else
          {
            alert("Something went wrong");
            return;
          }
        } catch (error) {
          console.log(error);
        }
      })();
    }


    async function aplowdWatchlist() {
      // Update the watchlist
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
      {/* Auction Details */}
        <div className='imgContainer'>
          <img src={auction.image} id="productImg" className="img-thumbnail" alt="" />
        </div>
        <div className="detailsContainer">
          <h1><strong>{auction.title}</strong></h1>
          <p className='text-muted'><small>{auction.category}</small></p>
          <p >{auction.description}</p>
          <h3>${auction.price}</h3>
          <p className='text-muted'><small>Posted by <strong>{auction.seller}</strong></small></p>
          <div id='ButtonsContainer'>
          <button  type='button' className='btn btn-success' onClick={handleBidDiv}>Make Bid</button>
          {watchlist ? (
            <button type="button" className="btn btn-warning" onClick={aplowdWatchlist}> Remove from watchlist</button>
          ) : (
            <button type="button" className="btn btn-info" onClick={aplowdWatchlist}> Add to watchlist</button>
          )}
          </div>
        </div>


        {/* Make Bid */}
        
        <div className='makeBid' style={{ display: 'none' }}>
            <button type="button" className="btn-close" aria-label="Close" onClick={handleBidDiv}></button>
            <h3>Make Bid</h3>
            <small><strong>Please enter your bid with cents and no pontuation</strong></small>
            <form onSubmit={handleBidSubmit}>
              <div className="form-group">
                <label htmlFor="bidAmount">Bid Amount</label>
                <input type="number" className="form-control" id="bidAmount"/>
              </div>
              <br />
              <small>Your bid must be higher than the current price of ${auction.price}</small>
              <br />
              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary"> Confirm</button>
              </div>
            </form>
          </div>


        {/* Comments */}
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