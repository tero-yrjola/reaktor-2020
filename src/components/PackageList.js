import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './PackageList.css'

function PackageList({packages, setSelectedPackageId, selectedPackageId}) {
    const [searchValue, setSearchValue] = useState("");
    return (
        <div id="package-list-container">
            <>
                <input id="package-search" type="text" placeholder="Search" value={searchValue}
                       onChange={e => setSearchValue(e.target.value)}
                />
                <span id="clear-button" onClick={() => setSearchValue("")}>X</span>
            </>
            <div id="package-list">
                {packages.length > 0 && packages.filter(p => p.Package.includes(searchValue)).map(p =>
                    <div
                        id={selectedPackageId === p.id && "selected-item"}
                        className="package-list-item"
                        key={p.id}
                        onClick={() => setSelectedPackageId(p.id)}
                    >
                        <p>
                            {p.Package}
                        </p>
                    </div>)}
            </div>
        </div>
    );
}

PackageList.propTypes = {
    packages: PropTypes.arrayOf(PropTypes.shape({
        Package: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
    })).isRequired,
    setSelectedPackageId: PropTypes.func.isRequired,
    selectedPackageId: PropTypes.number,
};

export default PackageList;
