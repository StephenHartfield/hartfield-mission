import React, { useEffect, useState } from 'react';
import Image from 'react-bootstrap/Image';
import { styled } from 'styled-components';
import ReactPlayer from 'react-player/youtube';
import { ref, listAll, getDownloadURL } from 'firebase/storage';

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

function Home({storage, storagePath}) {
  const [exampleUrl, setExampleUrl] = useState();
  const rows = [
    { text: 'abc', image: require('../assets/Kenya-landing.jpg') }
  ]

  useEffect( () => {
    (async () => {
      // thought here is instead of listing all inside of a folder (which we could do a folder for home page for instance)
      // we could instead have database give us certain strings that we should look up and we can search the storage for those images one at a time.
      const listRef = await ref( storage, storagePath );
      const res = await listAll(listRef);
      res.items.forEach( async item => {
        const url = await getDownloadURL( item );
        console.log( url );
        setExampleUrl( url );
      })
    })();
  }, [])

  return (
    <div style={{ marginTop: '50px' }}>
      <Header className='animate__animated animate__bounceIn'>The Hartfields are going to Kenya!</Header>
      {rows.map((row, idx) => (
        <Div key={'home-' + idx}>
          <Image src={row.image} rounded />
          <Text>{row.text}</Text>
        </Div>
      ))}
      <p>example Youtube embed</p>
      <ReactPlayer url={'https://www.youtube.com/watch?v=jiXChF4oQJo'} />
      {exampleUrl && <img src={exampleUrl} /> }
      Example image from storage
    </div>
  );
}

export default Home;