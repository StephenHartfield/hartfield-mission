import React, { useEffect, useState } from 'react';
import Image from 'react-bootstrap/Image';
import { styled } from 'styled-components';
import ReactPlayer from 'react-player/youtube';
import { ref, listAll, getDownloadURL } from 'firebase/storage';

const Header = styled.h1`
display: block;
`;
const Text = styled.p`
  color: green;
`;
const Div = styled.div`
  width: 50%;
  margin: 0 auto;
`;

function Home({ storage, storagePath }) {
  const [exampleUrl, setExampleUrl] = useState();
  const [show, setShow] = useState();

  useEffect(() => {
    (async () => {
      // thought here is instead of listing all inside of a folder (which we could do a folder for home page for instance)
      // we could instead have database give us certain strings that we should look up and we can search the storage for those images one at a time.
      const listRef = await ref(storage, storagePath + 'Images');
      const res = await listAll(listRef);
      setTimeout(() => {
        setShow(true);
      }, 500);
      res.items.forEach(async item => {
        const url = await getDownloadURL(item);
        console.log(url);
        setExampleUrl(url);
      })
    })();
  }, [])

  return (
    <div style={{ marginTop: '50px', height: '500px' }}>
      {show && (
        <>
          <Header className='animate__animated animate__bounceInRight'>The Hartfields are going to Kenya!</Header>
          <div className='container'>
            <Div className='animate__animated animate__fadeIn'>
              <Image src={require('../assets/homepage.jpg')} rounded fluid />
              {/* <Text>{row.text}</Text> */}
            </Div>
          </div>
          {/* <p>example Youtube embed</p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ReactPlayer url={'https://www.youtube.com/watch?v=jiXChF4oQJo'} />
          </div>
          {exampleUrl && <img src={exampleUrl} />}
          Example image from storage */}
        </>
      )}
    </div>
  );
}

export default Home;