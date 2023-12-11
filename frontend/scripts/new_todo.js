window.onload = () => {
  let todoForm = document.getElementById("todo-form");
  let userSelectEl = document.getElementById("user-select");
  let categorySelectEl = document.getElementById("category-select");
  let prioritySelectEl = document.getElementById("priority-select");
  let descriptionContainerEl = document.getElementById("description-container");
  let deadlineInputEl = document.getElementById("deadline-input");

  getUsers();
  getCategories();

  todoForm.onsubmit = (e) => {
    e.preventDefault();

    let todoFormData = {
      userid: userSelectEl.value,
      category: categorySelectEl.value,
      priority: prioritySelectEl.value,
      description: descriptionContainerEl.value,
      deadline: deadlineInputEl.value,
    };

    fetch(`http://localhost:8083/api/todos`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(todoFormData),
    })
      .then((res) => res.json())
      .then((todo) => {
        console.log("To do created succesfully");
        location.href = `./todos.html`;
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

//  helper functions

let getUsers = () => {
  fetch("http://localhost:8083/api/users")
    .then((res) => res.json())
    .then((users) => {
      let userSelectEl = document.getElementById("user-select");

      for (let user of users) {
        let userOption = new Option(user.name, user.id);
        userSelectEl.appendChild(userOption);
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

let getCategories = () => {
  fetch("http://localhost:8083/api/categories")
    .then((res) => res.json())
    .then((categories) => {
      console.log(categories);
      for (let category of categories) {
        let categorySelectEl = document.getElementById("category-select");
        let categoryOption = new Option(category.name);

        categorySelectEl.appendChild(categoryOption);
      }
    })
    .catch((err) => {
      console.error(err);
    });
};
