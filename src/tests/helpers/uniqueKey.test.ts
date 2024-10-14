import { uniqueKey } from "../../helpers";

describe("Given a uniqueKey function", () => {
  describe("When it's called twice", () => {
    test("Then it returns a diferent string every time", () => {
      const receivedValue1 = uniqueKey();
      const receivedValue2 = uniqueKey();
      expect(receivedValue1 !== receivedValue2).toBeTruthy();
    });
  });
});
