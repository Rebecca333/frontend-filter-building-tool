Ran through development server using ```npm run dev```

## How To Use
The left column is all buttons, when clicked they will create a draggable object in the "Requested Filter" section that can be reordered to create a filter that can be applied to uploaded jsons. Each button can be clicked as many times as desired. The bottom button has a number input section on the left half of the button so that numbers can be added to the filter. Once a number is inputted, click the right side of the button (with the text "Add Number") for the number to become a draggable object in the filter section.

Each draggable object has a red "X" button that will delete the object once double clicked (you might have to triple click the "X" button as the first click registers as the start of a drag). To empty the entire filter, the "Reset" button below the droppable filter space can be used.

Any number of files can be uploaded to be tested, however only JSON files are taken. Once the "Run" button is clicked, the filter will be turned into an evaluable statement and the uploaded files will have their contents compared to it. Whichever files passed the filter will be listed by name below in the "Passing Files" section.
