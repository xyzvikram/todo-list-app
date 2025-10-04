// Load saved tasks from local storage
document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskValue = taskInput.value.trim();
  
  if (taskValue === "") return;

  const li = document.createElement("li");
  li.textContent = taskValue;

  // Mark completed on click
  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  // Delete button
  const delBtn = document.createElement("button");
  delBtn.textContent = "❌";
  delBtn.style.marginLeft = "10px";
  delBtn.addEventListener("click", () => {
    li.remove();
    saveTasks();
  });

  li.appendChild(delBtn);
  document.getElementById("taskList").appendChild(li);

  taskInput.value = "";
  saveTasks();
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({
      text: li.firstChild.textContent,
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => {
    const li = document.createElement("li");
    li.textContent = task.text;
    if (task.completed) li.classList.add("completed");

    li.addEventListener("click", () => {
      li.classList.toggle("completed");
      saveTasks();
    });

    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.style.marginLeft = "10px";
    delBtn.addEventListener("click", () => {
      li.remove();
      saveTasks();
    });

    li.appendChild(delBtn);
    document.getElementById("taskList").appendChild(li);
  });
}