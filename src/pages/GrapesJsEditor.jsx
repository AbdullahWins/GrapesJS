import { useRef, useEffect, useState } from "react";
import grapesjs from "grapesjs";
import Card from "../elements/Card";
import ReactDOMServer from "react-dom/server";

const GrapesJsEditor = () => {
  const editorRef = useRef(null);
  const [editor, setEditor] = useState(null);
  const [jsxCode, setJsxCode] = useState("");

  //convert
  const htmlToJsx = (html) => {
    const jsx = html.replace(/class=/g, "className="); // Convert class to className
    return `<div>${jsx}</div>`;
  };

  //download
  const downloadJsxFile = (content) => {
    const element = document.createElement("a");
    const file = new Blob([content], { type: "text/javascript" });
    element.href = URL.createObjectURL(file);
    element.download = "component.jsx";
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
    newEditor.BlockManager.add("custom-element", {
      label: "Card",
      content: CardReactToHTML,
    });

    return () => {
      newEditor.destroy();
    };
  }, []);

  return (
    <div className="bg-gray-100 p-12 shadow-md flex flex-col items-center">
      <div
        ref={editorRef}
        className="border border-gray-300 p-4 mb-4 rounded-lg"
      ></div>
      <button
        onClick={handleSave}
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
      >
        Generate and Download Component
      </button>
      {jsxCode && (
        <div className="mt-4 text-center">
          <h3 className="text-lg font-semibold mb-2">Generated JSX:</h3>
          <pre className="bg-gray-200 p-4 rounded-lg">{jsxCode}</pre>
        </div>
      )}
    </div>
  );
};

export default GrapesJsEditor;
