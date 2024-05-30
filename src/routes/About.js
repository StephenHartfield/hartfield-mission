import React from 'react'
import 'animate.css/animate.css'
import styled from 'styled-components';

const Blurb = styled.p`
    margin: 1% 20%;
`;
const Verse = styled.p`
    font-style: italic;
`;

function About() {
    return (
        <div>
            <Verse>"He was moved with compassion for them...The harvest truly is plentiful, but the laborers are few."</Verse>
            <Verse>- Matthew 9:36-38</Verse>
            <h1 className='animate__animated animate__bounceIn'>Mr. & Mrs. Hartfield</h1>
            <Blurb>In the summer of 2018, God gave Stephen Hartfield a dream: we were moving to Africa. </Blurb>
            <Blurb>Since that day, we have been on a journey of preparation and anticipation of God's call on our lives, 
                moving forward step by step in God's timing and leading, and the time is finally here!</Blurb>
            <Blurb>Matthew 9:36-38 says, “But when Jesus saw the multitudes, He was moved with compassion for them, 
                because they were weary and scattered, like sheep having no shepherd. Then He said to His disciples, 
                'The harvest truly is plentiful, but the laborers are few. 
                Therefore pray the Lord of the harvest to send out laborers into His harvest.'”</Blurb>
        </div>
    )
}

export default About;