import { useEffect } from "react";
import axios from "axios";

let isLogoutinProgress = false;

function Logout() {
    useEffect(() => {
        (async () => {
            
            if (isLogoutinProgress) {
                return null;
            }
        
            isLogoutinProgress = true;
            try {
                await axios.post('http://localhost:8000/logout/', {
                    refresh_token: localStorage.getItem('refresh_token')
                }, {
                    headers: { 'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                },
                    withCredentials: true
                });

                localStorage.clear();
                axios.defaults.headers.common['Authorization'] = null;
                window.location.href = '/login';
            } catch (e) {
                console.log('logout not working', e);
            }
        })();
    }, []);

    return (
        <div></div>
    );
}

export default Logout;