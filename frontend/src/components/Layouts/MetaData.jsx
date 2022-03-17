import { Helmet } from "react-helmet-async";

const MetaData = ({ title }) => {
    return (
        <Helmet>
            <title>{title}</title>
        </Helmet>
    );
};

export default MetaData;