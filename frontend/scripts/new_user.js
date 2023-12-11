const url = "http://localhost:8083/api/users";
const inputElms = {
  form: document.querySelector("form"),
  name: document.getElementById("name"),
  username: document.getElementById("username"),
  password: document.getElementById("password"),
  passwordVer: document.getElementById("passwordVer"),
};

//--- Main Logic ---
inputElms.form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const newUserData = {
    name: inputElms.name.value,
    username: inputElms.username.value,
    password: inputElms.password.value,
    passwordVer: inputElms.passwordVer.value,
  };

  if (newUserData.password != newUserData.passwordVer) {
    toastUser("Passwords must match");
    return;
  }

  const {status} = await fetch(url, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(newUserData),
  });

  statusCodeHandler(status);
});

//--- Handle & Utility Functions ---
function statusCodeHandler(statusCode) {
  if (statusCode != 200) {
    toastUser("Username already exists");
  } else {
    window.location.href = `./todos.html?newUserSuccess=true`;
  }
}

function toastUser(msg) {
  const toastElem = document.getElementById("toast");
  const toastMsgElem = document.getElementById("toastMsg");
  const toast = bootstrap.Toast.getOrCreateInstance(toastElem); //not sure how this actually works

  toastMsgElem.innerText = msg;
  toast.show();
}