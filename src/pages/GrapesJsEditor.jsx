import { useRef, useEffect, useState } from "react";
import grapesjs from "grapesjs";
import Card from "../elements/Card";
import ReactDOMServer from "react-dom/server";
import ImageViewer from "../elements/ImageViewer";
import axios from "axios";

const GrapesJsEditor = () => {
  const editorRef = useRef(null);
  const [editor, setEditor] = useState(null);
  const [newUrl, setNewUrl] = useState("");

  //convert
  const htmlToJsx = (html) => {
    const jsx = html.replace(/class=/g, "className="); // Convert class to className
    return `<div>${jsx}</div>`;
  };

  //clickhandler
  const handleSave = async () => {
    if (editor) {
      const canvasHTML = editor.getHtml();
      const convertedJsxCode = htmlToJsx(canvasHTML);  
      try {
        // Make an Axios POST request
        const response = await axios.post('http://localhost:5000/items', {
          jsxCode: convertedJsxCode
        });
        setNewUrl(`https://thegrape.netlify.app/${response?.data}`)
        console.log('Response from server:', newUrl);
      } catch (error) {
        console.error('Error saving JSX:', error);
      }
    }
  };
  

  useEffect(() => {
    const newEditor = grapesjs.init({
      container: editorRef.current,
    });

    setEditor(newEditor);

    //card
    const CardReactToHTML = ReactDOMServer.renderToString(<Card />);
    newEditor.BlockManager.add("custom-element", {
      label: "Card",
      content: CardReactToHTML,
    });
    //imageviwer
    const ImageViewerReactToHTML = ReactDOMServer.renderToString(
      <ImageViewer></ImageViewer>
    );
    newEditor.BlockManager.add("image-viewer", {
      label: "Image Viewer",
      content: ImageViewerReactToHTML,
    });

    return () => {
      newEditor.destroy();
    };
  }, []);

  return (
    <div className="bg-gray-100 shadow-md flex flex-col items-center pb-4">
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
      {newUrl && (
        <div className="mt-4 text-center">
          <h3 className="text-lg font-semibold mb-2">Generated JSX URL:</h3>
          <pre className="bg-gray-200 p-4 rounded-lg">{newUrl}</pre>
        </div>
      )}
    </div>
  );
};

export default GrapesJsEditor;
