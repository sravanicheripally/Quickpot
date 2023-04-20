import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const Contact = () => {
    const onSubmit = (e) => {
        e.preventDefault()
        const { name, booking_id, issue } = e.target.elements
        const user = localStorage.getItem('user')
        console.log(user)
        let conFom = { booking_id:booking_id.value,user:user,issue: issue.value}
        console.log(conFom)
        axios.post('http://192.168.2.236:8000/api/complaints/', conFom)
        .then((res) => {
            console.log(res)
        })
        .catch((error)=>console.error(error))
        

    }
    return (<div className="container mt-5">
        <h2 className="mb-3">Contact us</h2>
        <form onSubmit={onSubmit}>
            <div className="mb-3">
                <label className="form-label" htmlFor="name">
                    Name
                </label>
                <input className="form-control" type="text" id="name" required />
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="booking_id">
                    Booking Id
                </label>
                <input className="form-control" type="text" id="booking_id" required placeholder='you can see in your bookings' />
            </div>

            <div className="mb-3">
                <label className="form-label" htmlFor="issue">
                    Issue
                </label>
                <textarea className="form-control" id="issue" required />
            </div>
            <button className="btn btn-danger" type="submit">
                Send
            </button>
        </form>

    </div>)
}



export default Contact