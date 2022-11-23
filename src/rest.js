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
  const joinAsGuestPromise = 
  fetch(serverAddress + "/auth/guest", {
    method: "POST",
    body: JSON.stringify({
      nickName: user.nickName,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  joinAsGuestPromise.then((Response) => {
    if(Response.ok){
      Response.text().then((text) => {

        const myArray = text.split(":");
        sessionStorage.setItem("nickName",myArray[0])
        sessionStorage.setItem("token",myArray[1])
        window.location.replace("./pages/chat.html");
      })
    }else{
      window.alert("The nickname is already taken, please choose a different one")
    }
  })
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
    }else{
      Response.text().then((text) => {
        const errorArray = text.split(",")
        const errorMessage = errorArray[3].split("\"")
        window.alert(errorMessage[3])
      })
    }
  })
} 


async function getAllUsers() {
let result;
   return await fetch(serverAddress +'/user/getAll', {
      method: 'GET'
    })
    .then( function(response) {
      return  response.json();
    })
    .then( function(data) {
      var users = JSON.stringify(data,null,"\t");
      return  users;
    })
}
export{createUser,createMessage,loginUser,createGuest}