import React from "react";
import CreateSubLevel2 from "./sub-level2";
import { Edit2, X, PlusSquare, ChevronDown, ArrowDownCircle } from "react-feather";

function CreateSubLevel(props) {
    let sub = props.sub;
    let display2 = props.display;
    return (<div style={{ paddingLeft: props.left }}>

        <div className="single_phase_header1_ae p-2">
            <li style={{ listStyleType: props.list }}>{props.name}</li>
            <span className="flex" style={{ display: props.display }}>
                <ArrowDownCircle className="phase_icon" width="14px" height="14px" onClick={props.create} />
                <Edit2 className="phase_icon" width="14px" height="14px" onClick={props.edit} />
                <X className="phase_icon" width="14px" height="14px" />
            </span>
        </div>

        <ol>
            {sub.map((x, y) => {
                return (<>
                    <CreateSubLevel2
                        name2={x.name}
                        sub2={x.subLevel}
                        display2={display2}
                        create={props.create}
                        edit={props.edit}
                    />
                </>)
            })}
        </ol>
    </div>)
};

export default CreateSubLevel;