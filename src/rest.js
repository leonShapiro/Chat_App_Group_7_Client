import { serverAddress } from "./constants";

const urlstr = "http://localhost:9000/pages/confirmation";

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
      privacyStatus: user.privacyStatus,
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
        var user = JSON.parse(text);
        sessionStorage.setItem("nickName", user.nickName);
        sessionStorage.setItem("token", user.token);
        window.location.replace("./pages/chat.html");
      });
    } else {
      // window.alert(
      //   "The nickname is already taken, please choose a different one"
      // );
      Response.text().then((text) => {
        const errorArray = text.split(",");
        const errorMessage = errorArray[3].split('"');
        window.alert(errorMessage[3]);
      });
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
        const errorMessage = errorArray[3].split('"');
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
        var user = JSON.parse(text);
        sessionStorage.setItem("nickName", user.nickName);
        sessionStorage.setItem("token", user.token);
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

const logoutUser = (nickName, token) => {
  const loginFetchPromise = fetch(serverAddress + "/auth/logout", {
    method: "POST",
    body: JSON.stringify({
      nickName: nickName,
      token: token,
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
  return await fetch(serverAddress + "/message/getAll", {
    method: "GET",
  })
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
    })
    .then(function (data) {
      return data;
    });
}

async function getLatestMessages() {
  return await fetch(serverAddress + "/message/getLatest", {
    method: "GET",
  })
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
    })
    .then(function (data) {
      return data;
    });
}

const confirmUserAccount = (activationRequest) => {
  const esponse = fetch(serverAddress + "/auth/validateUser", {
    method: "POST",
    body: JSON.stringify({
      id: activationRequest.id,
      activationCode: activationRequest.activationCode,
    }),
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

async function getMessagesByScroll(counter) {
  return await fetch(
    serverAddress + "/message/getLatestChunks?chunks=" + counter,
    {
      method: "GET",
    }
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      return data;
    })
    .catch((err) => console.log("No more messages"));
}

const muteUnmuteUser = (adminNickName, userNickName, status) => {
  fetch(
    serverAddress +
      "/user/muteUnmute?userNickName=" +
      userNickName +
      "&status=" +
      status,
    {
      method: "PATCH",
      body: JSON.stringify({
        nickName: adminNickName,
        token: sessionStorage.getItem("token"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

const switchStatus = (nickName) => {
  fetch(serverAddress + "/user/awayOnline", {
    method: "PATCH",
    body: JSON.stringify({
      nickName: nickName,
      token: sessionStorage.getItem("token"),
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const keepAlive = (userNickname) => {
  fetch(serverAddress + "/user/keepAlive", {
    method: "POST",
    body: userNickname,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const checkOfflineUsers = () => {
  fetch(serverAddress + "/auth/checkOfflineUsers", {
    method: "GET",
  });
};

const getUserByNickname = (userNickName) => {
  const response = fetch(serverAddress + "/user/getUserByNickname", {
    method: "POST",
    body: userNickName,
    headers: {
      "Content-Type": "application/json",
    },
  });
  response.then((Response) => {
    if (Response.ok) {
      Response.text().then((text) => {
        var user = JSON.parse(text);
        console.log(user);
        const row = document.createElement("div", user.id);
        if (user.privacyStatus == "PUBLIC") {
          document.getElementById("profileDiv").innerHTML = ` 
          Nickname: ${user.nickName} <br> 
          First name: ${user.firstName}<br>
          Last name: ${user.lastName}<br>
          Email: ${user.email}<br>
          Date Of Birth: ${user.dateOfBirth}<br>
          Description: ${user.description}`;
        }
        if (user.privacyStatus == "PRIVATE") {
          document.getElementById("profileDiv").innerHTML =
            "This profile is private";
        }
        if (user.userType == "GUEST") {
          document.getElementById("profileDiv").innerHTML = `
          The user ${user.nickName} is a guest 
          `;
        }
      });
    } else {
      alert("no such nickname ... error press on the nickname!");
    }
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
  keepAlive,
  getLatestMessages,
  checkOfflineUsers,
  switchStatus,
  getUserByNickname,
  getMessagesByScroll,
};
