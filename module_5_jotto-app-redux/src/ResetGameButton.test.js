import { shallow } from "enzyme";
import { ResetGameButton } from "./ResetGameButton";
import { findByTestAttr, storeFactory } from "../test/testUtils";
const setup = ({ success, onClick }) => {
  return shallow(<ResetGameButton success={success} onClick={onClick} />);
};

describe("render reset game button", () => {
  test("renders component without error if success true", () => {
    const wrapper = setup({ success: true });
    const component = findByTestAttr(wrapper, "reset-game-btn");
    expect(component.length).toBe(1);
  });
  test("does not render component if success false", () => {
    const wrapper = setup({ success: false });
    const component = findByTestAttr(wrapper, "reset-game-btn");
    expect(component.length).toBe(0);
  });
});

describe("Passes correct action", () => {
  test("dispatches resetGame action on click", () => {
    const resetGameMock = jest.fn();
    const wrapper = setup({ success: true, onClick: resetGameMock });
    const button = findByTestAttr(wrapper, "reset-game-btn");
    button.simulate("click");
    expect(resetGameMock.mock.calls.length).toBe(1);
  });
});
