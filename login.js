/* 
 Purpose:login.js is a Javascripts:  
  - to set and save the admin login information and authenticated the adming to look the stored information
  - script for login.html
 by: Ma Ya
 Date Updated: 11/10/2023
 */

// admin login
function checkAdminCredentials() {
  var storedAdminName = localStorage.getItem("AdminName");
  var storedPassword = localStorage.getItem("Password");

  if (!storedAdminName || !storedPassword) {
    promptAdminCredentials();
  }
}

function promptAdminCredentials() {
  var adminName = prompt("Set Admin Name:");
  var password = prompt("Set Password:");

  localStorage.setItem("AdminName", adminName);
  localStorage.setItem("Password", password);

  alert("Admin credentials saved successfully!");
}

function login() {
  var adminName = document.getElementById("adminname").value;
  var password = document.getElementById("password").value;

  var storedAdminName = localStorage.getItem("AdminName");
  var storedPassword = localStorage.getItem("Password");

  if (adminName === storedAdminName && password === storedPassword) {
    window.location.href = "displayCookiesData.html";
  } else {
    alert(
      "Incorrect admin credentials. You don't have administrative privileges."
    );
  }
}
window.onload = checkAdminCredentials;
