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
    const submit = () => {
        //axios.post
    }
    return (
        <div>
            <h1>This is the Admin page</h1>
            <p>WoOOOOOOOOOOOOOOOOOOOOOoW</p>
            <br></br>
            <h3>Login:</h3>
                <input type="text" placeholder="Username" name="userName" id="userName" value={userName} onChange={setUserName}/> <br></br>
                <input type="password" placeholder="Password" name="userPWord" id="userPWord" value={userPWord} onChange={setUserPWord}/>
            <br></br>
            <button type="submit" onClick={submit}>Submit</button>
            <button type="reset">Clear</button>
        </div>
    )
}

export default Admin;