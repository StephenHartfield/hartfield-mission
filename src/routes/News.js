import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, addDoc } from "firebase/firestore";
import * as moment from 'moment';
import DeleteIcon from '@mui/icons-material/Delete';

function News({ user }) {
    const [completePost, setCompletePost] = useState({});
    const [updatePosts, setUpdatePosts] = useState(['']);
    const [newsData, setNewsData] = useState();
    const [newsTitle, setNewsTitle] = useState('');
    const [newsConfig, setNewsConfig] = useState('1');
    const submit = async (e) => {
        //axios.post
        const newPost = { ...completePost };
        newPost['title'] = newsTitle;
        newPost['date'] = moment().format();
        newPost['paragraphs'] = updatePosts;
        newPost['configuration'] = newsConfig;
        setCompletePost(newPost);
        // console.log(setUpdateDate, setUpdatePosts);
        try {
            const docRef = await addDoc(collection(db, "news"), newPost);
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const resetButton = (f) => {
        setUpdatePosts([''])
        setNewsTitle('')
        setNewsConfig('1')
    }


    const fetchData = async () => {
        const data = await getDocs(collection(db, "news"));
        const news = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        const sortedNews = news.sort((a, b) => moment(a.date).isBefore(moment(b.date)));
        setNewsData(sortedNews);
        console.log(sortedNews);
    }

    useEffect(() => {
        fetchData();
    }, [])

    const addTextArea = () => {
        const newPosts = updatePosts.concat();
        newPosts.push('');
        setUpdatePosts(newPosts);
    }

    const removeTextArea = () => {
        const newPosts = updatePosts.concat();
        newPosts.splice(' ', 1);
        setUpdatePosts(newPosts);
    }

    const changePost = (value, idx) => {
        const newPosts = updatePosts.concat();
        newPosts[idx] = value;
        setUpdatePosts(newPosts);
    }

    return (
        <div>
            <h1>Hartfield Mission News</h1>
            <h5>Catch up on the Hartfield Mission here!</h5>
            <br></br>
            {user && user.email && (
                <>
                    <input name="newTitle" key={'newsTitle'} type="text" placeholder="Title" value={newsTitle} onChange={e => setNewsTitle(e.target.value)}/>
                    <br></br>
                    {updatePosts.map((p, idx) => (
                        <><textarea name="updatePost" key={'p ' + idx}
                            id={'p ' + idx}
                            value={p}
                            onChange={e => changePost(e.target.value, idx)} rows="5" cols="50" placeholder="Enter post here..."></textarea>
                        <button onClick={removeTextArea}><DeleteIcon /></button>
                        </>
                    ))}
                    <br></br>
                    <label>Config
                        <select value={newsConfig} onChange={e => setNewsConfig(e.target.value)}>
                            <option value="1">Left-Sided</option>
                            <option value="2">Right-Sided</option>
                            <option value="3">Picture Only</option>
                        </select>
                    </label>
                    <br></br>
                    <button className="btn btn-primary" onClick={addTextArea}>Add Paragraph</button>
                    <br></br>
                    <button type="button">Upload Image</button>
                    <br></br>
                    <button type="submit" className="btn btn-success" onClick={submit}>Post</button>
                    <button type="reset" className="btn btn-danger" onClick={resetButton}>Clear</button>
                </>
            )}
            <div style={{ margin: "0 10%" }}>
                {newsData && newsData.map((g) => (
                    <p>{g.title}<br></br>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: g.configuration === "2" ? "row" : "row-reverse" }}>
                            <div style={{ margin: "0 10%", width: "200px", display: g.configuration === "3" ? "none" : "block" }}>{g.paragraphs.map((p) => (<p>{p}</p>))}</div>
                            <div style={{ margin: "0 10%", height: "200px", width: "200px" }}><img src={g.image} width="100%" height="100%"></img></div></div></p>
                )
                )}
            </div>
        </div>
    )
}

export default News;