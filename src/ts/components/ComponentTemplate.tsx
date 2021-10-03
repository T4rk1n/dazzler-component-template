import React from "react";

type ComponentTemplateProps = {} & DazzlerProps;

/**
 * Component docstring.
 */
const ComponentTemplate = (props: ComponentTemplateProps) => {
    const { identity, class_name, style } = props;
    return (
        <div className={class_name} id={identity} style={style}>
            {/* Insert component content here  */}
        </div>
    )
}

ComponentTemplate.defaultProps = {};

export default ComponentTemplate;
