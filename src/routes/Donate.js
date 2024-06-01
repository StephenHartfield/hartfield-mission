import React from 'react';
import 'animate.css';
import styled from 'styled-components';

const Donation = styled.button`
    margin: 1%;
    background-color: gold;
`;

function Donate() {
    return (
        <div>
            
            <h1 className='animate__animated animate__bounceIn'>Partner With Us</h1>
            <p>If you would like to support the mission financially, you can do so here:</p>
            <a href='http://give.foursquare.org/hartfield'><Donation type="button">Partner</Donation></a>
        </div>
    )
}

export default Donate;