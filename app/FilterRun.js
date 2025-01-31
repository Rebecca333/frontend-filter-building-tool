import { useState } from "react";

export const FilterRun = ({filter}) => {
    const [files, setFiles] = useState([]); // state that contains all files that are uploaded
    const [passFiles, setPassFiles] = useState([]); // state that contains all files that pass the filter

    function fileUpload(f) { // runs when the files chosen has changed
        if(f.target.files) { // if there are files then
            setFiles([]); // reset both states
            setPassFiles([]);
            for(let i=0; i<f.target.files.length; i++) { // for each file
                let name = f.target.files[i].name; // get file name
                const fileReader = new FileReader();
                fileReader.readAsText(f.target.files[i], "UTF-8"); // read information in file
                fileReader.onload = file => { // load file information into files state
                    setFiles(files => [...files, {name: name, json: (JSON.parse(file.target.result))}])
                };
                fileReader.onloadend = () => fileReader.abort(); // close fileReader when done loading the information
            }
        }
    }

    const filterMake = () => {
        setPassFiles([]); // reset list of passing files
        const filterArray = filter.map(element => { // turn filter objects into array to become condition
            if(element.content == "AND") { // formatting so can just eval the array
                return "&&";
            }
            if(element.content == "OR") { // probably could've done this with a switch/case instead
                return "||";
            }
            if(element.content == "≤") {
                return "<=";
            }
            if(element.content == "≥") {
                return ">=";
            }
            if(element.content == "galactic latitude") {
                return "galactic_latitude";
            }
            return element.content;
        });
        if(files) { // if there are files
            for(let i=0; i<files.length; i++) { // then loop through all files
                let rb = files[i].json.rb;
                let drb = files[i].json.drb;
                let galactic_latitude = Math.abs(files[i].json.galactic_latitude);
                let age = files[i].json.jd - files[i].json.jdstarthist;

                if(eval(filterArray.join(''))) { // and compare to filter
                    setPassFiles(passFiles => [...passFiles, files[i].name]) // and if the file fulfills the requirements then add to passFiles
                }
            }
        }
    };

    return (
        <div className="file">
            <input type="file" onChange={fileUpload} multiple accept=".json" /* can only take .json files *//>
            <button onClick={filterMake} className="run">Run</button>
            <div className="pass">
                Passing Files: {passFiles.join(" ")}
            </div>
        </div>
    );
};
