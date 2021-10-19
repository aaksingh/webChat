import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { usersList } from "./Redux/reducers/usersReducers.js";
import { messageList } from "./Redux/reducers/messageReducer.ts";
import { myReply } from "./Redux/reducers/replyReducer.js";
import { detailsReducer } from "./Redux/reducers/friendDetailsReducer.js";
import { showProfileReducer } from "./Redux/reducers/profileReducer.js";
import { showOnlineUsers } from "./Redux/reducers/socketReducer.js";
import { newMessageList } from "./Redux/reducers/newMessageReducer.ts";
import { roomIdReducer } from "./Redux/reducers/roomIdReducer.js";
export const reducer = combineReducers({
  users: usersList,
  messages: messageList,
  reply: myReply,
  friendDetails: detailsReducer,
  showProfile: showProfileReducer,
  showOnlineUsers: showOnlineUsers,
  newMessages: newMessageList,
  roomId: roomIdReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,

  composeEnhancer(applyMiddleware(thunk))
);

export default store;
