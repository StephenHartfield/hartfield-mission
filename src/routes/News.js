import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, addDoc } from "firebase/firestore";
import * as moment from 'moment';

function News({ user }) {
    const [complatePost, setCompletePost] = useState({});
    const [updatePosts, setUpdatePosts] = useState(['']);
    const [newsData, setNewsData] = useState();
    const submit = (e) => {
        //axios.post
        const newPost = { ...complatePost };
        newPost['date'] = moment().format();
        newPost['paragraphs'] = updatePosts;
        setCompletePost(newPost);
        // console.log(setUpdateDate, setUpdatePosts);
    }

    const resetButton = (f) => {

    }

    // As of current version, this addNews will break the page when refreshing or returning to it from another page
    // the reason for this is because the new document that gets created only has a "someKey" field
    // - not a "configuration", "title", paragraphs", or "image" field that the mapping part requires
    // it will also create a new document in the firebase with an autogenerated ID
    const addNews = async (e) => {
        e.preventDefault();
        if ( !user ) {
            return;
        }

        try {
            const docRef = await addDoc(collection(db, "news"), {
                someKey: "test",
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
    //Items to address: touching on all fields used elsewhere in the html - such as configuration and paragraphs,
    //  once we have a set order for our document naming system, we need new documents to properly fall in line with that system.


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
                    {updatePosts.map((p, idx) => (
                        <textarea name="updatePost" key={'p ' + idx}
                            id={'p ' + idx}
                            value={p}
                            onChange={e => changePost(e.target.value, idx)} rows="5" cols="50" placeholder="Enter post here..."></textarea>
                    ))}

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
            <button onClick={addNews}>Add New Test</button>
        </div>
    )
}

export default News;