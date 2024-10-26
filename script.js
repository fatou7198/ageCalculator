const dayInp = document.getElementById("day");
const monthInp = document.getElementById("month");
const yearInp = document.getElementById("year");

const dayOtp = document.getElementById("DD");
const monthOtp = document.getElementById("MM");
const yearOtp = document.getElementById("YY");

const form = document.querySelector("form");

const date = new Date();
let currentDay = date.getDate();
let currentMonth = 1 + date.getMonth();
let currentYear = date.getFullYear();

const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// Function to restrict input to numbers only
function restrictInputToNumbers(event) {
  const charCode = event.which ? event.which : event.keyCode;
  if (charCode < 48 || charCode > 57) {
    event.preventDefault();
  }
}

// Add event listeners to restrict input to numbers only
dayInp.addEventListener("keypress", restrictInputToNumbers);
monthInp.addEventListener("keypress", restrictInputToNumbers);
yearInp.addEventListener("keypress", restrictInputToNumbers);

function validate() {
  const inputs = document.querySelectorAll("input");
  let validator = true;

  inputs.forEach((i) => {
    const parent = i.parentElement;
    if (!i.value) {
      i.style.borderColor = "red";
      parent.querySelector("small").innerText = "This field is required.";
      validator = false;
    } else if (isNaN(i.value)) {
      i.style.borderColor = "red";
      parent.querySelector("small").innerText = "Must be a valid number.";
      validator = false;
    } else {
      i.style.borderColor = "black";
      parent.querySelector("small").innerText = "";
    }
  });

  // Additional validation for month and day
  if (monthInp.value > 12 || monthInp.value < 1) {
    monthInp.style.borderColor = "red";
    monthInp.parentElement.querySelector("small").innerText =
      "Must be a valid month.";
    validator = false;
  }

  const inputMonth = monthInp.value ? parseInt(monthInp.value) : 1;
  if (
    dayInp.value > 31 ||
    dayInp.value < 1 ||
    dayInp.value > months[inputMonth - 1]
  ) {
    dayInp.style.borderColor = "red";
    dayInp.parentElement.querySelector("small").innerText =
      "Must be a valid day.";
    validator = false;
  }

  if (yearInp.value > currentYear || yearInp.value < 1) {
    yearInp.style.borderColor = "red";
    yearInp.parentElement.querySelector("small").innerText =
      "Must be a valid year.";
    validator = false;
  }

  return validator;
}

function handleSubmit(e) {
  e.preventDefault();
  if (validate()) {
    let inputDay = parseInt(dayInp.value);
    let inputMonth = parseInt(monthInp.value);
    let inputYear = parseInt(yearInp.value);

    let calculatedDay = currentDay;
    let calculatedMonth = currentMonth;
    let calculatedYear = currentYear;

    if (inputDay > calculatedDay) {
      calculatedDay +=
        months[calculatedMonth - 2 < 0 ? 11 : calculatedMonth - 2];
      calculatedMonth -= 1;
    }
    if (inputMonth > calculatedMonth) {
      calculatedMonth += 12;
      calculatedYear -= 1;
    }

    const d = calculatedDay - inputDay;
    const m = calculatedMonth - inputMonth;
    const y = calculatedYear - inputYear;

    dayOtp.innerHTML = Math.abs(d);
    monthOtp.innerHTML = Math.abs(m);
    yearOtp.innerHTML = Math.abs(y);
  }
}

form.addEventListener("submit", handleSubmit);
