import { useLoaderData } from "react-router-dom";

const ShowGrapes = () => {
    const item = useLoaderData();
    return (
        <div dangerouslySetInnerHTML={{ __html: item?.jsxCode }} />
    );
};

export default ShowGrapes;