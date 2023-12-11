import './SectionHeader.css';

function SectionHeader(props) {
    return (
        <>
            <h2 className="section__title">
                {props.children}
            </h2>
            <div className="section__delimiter"/>
        </>
    )
}

export default SectionHeader;
