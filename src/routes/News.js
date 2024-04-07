import React, { useEffect, useRef, useState } from 'react';
import { db, storage } from '../firebase';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import * as moment from 'moment';
import { deleteObject, getDownloadURL, listAll, ref, uploadBytesResumable } from 'firebase/storage';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import './News.css';
import Post from '../components/Post';

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
    const [displayPosts, setDisplayPosts] = useState(true);
    const [editPosts, setEditPosts] = useState();
    const [displayCTO, setDisplayCTO] = useState(false);

    const handleUploadChange = (e) => {
        hiddenFileInput.current.click();
    }
    const submit = async (e) => {
        if (!newsTitle) {
            alert("No title! Can't post!")
            console.log('uh you forgot a title man...')
            return;
        }
        const newPost = { ...completePost };
        newPost['title'] = newsTitle;
        newPost['date'] = moment().format();
        newPost['paragraphs'] = updatePosts;
        newPost['configuration'] = newsConfig;
        if (imageToUpload && newsConfig !== "4") {
            newPost['image'] = imageToUpload.name;
        }
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
                        initialize();
                    });
                }
            );
        } catch (e) {
            console.error("Error uploading Image");
        }
        setUpdatePosts(['']);
        setNewsTitle('');
        setNewsConfig('1');
        setImgUrl('');
        setProgresspercent(0);
    }

    const resetButton = (f) => {
        if (window.confirm("Clear Post Content?") === true) {
            setUpdatePosts(['']);
            setNewsTitle('');
            setNewsConfig('1');
            setImgUrl('');
            setProgresspercent(0);
        } else {
            return;
        }

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

    const addTextArea = (isEdit) => {
        if (isEdit) {
            const newPosts = editPosts.paragraphs.concat();
            newPosts.push('');
            setEditPosts({ ...editPosts, paragraphs: newPosts });
        } else {
            const newPosts = updatePosts.concat();
            newPosts.push('');
            setUpdatePosts(newPosts);
        }

    }

    const removeTextArea = () => {
        if (window.confirm("Confirm deletion of paragraph?") === true) {
            const newPosts = updatePosts.concat();
            newPosts.splice(' ', 1);
            setUpdatePosts(newPosts);
        } else {
            return;
        }
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
        if (!post) {
            console.log('no post');
            return;
        }
        if (window.confirm("Confirm deletion of this post?") === true) {
            if (post.image) {

                const fileRef = ref(storage, post.image);
                try {
                    await deleteObject(fileRef);
                }
                catch (e) {
                    console.log('failed to delete image ' + e);
                }
            }
            const docRef = doc(db, "news", post.id);

            try {
                await deleteDoc(docRef);
                refreshPosts(post.id);
            }
            catch (e) {
                console.log('failed to delete post ' + e);
            }
        }
    }

    const refreshPosts = (id) => {
        const newPosts = newsData.filter(d => d.id !== id);
        setNewsData(newPosts);
    }

    const newsDisplay = () => {
        if (displayPosts === true) {
            setDisplayPosts(false);
            console.log("Turned off");
        }
        if (displayPosts === false) {
            setDisplayPosts(true);
            console.log("Turned on");
        }
        console.log("Toggle Triggered");
    }

    const editPost = (post) => {
        if (window.confirm("Edit '" + post.title + "' Post?") === true) {
            setEditPosts(post);
            setTimeout(() => {
                const inputEL = document.getElementById("edit");
                inputEL.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
            }, 50)
        } else {
            return;
        }
    }

    const cancelEdit = () => {
        if (window.confirm("Cancel all edits?") === true) {
            setEditPosts();
        } else {
            return;
        }
    }

    const confirmEdit = async (e) => {
        if (!editPosts.title) {
            alert("No title! Can't post!")
            console.log('uh you forgot a title man...')
            return;
        }
        try {
            await updateDoc(doc(db, "news", editPosts.id), editPosts);
            console.log("Document written with ID: ", editPosts.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        try {
            const storageRef = ref(storage, `postImages/${editPosts.image}`);
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
                        initialize();
                    });
                }
            );
        } catch (e) {
            console.error("Error uploading Image");
        }
        setEditPosts();
    }

    const toggleCTO = () => {
        if (displayCTO === true) {
            setDisplayCTO(false);
            console.log("CTO turned off");
        }
        if (displayCTO === false) {
            setDisplayCTO(true);
            console.log("CTO turned on");
        }
        console.log("CTO Toggle Triggered");
    }

    return (
        <div className='backdrop'>
            <h1 className='animate__animated animate__bounceIn'>Hartfield Mission News</h1>
            <h5 className='animate__animated animate__fadeIn'>Catch up on the Hartfield Mission here!</h5>
            <br />
            {user && user.email && (
                <>
                    <input name="newTitle" key={'newsTitle'} type="text" className="title titleInput" placeholder="Title..." value={newsTitle} onChange={e => setNewsTitle(e.target.value)} />
                    <br />
                    <br />
                    {updatePosts.map((p, idx) => (
                        <div key={'p ' + idx}><textarea name="updatePost"
                            id={'p ' + idx}
                            value={p}
                            className="paragraph paragraphInput"
                            onChange={e => changePost(e.target.value, idx)} rows="5" cols="50" placeholder="Enter details here..."></textarea>
                            <button onClick={removeTextArea} style={{ backgroundColor: 'red' }}><DeleteIcon /></button>
                        </div>
                    ))}
                    <br />
                    <button className="btn btn-primary" onClick={() => addTextArea(false)}>Add Paragraph</button>
                    <br />
                    <label>Config
                        <select value={newsConfig} onChange={e => setNewsConfig(e.target.value)}>
                            <option value="1">Left-Sided</option>
                            <option value="2">Right-Sided</option>
                            <option value="3">Picture Only</option>
                            <option value="4">No Picture</option>
                        </select>
                    </label>
                    <br />
                    <input type='checkbox' onClick={toggleCTO} />Call to Action?
                    {displayCTO === true && (
                        <>
                            <br />
                            <textarea placeholder='Customize text...' />
                        </>
                    )}
                    <br />
                    {newsConfig !== "4" && (
                        <>
                            <button type="button" className='btn btn-outline-success' onClick={handleUploadChange}>Upload Image</button>
                            <input
                                type="file"
                                onChange={handleChange}
                                ref={hiddenFileInput}
                                style={{ display: 'none' }}
                            />
                            {imageUrl && <img src={imageUrl} width="400" alt={imageUrl} />}
                            {progresspercent <= 100 && <div className={`animate__animated ${showProgressPercent ? 'animate__fadeIn' : 'animate__fadeOut'}`} style={{ width: '250px', margin: '0 auto', border: '2px solid black' }}>
                                <div style={{ width: `${progresspercent}%`, backgroundColor: 'green', height: '10px' }}></div>
                            </div>}
                            {progresspercent >= 99 && <div style={{ color: 'green' }} className='animate__animated animate__fadeIn'>Complete</div>}
                        </>
                    )}
                    <br />
                    <button type="submit" className="btn btn-success" onClick={submit}>Post</button>
                    <button type="reset" className="btn btn-danger" onClick={resetButton}>Clear</button>
                    <hr></hr>
                </>
            )}
            <div className='middledrop' style={{ margin: "0 5%" }}>
                {user && user.email && (<>
                    <button type="button" onClick={newsDisplay}>Toggle Posts</button>
                </>)}
                {displayPosts === true && (
                    <>
                        {newsData && newsData.map((g, idx) => (
                            <div key={g.title + idx}><div className="title">{g.title}</div><br />
                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: g.configuration === "2" ? "row" : "row-reverse" }}>
                                    <div style={{ margin: g.configuration === "1" ? "0 1% 0 10%" : g.configuration === "2" ? "0 10% 0 1%" : "0 10%", width: "50%", display: g.configuration === "3" ? "none" : "block" }} className="paragraph">{g.paragraphs && g.paragraphs.map((p, index) => (<p key={"p" + index}>{p}</p>))}</div>
                                    <div style={{ margin: "0 10%", width: "20%", display: g.configuration === "4" ? "none" : "block" }}>
                                        <img src={g.image} width="100%" height="100%" alt=''></img>
                                    </div>
                                </div>
                                {user && user.email && (<>
                                    <br />
                                    <button type="button" onClick={() => editPost(g)}><EditIcon /></button>
                                    <button type="button" style={{ backgroundColor: 'red' }} onClick={() => deletePost(g)}><DeleteIcon /></button></>
                                )}
                                <hr />
                            </div>
                        )
                        )}
                        <hr />
                    </>)}
                {editPosts && (
                    <Post data={editPosts} updateData={setEditPosts} submit={{ fn: confirmEdit, text: 'Repost' }} cancel={{ fn: cancelEdit, text: 'Cancel' }} setImageToUpload={setImageToUpload} />
                )}
            </div>
        </div>
    )
}

export default News;