import React, { useRef } from 'react';

import './OpenIcon.css';
import icon from './assets/react.svg';
import UserEvent from './UserEvent';

interface OpenIconProps {
    changeRec: (rec: UserEvent[]) => void;
}

function OpenIcon({ changeRec }: OpenIconProps) {
    const fileInputRef: React.RefObject<HTMLInputElement> = useRef(null);

    const handleImgClick = () => {
        fileInputRef.current?.click();
    }

    const convertToList = (f: File | null) => {
        window.ipcRenderer.send("terminal-log", f?.name);
        const ret: UserEvent[] = [];

        return ret; 
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) changeRec(convertToList(event.target.files.item(0)));
    }

    return (
    <div className='icons'>
        <input type='file' className="file-input" ref={fileInputRef} onChange={handleFileChange}/>
        <img src={icon} onClick={handleImgClick} className="icons open-icon"/>
    </div>
    );
}

export default OpenIcon; 