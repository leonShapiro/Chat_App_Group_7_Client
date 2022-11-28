import { serverAddress } from "./constants";

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
    } else {
      Response.text().then((text) => {
        const errorArray = text.split(",");
        const errorMessage1 = errorArray[3].split('"');
        const errorMessage2 = errorMessage1[3].split(":");
        window.alert(errorMessage2[1]);
      });
    }
  });
};

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
  const messagePromise = fetch(serverAddress + "/message/create", {
    method: "POST",
    body: JSON.stringify({
      token: token,
      content: message,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  messagePromise.then((Response) => {
    if (!Response.ok) {
      Response.text().then((text) => {
        const errorArray = text.split(",");
        const errorMessage = errorArray[3].split("\"");
        window.alert(errorMessage[3]);
      });
    }
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
        const errorMessage = errorArray[3].split("\"");
        window.alert(errorMessage[3]);
      });
    }
  });
};

const logoutUser = (user) => {
  const loginFetchPromise = fetch(serverAddress + "/auth/logout", {
    method: "POST",
    body: JSON.stringify({
      nickName: user,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  loginFetchPromise.then((Response) => {
    if (Response.ok) {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("nickName");
      window.location.replace("http://localhost:9000/");
    }
  });
};

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

async function getAllUsers() {
  return await fetch(serverAddress + "/user/getAll", {
    method: "GET",
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      return data;
    });
}

const muteUnmuteUser = (adminNickName, userNickName, status) => {
  fetch(serverAddress + "/user/muteUnmute", {
    method: "PATCH",
    body: JSON.stringify({
      adminNickName: adminNickName,
      userNickName: userNickName,
      status: status,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export {
  createUser,
  createMessage,
  loginUser,
  createGuest,
  getAllMesseges,
  confirmUserAccount,
  getAllUsers,
  logoutUser,
  muteUnmuteUser,
};
