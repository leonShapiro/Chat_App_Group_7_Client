"use strict";

var _jquery = _interopRequireDefault(require("jquery"));

var _rest = require("./rest");

var _sockets = require("./sockets");

require("bootstrap");

require("bootstrap/dist/css/bootstrap.min.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _jquery["default"])(function () {
  (0, _jquery["default"])("#reg-btn").on("click", function () {
    var user = {
      email: (0, _jquery["default"])("#emailInput").val(),
      nickName: (0, _jquery["default"])("#nicknameInput").val(),
      password: (0, _jquery["default"])("#passwordInput").val()
    };
    (0, _rest.createUser)(user);
  });
  (0, _jquery["default"])("#reg-geust-btn").on("click", function () {
    var user = {
      nickName: (0, _jquery["default"])("#nicknameInput").val()
    };
    (0, _rest.createGuest)(user);
  });
  (0, _jquery["default"])("#send-btn").on("click", function () {
    var Message = {
      //id: $('#emailInput').val(),
      //sender: $('#userInput').val(),
      content: (0, _jquery["default"])("#message-input").val()
    };
    (0, _rest.createMessage)(Message);
    (0, _sockets.sendPlainMessage)("MyUser", (0, _jquery["default"])("#message-input").val());
    document.getElementById("message-input").value = "";
  });
  (0, _jquery["default"])("#login-btn").on("click", function () {
    var user = {
      email: (0, _jquery["default"])("#emailInput").val(),
      password: (0, _jquery["default"])("#passwordInput").val()
    };
    (0, _rest.loginUser)(user);
    window.location.replace("./pages/chat.html");
  });
  (0, _jquery["default"])("#export-btn").on("click", function () {
    var messages = (0, _sockets.getAllMesseges)();
    var jsonObj = messages.map(function (o) {
      return Object.values(o).join(' : ');
    });
    var jsonObject = JSON.stringify(jsonObj, null, "\t");
    downloadCSV(jsonObject);
  });
  document.getElementById("btn-list").addEventListener("click", _rest.displayUsers);

  function downloadCSV(csvStr) {
    var hiddenElement = document.createElement("a");
    hiddenElement.href = "data:text/csv;" + encodeURI(csvStr);
    hiddenElement.download = "Exported chat.csv";
    hiddenElement.click();
  }
});
(0, _sockets.openConnection)();