import React from 'react';
import PropTypes from 'prop-types';
import './PackageList.css'

function PackageList({packages, setSelectedPackageId}) {
    return (
        <div id="package-list-container">
            {packages && packages.map(p =>
                <div className="package-list-item" key={p.id} onClick={() => setSelectedPackageId(p.id)}>
                    <p>
                        {p.Package}
                    </p>
                </div>)}
        </div>
    );
}

PackageList.propTypes = {
    packages: PropTypes.arrayOf(PropTypes.shape({
        Package: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
    })).isRequired,
    setSelectedPackageId: PropTypes.func.isRequired,
};

export default PackageList;
