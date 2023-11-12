import React from 'react'

function Contact() {
    return (
        <div>
            <h1>This is the contact page</h1>
            <br></br>
            <input type="text" placeholder="Enter your message here..."></input>
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