import React from "react";
import View from "./Search";
import { shallow } from "enzyme";

describe("View component", () => {
    it("should show the items", () => {
        const wrapper = shallow(<View />);

        expect(wrapper).toMatchSnapshot();
    });
});
