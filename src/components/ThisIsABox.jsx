import { useRef, useEffect } from 'react';
import grapesjs from 'grapesjs';

const ThisIsABox = () => {
  const editorRef = useRef(null);

  useEffect(() => {
    const editor = grapesjs.init({
      container: editorRef.current,
      // ... GrapesJS configurations ...
    });

    // You can further configure GrapesJS here

    return () => {
      editor.destroy();
    };
  }, []);

  return <div ref={editorRef}></div>;
};

export default ThisIsABox;