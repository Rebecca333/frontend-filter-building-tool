import { useState } from "react";

export const Num = ({onSubmit}) => { 
    const [input, setInput] = useState(""); // input state initialized

    const numSubmit = () => {
        if(!input) return; // if there is no input then do nothing
        onSubmit(Number(input)); // make sure the object created has a content of type number
        setInput(""); // clear old input
    };

    return (
        <div className="numInput">
            <input type="number" value={input} onChange={e => setInput(e.target.value)}
                className="input" /* sets input state to inputted number (only takes numbers) */ />
            <button onClick={numSubmit} className="add" /* when clicked, makes draggable object */>Add Number</button>
        </div>
    );
};
