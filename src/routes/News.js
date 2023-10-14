import React, { useState } from 'react';
import { styled } from 'styled-components';
import axios from 'axios';

function News() {
    const [updatePost, setUpdatePost] = useState();
    const [updateDate, setUpdateDate] = useState();
    const submit = () => {
        //axios.post
        console.log(setUpdateDate, setUpdatePost);
    }
    return (
        <div>
            <h1>Hartfield Mission News</h1>
            <h5>Catch up on the Hartfield Mission here!</h5>
            <br></br>
            <input type="date" name="updateDate" id="updateDate" value={updateDate} onChange={setUpdateDate}/> <br></br>
            <input type="textarea" name="updatePost" id="updatePost" value={updatePost} onChange={setUpdatePost}/> <br></br>
            <button type="submit" onClick={submit}>Post</button>
            <button type="reset">Clear</button>
            <p>(blog-style entries would go here, being updated with most recent post at top)</p>
        </div>
    )
}

export default News;