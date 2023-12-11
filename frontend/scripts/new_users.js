const url = "http://localhost:8083/api/users";
const inputElms = {
  form: document.querySelector("form"),
  name: document.getElementById("name"),
  username: document.getElementById("username"),
  password: document.getElementById("password"),
  passwordVer: document.getElementById("passwordVer"),
};
​
//--- Main Logic ---
inputElms.form.addEventListener("submit", async (event) => {
  event.preventDefault();
​
  const name = inputElms.name.value;
  const username = inputElms.username.value;
  const password = inputElms.password.value;
  const passwordVer = inputElms.passwordVer.value;
​
  if (password != passwordVer) {
    toastUser("Passwords must match");
    return;
  }
​
  const response = await fetch(url, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({ name, username, password }),
  });
​
  statusCodeHandler(response.status);
});
​
//--- Handle & Utility Functions ---
function statusCodeHandler(statusCode) {
  if (statusCode != 200) {
    toastUser("Username already exists");
  } else {
    window.location.href = `./todos.html?newUserSuccess=true`;
  }
}
​
function toastUser(msg) {
  const toastElem = document.getElementById("toast");
  const toastMsgElem = document.getElementById("toastMsg");
  const toast = bootstrap.Toast.getOrCreateInstance(toastElem); //not sure how this actually works
​
  toastMsgElem.innerText = msg;
  toast.show();
}