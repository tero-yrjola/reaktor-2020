The project can be run using `npm start`.

Master branch is hooked up to Netlify.

The application first loads up the default mock status -file, found in /src/status-file/mockStatus.

All the non-clickable dependencies (or dependants) are one of the optional packages, which are not currently in the status-file.

When using a custom status file, the application will check if the file begins with the string 'Package:'.