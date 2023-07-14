import React from 'react';
import Image from 'react-bootstrap/Image';
import { styled } from 'styled-components';

const Header = styled.h1`

`;

function Home() {
    return (
      <div style={{marginTop: '50px'}}>
        <Header>The Hartfields are going to Kenya!</Header>
        <Image src={require('../assets/Kenya-landing.jpg')} rounded/>
      </div>
    );
  }
  
export default Home;