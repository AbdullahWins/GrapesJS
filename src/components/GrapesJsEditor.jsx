import { useRef, useEffect, useState } from 'react';
import grapesjs from 'grapesjs';
import Card from '../elements/Card';
import ReactDOMServer from 'react-dom/server';

const GrapesJsEditor = () => {
  const editorRef = useRef(null);
  const [editor, setEditor] = useState(null);
  const [jsxCode, setJsxCode] = useState('');

  //convert
  const htmlToJsx = (html) => {
    const jsx = html.replace(/class=/g, 'className='); // Convert class to className
    return `<div>${jsx}</div>`;
  };

  //download
  const downloadJsxFile = (content) => {
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/javascript' });
    element.href = URL.createObjectURL(file);
    element.download = 'generatedComponent.jsx';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
//clickhandler
  const handleSave = () => {
    if (editor) {
      const canvasHTML = editor.getHtml();
      const jsxCode = htmlToJsx(canvasHTML);
      setJsxCode(jsxCode);
      downloadJsxFile(jsxCode);
    }
  };


  useEffect(() => {
    const newEditor = grapesjs.init({
      container: editorRef.current,
    });

    setEditor(newEditor);

    const CardReactToHTML = ReactDOMServer.renderToString(<Card />);
    newEditor.BlockManager.add('custom-element', {
      label: 'Card',
      content: CardReactToHTML,
    });

    return () => {
      newEditor.destroy();
    };
  }, []);

  return (
    <div>
      <div ref={editorRef}></div>
      <button onClick={handleSave}>Generate and Download Component</button>
      {jsxCode && (
        <div>
          <h3>Generated JSX:</h3>
          <pre>{jsxCode}</pre>
        </div>
      )}
    </div>
  );
};

export default GrapesJsEditor;
