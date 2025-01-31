import { horizontalListSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { Draggable } from "./Draggable";

export const Query = ({ varlist, title, removeElement }) => {
    return (
        <div style={{display: "flex"}} className="title">
            <div>{title}</div>
            <SortableContext items={varlist} strategy={horizontalListSortingStrategy} /* makes it so draggable objects can be moved around */>
                {varlist.map(v => ( /* map elements state to draggable objects */
                    <Draggable id={v.id} content={v.content} removeElement={removeElement} key={v.id} /* logic for draggable object */ />
                ))}
            </SortableContext>
        </div>
    );
};
