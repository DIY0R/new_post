import React from 'react';
import Webcam from "react-webcam";
import styles from './WebCam.module.css';


// class WebCam extends React.Component {
//     render() {
//       return <Webcam/>;
//     }
//   }


const videoConstraints = {
    width: 300,
    height: 300,
    // float:'right',
    facingMode: "user"
};

const WebCam = () => {
    const webcamRef = React.useRef(null);


    return (
        <>
            <Webcam className={styles.webCam}
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
            />
          
        </>
    );
};
export default WebCam;

