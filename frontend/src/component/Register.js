import { useState } from "react";
import axios from "axios";
import "./css/Register.css";

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);

    const submit = async e => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        try {
            await axios.post("http://localhost:8000/register/", {
                username,
                email,
                password
            });
            window.location.href = "/login";
        } catch (error) {
            setError(error.response.data);
        }
    };
    return (
        <>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-5">
              <div id="register_card" className="card">
                <h2 id="H2_register" className="card-title text-center">
                  Register
                </h2>
                <div className="card-body py-md-4">
                  <form onSubmit={submit}>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control form_control_"
                        autoComplete="username"
                        id="name"
                        placeholder="Name"
                        value={username}
                        required
                        onChange={e => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control form_control_"
                        id="email"
                        placeholder="Email"
                        autoComplete="email"
                        value={email}
                        required
                        onChange={e => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control form_control_"
                        id="password"
                        placeholder="Password"
                        autoComplete="new-password"
                        value={password}
                        required
                        onChange={e => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        autoComplete="new-password"
                        className="form-control form_control_"
                        id="confirm-password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        required
                        onChange={e => setConfirmPassword(e.target.value)}
                      />
                    </div>
                    <div className="d-flex flex-row align-items-center justify-content-between">
                      <a id="a_login" href="/login">Login</a>
                      <button className="btn btn-primary login_btn">Create Account</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        </>
      );
    };
export default Register;