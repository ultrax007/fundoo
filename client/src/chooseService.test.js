import React from "react";
import { shallow } from "enzyme";
import { Provider } from "react-redux";
import Store from "./components/redux/Store";
import ChooseService from "./components/ChooseService";
describe("testing chooseService", () => {
	it("should render correctly with no props", () => {
		const component = shallow(
			<Provider store={Store}>
				<ChooseService />
			</Provider>
		);

		expect(component).toMatchSnapshot();
	});
});
