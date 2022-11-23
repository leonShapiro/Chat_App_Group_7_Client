import { serverAddress } from "./constants";

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
      password: user.password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

///////////REGISER SECTION //////////////////////////////////////////////////////////////
const urlstr = "http://localhost:9000/pages/confirmation.html?id=";
const createUser = (user) => {
  sessionStorage.setItem("registerEmail", user.email);
  const registerFetchResponse = fetch(serverAddress + "/auth/addUser", {
    method: "POST",
    body: JSON.stringify({
      nickName: user.nickName,
      email: user.email,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      dateOfBirth: user.dateOfBirth,
      description: user.description,
      url: urlstr,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  registerFetchResponse.then((Response) => {
    if (Response.ok) {
      Response.text().then((text) => {
        console.log(text);
        window.location.replace(
          "http://localhost:9000/pages/sentEmailPage.html"
        );
      });
    }
  });
};

const confirmUserAccount = (id) => {
  const esponse = fetch(serverAddress + "/auth/validateUser", {
    method: "POST",
    body: JSON.stringify(id),
    headers: {
      "Content-Type": "application/json",
    },
  });

  esponse.then((Response) => {
    if (Response.ok) {
      Response.text().then((text) => {
        window.location.replace("http://localhost:9000/");
      });
    }
  });
};

/////////////////////////////////////////////////////////////////////////////////////////
export { createUser, createMessage, loginUser, confirmUserAccount };
