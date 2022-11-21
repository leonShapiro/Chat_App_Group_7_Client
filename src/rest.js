import { serverAddress } from "./constants";



const createUser = (user) => {
  fetch(serverAddress +"/user/guest", {
    method: "POST",
    body: JSON.stringify({
      nickName: user.nickName,
      email: user.email,
      password: user.password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};


const createGuest = (user) => {
  fetch(serverAddress + "/user/guest", {
    method: "POST",
    body: JSON.stringify({
      nickName: user.nickName,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};



const createMessage = (message) => {
  fetch(serverAddress + "/message", {
    method: "POST",
    body: JSON.stringify({ content: message.content }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const loginUser = (user) => {
  fetch(serverAddress + "/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email: user.email,
      password: user.password
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
export { createUser, createMessage, loginUser,createGuest };
