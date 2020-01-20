import mockStatus from './mockStatus'

export function readDefaultStatusFile() {
    return fetch(mockStatus)
        .then(response => response.text())
        .then(text => convertStatusFileToArray(text))
}


export function readCustomStatusFile(statusFile) {
    return statusFile.text()
        .then(text => convertStatusFileToArray(text))
}

function convertStatusFileToArray(statusContent) {
    if (!statusContent.includes('Package'))
        return null;

    const keyValueSeparator = ':';
    const commentStartRegex = /^ [A-Za-z]/;
    const dependsKey = 'Depends';
    const linesToKeep = ['Package', 'Description', dependsKey];
    const fullDescriptionKey = 'FullDescription';

    const packageStrings = statusContent.split('\n\n');
    const packagesWithFilteredLines = packageStrings
        .map(packageString => packageString.split('\n')
            .filter(packageLineString =>
                linesToKeep.some(lineToKeep => packageLineString.startsWith(lineToKeep)
                                 || commentStartRegex.test(packageLineString))
            )
        );

    const arrayOfPackageObjects = packagesWithFilteredLines.map((packageArray, index) => {
        const packageLineObject = {
            id: index+1
        };
        packageArray.forEach(packageLine => {
            const separatorIndex = packageLine.indexOf(keyValueSeparator);
            const key = packageLine.substring(0, separatorIndex);
            const value = packageLine.substring(separatorIndex + 1 + keyValueSeparator.length);
            if (key === dependsKey)
                packageLineObject[key] = cleanDependsLine(value);
            else if (!key) {
                packageLineObject[fullDescriptionKey] =
                    packageLineObject[fullDescriptionKey]
                        ? packageLineObject[fullDescriptionKey] + value + " "
                        : value

            }
            else
                packageLineObject[key] = value
        });
        return packageLineObject
    });

    return arrayOfPackageObjects.sort(comparePackageName)
}

function cleanDependsLine(line) {
    const lineWithoutParentheses = line.replace(/\|/g,',').replace(/ *\([^)]*\) */g, "");
    return [...new Set(lineWithoutParentheses.split(',').map(packageName => packageName.trim()))];
}

function comparePackageName(a, b) {
    return b.Package.toLowerCase() < a.Package.toLowerCase()  ? 1 : -1;
}
