import React from "react";
import ReactDom from "react-dom";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";

it("Renders without crashing and display a message if the search button is pressed and search field is incomplete", () => {
    const div = document.createElement("div");
    const wrapper = render(<App />, div);

    expect(wrapper.queryByText("Your search is:").textContent).toBe("Your search is:  ");
    expect(wrapper.queryByText("Loading . . .").textContent).toBe("Loading . . .");
    expect(wrapper).toMatchSnapshot();
    expect(document.getElementById("alert").textContent).toBe("");

    fireEvent(
        wrapper.getByText("Search", { selector: "button" }),
        new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
        }),
    );

    expect(document.getElementById("alert").textContent).toBe("Search tag must contain minim three characters");

    ReactDom.unmountComponentAtNode(div);
});
