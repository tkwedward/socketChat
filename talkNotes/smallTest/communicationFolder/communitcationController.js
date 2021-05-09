"use strict";
exports.__esModule = true;
exports.createCommunicationPanel = void 0;
function createCommunicationPanel(socketData) {
    // socketData = {"yourSocketId", "socketArray"}
    var socketIdSet = new Set();
    var communicationPanel = document.createElement("div");
    communicationPanel.classList.add("communicationPanel");
    communicationPanel.selfSocketId = socketData.yourSocketId;
    communicationPanel.createRow = function (userId) {
        if (!socketIdSet.has(userId)) {
            var row = document.createElement("div");
            row.setAttribute("userId", userId);
            row.innerText = userId;
            row.style.background = "pink";
            communicationPanel.appendChild(row);
            socketIdSet.add(userId);
        }
    };
    communicationPanel.deleteRow = function (userId) {
        socketIdSet["delete"](userId);
        var targetRow = communicationPanel.querySelector("div[userId='" + userId + "']");
        targetRow.remove();
    };
    communicationPanel.update = function (message) {
        // message = action, targetSocketId
        if (message.action == "connect") {
            communicationPanel.createRow(message.targetSocketIds);
        }
        if (message.action == "disconnect") {
            communicationPanel.deleteRow(message.targetSocketIds);
        }
    };
    // intialize data
    if (socketData.socketArray) {
        socketData.socketArray.forEach(function (p) {
            communicationPanel.createRow(p);
        });
        var panelContainer = document.querySelector(".panelContainer");
        panelContainer.insertBefore(communicationPanel, panelContainer.firstChild);
    }
}
exports.createCommunicationPanel = createCommunicationPanel;
