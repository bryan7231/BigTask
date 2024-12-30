import React, { useRef } from 'react';

import './OpenIcon.css';
import icon from './assets/react.svg';

interface OpenIconProps {
    changeFile: (f: File | null ) => void;
}

function OpenIcon({ changeFile }: OpenIconProps) {
    const fileInputRef: React.RefObject<HTMLInputElement> = useRef(null);

    const handleImgClick = () => {
        fileInputRef.current?.click();
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) changeFile(event.target.files.item(0));
    }

    return (
    <div>
        <input type='file' className="file-input" ref={fileInputRef} onChange={handleFileChange}/>
        <img src={icon} onClick={handleImgClick} className="open-icon"/>
    </div>
    );
}

export default OpenIcon; 