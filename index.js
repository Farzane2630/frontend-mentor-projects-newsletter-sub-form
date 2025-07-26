const form = document.querySelector("form");
const emailInput = document.querySelector("#email");
const submitBtn = document.querySelector(".submit-btn");
const errorMsg = document.querySelector(".email-error-message");

const isLocal = location.hostname === "localhost";
// const siteUrl = isLocal ? "http://localhost:8082": "https://frontend-mentor-projects-newsletter.vercel.app/"

// this function shows that email input has a valid type or not
const isEmailValid = () => {
  const reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return reg.test(String(emailInput.value).toLocaleLowerCase());
};

const showError = () => {
  if (emailInput.validity.valueMissing) {
    errorMsg.textContent = "Entered value needs to be an email address.";
  } else if (emailInput.validity.tooShort) {
    errorMsg.textContent = `Email should be at least ${emailInput.minLength} characters; you entered ${emailInput.value.length}.`;
  } else if (!isEmailValid()) {
    errorMsg.textContent = "Entered value needs to be a valid email address.";
  } else {
    errorMsg.textContent = "";
  }
};

emailInput.addEventListener("input", () => {
  showError();
  if (errorMsg.textContent) {
    submitBtn.ariaDisabled = true;
  } else {
    submitBtn.ariaDisabled = false;
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  showError();

  if (isEmailValid() && !errorMsg.textContent) {
    // stimulating server actions
    submitBtn.innerHTML = "Submitting ...";
    submitBtn.ariaDisabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = "Subscribe to monthly newsletter";
      alert("Sign up successfully!");
      window.location.href = isLocal
        ? "http://localhost:8082/success.html"
        : "https://frontend-mentor-projects-newsletter.vercel.app/success.html";
      // form.action = `${siteUrl}/success.html`;
      form.submit();
      form.reset();
    }, 2000);
  } else {
    submitBtn.ariaDisabled = true;
  }
});
