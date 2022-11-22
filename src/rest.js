import { serverAddress } from "./constants";

const createUser = (user) => {
  fetch(serverAddress + "/user", {
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

const createMessage = (token,message) => {
  fetch(serverAddress + "/message/create", {
    method: "POST",
    body: JSON.stringify({ 
    token: token,
    content :message
   }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const loginUser = (user) => {
  const loginFetchPromise = 
  fetch(serverAddress + "/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email: user.email,
      password: user.password
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })

  loginFetchPromise.then((Response) => {
    if(Response.ok){
      Response.text().then((text) => {

        const myArray = text.split(":");
        sessionStorage.setItem("nickName",myArray[0])
        sessionStorage.setItem("token",myArray[1])
        window.location.replace("./pages/chat.html");
      })
    }
  })
} 
export{createUser,createMessage,loginUser,createGuest}
