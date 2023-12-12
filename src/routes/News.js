import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, addDoc } from "firebase/firestore";
import * as moment from 'moment';

function News({ user }) {
    const [completePost, setCompletePost] = useState({});
    const [updatePosts, setUpdatePosts] = useState(['']);
    const [newsData, setNewsData] = useState();
    const [newsTitle, setNewsTitle] = useState(['']);
    const [newsConfig, setNewsConfig] = useState();
    const submit = async (e) => {
        //axios.post
        const newPost = { ...completePost };
        newPost['title'] = newsTitle;
        newPost['date'] = moment().format();
        newPost['paragraphs'] = updatePosts;
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

    //pretend data from a database
    // display the title and paragraphs and can put in a different src for the image for now
    // configuration right now just defines how the layout looks
    // image: 'left' means image on the left and paragraph on the right
    // image: 'right' means image on the right and paragraph on the left
    // image: 'main' means image takes up entire row
    /*const mockData = {
        entries: [
            {
                title: 'First Title',
                paragraphs: [
                    'First entry first paragraph',
                    'First entry second paragraph'
                ],
                image: require('../assets/funny_stock_image.jpg'),
                configuration: {
                    image: 'left',
                    animateClassLeft: 'bounceIn',
                    animateClassRight: 'bounceIn'
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
    } */
    const addTextArea = () => {
        const newPosts = updatePosts.concat();
        newPosts.push('');
        setUpdatePosts(newPosts);
    }

    const removeTextArea = () => {
        const newPosts = updatePosts.concat();
        newPosts.pop('');
        setUpdatePosts(newPosts);
    }

    const changePost = (value, idx) => {
        const newPosts = updatePosts.concat();
        newPosts[idx] = value;
        setUpdatePosts(newPosts);
    }

    const changeTitle = (value, idx) => {
        const newPosts = newsTitle.concat();
        newPosts[idx] = value;
        setNewsTitle(newPosts);
    }

    return (
        <div>
            <h1>Hartfield Mission News</h1>
            <h5>Catch up on the Hartfield Mission here!</h5>
            <br></br>
            {user && user.email && (
                <>
                    {newsTitle.map((e, idx) => (
                        <input name="newTitle" key={'e ' + idx} type="text" placeholder="Title" value={e} onChange={t => changeTitle(t.target.value, idx)}></input>
                    ))}
                    <br></br>
                    {updatePosts.map((p, idx) => (
                        <><textarea name="updatePost" key={'p ' + idx}
                            id={'p ' + idx}
                            value={p}
                            onChange={e => changePost(e.target.value, idx)} rows="5" cols="50" placeholder="Enter post here..."></textarea>
                        <button onClick={removeTextArea}>Remove Paragraph</button>
                        </>
                    ))}
                    <br></br>
                    <label>Config
                        <select value={newsConfig} onChange={setNewsConfig}>
                            <option value="1">Left-Sided</option>
                            <option value="2">Right-Sided</option>
                            <option value="3">Picture Only</option>
                        </select>
                    </label>
                    <button onClick={addTextArea}>Add Paragraph</button>
                    
                    <br></br>
                    <button type="submit" onClick={submit}>Post</button>
                    <button type="reset">Clear</button>
                </>
            )}
            <p>(blog-style entries would go here, being updated with most recent post at top)</p>
            <div style={{ margin: "0 10%" }}>
                {newsData && newsData.map((g) => (
                    <p>{g.title}<br></br>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: g.configuration.image === "right" ? "row" : "row-reverse" }}>
                            <div style={{ margin: "0 10%", width: "200px", display: g.configuration.image === "only" ? "none" : "block" }}>{g.paragraphs.map((p) => (<p>{p}</p>))}</div>
                            <div style={{ margin: "0 10%", height: "200px", width: "200px" }}><img src={g.image} width="100%" height="100%"></img></div></div></p>
                )
                )}
            </div>
        </div>
    )
}

export default News;