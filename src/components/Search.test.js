import React from "react";
import Search from "./Search";
import { shallow } from "enzyme";

describe("Search component", () => {
    it("should show search button", () => {
        const wrapper = shallow(<Search />);
        const button = wrapper.find("button");
        expect(button).toMatchSnapshot();
    });
});
