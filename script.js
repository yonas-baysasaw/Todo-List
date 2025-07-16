document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const taskList = document.getElementById("taskList");

  // Load tasks from Local Storage
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function renderTasks() {
    taskList.innerHTML = ""; // Clear current list
    tasks.forEach((task, index) => {
      const listItem = document.createElement("li");
      listItem.setAttribute("data-index", index);

      if (task.isEditing) {
        const editInput = document.createElement("input");
        editInput.type = "text";
        editInput.value = task.text;
        listItem.appendChild(editInput);

        const saveBtn = document.createElement("button");
        saveBtn.textContent = "Save";
        saveBtn.classList.add("save-btn");
        saveBtn.addEventListener("click", () => {
          task.text = editInput.value.trim();
          task.isEditing = false;
          saveTasks();
          renderTasks();
        });
        listItem.appendChild(saveBtn);
      } else {
        const taskTextSpan = document.createElement("span");
        taskTextSpan.textContent = task.text;
        listItem.appendChild(taskTextSpan);

        const actionsDiv = document.createElement("div");
        actionsDiv.classList.add("task-actions");

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList.add("edit-btn");
        editBtn.addEventListener("click", () => {
          tasks[index].isEditing = true;
          renderTasks();
        });
        actionsDiv.appendChild(editBtn);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", () => {
          tasks.splice(index, 1); // Remove task from array
          saveTasks();
          renderTasks();
        });
        actionsDiv.appendChild(deleteBtn);

        listItem.appendChild(actionsDiv);
      }
      taskList.appendChild(listItem);
    });
  }

  // Add a new task
  addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
      tasks.push({ text: taskText, isEditing: false });
      taskInput.value = ""; // Clear input field
      saveTasks();
      renderTasks();
    }
  });

  // Allow adding tasks with Enter key
  taskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      addTaskBtn.click();
    }
  });

  // Initial render
  renderTasks();
});
