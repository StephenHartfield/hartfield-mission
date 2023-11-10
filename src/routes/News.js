import React, { useState } from 'react';
import { styled } from 'styled-components';
import axios from 'axios';
import Image from 'react-bootstrap/Image';



function News() {
    const [updatePost, setUpdatePost] = useState();
    const [updateDate, setUpdateDate] = useState();
    const submit = (e) => {
        //axios.post
        console.log(setUpdateDate, setUpdatePost);
    }

    const resetButton = (f) => {
        
    }
    //pretend data from a database
    // display the title and paragraphs and can put in a different src for the image for now
    // configuration right now just defines how the layout looks
    // image: 'left' means image on the left and paragraph on the right
    // image: 'right' means image on the right and paragraph on the left
    // image: 'main' means image takes up entire row
    const mockData = {
        entries: [
            {
                title: 'First Title',
                paragraphs: [
                    'First entry first paragraph',
                    'First entry second paragraph'
                ],
                image: require('../assets/funny_stock_image.jpg'),
                configuration: {
                    image: 'left'
                }
            },
            {
                title: 'Second Title',
                paragraphs: [
                    'Second entry first paragraph',
                    'Second entry second paragraph'
                ],
                image: require('../assets/funny_stock_image2.jpg'),
                configuration: {
                    image: 'right'
                }
            },
            {
                title: 'Image of Event',
                paragraphs: [],
                image: require('../assets/funny_stock_image3.jpg'),
                configuration: {
                    image: 'only'
                }
            },
        ]
    }
    return (
        <div>
            <h1>Hartfield Mission News</h1>
            <h5>Catch up on the Hartfield Mission here!</h5>
            <br></br>
            <input type="date" name="updateDate" id="updateDate" value={updateDate} onChange={e => setUpdateDate(e.target.value)}/> <br></br>
            <input type="textarea" name="updatePost" id="updatePost" value={updatePost} onChange={e => setUpdatePost(e.target.value)} rows={4} placeholder="Enter post here..."/> <br></br>
            <button type="submit" onClick={submit}>Post</button>
            <button type="reset">Clear</button>
            <p>(blog-style entries would go here, being updated with most recent post at top)</p>
            <div style={{margin:"0 10%"}}>
            {mockData.entries.map((g) => (
                    <p>{g.title}<br></br>
                    <div style={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:g.configuration.image==="right" ? "row" : "row-reverse"}}>
                        <div style={{margin:"0 10%", width:"200px", display:g.configuration.image==="only" ? "none" : "block"}}>{g.paragraphs.map((p) => (<p>{p}</p>))}</div>
                        <div style={{margin:"0 10%", height:"200px", width:"200px"}}><img src={g.image} width="100%" height="100%"></img></div></div></p>
                )
            )}
            </div>
        </div>
    )
}

export default News;