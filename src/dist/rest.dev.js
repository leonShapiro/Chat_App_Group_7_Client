"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginUser = exports.createMessage = exports.createUser = void 0;

var _constants = require("./constants");

var createUser = function createUser(user) {
  fetch(_constants.serverAddress + "/user", {
    method: "POST",
    body: JSON.stringify({
      nickName: user.nickName,
      email: user.email,
      password: user.password
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });
};

exports.createUser = createUser;

var createMessage = function createMessage(message) {
  fetch(_constants.serverAddress + "/message", {
    method: "POST",
    body: JSON.stringify({
      content: message.content
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });
};

exports.createMessage = createMessage;

var loginUser = function loginUser(user) {
  window.alert(user.email);
  fetch(_constants.serverAddress + "/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email: user.email,
      password: user.password
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });
};

exports.loginUser = loginUser;