// get the users from local storage
const userFromLocalStorage = localStorage.getItem("User");
const usersFromLocalStorage = localStorage.getItem("Users");

export const authInitialState = {
  // set the initial state if the user is in local storage
  user: userFromLocalStorage ? JSON.parse(userFromLocalStorage) : {},
  accounts: usersFromLocalStorage ? JSON.parse(usersFromLocalStorage) : [],
};
const ACTIONS = {
  set_user: "SET_USER",
};

export default function AuthReducer(state, action) {
  const { set_user } = ACTIONS;
  switch (action.type) {
    case set_user:
      return {
        ...state,
        user: { ...action.user },
      };
  }
}
