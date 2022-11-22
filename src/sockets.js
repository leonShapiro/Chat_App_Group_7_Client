import * as SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import $ from "jquery";
import { serverAddress } from "./constants";
let stompClient;
let messages = [];
const socketFactory = () => {
  return new SockJS(serverAddress + "/ws");
};

const onMessageReceived = (payload) => {
  var message = JSON.parse(payload.body);
  messages.push(message);
  let textArea = $("#main-chat");
  textArea.val(textArea.val() + "\n" + message.sender + ": " + message.content);
 
};

const onConnected = () => {
  stompClient.subscribe("/topic/mainChat", onMessageReceived);
  stompClient.send("/app/hello", [], JSON.stringify({ name: sessionStorage.getItem("nickName") }));
};

const openConnection = () => {
  const socket = socketFactory();
  stompClient = Stomp.over(socket);
  stompClient.connect({}, onConnected);
};

const sendPlainMessage = (user, message) => {
  stompClient.send(
    "/app/plain",
    [],
    JSON.stringify({
      sender: user,
      content: message,
    })
  );
};

const getAllMesseges =() =>{
  return messages;
}





export { openConnection, sendPlainMessage ,getAllMesseges};
