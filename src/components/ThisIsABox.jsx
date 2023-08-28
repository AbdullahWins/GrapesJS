import { useRef, useEffect } from 'react';
import grapesjs from 'grapesjs';
import Card from '../elements/Card';
import ReactDOMServer from 'react-dom/server';

const ThisIsABox = () => {
  const editorRef = useRef(null);

  //initializing the editor upon loading
  useEffect(() => {
    const editor = grapesjs.init({
      container: editorRef.current,
    },[]);

    //converting the react component to raw html
    const CardReactToHTML = ReactDOMServer.renderToString(<Card />);
    //adding the component to the editor
    editor.BlockManager.add('custom-element', {
      label: 'Card',
      content: CardReactToHTML, // Use the converted HTML here
    });
    return () => {
      editor.destroy();
    };
  }, []);

  return <div ref={editorRef}></div>;
};

export default ThisIsABox;