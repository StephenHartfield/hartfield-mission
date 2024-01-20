import React, { useEffect, useRef, useState } from 'react';
import { db, storage } from '../firebase';
import { collection, getDocs, addDoc, doc, deleteDoc } from "firebase/firestore";
import * as moment from 'moment';
import { deleteObject, getDownloadURL, listAll, ref, uploadBytesResumable } from 'firebase/storage';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import './News.css';

function News({ user, storagePath }) {
    const [completePost, setCompletePost] = useState({});
    const [updatePosts, setUpdatePosts] = useState(['']);
    const [newsData, setNewsData] = useState();
    const [newsTitle, setNewsTitle] = useState('');
    const [newsConfig, setNewsConfig] = useState('1');
    const [imageUrl, setImgUrl] = useState();
    const [imageToUpload, setImageToUpload] = useState("")
    const hiddenFileInput = useRef(null);
    const [progresspercent, setProgresspercent] = useState(0);
    const [showProgressPercent, setShowProgressPercent] = useState();

    const handleUploadChange = (e) => {
        hiddenFileInput.current.click();
    }
    const submit = async (e) => {
        const newPost = { ...completePost };
        newPost['title'] = newsTitle;
        newPost['date'] = moment().format();
        newPost['paragraphs'] = updatePosts;
        newPost['configuration'] = newsConfig;
        newPost['image'] = imageToUpload.name;
        setCompletePost(newPost);

        try {
            const docRef = await addDoc(collection(db, "news"), newPost);
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        try {
            const storageRef = ref(storage, `postImages/${imageToUpload.name}`);
            const uploadTask = uploadBytesResumable(storageRef, imageToUpload);
            setShowProgressPercent(true);
            uploadTask.on("state_changed",
                (snapshot) => {
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    setProgresspercent(progress);
                },
                (error) => {
                    alert(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setShowProgressPercent(false);
                    });
                }
            );
        } catch (e) {
            console.error("Error uploading Image");
        }

    }

    const resetButton = (f) => {
        setUpdatePosts(['']);
        setNewsTitle('');
        setNewsConfig('1');
    }

    const fetchData = async (imageObj) => {
        const data = await getDocs(collection(db, "news"));
        const news = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        const sortedNews = news.sort((a, b) => -(moment(a.date).diff(moment(b.date))));
        const withImages = sortedNews.map(np => {
            if (np.image && np.image !== 'undefined' && typeof np.image === 'string') {
                const objM = imageObj.find(obj => obj.hasOwnProperty(np.image));
                if (objM) {
                    np.image = objM[np.image];
                }
            }
            return np;
        })
        setNewsData(withImages);
    }

    const initialize = async () => {
        const listRef = await ref(storage, (storagePath + 'postImages'));
        const res = await listAll(listRef);
        const imageArr = await res.items.map(async item => {
            const url = await getDownloadURL(item);
            return { [item.name]: url };
        })
        const images = await Promise.all(imageArr);
        await fetchData(images);
    }

    useEffect(() => {
        initialize();
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

    const handleChange = event => {
        const fileReadied = event.target.files[0];
        setImageToUpload(fileReadied);
        setImgUrl(URL.createObjectURL(event.target.files[0]));
    };

    const deletePost = async (post) => {
        if (post.image) {
            const fileRef = ref(storage, post.image);
            try {
                await deleteObject(fileRef);
            }
            catch (e) {
                console.log( 'failed to delete image ' + e);
            }
        }
        const docRef = doc(db, "news", post.id );

        try {
            await deleteDoc(docRef);
            refreshPosts( post.id );
        }
        catch (e) {
            console.log( 'failed to delete post ' + e );
        }
    }

    const refreshPosts = ( id ) => {
        const newPosts = newsData.filter( d => d.id !== id );
        setNewsData(newPosts);
    }


    return (
        <div>
            <h1>Hartfield Mission News</h1>
            <h5>Catch up on the Hartfield Mission here!</h5>
            <br></br>
            {user && user.email && (
                <>
                    <input name="newTitle" key={'newsTitle'} type="text" className="title" placeholder="Title" value={newsTitle} onChange={e => setNewsTitle(e.target.value)} />
                    <br></br>
                    {updatePosts.map((p, idx) => (
                        <><textarea name="updatePost" key={'p ' + idx}
                            id={'p ' + idx}
                            value={p}
                            onChange={e => changePost(e.target.value, idx)} rows="5" cols="50" placeholder="Enter post here..."></textarea>
                            <button onClick={removeTextArea}style={{backgroundColor:'red'}}><DeleteIcon /></button>
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
                    <button className="btn btn-primary" onClick={addTextArea}>Add Paragraph</button>
                    <br />
                    <br />
                    <button type="button" className='btn btn-outline-success' onClick={handleUploadChange}>Upload Image</button>
                    <input
                        type="file"
                        onChange={handleChange}
                        ref={hiddenFileInput}
                        style={{ display: 'none' }}
                    />
                    {imageUrl && <img src={imageUrl} height="400" width="400" />}
                    {progresspercent <= 100 && <div className={`animate__animated ${showProgressPercent ? 'animate__fadeIn' : 'animate__fadeOut'}`} style={{ width: '250px', margin: '0 auto', border: '2px solid black' }}>
                        <div style={{ width: `${progresspercent}%`, backgroundColor: 'green', height: '10px' }}></div>
                    </div>}
                    {progresspercent >= 99 && <div style={{ color: 'green' }} className='animate__animated animate__fadeIn'>Complete</div>}
                    <br />
                    <button type="submit" className="btn btn-success" onClick={submit}>Post</button>
                    <button type="reset" className="btn btn-danger" onClick={resetButton}>Clear</button>
                </>
            )}
            <div style={{ margin: "0 10%" }}>
                {newsData && newsData.map((g) => (
                    <p><div className="title">{g.title}</div><br></br>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: g.configuration === "2" ? "row" : "row-reverse" }}>
                            <div style={{ margin: "0 10%", width: "200px", display: g.configuration === "3" ? "none" : "block" }}>{g.paragraphs && g.paragraphs.map((p) => (<p>{p}</p>))}</div>
                            <div style={{ margin: "0 10%", height: "200px", width: "200px" }}>
                                <img src={g.image} width="100%" height="100%"></img>
                            </div>
                        </div>
                        {user && user.email && (<>
                            <button type="button"><EditIcon /></button>
                            <button type="button" style={{backgroundColor:'red'}}><DeleteIcon /></button></>
                        )}
                    </p>
                )
                )}
            </div>
        </div>
    )
}

export default News;