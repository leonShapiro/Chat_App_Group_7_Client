"use strict";

var _jquery = _interopRequireDefault(require("jquery"));

var _rest = require("./rest");

var _sockets = require("./sockets");

require("bootstrap");

require("bootstrap/dist/css/bootstrap.min.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _jquery["default"])(function () {
  // $("document").on("submit", () => {
  (0, _jquery["default"])("#reg-btn").on("click", function () {
    var user = {
      email: (0, _jquery["default"])("#emailInput").val(),
      nickName: (0, _jquery["default"])("#userInput").val(),
      password: (0, _jquery["default"])("#passwordInput").val()
    };
    (0, _rest.createUser)(user);
  });
});
(0, _jquery["default"])("#send-btn").on("click", function () {
  (0, _sockets.sendPlainMessage)("MyUser", (0, _jquery["default"])("#message-input").val());
});
(0, _jquery["default"])("#guest-send-btn").on("click", function () {
  var guest = {
    nickName: (0, _jquery["default"])("nickName").val()
  };
  createGuest(guest);
});
(0, _sockets.openConnection)();