import React, { useEffect, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "../Login/login.css";

import BackgroundImage from "../../assets/images/background.png";
import Logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [data, setData] = useState({ username: "", password: "" });
    const [show, setShow] = useState(null);
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [alert, setAlert] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const submitData = async () => {
            try {
                const res = await fetch('http://localhost:3000/users/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
                const result = await res.json();
                // console.log(result);

                if (result && result.status === true) {

                    setShow(true);
                    setAlert("success");
                    navigate("/home");

                } else {
                    setShow(false);
                    setAlert("danger");

                }
                setResponse(result);
            } catch (error) {
                console.error('Error submitting data:', error);
                setIsSubmitting(false); // Reset submission state
            } finally {
                setIsSubmitting(false); // Reset submission state
            }
        }
        if (isSubmitting) {
            submitData();
        }
    }, [isSubmitting, data]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setLoading(true);
        await delay(500);
        // if (data.username !== "admin" || data.password !== "admin") {
        //     setShow(true);
        // }

        setLoading(false);
    };

    // console.log(alert);

    const handleRegister = () => {
        navigate("/");
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }
    // console.log(data);

    function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    return (
        <div
            className="sign-in__wrapper"
            style={{ backgroundImage: `url(${BackgroundImage})` }}
        >
            {/* Overlay */}
            <div className="sign-in__backdrop"></div>
            {/* Form */}
            <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
                {/* Header */}
                <img
                    className="img-thumbnail mx-auto d-block mb-2"
                    src={Logo}
                    alt="logo"
                />
                <div className="h4 mb-2 text-center">Login In</div>
                {/* ALert */}
                {show !== null && (
                    <div class={`alert alert-${alert} alert-dismissible fade show`} role="alert">
                        <strong>{show ? "user login successfully" : "Invalid username or password please check once"}</strong>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                )
                }
                <Form.Group className="mb-2" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        value={data.username}
                        placeholder="Username"
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-2" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={data.password}
                        placeholder="Password"
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                {!loading ? (
                    <Button className="w-100" variant="primary" type="submit">
                        Log In
                    </Button>
                ) : (
                    <Button className="w-100" variant="primary" type="submit" disabled>
                        Logging In...
                    </Button>
                )}
                <div className="d-grid justify-content-end">
                    <Button
                        className="text-muted px-0"
                        variant="link"
                        onClick={handleRegister}
                    >
                        Please Register first if you're new user
                    </Button>
                </div>

            </Form>
            {/* Footer */}
            <div className="w-100 mb-2 position-absolute bottom-0 start-50 translate-middle-x text-white text-center">
                Made by Nutan Bhoyar | &copy;2022
            </div>
        </div>
    );
};

export default Login;
