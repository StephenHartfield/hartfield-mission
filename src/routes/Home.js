import React from 'react';
import Image from 'react-bootstrap/Image';
import { styled } from 'styled-components';

const Header = styled.h1`

`;
const Text = styled.p`
  color: green;
`;
const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Home() {
  const rows = [
    { text: 'abc', image: require('../assets/Kenya-landing.jpg') },
    { text: 'def', image: require('../assets/Kenya-landing.jpg') }
  ]

  return (
    <div style={{ marginTop: '50px' }}>
      <Header>The Hartfields are going to Kenya!</Header>
      {rows.map((row, idx) => (
        <Div key={'home-' + idx}>
          <Image src={row.image} rounded />
          <Text>{row.text}</Text>
        </Div>
      ))}
    </div>
  );
}

export default Home;