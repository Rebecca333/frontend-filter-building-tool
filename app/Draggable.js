import { useSortable } from "@dnd-kit/sortable"; // hook that provides arguments to implement drag/drop
import { CSS } from "@dnd-kit/utilities";

export const Draggable = ({id, content, removeElement}) => {
    const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id});
    const style = {
        transition, // disables transforming while object is not being dragged
        transform: CSS.Transform.toString(transform), // represents displacement & change of scale while dragging
    };
    return (
        <div ref={setNodeRef} {...attributes} {...listeners} style={style} className="var">
            {content}
            <button onDoubleClick={() => removeElement(id)}className="remove" /* allows for object to be removed */ >X</button>
        </div>
    );
};
