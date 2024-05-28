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

function Home({ storage, storagePath }) {
  const [exampleUrl, setExampleUrl] = useState();
  const rows = [
    { text: '', image: require('../assets/Steve-and-Ellen.JPG') }
  ]

  useEffect(() => {
    (async () => {
      // thought here is instead of listing all inside of a folder (which we could do a folder for home page for instance)
      // we could instead have database give us certain strings that we should look up and we can search the storage for those images one at a time.
      const listRef = await ref(storage, storagePath + 'Images');
      const res = await listAll(listRef);
      res.items.forEach(async item => {
        const url = await getDownloadURL(item);
        console.log(url);
        setExampleUrl(url);
      })
    })();
  }, [])

  return (
    <div style={{ marginTop: '50px' }}>
      <Header className='animate__animated animate__bounceIn'>The Hartfields are going to Kenya!</Header>
      {rows.map((row, idx) => (
        <Div key={'home-' + idx}>
          <Image src={row.image} rounded width="50%" />
          <Text>{row.text}</Text>
        </Div>
      ))}
      <br />
      <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
        <ReactPlayer url={'https://www.youtube.com/watch?v=jiXChF4oQJo'} />
      </div>
      <br />
      {/*{exampleUrl && <img src={exampleUrl} />}
      Example image from storage */}
    </div>
  );
}

export default Home;