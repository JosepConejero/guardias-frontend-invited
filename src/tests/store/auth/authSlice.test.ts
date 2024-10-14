//import { AnyAction } from "redux";
import { authSlice } from "../../../store";
import { initialState } from "../../fixtures/authFixtures";

describe("Given an authSlice slice", () => {
  describe("When it's called ...", () => {
    test("Then it returns ...", () => {
      const state = authSlice.reducer(initialState, {} as any);
      console.log(state); // así veo qué tiene el state

      // compruebo que en el state está el inicialState
      expect(state).toEqual(initialState);
      // compruebo que el name de authSlice es 'auth'
      expect(authSlice.name).toBe("auth");
    });
  });
});
