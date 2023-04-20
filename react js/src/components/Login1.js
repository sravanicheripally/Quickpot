import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../components/Quickport.css'

import '../components/Login.css'
function Login1() {
    const initialvalues = { Username: "", password: "" };
    const [formvalues, setformvalues] = useState(initialvalues)
    const [formErrors, setformErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
    const [arr, setarr] = useState([])
    const [bool, setBool] = useState(true)
    const handlechange = (e) => {
        console.log(e.target);
        const { name, value } = e.target;
        setformvalues({ ...formvalues, [name]: value })
        console.log(formvalues);
    }
    const Onlogin = (e) => {
        e.preventDefault();
        setformErrors(validate(formvalues));
        setIsSubmit(true)
        axios.post('http://192.168.2.236:8000/api/login/', setformvalues,
        )
            .then((res) => {
                console.log(res);
            });

    }
    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formvalues);
        }
    }, [formErrors])
    const validate = (values) => {
        const errors = {}
        const regex = /(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/;
        if (!values.Username) {
            errors.Username = "username is required";
        }
        else if (!regex.test(values.Username)) {
            errors.Username = "Username must be only characters"
        }
        if (!values.password) {
            errors.password = "password is required"

        }
        else if (values.password.length < 3) {
            errors.password = "password must br more than 4 characters"
        }
        else if (values.password.length > 10) {
            errors.password = "password cannot exceed 10 characters"
        }
        return errors;
    }

    return (
        <div className='Login'>
            <div class="containersignin ">

                <div class="row">
                    <div class="col-sm-9 col-md-10 col-lg-5 mx-auto mb-5">
                        <div class="card border-0 shadow rounded-3 my-5 mb-5">
                            <div class="card-body  ">
                                <h5 class="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
                                <form>
                                    <div class="form-floating mb-3">
                                        <input type="email" class="form-control"
                                            name="Username"
                                            size={30}
                                            id="floatingInput"
                                            placeholder="name@example.com"
                                            onChange={handlechange}
                                            value={formvalues.Username} required />
                                        <p>{formErrors.Username}</p>
                                        <label for="floatingInput">username</label>
                                    </div>
                                    <div class="form-floating mb-3">
                                        <input type="password" class="form-control"
                                            id="floatingPassword"
                                            placeholder="Password" autoComplete="on"
                                            size={30}
                                            name="password"
                                            value={formvalues.password}
                                            onChange={handlechange}
                                            required /> <p>{formErrors.password}</p>
                                        <label for="floatingPassword">Password</label>
                                    </div>

                                    <div class="form-check mb-3">
                                        <input class="form-check-input" type="checkbox" id="rememberPasswordCheck" />
                                        <label class="form-check-label" for="rememberPasswordCheck">
                                            Remember password
                                        </label>
                                    </div>
                                    <div class="d-grid">
                                        <button class="btn btn-primary btn-login text-uppercase fw-bold" type="submit" onClick={Onlogin}>

                                            Login

                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login1