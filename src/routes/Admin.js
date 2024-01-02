import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from '../firebase';

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Admin({user}) {
    const [userName, setUserName] = useState();
    const [userPWord, setUserPWord] = useState();
    const [successMsg, setSuccessMsg] = useState();

    useEffect( () => {
        if ( user ) {
            setSuccessMsg( 'Welcome ' + user.email );
        }
      }, [ user ] )

    const submit = async (e) => {
        console.log("E")
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(auth, userName, userPWord);
            setSuccessMsg( 'Welcome ' + userName );
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    };

    const logout = () => {
        setSuccessMsg();
        signOut(auth);
    };

    return (
        <div>
            <br></br>
            { !successMsg && (
                <>
                    <form onSubmit={submit}>
                    <h3>Login:</h3>
                    <input type="text" placeholder="Username" name="userName" id="userName" value={userName} onChange={e => setUserName(e.target.value)} /> <br></br>
                    <input type="password" placeholder="Password" name="userPWord" id="userPWord" value={userPWord} onChange={e => setUserPWord(e.target.value)} />
                    <br></br>
                    <button type="submit" onClick={submit}>Submit</button>
                    <button type="reset">Clear</button>
                    </form>
                </>
            )}
            { successMsg && (
                <>
                    <button onClick={logout}>Log Out</button>
                    <br></br>
                    <p>{successMsg}</p>
                </>
            )}
        </div>
    )
}

export default Admin;