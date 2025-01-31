import { useState } from "react";

export const Variables = ({onSubmit, content, description}) => {
    const [input, setInput] = useState("");

    const varSubmit = () => {
        onSubmit(content); // make draggable object with content passed in
        setInput(""); // used to update state
    };

    return (
        <div className="variableButtons">
            <button onClick={varSubmit} className="button" /* makes draggable object when clicked */ >
                {content}
            </button>
            <div className="hide" /* description that appears when button is hovered over */ >
                {description}
            </div>
        </div>
    );
};
