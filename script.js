const inputBox = document.getElementById("input-box");
const todoList = document.getElementById("todo-list");
const completedList = document.getElementById("completed-list");
const todoSection = document.getElementById("todo-section");
const completedTitle = document.getElementById("completed-title");
const todoTitle = document.getElementById("todo-title");
const emptyTodoMessage = document.getElementById("empty-todo-message");

function addlist() {
    if (inputBox.value === '') {
        alert("Silahkan Isi List Terlebih Dahulu");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        todoList.appendChild(li);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    updateSections();
    saveData();
}

document.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        if (e.target.parentElement.id === "todo-list") {
            e.target.classList.add("checked");
            completedList.appendChild(e.target);
        } else {
            e.target.classList.remove("checked");
            todoList.appendChild(e.target);
        }
        updateSections();
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        updateSections();
        saveData();
    }
});

function updateSections() {
    // Untuk To Do
    if (todoList.children.length === 0) {
        todoSection.style.display = "none";  // Sembunyikan section To do jika kosong
    } else {
        todoSection.style.display = "block";  // Tampilkan section To do jika ada tugas
    }

    // Untuk Completed
    if (completedList.children.length === 0) {
        completedTitle.style.display = "none";  // Sembunyikan judul Completed jika kosong
    } else {
        completedTitle.style.display = "block";  // Tampilkan judul Completed jika ada tugas
    }

    // Pesan jika To do kosong
    if (todoList.children.length === 0) {
        emptyTodoMessage.style.display = "block";  // Tampilkan pesan kosong
    } else {
        emptyTodoMessage.style.display = "none";  // Sembunyikan pesan kosong
    }
}

function saveData() {
    localStorage.setItem("todoData", todoList.innerHTML);
    localStorage.setItem("completedData", completedList.innerHTML);
}

function showTask() {
    todoList.innerHTML = localStorage.getItem("todoData") || "";
    completedList.innerHTML = localStorage.getItem("completedData") || "";
    updateSections();
}

showTask();
