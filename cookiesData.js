/* 
Purpose:Javascript codes for storing and managing cookies:  
  - to get the firstname and display with Thank you when the form submitted
  - to get the firstname and display dynamically to confirm the regitration
  - to store username, firstname, Date of Birth and Reasons to be used at DisplayCookiesData.html
  by: Ma Ya
  Last Updated: 11/23/2023
 */

// Flag to check if the page is being refreshed and get the cookie by first name
var isPageRefreshed = false;
window.onload = function () {
  var firstnameField = document.getElementById("firstname");
  firstnameField.addEventListener("input", function () {
    document.cookie = "firstname=" + this.value + ";max-age=3600;path=/";
  });

  // Check the cookie for the firstname
  var firstname = getCookie("firstname");
  if (firstname) {
    var confirmation = confirm(
      "Welcome, " +
        firstname +
        "!\n\nIf you are not " +
        firstname +
        ", click Cancel and restart the registration.\nOtherwise, click OK to confirm."
    );
    if (!confirmation) {
      document.cookie =
        "firstname=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
  }
};

// Function to get a cookie by name
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function setLocalStorage() {
  var userName = document.getElementById("username").value;
  var firstName = document.getElementById("firstname").value;
  var lastName = document.getElementById("lastname").value;
  var dateOfBirth = document.getElementById("dateofbirth").value;
  var reason = document.getElementById("reason").value;

  var existingData = JSON.parse(localStorage.getItem("UserData")) || [];

  // Check if firstName and userName already exist
  var existingUser = existingData.find(
    (user) => user.firstName === firstName && user.userName === userName
  );

  if (existingUser) {
    var updateRegistration = confirm(
      "Welcome, " +
        firstName +
        "! You have already registered with the same first name and username. Do you want to update your registration?"
    );

    if (updateRegistration) {
      alert("Update confirmed!");
    } else {
      return;
    }
  }

  existingData.push({
    userName: userName,
    firstName: firstName,
    lastName: lastName,
    dateOfBirth: dateOfBirth,
    reason: reason,
  });
  localStorage.setItem("UserData", JSON.stringify(existingData));
  localStorage.setItem("SubmittedFirstName", firstName);
  var expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + 24 * 60 * 60 * 1000);
  localStorage.setItem("ExpirationDate", expirationDate.getTime());
  window.location.href = "submit.html";
}

function openCookiesData() {
  window.location.href = "login.html";
}

function displayCookies() {
  var existingData = JSON.parse(localStorage.getItem("UserData"));

  if (existingData && existingData.length > 0) {
    var displayContainer = document.getElementById("namesDisplay");

    existingData.forEach((user) => {
      var userName = user.userName;
      var firstName = user.firstName;
      var lastName = user.lastName;
      var dateOfBirth = user.dateOfBirth;
      var reason = user.reason;

      var userContainer = document.createElement("div");

      userContainer.innerHTML =
        "<div class='CookiesData'>" +
        "<strong> Username :</strong> " +
        userName +
        "<br/>" +
        "<strong> Patient Name:</strong> " +
        firstName +
        " " +
        lastName +
        "<br/>" +
        "DOB: " +
        dateOfBirth +
        "<br/>" +
        "Reason to visit: " +
        reason +
        "<br/><br>";

      displayContainer.appendChild(userContainer);
    });
  } else {
    alert("No data found for User Data.");
  }
}

function deleteCookies() {
  localStorage.removeItem("UserData");
  alert("Cookies data deleted successfully!");
  document.getElementById("namesDisplay").innerHTML = "";
}
