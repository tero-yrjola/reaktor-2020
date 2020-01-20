import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './FileInput.css'

function FileInput({setCustomFile}) {
    return (
        <div id="file-input">
            <label htmlFor="hidden-files-button" id="file-input-button">Select a custom status file</label>
            <input id="hidden-files-button" type="file" onChange={e => setCustomFile(e.target.files[0])}/>
        </div>
    )
}

export default FileInput;
