import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './PackageInformation.css'

function PackageInformation({packages, setSelectedPackageId, selectedPackageId}) {
    const [selectedPackage, setSelectedPackage] = useState({});
    const [dependentPackages, setDependentPackages] = useState([]);

    useEffect(() => {
        if (selectedPackageId) {
            setSelectedPackage(packages.find(p => p.id === selectedPackageId));
            setDependentPackages(packages.filter(p => p.Depends && p.Depends.includes(selectedPackage.Package)));
        }
    }, [packages, selectedPackage.Package, selectedPackageId]);


    const dependencies = selectedPackage.Depends &&
        selectedPackage.Depends.map(dependency => {
            const correspondingPackage = packages.find(p => p.Package === dependency);
            if (!correspondingPackage) return dependency;
            return correspondingPackage;
        });

    return (
        <div id="package-information-container">
            <h1>{selectedPackage.Package}</h1>
            <p>{selectedPackage.Description}</p>
            <p>{selectedPackage.FullDescription}</p>
            {dependencies &&
            dependencies.length > 0
                ? <p>Dependencies: {dependencies.map(dependency =>
                    <span
                        key={dependency + dependency.Package}
                        className={dependency.Package ? "dependency-link" : "dependency-link not-clickable"}
                        onClick={() => setSelectedPackageId(dependency.id)}>
                            {dependency.Package ? dependency.Package : dependency}
                    </span>
                )}
                </p>
                : <p>No dependencies.</p>
            }
            {dependentPackages.length > 0
                ? <p>Dependents: {dependentPackages.map(dependent =>
                    <span
                        key={dependent + dependent.Package}
                        className={dependent.Package ? "dependency-link" : "dependency-link not-clickable"}
                        onClick={() => setSelectedPackageId(dependent.id)}>
                            {dependent.Package ? dependent.Package : dependent}
                        </span>
                )}
                </p>
                : <p>No dependent packages.</p>
            }
        </div>
    );
}

PackageInformation.propTypes = {
    packages: PropTypes.arrayOf(PropTypes.shape({
        Package: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        FullDescription: PropTypes.string,
        Depends: PropTypes.arrayOf(PropTypes.string)
    })).isRequired,
    setSelectedPackageId: PropTypes.func.isRequired,
    selectedPackageId: PropTypes.number,
};

export default PackageInformation;
