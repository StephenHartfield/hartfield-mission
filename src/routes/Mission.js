import React from 'react'
import 'animate.css/animate.css'
import styled from 'styled-components';
import ReactPlayer from 'react-player';


function Mission() {
    return (
        <div style={{padding: '20px'}}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <ReactPlayer url={'https://youtu.be/96Ay4VFM6Hw'} />
          </div>
        </div>
    )
}

export default Mission;