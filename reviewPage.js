/* 
 Purpose:Javascript codes:  
  - to get dynamic date and time that showes the current time.
  - to create popup page that shows the user what the required field
  - to show the user the data that entered and passed or invalid to ease revision
  - later on the scripts for cookies data are also included.
 by: Ma Ya
 Last Updated: 12/06/2023
 */

//  1. Displayed the date & time
document.addEventListener("DOMContentLoaded", function () {
  const datetimeElement = document.getElementById("datetime");
  function getCurrentDateTime() {
    const now = new Date();
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return now.toLocaleDateString("en-US", options);
  }
  datetimeElement.textContent = getCurrentDateTime();
});

// Create a review page to ease review
var popup = null;
function FinalreviewForm() {
  if (popup) {
    popup.close();
  }

  var form = document.getElementById("myForm");
  var formData = new FormData(form);
  var reviewText =
    "<div id='review-container'><h2><center>PLEASE REVIEW THE INFORMATION BELOW</center></h2>";

  formData.forEach(function (value, key) {
    // 2. Review Names
    // 2.1. Firstnames
    if (
      key.toLowerCase() == "firstname" ||
      key.toLowerCase() == "emefirstname" ||
      key.toLowerCase() == "docfirstname"
    ) {
      const regex = /^[A-Za-z' .-]{1,30}$/;
      const required = form
        .querySelector(`[name=${key}]`)
        .hasAttribute("required");
      if (required && !regex.test(value)) {
        if (value === "") {
          value = `${value} <span style='color: blue'>This is a required field</span>`;
        } else {
          value = `${value} <span style='color: red'>
          &emsp; &emsp; &emsp;
          Invalid firstname:Please use 1 to 30 chracters: letters, spacesand dash </span>`;
        }
      } else if (value.trim() !== "") {
        value = `${value} <span style='color: green'> 
        &emsp; &emsp; &emsp;
        PASS </span>`;
      }
    }
    // 2.2. Lastnames
    if (
      key.toLowerCase() == "lastname" ||
      key.toLowerCase() == "emelastname" ||
      key.toLowerCase() == "doclastname"
    ) {
      const regex =
        /^(?:[A-Za-z'\s]{1,30}|[A-Za-z'\s]{1,30}( [A-Za-z'\s]{1,30})*( (2nd|3rd|4th|5th)))$/;
      const required = form
        .querySelector(`[name=${key}]`)
        .hasAttribute("required");
      if (required && !regex.test(value)) {
        if (value === "") {
          value = `${value} <span style='color: blue'>This is a required field</span>`;
        } else {
          value = `${value} <span style='color: red'>
          &emsp; &emsp; &emsp;
         Invalid lastname: Please use 1 to 30 chracters: letters, spaces,apostrophes, numbers 2 to 5 and dash </span>`;
        }
      } else if (value.trim() !== "") {
        value = `${value} <span style='color: green'> 
        &emsp; &emsp; &emsp;
        PASS </span>`;
      }
    }
    // 2.3. Middle name intial
    else if (key.toLowerCase() == "middleinit") {
      const regex = /^[A-Za-z]$/;
      if (!regex.test(value)) {
        if (value === "") {
          value = `${value} <span></span>`;
        } else {
          value = `${value} <span style='color: red'>&emsp; &emsp; &emsp;
          Invalid Name: Please use only a letter </span>`;
        }
      } else if (value.trim() !== "") {
        value = `${value} <span style='color: green'> &emsp; &emsp; &emsp;
        PASS </span>`;
      }
    }

    // 3. Review the Date of Birth
    if (key.toLowerCase() == "dateofbirth") {
      var regex = /^\d{4}[-/]\d{2}[-/]\d{2}$/;
      if (!regex.test(value)) {
        if (value === "") {
          value = `${value} <span style='color: blue'>This is a required field</span>`;
        }
      } else {
        var dateofbirth = new Date(value);
        var today = new Date();
        var minDate = new Date();
        minDate.setFullYear(minDate.getFullYear() - 120);
        if (dateofbirth > today) {
          value =
            value +
            " <span style='color: red'> &emsp; &emsp; &emsp; ERROR: Birth date cannot be in the future </span>";
        } else if (dateofbirth < minDate) {
          value =
            value +
            " <span style='color: red'>ERROR: Cannot be more than 120 years </span>";
        } else {
          value = value + " <span style='color: green'>PASS</span>";
        }
      }
    }

    // 4. Review the addresses ( Line-1, Line-2 and City)
    if (
      key.toLowerCase() === "addr1" ||
      key.toLowerCase() === "addr2" ||
      key.toLowerCase() === "city"
    ) {
      const regex = /^[0-9a-zA-Z\s]{2,30}$/;
      const required = form
        .querySelector(`[name=${key}]`)
        .hasAttribute("required");
      if (required && value.trim() === "") {
        value = `${value} <span style='color: blue'> 
        &emsp; &emsp; &emsp;This is a required field</span>`;
      } else if (!regex.test(value) && value.trim() !== "") {
        value = `${value} <span style='color: red'> 
        &emsp; &emsp; &emsp;Invalid Address: use 2-30 letters, numbers, and spaces only</span>`;
      } else if (value.trim() !== "") {
        value = `${value} <span style='color: green'> &emsp; &emsp; &emsp;PASS</span>`;
      }
    }

    // 5. Review the email
    if (key.toLowerCase() === "email") {
      const emailValue = value.trim();
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (emailValue !== "") {
        if (emailValue.indexOf("@") === -1) {
          value =
            value +
            " <span style='color: red'>&emsp; &emsp; &emsp; Missing '@' symbol: An email address must contain the '@' symbol.</span></p>";
        } else if (!emailPattern.test(emailValue)) {
          value =
            value +
            " <span style='color: red'>&emsp; &emsp; &emsp; Invalid email: Please use at least 6 characters, including letters, digits, dots, @, and hyphens.</span></p>";
        } else {
          value = value.replace(/<span style='color: red'>.+<\/span>/g, "");
          value =
            value +
            " <span style='color: green'>&emsp; &emsp; &emsp; PASS</span></p>";
        }
      }
    }

    // 6. Phone numbers
    if (
      key.toLowerCase() === "phone" ||
      key.toLowerCase() === "emephone" ||
      key.toLowerCase() === "docphone"
    ) {
      const regex = /^(?:\d{10}|\d{3}-\d{3}-\d{4}|\(\d{3}\) \d{3}-\d{4})/;
      const required = form
        .querySelector(`[name=${key}]`)
        .hasAttribute("required");
      if (required && !regex.test(value)) {
        if (value === "") {
          value = `${value} <span style='color: blue'>This is a required field</span>`;
        } else {
          value = `${value} <span style='color: red'>
        &emsp; &emsp; &emsp;
        Invalid phone number: Please use 10 digits number with dashes or spaces.</span>`;
        }
      } else if (value.trim() !== "") {
        value = `${value} <span style='color: green'>&emsp; &emsp; &emsp; PASS</span>`;
      }
    }

    //7. Reason to visit
    if (key.toLowerCase() == "reason") {
      const regex = /^[A-Za-z .]{5,50}$/;
      value = value.toLowerCase();
      if (value.trim() == "") {
        value = `${value} <span style='color: blue'>This field is required</span>`;
      } else if (!regex.test(value) && value.trim() !== "") {
        value = `${value} <span style='color: red'> 
        &emsp; &emsp; &emsp;Invalid username: Please use only letters and space up to 50 characters</span>`;
      } else if (value.trim() !== "") {
        value = `${value} <span style='color: green'> &emsp; &emsp; &emsp;PASS</span>`;
      }
    }

    // 8. Insurance
    // 8.1. Insurance Name
    if (key.toLowerCase() == "insurance_name") {
      const regex = /^[A-Za-z .]{1,30}$/;
      value = value.toLowerCase();
      if (!regex.test(value) && value.trim() !== "") {
        value = `${value} <span style='color: red'>&emsp;&emsp;&emsp;Invalid reason: Please use only letters and space (1 to 30 characters)</span>`;
      } else if (value.trim() !== "") {
        value = `${value} <span style='color: green'>&emsp;&emsp;&emsp;PASS</span>`;
      }
    }
    // 8.2. Insurance ID
    if (key.toLowerCase() == "policyid") {
      const regex = /^[A-Za-z0-9_-]{5,20}$/;
      value = value.toLowerCase();
      if (!regex.test(value) && value.trim() !== "") {
        value = `${value} <span style='color: red'>&emsp;&emsp;&emsp;Invalid reason: Please use only letters and space (1 to 30 characters)</span>`;
      } else if (value.trim() !== "") {
        value = `${value} <span style='color: green'>&emsp;&emsp;&emsp;PASS</span>`;
      }
    }

    //9. Review the Username and PWD
    // 9.1. Username
    if (key.toLowerCase() == "username") {
      const regex = /^[A-Za-z][A-Za-z0-9_-]{4,29}$/;
      value = value.toLowerCase();
      if (value.trim() == "") {
        value = `${value} <span style='color: blue'>This field is required</span>`;
      } else if (!regex.test(value) && value.trim() !== "") {
        const startsWithNumber = /^\d/.test(value);
        if (startsWithNumber) {
          value = `${value} <span style='color: red'> 
          &emsp; &emsp; &emsp;Invalid username: Cannot start with a number.</span>`;
        } else {
          value = `${value} <span style='color: red'> 
          &emsp; &emsp; &emsp;Invalid username: Use 5-30 letters, numbers with no spaces</span>`;
        }
      } else if (value.trim() !== "") {
        value = `${value} <span style='color: green'> &emsp; &emsp; &emsp;PASS</span>`;
      }
    }
    // 9.2. Check if the passwords match
    if (key.toLowerCase().includes("password")) {
      const confirmPassword = document.querySelector("#confirmpassword").value;
      const password = form.querySelector("[name=Password]").value;
      if (key.toLowerCase() == "confirmpassword") {
        const required = form
          .querySelector(`[name=${key}]`)
          .hasAttribute("required");
        if (required && value === "") {
          value = `${value} <span style='color: blue'>Please enter the password again</span>`;
        } else if (value !== password) {
          value = "*******";
          value +=
            " <span style='color: red'>&emsp; &emsp; &emsp;Passwords do not match!</span>";
        } else {
          value = "*******";
          value +=
            " <span style='color: green'>&emsp; &emsp; &emsp;Passwords match!</span>";
        }
      } else if (key.toLowerCase() === "password") {
        const required = form
          .querySelector(`[name=${key}]`)
          .hasAttribute("required");

        if (required && value === "") {
          value = `${value} <span style='color: blue'>This is a required field</span>`;
        } else {
          const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=]).{8,30}$/;
          if (!passwordRegex.test(value)) {
            value = "*******";
            value +=
              " <span style='color: red'>&emsp; &emsp; &emsp;Password must be 8 - 30 characters: at least 1 uppercase letter, 1 number, and 1 special character.</span>";
          } else {
            value = "*******";
            value +=
              " <span style='color: green'>&emsp; &emsp; &emsp;PASS</span>";
          }
        }
      }
    }

    reviewText +=
      "<p><strong>&emsp; &emsp;" +
      key +
      ":</strong>&emsp; &emsp; &emsp; " +
      value +
      "</p>";
  });

  // Close the review text div
  reviewText += "</div>";

  // Open a new popup window and write the review text
  popup = window.open("", "Popup", "width=800, height=1000");
  popup.document.write(
    "<html><head><title>Popup</title></head><body style='background-color: lightblue;'>"
  );
  popup.document.write(reviewText);
}

// 10. Function to display the Pain level input
var slider = document.getElementById("inputRange");
var output = document.getElementById("midvalue");
slider.value;
slider.oninput = function () {
  output.innerHTML = this.value;
};
