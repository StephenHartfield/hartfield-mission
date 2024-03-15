import React from 'react'
import 'animate.css/animate.css'


function Contact() {
    return (
        <div>
            <h1 className='animate__animated animate__bounceIn'>This is the contact page</h1>
            <br></br>
            <textarea name='contactBody' placeholder="Enter your message here..."></textarea>
            <br></br>
            <h4>Please enter your contact info so we can respond:</h4>
            <input type="text" placeholder="Name"></input>
            <input type="email" placeholder="Email"></input>
            <br></br>
            <button type="submit">Send</button>
        </div>
    )
}

export default Contact