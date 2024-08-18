import React, { useEffect, useState } from 'react';
import { Form, Button, Alert } from "react-bootstrap";
import "../Signup/signup.css";
import BackgroundImage from "../../assets/images/background.png";
import Logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
function Signup() {
    const [data, setData] = useState({ username: "", password: "", name: "", email: "", sirname: "", mob_no: "", role: "" });
    const [show, setShow] = useState(null);
    const [response, setResponse] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [alert, setAlert] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const submitData = async () => {
            try {
                const res = await fetch('http://localhost:3000/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
                const result = await res.json();
                if (result && result.status === true) {
                    setShow(true);
                    setAlert("success");

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
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleRegister = () => {
        navigate("/login");
    };
    return (
        <div
            className="sign-in__wrapper"
            style={{ backgroundImage: `url(${BackgroundImage})` }}
        >
            {/* Overlay */}
            <div className="sign-in__backdrop"></div>
            {/* Form */}
            <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
                <div className="h4 mb-2 text-center">Sign Up</div>
                {show !== null && (
                    <div class={`alert alert-${alert} alert-dismissible fade show`} role="alert">
                        <strong>{show ? "Successfully Submitted" : "User Already Exists"}</strong>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                )
                }
                <div className='row'>
                    <div className='col'>
                        <Form.Group className="mb-2 p-2" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name='name'
                                value={data.name}
                                placeholder="name"
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </div>
                    <div className='col'>
                        <Form.Group className="mb-2 p-2" controlId="lastname">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                name='sirname'
                                value={data.sirname}
                                placeholder="Last Name"
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <Form.Group className="mb-2 p-2" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name='email'
                                value={data.email}
                                placeholder="Email"
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </div>
                    <div className='col'>
                        <Form.Group className="mb-2 p-2" controlId="mob_no">
                            <Form.Label>Mobile No</Form.Label>
                            <Form.Control
                                type="number"
                                name='mob_no'
                                value={data.mob_no}
                                placeholder="Mobile No"
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <Form.Group className="mb-2 p-2" controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                name='username'
                                value={data.username}
                                placeholder="Username"
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </div>
                    <div className='col'>
                        <Form.Group className="mb-2 p-2" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name='password'
                                value={data.password}
                                placeholder="Password"
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </div>
                </div>
                <div className='col'>
                    <Form.Group className="mb-3" controlId="role">
                        <Form.Label>Role</Form.Label>
                        <Form.Control
                            type="text"
                            name='role'
                            value={data.role}
                            placeholder="Role"
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                </div>
                <Button className="w-100" variant="primary" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Sign Up"}

                </Button>
                <div className="d-grid justify-content-end">
                    <Button
                        className="text-muted px-0"
                        variant="link"
                        onClick={handleRegister}
                    >
                        Please Login from Here
                    </Button>
                </div>
            </Form >


        </div >
    )
}

export default Signup