import React, { useEffect, useState } from 'react';
//import { styled } from 'styled-components';
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from '../firebase';
import './Admin.css';

// const Div = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

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
                    <h3 className="textOnScreen" >Login:</h3>
                    <input className='admininput' type="text" placeholder="Username" name="userName" id="userName" value={userName} onChange={e => setUserName(e.target.value)} /> <br></br>
                    <input className='admininput' type="password" placeholder="Password" name="userPWord" id="userPWord" value={userPWord} onChange={e => setUserPWord(e.target.value)} />
                    <br />
                    <br />
                    </form>
                </>
            )}
            { successMsg && (
                <>
                    <p>{successMsg}</p>
                    <br />
                    <br />
                    <button className="btn btn-primary" onClick={logout}>Log Out</button>
                    <br /><br />
                </>
            )}
        </div>
    )
}

export default Admin;