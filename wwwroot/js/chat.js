"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

//Disable send button until connection is established
document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", function (user, message) {

    console.log("[chat.js][connection.on][ReceiveMessage] => connection: ", connection);
    console.log("[chat.js][connection.on][ReceiveMessage] => user: ", user);
    console.log("[chat.js][connection.on][ReceiveMessage] => message: ", message);

    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var encodedMsg = user + " says " + msg;

    console.log("[chat.js][connection.on][ReceiveMessage]  => msg: ", msg);
    console.log("[chat.js][connection.on][ReceiveMessage]  => encodedMsg: ", encodedMsg);

    console.log("[chat.js][connection.on][ReceiveMessage] => Creating new '<li>' tag");

    var li = document.createElement("li");
    li.textContent = encodedMsg;

    console.log("[chat.js][connection.on][ReceiveMessage] => li: ", li);
    console.log("[chat.js][connection.on][ReceiveMessage] => li.textContent: ", li.textContent);
    console.log("[chat.js][connection.on][ReceiveMessage] => Appending newly created '<li>' tag to '<ul>' tag ('messagesList')");

    document.getElementById("messagesList").appendChild(li);
});

connection.start().then(function () {
    console.log("[chat.js][connection.start] => BEGIN");
    console.log("[chat.js][connection.start] => connection: ", connection);
    console.log("[chat.js][connection.start] => Enabling button('sendButton')");

    document.getElementById("sendButton").disabled = false;

    console.log("[chat.js][connection.start] => END");
}).catch(function (err) {
    console.log("[chat.js][connection.start] => ERROR: ", err.toString());
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;

    console.log("[chat.js][getElementById][sendButton] => user: ", user);
    console.log("[chat.js][getElementById][sendButton] => message: ", message);
    console.log("[chat.js][getElementById][sendButton] => Invoking 'SendMessage'");

    connection.invoke("SendMessage", user, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});