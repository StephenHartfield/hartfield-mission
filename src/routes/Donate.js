import React from 'react';
import 'animate.css';
import styled from 'styled-components';

const Donation = styled.button`
    margin: 1%;
    background-color: gold;
`;

function Donate() {
    return (
        <div style={{ padding: '50px'}}>
            <p>Donations can be done through Foursquare</p>
            <a href='https://give.foursquare.org/fundraiser/5564063'>GIVE</a>
        </div>
    )
}

export default Donate;