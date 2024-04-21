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
            
            <h1 className='animate__animated animate__bounceIn'>Donate</h1>
            <p>If you would like to support the mission financially, you can do so here:</p>
            <Donation type="button">Donate</Donation>
            <p>*Note: Donate button does not work currently*</p>
        </div>
    )
}

export default Donate;