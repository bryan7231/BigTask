import { useState } from 'react';

import './App.css'
import OpenIcon from './OpenIcon'
import PlayIcon from './PlayIcon';
import RecordIcon from './RecordIcon';
import UserEvent from './UserEvent';

function App() {
  const [currRec, setRec] = useState<UserEvent[]>([]);

  const changeRec = (rec: UserEvent[]) => {
    setRec(rec);
  }

  return (
    <>
      <div className="main-container">
        <OpenIcon changeRec={changeRec}/>
        <PlayIcon currRec={currRec}/>
        <RecordIcon changeRec={changeRec} />
      </div>
    </>
  )
}

export default App
