import React, {useEffect, useState} from 'react';
import {readDefaultStatusFile, readCustomStatusFile} from './status-file/statusFileHandler'
import PackageList from "./components/PackageList";
import './App.css'
import PackageInformation from "./components/PackageInformation";
import FileInput from "./components/FileInput";

function App() {
    const [packages, setPackages] = useState([]);
    const [customStatusFile, setCustomStatusFile] = useState();
    const [selectedPackageId, setSelectedPackageId] = useState();

    useEffect(() => {
        if (!customStatusFile)
            readDefaultStatusFile().then(res => {
                setPackages(res);
                setSelectedPackageId(res[0].id);
            });
        else
            readCustomStatusFile(customStatusFile).then(res => {
                if (!res) {
                    alert("Couldn't parse the file.");
                    return;
                }

                setPackages(res);
                setSelectedPackageId(res[0].id);
            });
    }, [customStatusFile]);

    return (
        <div id="app">
            <div>
                <FileInput customFile={customStatusFile} setCustomFile={setCustomStatusFile}/>
                <PackageList
                    packages={packages}
                    setSelectedPackageId={setSelectedPackageId}
                    selectedPackageId={selectedPackageId}/>
            </div>
            <PackageInformation packages={packages}
                                setSelectedPackageId={setSelectedPackageId}
                                selectedPackageId={selectedPackageId}
            />
        </div>
    );
}

export default App;
