import mockStatus from './mockStatus'

export function readDefaultStatusFile() {
    return fetch(mockStatus)
        .then(response => response.text())
        .then(text => convertStatusFileToArray(text))
}

function convertStatusFileToArray(statusContent) {
    const keyValueSeparator = ':';
    const commentStartString = ' ';
    const dependsKey = 'Depends';
    const fullDescriptionKey = 'FullDescription';
    const linesToKeep = ['Package', 'Description', dependsKey];

    const packageStrings = statusContent.split('\n\n');
    const packagesWithFilteredLines = packageStrings
        .map(packageString => packageString.split('\n')
            .filter(packageLineString =>
                linesToKeep.some(lineToKeep => packageLineString.startsWith(lineToKeep)
                                 || packageLineString.startsWith(commentStartString))
            )
        );

    const arrayOfPackageObjects = packagesWithFilteredLines.map((packageArray, index) => {
        const packageLineObject = {
            id: index
        };
        packageArray.forEach(packageLine => {
            const separatorIndex = packageLine.indexOf(keyValueSeparator);
            const key = packageLine.substring(0, separatorIndex);
            const value = packageLine.substring(separatorIndex + 1 + keyValueSeparator.length);
            if (key === dependsKey)
                packageLineObject[key] = cleanDependsLine(value);
            else if (!key) {
                packageLineObject[fullDescriptionKey] += value + " ";
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
    return a.Package && a.Package.toLowerCase() < b.Package && b.Package.toLowerCase ? -1 : 0
}
