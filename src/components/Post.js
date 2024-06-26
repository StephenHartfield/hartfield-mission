import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import DeleteIcon from '@mui/icons-material/Delete';

const EditWrapper = styled.div`

`;

const TitleInput = styled.input`
  background-color: lightgray;
  border: 3px solid black;
  font-size: xx-large;
  margin-bottom: 20px;
`;

const PWrapper = styled.div`

`;

const TextArea = styled.textarea`
  background-color: lightgray;
  border: 3px solid black;
`;

const RemoveP = styled.button`
  background-color: red;
`;

const Label = styled.label`

`;

const configs = [
  { label: 'Picture Left', value: '1' },
  { label: 'Picture Right', value: '2' },
  { label: 'Picture Only', value: '3' },
  { label: 'No Picture', value: '4' }
];

function Post({ data, updateData, submit, cancel, setImageToUpload }) {
  const hiddenFileInput = useRef(null);
  const [imageUrl, setImgUrl] = useState();
  const [progresspercent, setProgresspercent] = useState(0);
  const [showProgressPercent, setShowProgressPercent] = useState();
  const [displayCTA, setDisplayCTA] = useState(false);

  const changeProp = (value, prop, idx) => {
    const newData = { ...data };
    if (idx != null && idx > -1) {
      const newPs = newData[prop].concat();
      newPs[idx] = value;
      newData[prop] = newPs;
    } else {
      newData[prop] = value;
    }
    console.log(newData);
    updateData(newData);
  }

  const removeTextArea = (idx) => {
    if (window.confirm("Confirm deletion of paragraph?") === true) {
      const newData = { ...data };
      newData.paragraphs.splice(idx, 1);
      updateData(newData);
    } else {
      return;
    }
  }

  const addTextArea = () => {
    const newData = { ...data };
    newData.paragraphs.push('');
    updateData(newData);
  }

  const handleUploadChange = (e) => {
    hiddenFileInput.current.click();
  }

  const handleImgChange = event => {
    const fileReadied = event.target.files[0];
    setImageToUpload(fileReadied);
    setImgUrl(URL.createObjectURL(event.target.files[0]));
    changeProp(fileReadied.name, 'image');
    console.log(fileReadied)
  };

  const toggleCTA = () => {
    if (displayCTA === true) {
      setDisplayCTA(false);
      console.log("CTA turned off");
    }
    if (displayCTA === false) {
      setDisplayCTA(true);
      console.log("CTA turned on");
    }
    console.log("CTA Toggle Triggered");
  }

  return (
    <EditWrapper>
      <TitleInput name="newTitle" key={'newsTitle'} id="edit" type="text"
        placeholder="Title..." value={data.title}
        onChange={e => changeProp(e.target.value, 'title')} />
      {data && data.paragraphs && data.paragraphs.map((p, idx) => (
        <PWrapper key={'p ' + idx}>
          <TextArea name="updatePost" id={'p ' + idx} value={p}
            onChange={e => changeProp(e.target.value, 'paragraphs', idx)} rows="5" cols="50"
            placeholder="Enter details here..."></TextArea>
          <RemoveP onClick={() => removeTextArea(idx)}><DeleteIcon /></RemoveP>
        </PWrapper>
      ))}
      <br />
      <button className="btn btn-primary" onClick={() => addTextArea(true)}>Add Paragraph</button>
      <br />
      <Label>Config</Label>
      <select value={data.configuration} onChange={e => changeProp(e.target.value, 'configuration')}>
        {configs.map(config => <option key={config.value} value={config.value}>{config.label}</option>)}
      </select>
      <br />
      <button className='CTAtoggle' onClick={toggleCTA}>Call to Action?</button>
      {displayCTA === true && (
        <>
          <br />
          <textarea placeholder='Customize text...' className='CTA' value={data.cta} onChange={e => changeProp(e.target.value, 'cta')} />
          <br />
          <input type="url" placeholder='Link?' className='CTA' value={data.cta_link} onChange={e => changeProp(e.target.value, 'cta_link')} ></input>
          <br />
        </>
      )}
      <br />
      {data.configuration !== "4" && (
        <>
          <button type="button" className='btn btn-outline-success' onClick={handleUploadChange}>Upload Image</button>
          <input
            type="file"
            onChange={handleImgChange}
            ref={hiddenFileInput}
            style={{ display: 'none' }}
          />
          {data.image !== null && (
            <>
              <img src={data.image} width={data.imageW ? data.imageW : "400"} alt={data.image} />
              <br />
              <input type="range" min="100" max="1000" value={data.imageW ? data.imageW : "400"} onChange={e => changeProp(e.target.value, "imageW")} />
            </>
          )}
          {imageUrl && <img src={imageUrl} width="400" alt={imageUrl} />}
          { }
          {progresspercent <= 100 && <div className={`animate__animated ${showProgressPercent ? 'animate__fadeIn' : 'animate__fadeOut'}`} style={{ width: '250px', margin: '0 auto', border: '2px solid black' }}>
            <div style={{ width: `${progresspercent}%`, backgroundColor: 'green', height: '10px' }}></div>
          </div>}
          {progresspercent >= 99 && <div style={{ color: 'green' }} className='animate__animated animate__fadeIn'>Complete</div>}
        </>
      )}
      <br />
      <button className='btn btn-success' onClick={submit.fn}>{submit.text}</button>
      <button className='btn btn-danger' onClick={cancel.fn}>{cancel.text}</button>
      <hr />
    </EditWrapper>
  )
}

export default Post;