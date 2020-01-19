import React, {useEffect, useState} from 'react';
import {readDefaultStatusFile} from './status-file/statusFileHandler'
import PackageList from "./components/PackageList";
import './App.css'
import PackageInformation from "./components/PackageInformation";

function App() {
    const [packages, setPackages] = useState([]);
    const [selectedPackageId, setSelectedPackageId] = useState();
    useEffect(() => {
        readDefaultStatusFile().then(res => {
            setPackages(res);
            setSelectedPackageId(res[0].id);
        })
    }, []);
    return (
        <div id="app">
            <PackageList packages={packages} setSelectedPackageId={setSelectedPackageId}/>
            <PackageInformation packages={packages}
                                setSelectedPackageId={setSelectedPackageId}
                                selectedPackageId={selectedPackageId}
            />
        </div>
    );
}

export default App;
