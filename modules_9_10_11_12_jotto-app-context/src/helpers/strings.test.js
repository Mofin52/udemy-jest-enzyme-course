import stringsModule from "./strings";
const { getStringByLanguage } = stringsModule;

const strings = {
  en: { submit: "submit" },
  ru: { submit: "самбит" },
  mrm: {},
};

describe("getStringByLanguage tests", () => {
  const mockWarn = jest.fn();
  let originalWarn;
  beforeEach(() => {
    originalWarn = console.warn;
    console.warn = mockWarn;
  });
  afterEach(() => {
    console.warn = originalWarn;
  });
  test("returns correct submit string for english", () => {
    const string = getStringByLanguage("en", "submit", strings);
    expect(string).toBe(strings.en.submit);
    expect(mockWarn).not.toHaveBeenCalled();
  });
  test("returns correct submit string for russian", () => {
    const string = getStringByLanguage("ru", "submit", strings);
    expect(string).toBe(strings.ru.submit);
    expect(mockWarn).not.toHaveBeenCalled();
  });
  test("returns english submit string when language does not exists", () => {
    const string = getStringByLanguage("notALanguage", "submit", strings);
    expect(string).toBe(strings.en.submit);
    expect(mockWarn).toHaveBeenCalledWith(
      "Could not get string [submit] for [notALanguage]"
    );
  });
  test("returns english submit string when submit key does not exist for language", () => {
    const string = getStringByLanguage("mrm", "submit", strings);
    expect(string).toBe(strings.en.submit);
    expect(mockWarn).toHaveBeenCalledWith(
      "Could not get string [submit] for [mrm]"
    );
  });
});
