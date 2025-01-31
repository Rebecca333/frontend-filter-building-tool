'use client'
import { useState } from "react";
import { closestCorners, DndContext } from "@dnd-kit/core";
import { Query } from "./Query";
import { arrayMove } from "@dnd-kit/sortable";
import { Num } from "./Num";
import { Variables } from "./Variables";
import { FilterRun } from "./FilterRun";

export default function Home() {
  const [elements, setElements] = useState([]); // initialize state that stores all the drag and drop elements

  const makeDrag = content => { // make a new draggable object and put it at the end
    setElements(elements => [...elements, {id: elements.length+1, content}])
  }

  const getPosition = id => elements.findIndex(element => element.id === id); // helper function to get the position of an element

  const dragEnd = event => { // handles what happens when a draggable object has been dropped
    const {active, over} = event;

    if(active.id == over.id) return; // if it is not dragged to a new spot then just return

    setElements(elements => { // move the draggable object from the initial position to the dropped position
      const ogPosition = getPosition(active.id);
      const newPosition = getPosition(over.id);
      return arrayMove(elements, ogPosition, newPosition)
    });
  };

  const removeElement = id => { // remove a single draggable object based on its id by keeping everything that's not the requested object
    const updated = elements.filter(element => element.id != id).map((element, i) => ({...element, id: i+1})); // and changing the ids of all objects after it so each object has a unique id
    setElements(updated); // update the elements state to the new state with the object removed
  };

  const resetElements = () => setElements([]); // remove all draggable objects

  return (
    <div style={{display: "flex"}}>
      <DndContext onDragEnd={dragEnd} collisionDetection={closestCorners} /* to enable drag and drop */ >
        <div className="buttonList">
          <Variables onSubmit={makeDrag} content={"rb"} // makes button to generate a draggable object
            description={"Random forest model ML score corresponding to if the object detected in the sky is real or an artifact of the image"}/>
          <Variables onSubmit={makeDrag} content={"drb"} // also includes some descriptions for variables
            description={"Deep learning model ML score corresponding to if the object detected in the sky is real or an artifact of the image"}/>
          <Variables onSubmit={makeDrag} content={"galactic latitude"} // that appear when the button is hovered over
            description={"How close the object is to the galactic plane (our galaxy)"}/>
          <Variables onSubmit={makeDrag} content={"age"} 
            description={"Date of this detection minus the date the object was detected for the first time"}/>
          <Variables onSubmit={makeDrag} content={"="} /* conditionals */ />
          <Variables onSubmit={makeDrag} content={">"}/>
          <Variables onSubmit={makeDrag} content={"≥"}/>
          <Variables onSubmit={makeDrag} content={"<"}/>
          <Variables onSubmit={makeDrag} content={"≤"}/>
          <Variables onSubmit={makeDrag} content={"("} /* () makes it easier to distinguish between what should be included in && and || */ />
          <Variables onSubmit={makeDrag} content={")"}/>
          <Variables onSubmit={makeDrag} content={"AND"} /* more conditionals */ />
          <Variables onSubmit={makeDrag} content={"OR"}/>
          <Num onSubmit={makeDrag} /* input number to add to filter */ />
        </div>
        <div>
          <Query varlist={elements} title={'Requested Filter:'} removeElement={removeElement} /* droppable space to hold filters */ />
          <button onClick={resetElements} className="reset">Reset</button>
          <FilterRun filter={elements} /* handles file upload and evaluation */ />
        </div>
      </DndContext>
    </div>
  );
}
