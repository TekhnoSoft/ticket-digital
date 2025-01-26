import React, { useState } from 'react';
import "jodit";
import JoditEditor from "jodit-react";

const buttons = [
    "undo",
    "redo",
    "|",
    "bold",
    "strikethrough",
    "underline",
    "italic",
    "|",
    "superscript",
    "subscript",
    "|",
    "align",
    "|",
    "ul",
    "ol",
    "outdent",
    "indent",
    "|",
    "font",
    "fontsize",
    "brush",
    "paragraph",
];


export default ({placeholder}) => {

    const [data, setData] = useState("");

    const editorConfig = {
        readonly: false,
        toolbar: true,
        spellcheck: true,
        language: "pt",
        toolbarButtonSize: "medium",
        toolbarAdaptive: false,
        showCharsCounter: false,
        showWordsCounter: false,
        showXPathInStatusbar: false,
        askBeforePasteHTML: true,
        askBeforePasteFromWord: true,
        buttons: buttons,
        placeholder: placeholder,
        uploader: {
            insertImageAsBase64URI: true
        },
        width: '100%',
        height: 342
    };
    
    return (
        <JoditEditor
            value={data}
            config={editorConfig}
            onChange={value => setData(value)}
        />
    )
}
