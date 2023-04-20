import axios from 'axios'
import React, { useState } from 'react'


import '../components/SignIn.css'
function SignIn() {
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [arr, setarr] = useState([])

  const changeemail = (e) => {
    setemail(e.target.value)
    // console.log(e.target.value);
  }
  const changepassword = (e) => {
    setpassword(e.target.value)
    // console.log(e.target.value)
  }

  const Onlogin = (e) => {
    e.preventDefault();
    let val = {
      email: email,
      password: password
    }
    // console.log(val);
    setemail("")
    setpassword("")
    arr.push(val)
    // console.log(arr)
    axios.post('http://192.168.2.236:8000/api/login', val,
      {
        headers: {
          'authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZXhwIjoxNjcxNjkwMjczLCJpYXQiOjE2NzE2ODk5NzN9.KDqTKI0rtZxNwigKkoeiOodGOl0lZy1ay9By-SbTAIs",
        }
      }
    )
      .then((res) => {
        console.log(res);
        // console.log(res.data);
      });

    //  useEffect(()=>{
    //   axios.get("http://192.168.2.236:8000/api/login")
    //   .then(res=>console.log(res))
    //  })
  }
  return (

    <div className='signin1'>
      <div class="containersignin ">
   
          <div class="row">
            <div class="col-sm-9 col-md-10 col-lg-5 mx-auto mb-5">
              <div class="card border-0 shadow rounded-3 my-5 mb-5">
                <div class="card-body  ">
                  <h5 class="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
                  <form>
                    <div class="form-floating mb-3">
                      <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" onChange={changeemail} />
                      <label for="floatingInput">Email address</label>
                    </div>
                    <div class="form-floating mb-3">
                      <input type="password" class="form-control" id="floatingPassword" placeholder="Password" autoComplete="on" onChange={changepassword} />
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
                        {/* <Link to="/profile" className='SignIn'>  */}
                        Login
                        {/* </Link> */}
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

export default SignIn
