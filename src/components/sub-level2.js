import React from "react";
import CreateSubLevel from "./sub-level";
import { Edit2, X, ArrowDownCircle } from "react-feather";

function CreateSubLevel2(props) {
    let sub = props.sub2;
    return (<div style={{ paddingLeft: props.left }}>

        <div className="single_phase_header1_ae p-2">

            <li style={{ listStyleType: props.list }}>{props.name2}</li>

            <span className="flex" style={{ display: props.display2 }}>
                <ArrowDownCircle className="phase_icon" width="14px" height="14px" onClick={props.create} />
                <Edit2 className="phase_icon" width="14px" height="14px" onClick={props.edit} />
                <X className="phase_icon" width="14px" height="14px" />
            </span>
        </div>
        <ol>
            {sub.map((x, y) => {
                return (<>
                    <CreateSubLevel
                        name={x.name}
                        sub={x.subLevel}
                        display={props.display2}
                        create={props.create}
                        edit={props.edit}
                        list={"lower-alpha"}
                    />
                </>)
            })}
        </ol>
    </div>)
};

export default CreateSubLevel2;