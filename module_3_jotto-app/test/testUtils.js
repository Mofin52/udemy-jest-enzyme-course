export const findByTestAttr = (wrapper, value) =>
  wrapper.find(`[data-test="${value}"]`);
