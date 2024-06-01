import React from 'react'
import 'animate.css/animate.css'
import styled from 'styled-components';

const Blurb = styled.p`
    margin: 1% 20%;
`;
const Verse = styled.p`
    font-style: italic;
    font-size: 25px;
`;

function About() {
    return (
        <div>
            <Verse>"He was moved with compassion for them...The harvest truly is plentiful, but the laborers are few."</Verse>
            <Verse>- Matthew 9:36-38</Verse>
            <div>
                <a href="http://give.foursquare.org/hartfield" target='_blank'><button>Partner</button></a>
            </div>
            <h1 className='animate__animated animate__bounceIn'>Mr. & Mrs. Hartfield</h1>
            <Blurb>In the summer of 2018, God gave Stephen Hartfield a dream: we were moving to Africa. </Blurb>
            <Blurb>Since that day, we have been on a journey of preparation and anticipation of God's call on our lives, 
                moving forward step by step in God's timing and leading, and the time is finally here!</Blurb>
            <Blurb>Matthew 9:36-38 says, “But when Jesus saw the multitudes, He was moved with compassion for them, 
                because they were weary and scattered, like sheep having no shepherd. Then He said to His disciples, 
                'The harvest truly is plentiful, but the laborers are few. 
                Therefore pray the Lord of the harvest to send out laborers into His harvest.'”
                We have each said, "Lord, here I am. Send me." And He is sending us into His harvest.</Blurb>
            <Blurb>In Ellen's early 20's, it was confirmed over and over to her of her life-long calling to the nations, 
                to be one of these laborers for God. Through her experiences on short term mission trips to Haiti, 
                many intimate times and words from God, prophetic prayers from others, God's miraculous provision, 
                and a deep ache and passion in her heart for the children in need of love and leading in different parts of the world, 
                this calling has sat with her for years as she has waited on God's timing.</Blurb>
            <Blurb>In June of 2023, Ellen had a life-changing encounter with God. 
                While in her kitchen listening to a message of a man speaking of God's call on the next generation, 
                she had a vision of a sea of children's faces. African children, Indian children. 
                She knew this was the reason God was calling them to go. To raise up, to call up the next generation. 
                To declare over them with boldness who they are in God's kingdom. The children of Africa will change Africa. 
                The children of India will change India. As she saw this vision, she fell to the ground, 
                weeping and sobbing and praying in the spirit. She felt God's presence fall heavily on her with a burden, 
                with a mandate, to call up the children.</Blurb>
            <Blurb>This is why we need to go. The children need people to disciple them 
                and declare to them of God's love and purpose and calling. </Blurb>
            <Blurb>This is our call. This is our passion. The children are the future of the nations.</Blurb>
            <br />
        </div>
    )
}

export default About;