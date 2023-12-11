fetch("http://localhost:8083/api/todos")
  .then((response) => response.json())
  .then((data) => {
    const userSelect = document.getElementById("user-select");
    const taskList = document.getElementById("task-list");

    const uniqueUserIds = new Set();

    data.forEach((task) => {
      uniqueUserIds.add(Number(task.userid));
    });

    const sortedUserIds = Array.from(uniqueUserIds).sort((a, b) => a - b);

    sortedUserIds.forEach((userId) => {
      const option = new Option(userId, userId);
      userSelect.appendChild(option);
    });

    userSelect.addEventListener("change", () => {
      const selectedUserId = userSelect.value;

      const filteredTasks = data.filter(
        (task) => task.userid == selectedUserId
      );

      taskList.innerHTML = "";

      filteredTasks.forEach((task) => {
        const taskItem = document.createElement("li");
        taskItem.textContent = task.description;
        taskList.appendChild(taskItem);
      });
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });
