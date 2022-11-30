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
  scrollDown();
  var message = JSON.parse(payload.body);
      messages.push(message);
      let textArea = $("#main-chat");
      textArea.val(textArea.val() + "\n" + message.sender + ": " + message.content);
      
};

const onConnected = () => {
  stompClient.subscribe("/topic/mainChat", onMessageReceived);
  if(sessionStorage.getItem("nickName") != null){
    stompClient.send("/app/hello", [], JSON.stringify({ name: sessionStorage.getItem("nickName") }));
  }
};

$("#logOut-btn").on("click", () => {
  stompClient.send("/app/bye", [], JSON.stringify({ name: sessionStorage.getItem("nickName") }));
});

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
scrollDown();
};

 function scrollDown(){
  var $textarea = $("#main-chat");
  let st = $(this).scrollTop(); //get current scroll position
  $textarea.scrollTop($textarea[0].scrollTo(0, 450));
}


export { openConnection, sendPlainMessage };