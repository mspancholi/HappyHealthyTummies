import React from "react";
import Sidebar from "react-sidebar";

import "./style.css";

function LeftSidebar(props) {
    return (
        <Sidebar sidebar={<b>Sidebar content</b>}
            open={props.sidebarOpen}
            onSetOpen={props.onSetSidebarOpen}
            styles={{ sidebar: { background: "white" } }} >
            <button onClick={() => props.onSetSidebarOpen(true)}>
                Open sidebar
            </button>
        </Sidebar>
    );
}

export default LeftSidebar;