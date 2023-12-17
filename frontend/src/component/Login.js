// Import the react JS packages 
import axios from "axios";
import {useState} from "react";
import "./css/Login.css";
// Define the Login function.
function Login() {
// Define the state of the form.
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // Create the submit method.
    const submit = async e => {
        e.preventDefault();
        const user = {
            username: username,
            password: password
        };
        // Create the POST requuest
        const {data} = await axios.post('http://localhost:8000/token/',
            user ,{headers: 
            {'Content-Type': 'application/json'}});
        // Initialize the access & refresh token in localstorage.      
        localStorage.clear();
        localStorage.setItem('username', username);
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        axios.defaults.headers.common['Authorization'] = 
            `Bearer ${data['access']}`;
        window.location.href = '/'
    };

    return (
        <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={submit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="form-group mt-3">
              <label>Username</label>
              <input autoComplete="username" className="form-control mt-1" 
                placeholder="Enter Username" 
                name='username'  
                type='text' value={username}
                required 
                onChange={e => setUsername(e.target.value)}/>
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input autoComplete="current-password" name='password' 
                type="password"     
                className="form-control mt-1"
                placeholder="Enter password"
                value={password}
                required
                onChange={e => setPassword(e.target.value)}/>
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" 
                 className="btn btn-primary">Submit</button>
            </div>
          </div>
          <small className="form-text text-muted mt-3">
                Not registered? <a href="/register">Sign Up</a>
          </small>
       </form>
     </div>
    )

}

export default Login;