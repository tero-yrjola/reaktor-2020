import React, {useEffect, useState} from 'react';
import {readDefaultStatusFile} from './statusFileHandler'
import './App.css';

function App() {
    const [packages, setPackages] = useState({});
    useEffect(() => {
            readDefaultStatusFile().then(res => setPackages(res))
        }, []);
    return (
        <div className="App">

        </div>
    );
}

export default App;
