// Import the react JS packages
import {useEffect, useState} from "react";
import axios from "axios";
// Define the Login function.
function Home() {
     const [message, setMessage] = useState('');
     useEffect(() => {
        if(localStorage.getItem('access_token') === null){                   
            window.location.href = '/login'
        }
        else{
         (async () => {
           try {
             const {data} = await axios.get(   
                            'http://localhost:8000/home/', {
                             headers: {
                                'Content-Type': 'application/json'
                             },
                             Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                             data: {
                                refresh: localStorage.getItem('refresh_token')
                             }
                            }

                           );
             setMessage(data.message);
          } catch (e) {
            console.log('not auth')
            console.log(e)
          }
         })()};
     }, []);
     return ( <div className="form-signin mt-5 text-center">
                 <h3>Hi {message}</h3>
              </div>
            );
}

export default Home;