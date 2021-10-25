import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:3001/",
});

instance.interceptors.request.use((req) => {
  if (localStorage.getItem("Token")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem("Token")}`;
  }
  return req;
});

export const signIn = (formData) => instance.post("login", formData);
export const signUp = (formData) => instance.post("signUp", formData);

export const userDetails = () => instance.get("userDetails");

export const create = (data) => instance.post("create", data);
export const replymessage = (data) => instance.post("reply", data);

export const chatList = (id) => instance.get(`chatList/${id}`);
// export const chatList = (conv_Id) => instance.get(`chatList/${conv_Id}`);
export const replyList = (mess_Id) => instance.get(`replyList/${mess_Id}`);

export const addFriends = (formdata) => instance.post("addfriend", formdata);
export const friendlist = (id) => instance.get(`friendslist/${id}`);

export const deleteMessage = (id) => instance.delete(`delete/${id}`);
export const friendsList = (f1, f2) =>
  instance.get(`friendsList/?s1=${f1}&s2=${f2}`);
export const downloadFile = (id) => instance.get(`download?s1=${id}`);
export const upload = (data) => instance.post("upload", data);
export default instance;
