"use strict";
const userList = document.getElementById("user-list");

function renderUser(user) {
  //add user in ui
  const li = document.createElement("li");
  li.classList.add("user-card");
  const img = document.createElement("img");
  img.src = user.image;
  img.classList.add("user-image");
  const name = document.createElement("span");
  name.innerText = user.name;
  const a = document.createElement("a");
  a.innerText = "Git profile";
  a.href = user.url;
  a.target = "_blank";

  li.appendChild(img);
  li.appendChild(name);
  li.appendChild(a);
  userList.appendChild(li);
}

async function getUserData() {
  // call to servr to get data
  console.log("Server callling");
  const response = await fetch("https://api.github.com/users");
  const users = await response.json();
    console.log(users);
    
  //login, avatar_url,html_url
  //parse data
  const userData = users.map((user) => {
    const newUserInfo = {};
    newUserInfo["name"] = user["login"];
    newUserInfo["image"] = user["avatar_url"];
    newUserInfo["url"] = user["html_url"];
    return newUserInfo;
  });

  // pass data to function to render ui
  userData.forEach((user) => {
    renderUser(user);
  });
}

window.onload = function () {
  // server call for data
  getUserData();
  console.log("calling server start");
};
