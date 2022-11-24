import { serverAddress } from "./constants";

const createGuest = (user) => {
  const joinAsGuestPromise = fetch(serverAddress + "/auth/guest", {
    method: "POST",
    body: JSON.stringify({
      nickName: user.nickName,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  joinAsGuestPromise.then((Response) => {
    if (Response.ok) {
      Response.text().then((text) => {
        const myArray = text.split(":");
        sessionStorage.setItem("nickName", myArray[0]);
        sessionStorage.setItem("token", myArray[1]);
        window.location.replace("./pages/chat.html");
      });
    } else {
      window.alert(
        "The nickname is already taken, please choose a different one"
      );
    }
  });
};

const createMessage = (token, message) => {
  fetch(serverAddress + "/message/create", {
    method: "POST",
    body: JSON.stringify({
      token: token,
      content: message,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const loginUser = (user) => {
  const loginFetchPromise = fetch(serverAddress + "/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email: user.email,
      password: user.password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  loginFetchPromise.then((Response) => {
    if (Response.ok) {
      Response.text().then((text) => {
        const myArray = text.split(":");
        sessionStorage.setItem("nickName", myArray[0]);
        sessionStorage.setItem("token", myArray[1]);
        window.location.replace("./pages/chat.html");
      });
    } else {
      Response.text().then((text) => {
        const errorArray = text.split(",");
        const errorMessage = errorArray[3].split('"');
        window.alert(errorMessage[3]);
      });
    }
  });
};

async function getAllUsers() {
  let result;
  return await fetch(serverAddress + "/user/getAll", {
    method: "GET",
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
    console.log(data);
      return data;
    });
}

async function getAllMesseges() {
  let result;
  return await fetch(serverAddress + "/message/getAll", {
    method: "GET",
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      return data;
    });
}

///////////REGISER SECTION //////////////////////////////////////////////////////////////
const urlstr = "http://localhost:9000/pages/confirmation.html?id=";
const createUser = (user) => {
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
export {
  getAllUsers,
  createUser,
  createMessage,
  loginUser,
  createGuest,
  getAllMesseges,
  confirmUserAccount,
};
