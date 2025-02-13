import { useEffect, useState, useRef } from 'react';
import './RecordIcon.css'
import icon from '/electron-vite.svg'
import UserEvent from './UserEvent';
import KeyboardEvent from './KeyboardEvent';

interface RecordIconPrps {
    changeRec: (rec: UserEvent[]) => void; 
}

function RecordIcon({changeRec}: RecordIconPrps) {
    const [recording, setRecording] = useState(false);
    
    const newRec: React.MutableRefObject<UserEvent[]> = useRef([]);
    const currTime: React.MutableRefObject<number> = useRef(0);

    window.ipcRenderer.on("key-event", (_event, data: KeyboardEvent) => {
        newRec.current.push(new KeyboardEvent(data.state, data.time-currTime.current, data.key));
    });

    useEffect(() => {

        const record = async () => {

            newRec.current = [];
            currTime.current = await window.ipcRenderer.invoke("get-time");

            window.ipcRenderer.send("terminal-log", `Time: ${currTime.current}, Recording...`);
            window.ipcRenderer.send("start-logging");

        };

        if (recording) void record(); 
        else {
            window.ipcRenderer.send("terminal-log", "Stopped recording.")
            window.ipcRenderer.send("stop-logging");
            changeRec(newRec.current);
        }

    }, [recording, changeRec]);

    return (
        <div>
            <img src={icon} className="icons" onClick={() => {setRecording(!recording)}}/>
        </div>
    );
}

export default RecordIcon; 
