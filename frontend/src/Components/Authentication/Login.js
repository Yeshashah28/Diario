import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import AlertBox from "../Alert/AlertBox";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({ message: "", show:false});
  const navigate = useNavigate();
  const handlesubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post("/api/Auth/Login", {
        email,
        password,
      });
      if (res.data.result === 1) {
        setAlert({
        message: "Login successful",
        show:true,
      });
      setTimeout(() => {
        setAlert((prev) => ({ ...prev, show: false }));
        localStorage.setItem("userInfo", JSON.stringify(res.data.data));
        navigate("/homepage");
      }, 1000);
        
      }
    } catch (error) {
      setAlert({
        message: "user doesn't exist or wrong credentials",
        show:true,
      });
      setTimeout(() => {
        setAlert((prev) => ({ ...prev, show: false }));
      }, 2000);
    }
  };
  return (
    <div className="main-form-container">
      <div className="form">
        <Form onSubmit={handlesubmit}>
          <h1>Welcome Back!</h1>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button
            variant="dark"
            type="submit"
            size="lg"
            className="w-100 h-auto"
          >
            Log in
          </Button>
          {alert.message && (
            <div className="mt-3">
              <AlertBox
                message={alert.message}
                show={alert.show}
              />
            </div>
          )}
          <div>
            Not Registered Yet?<Link to={"/signin"}>Sign-in</Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
