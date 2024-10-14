import { AuthSliceInitialState } from "../../interfaces/slicesInterfaces";

export const initialState: AuthSliceInitialState = {
  status: "checking",
  user: {},
  errorMessage: undefined,
  isChangingPassword: false,
  isRestoringPassword: false,
};

/*export const authenticatedState = {
  status: "authenticated",
  uid: "123ABC",
  email: "demo@google.com",
  displayName: "Demo User",
  photoURL: "https://demo.jpg",
  errorMessage: null,
};

export const notAuthenticatedState = {
  status: "not-authenticated",
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
};

export const demoUser = {
  uid: "123ABC",
  email: "demo@google.com",
  displayName: "Demo User",
  photoURL: "https://demo.jpg",
};
 */
