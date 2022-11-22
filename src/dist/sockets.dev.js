"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllMesseges = exports.sendPlainMessage = exports.openConnection = void 0;

var SockJS = _interopRequireWildcard(require("sockjs-client"));

var _stompjs = require("@stomp/stompjs");

var _jquery = _interopRequireDefault(require("jquery"));

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var stompClient;
var messages = [];

var socketFactory = function socketFactory() {
  return new SockJS(_constants.serverAddress + "/ws");
};

var onMessageReceived = function onMessageReceived(payload) {
  var message = JSON.parse(payload.body);
  messages.push(message);
  var textArea = (0, _jquery["default"])("#main-chat");
  textArea.val(textArea.val() + "\n" + message.sender + ": " + message.content);
};

var onConnected = function onConnected() {
  stompClient.subscribe("/topic/mainChat", onMessageReceived);
  stompClient.send("/app/hello", [], JSON.stringify({
    name: "Default user"
  }));
};

var openConnection = function openConnection() {
  var socket = socketFactory();
  stompClient = _stompjs.Stomp.over(socket);
  stompClient.connect({}, onConnected);
};

exports.openConnection = openConnection;

var sendPlainMessage = function sendPlainMessage(user, message) {
  stompClient.send("/app/plain", [], JSON.stringify({
    sender: user,
    content: message
  }));
};

exports.sendPlainMessage = sendPlainMessage;

var getAllMesseges = function getAllMesseges() {
  return messages;
};

exports.getAllMesseges = getAllMesseges;