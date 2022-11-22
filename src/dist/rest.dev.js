"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllUsers = getAllUsers;
exports.displayUsers = exports.createGuest = exports.loginUser = exports.createMessage = exports.createUser = void 0;

var _jquery = require("jquery");

var _constants = require("./constants");

var displayUsers = function displayUsers() {
  var users, selectItems, i, obj;
  return regeneratorRuntime.async(function displayUsers$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          users = [];
          _context.next = 3;
          return regeneratorRuntime.awrap(getAllUsers());

        case 3:
          users = _context.sent;
          selectItems = document.querySelector('.select-text');

          for (i = 0; i < users.length; i++) {
            obj = users[i];
          }

          results.forEach(function (element) {
            var options = document.createElement("option");
            options.textContent = element.name;
            options.value = element.id;
            selectItems.appendChild(options);
          });

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.displayUsers = displayUsers;

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

var createGuest = function createGuest(user) {
  fetch(_constants.serverAddress + "/user/guest", {
    method: "POST",
    body: JSON.stringify({
      nickName: user.nickName
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });
};

exports.createGuest = createGuest;

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

function getAllUsers() {
  var result;
  return regeneratorRuntime.async(function getAllUsers$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(fetch(_constants.serverAddress + '/user/getAll', {
            method: 'GET'
          }).then(function (response) {
            return response.json();
          }).then(function (data) {
            var users = JSON.stringify(data, null, "\t");
            return users;
          }));

        case 2:
          return _context2.abrupt("return", _context2.sent);

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
}

var loginUser = function loginUser(user) {
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