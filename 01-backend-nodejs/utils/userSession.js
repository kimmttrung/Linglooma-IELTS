// userSession.js
let currentUserId = null;

function setUserId(id) {
  currentUserId = id;
}

function getUserId() {
  return currentUserId;
}

module.exports = { setUserId, getUserId };
