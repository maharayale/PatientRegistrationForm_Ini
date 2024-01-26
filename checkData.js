/* 
 Purpose:checkData.js code, 
 - enable the users conveniently reviewing the data they entered by cliking the 'CheckData' button that expands the check data table
 at the bottom of the main page. 
 - The table will display the data name, data type and the value entered. 
 - It is designed not to display the row if no value entered.
 by: Ma Ya
Last Updated: 11/10/2023
 */

function checkData() {
  // Get all input elements within the form
  const inputs = document.querySelectorAll(
    "#myForm input[type='text'], #myForm input[type='date'], #myForm input[type='checkbox'], #myForm input[type='radio']:checked, #myForm select, #myForm input[type='range']"
  );

  // Create the table structure
  const table = document.createElement("table");
  table.classList.add("output");
  table.style.width = "1490px";
  table.style.borderCollapse = "collapse";
  table.style.backgroundColor = "green";
  table.style.border = "4px double black";
  const tbody = document.createElement("tbody");
  table.appendChild(tbody);
  const headerRow = document.createElement("tr");
  const headerDataname = document.createElement("th");
  headerDataname.textContent = "DATANAME";
  headerDataname.style.color = "yellow";
  headerDataname.style.width = "491px";
  const headerType = document.createElement("th");
  headerType.textContent = "TYPE";
  headerType.style.color = "yellow";
  headerType.style.width = "491px";
  const headerValue = document.createElement("th");
  headerValue.textContent = "VALUE";
  headerValue.style.color = "yellow";
  headerValue.style.width = "491px";
  headerRow.appendChild(headerDataname);
  headerRow.appendChild(headerType);
  headerRow.appendChild(headerValue);
  tbody.appendChild(headerRow);
  inputs.forEach((input) => {
    const name = input.getAttribute("name");
    const label = input.previousElementSibling.textContent;
    let value = input.value;

    if (input.type === "checkbox" && !input.checked) {
      return;
    } else if (input.type === "select-one" && input.selectedIndex === 0) {
      return;
    } else if (input.type === "range" && input.value === "5") {
      return;
    }
    if (input.type === "checkbox") {
      value = "Yes";
    } else if (input.type === "select-one") {
      value = input.options[input.selectedIndex].text;
    }
    if (label && value.trim() !== "") {
      const dataRow = document.createElement("tr");
      dataRow.style.height = "21px";
      const dataname = document.createElement("td");
      dataname.textContent = label.replace(":", "");
      dataname.style.color = "white";
      dataname.style.width = "491px";
      dataname.style.border = "2px double black";
      const type = document.createElement("td");
      type.textContent = input.type === "date" ? "Date" : "Text";
      type.style.color = "white";
      type.style.width = "491px";
      type.style.border = "2px double black";
      const dataValue = document.createElement("td");
      dataValue.textContent = value;
      dataValue.style.color = "white";
      dataValue.style.width = "491px";
      dataValue.style.border = "2px double black";
      const range = document.createElement("td");
      range.textContent = input.type === "range" ? input.value : "";
      dataRow.appendChild(dataname);
      dataRow.appendChild(type);
      dataRow.appendChild(dataValue);
      tbody.appendChild(dataRow);
    }
  });
  const outputformdata = document.getElementById("outputformdata");
  outputformdata.innerHTML = "";
  outputformdata.appendChild(table);
  const result = document.getElementById("result");
  result.textContent = "Data checked successfully.";
}
