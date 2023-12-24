import axios from 'axios';
import './css/WatchlistView.css';
import { useEffect, useState } from "react";
import Auctionslist from './Auctionslist';

function Watchlist() {
    const [watchlistitems, setWatchlistitems] = useState([]);
    const [isInWatchlist, setIsInWatchlist] = useState(true)
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`http://localhost:8000/getwatchlist/`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`
                    }
                });
                setWatchlistitems(response.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        })();
    }, []);

    return (
        <>
            <Auctionslist products={watchlistitems} isLoading={isLoading} />
        </>
    );
}

export default Watchlist;