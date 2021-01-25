import React from "react";
import { Divider } from "@material-ui/core";

interface IProfileSection {
    title?: string;
    divider?: boolean;
    children: React.ReactNode;
}

function Section(props: IProfileSection) {

    const showTitle = (): boolean => props.title !== undefined;
    const showDivider = (): boolean => props.divider === undefined ? false : props.divider;

    return <div className="profile-section">
        <div className="profile-section-content">
            { showTitle() && <p className="important-text">{props.title}</p> }
            {props.children}
        </div>
        { showDivider() && <Divider /> }
    </div>;
}

export default Section;