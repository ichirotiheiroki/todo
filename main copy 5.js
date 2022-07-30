const form = document.querySelector("#form"), taskInput = document.querySelector("#taskInput"), tasksList = document.querySelector("#tasksList"), emptyList = document.querySelector("#emptyList"); let tasks = []; function addTask(b) { b.preventDefault(); let c = taskInput.value, a = { id: Date.now(), text: c, done: !1 }; tasks.push(a), saveLocaleStorage(), renderTask(a), taskInput.value = "", taskInput.focus(), checkEmptyList() } function deleteTask(a) { if ("delete" !== a.target.dataset.action) return; let b = a.target.closest("li"), d = Number(b.id), c = tasks.findIndex(function (a) { return a.id === d }); tasks.splice(c, 1), saveLocaleStorage(), b.remove(), checkEmptyList() } function doneTask(b) { if ("done" === b.target.dataset.action) { let a = b.target.closest("li"), e = a.id, c = tasks.find(function (a) { if (a.id === +e) return !0 }); c.done = !c.done, saveLocaleStorage(); let d = a.querySelector("span"); d.classList.toggle("task-title--done"), a.style.backgroundColor.toggle = "#d1e7b8" } } function checkEmptyList() { if (0 === tasks.length) { let b = `<li id="emptyList" class="list-group-item empty-list"><img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3"><div class="empty-list__title">Список дел пуст</div></li>`; tasksList.insertAdjacentHTML("afterbegin", b) } if (tasks.length > 0) { let a = document.querySelector("#emptyList"); a && a.remove() } } function saveLocaleStorage() { localStorage.setItem("tasks", JSON.stringify(tasks)) } function renderTask(a) { let b = a.done ? "task-title task-title--done" : "task-title", c = `<li id="${a.id}" class="list-group-item d-flex justify-content-between task-item"><span class="${b}">${a.text}</span><div class="task-item__buttons"><button type="button" data-action="done" class="btn-action"><img src="./img/tick.svg" alt="Done" width="18" height="18"></button><button type="button" data-action="delete" class="btn-action"><img src="./img/cross.svg" alt="Done" width="18" height="18"></button></div></li>`; tasksList.insertAdjacentHTML("beforeend", c) } localStorage.getItem("tasks") && (tasks = JSON.parse(localStorage.getItem("tasks"))).forEach(function (a) { renderTask(a) }), checkEmptyList(), form.addEventListener("submit", addTask), tasksList.addEventListener("click", deleteTask), tasksList.addEventListener("click", doneTask)