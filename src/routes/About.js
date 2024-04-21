import React from 'react'
import 'animate.css/animate.css'
import styled from 'styled-components';

const Blurb = styled.p`
    margin: 0 20%;
`;

function About() {
    return (
        <div>
            <h1 className='animate__animated animate__bounceIn'>The Hartfield Mission</h1>
            <p>(insert blurb about who Steven and Ellen Hartfield are, what their goals are for Kenya, and what they hope to accomplish through this website.)</p>
            <Blurb>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
                velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit 
                anim id est laborum.</Blurb>
        </div>
    )
}

export default About;