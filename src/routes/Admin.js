import React, { useState } from 'react';
import { styled } from 'styled-components';
import axios from 'axios';

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Admin() {
    const [userName, setUserName] = useState();
    const [userPWord, setUserPWord] = useState();
    const data = {
        userName,
        userPWord
    }
    const submit = (e) => {
        e.preventDefault();
        //axios.post
        console.log(userName)
        console.log(userPWord)
        console.log(data)
    }
    return (
        <div>
            <h1>This is the Admin page</h1>
            <br></br>
            <h3>Login:</h3>
                <input type="text" placeholder="Username" name="userName" id="userName" value={userName} onChange={e => setUserName(e.target.value)}/> <br></br>
                <input type="password" placeholder="Password" name="userPWord" id="userPWord" value={userPWord} onChange={e => setUserPWord(e.target.value)}/>
            <br></br>
            <button type="submit" onClick={submit}>Submit</button>
            <button type="reset">Clear</button>
        </div>
    )
}

export default Admin;