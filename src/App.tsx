import { useState } from 'react';

import './App.css'
import OpenIcon from './OpenIcon'

function App() {
  const [currFile, setFile] = useState<File | null>(null);

  const changeFile = (f: File | null) => {
    window.ipcRenderer.send('terminal-log', f?.path);
    setFile(f);
  }

  return (
    <>
      <div className="main-container">
        <OpenIcon changeFile={changeFile}/>
      </div>
    </>
  )
}

export default App
