import { useEffect, useState } from 'react';

import './PlayIcon.css'; 
import icon from '/vite.svg';
import UserEvent from './UserEvent';

interface PlayIconProps {
    currRec: UserEvent[];
}

function PlayIcon({currRec}: PlayIconProps) {
    const [playing, setPlay] = useState(false);

    

    const play = () => {
        window.ipcRenderer.send('terminal-log', currRec);
        if (currRec.length > 0) setPlay(true);
    }

    return (
        <div className=''>
            <img src={icon} onClick={play} className='icons play-icon'/>
        </div>
    );
}

export default PlayIcon; 