import "@testing-library/jest-dom/extend-expect";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import IntersectionObserver from "intersection-observer";

Enzyme.configure({ adapter: new Adapter() });
