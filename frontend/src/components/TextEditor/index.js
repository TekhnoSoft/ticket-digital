import React, { useRef, useState, useEffect } from "react";
import JoditEditor from "jodit-react";
import './style.css';

const buttons = [
    "undo", "redo", "|", "bold", "strikethrough", "underline", "italic", "|",
    "superscript", "subscript", "|", "align", "|", "ul", "ol", "outdent", "indent",
    "|", "font", "fontsize", "brush", "paragraph"
];

export default ({ placeholder, onChange, value, readOnly }) => {
    const [editorReady, setEditorReady] = useState(false);  // Estado para controlar se o editor está pronto
    const editorRef = useRef(null);

    const editorConfig = {
        readonly: readOnly,
        spellcheck: true,
        language: "pt",
        toolbarButtonSize: "medium",
        toolbarAdaptive: false,
        showCharsCounter: false,
        showWordsCounter: false,
        showXPathInStatusbar: false,
        askBeforePasteHTML: false,
        askBeforePasteFromWord: false,
        buttons: readOnly ? [] : buttons,
        placeholder: placeholder,
        uploader: { insertImageAsBase64URI: true },
        width: "100%",
        height: 342
    };

    // Efeito para verificar quando o editor está montado
    useEffect(() => {
        if (editorRef.current && editorRef.current.editor) {
            setEditorReady(true);  // Marca o editor como pronto
        }
    }, []);

    useEffect(() => {
        if (editorReady && editorRef.current && editorRef.current.editor) {
            editorRef.current.editor.focus();  // Foca o editor somente quando estiver pronto
        }
    }, [editorReady, value]); // Garante que o foco aconteça após o editor estar pronto e o valor mudar

    return (
        <JoditEditor
            className="text-editor"
            ref={editorRef}
            config={editorConfig}
            value={value}
            onChange={content => onChange && onChange(content)} 
        />
    );
};
