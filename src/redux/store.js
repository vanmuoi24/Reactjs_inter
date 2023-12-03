import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reduces/rotreduces";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
