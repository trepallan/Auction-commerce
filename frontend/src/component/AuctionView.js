import axios from 'axios';
import './css/AuctionView.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";

function Details() {
    const [auction, setAuction] = useState(null);
    const [watchlist, setWatchlist] = useState(false);
    const [watchlistInProgress, setWatchlistInProgress] = useState(false);
    const [isSold, setIsSold] = useState(false);
    const [isCommented, setIsCommented] = useState(false);
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
          if (response.data.is_sold) {
            setIsSold(true);
            console.log(response.data);
            setAuction(response.data);
          } else {
            setAuction(response.data);
            setWatchlist(response.data.watchlist);
          }
        } catch (error) {
          console.log(error);
        }
      })();
    }, [id]);


    function handleCommentSubmit(e) {
      e.preventDefault();
      const comment = document.getElementById("comment").value;
        (async () => {
          try {
            const response = await axios.post(`http://localhost:8000/AddComment/${id}/`, { comment }, {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
              }
            });
            if (response.status !== 201) {
              console.log(response);
              alert("Something went wrong");
              return;
            }
            document.getElementById("comment").value = "";
            setIsCommented(true);
          } catch (error) {
            console.log(error);
          }
        })();
    }

    function handleDelete() {
      (async () => {
        try {
          const response = await axios.delete(`http://localhost:8000/DeleteAuction/${id}`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
          });
          if (response.status === 204) {
            alert("Auction deleted successfully");
            window.location.href = "/";
          }
          else {
            alert("Something went wrong");
            return;
          }
        } catch (error) {
          console.log(error);
        }
      })();
    }
  
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
      {/* If the auction is sold */}
      {isSold && (
        <div id="AucisSold">
          <h1>{auction.auction_title} is sold</h1>
          <p>{auction.buyer} bought it for U${auction.value} from {auction.seller}</p>
        </div>
      )}

      {!isSold && (
         <div>
        {/* Auction Details */}

        <div className='imgContainer'>
          <img src={auction.image} id="productImg" className="img-thumbnail" alt="" />
        </div>
        <div className="detailsContainer">
          <h1><strong>{auction.title}</strong></h1>
          <p className='text-muted'><small>{auction.category}</small></p>
          <p >{auction.description}</p>
          <h3>U${auction.price}</h3>
          <p className='text-muted'><small>Posted by <strong>{auction.seller}</strong></small></p>
          <div id='ButtonsContainer'>
          { localStorage.getItem('username') === auction.seller && (
            <button type="button" className="btn btn-danger" onClick={handleDelete}>Finish Auction</button>
          )}
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
              <small>Your bid must be higher than the current price of U${auction.price}</small>
              <br />
              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary"> Confirm</button>
              </div>
            </form>
          </div>


        {/* Comments */}
        <div className='auctionComments'>
          <h3>Comments</h3>
          <form id="commentForm" onSubmit={handleCommentSubmit}>
          <textarea className="form-control" aria-label="With textarea"placeholder="Enter your comment" id="comment"></textarea>
          <button id='commentBtn' type="submit" className="btn btn-outline-success">Comment</button>
          </form>
          {isCommented && 
          <div class="alert alert-success alert-dismissible fade show" role="alert">
            <span>Comment added successfully</span>
            <button type="button" class="btn-close" onClick={() => setIsCommented(false)} aria-label="Close"></button>
          </div>
          }
          {auction.comments.length === 0 && <p>No comments yet</p>}
          <ul>
            {auction.comments.map((comment) => (
              <li key={comment.id}>
                <p><strong>{comment.user}</strong></p>
                <p>{comment.comment}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      )}
      </>
    );
  }
  
  export default Details;