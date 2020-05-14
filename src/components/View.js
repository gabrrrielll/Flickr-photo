import React from "react";

const View = (props) => {
    return props.state.items.map((item, index) => (
        <div className="item" key={index}>
            <div className="title">{item.title ? item.title : "Empty title"}</div>
            <div className="content">
                <img src={"https://farm" + item.farm + ".staticflickr.com/" + item.server + "/" + item.id + "_" + item.secret + "_q.jpg"} alt={item.title} />
            </div>
        </div>
    ));
};

export default View;
