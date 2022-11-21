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
        window.alert("66666666666666")
        sessionStorage.setItem("token",text)
        window.location.replace("./pages/chat.html");
      })
    }
  })
} 
export{createUser,createMessage,loginUser,createGuest}

