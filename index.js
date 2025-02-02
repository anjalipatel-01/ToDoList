let addbutton = document.getElementById("add");
let box2template = document.querySelector(".box2");
box2template.style.display = "none";

let outerbox = document.querySelector(".outerbox");
let box3 = document.querySelector(".box3");

// Retrieve XP and streak from local storage
let xp = localStorage.getItem("xp") ? parseInt(localStorage.getItem("xp")) : 0;
let streak = localStorage.getItem("streak") ? parseInt(localStorage.getItem("streak")) : 0;
let lastCompletedDate = localStorage.getItem("lastCompletedDate") || null;
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

document.getElementById("xp-count").textContent = xp;
document.getElementById("streak-count").textContent = streak;

// Function to save tasks to localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to create a task element
function createTaskElement(taskText, completed = false) {
    let clonebox = box2template.cloneNode(true);
    clonebox.style.display = "flex";

    let label = clonebox.querySelector("label");
    label.textContent = taskText;

    let deleteButton = clonebox.querySelector("#delete");
    deleteButton.addEventListener("click", () => {
        tasks = tasks.filter(task => task.text !== taskText);
        saveTasks();
        clonebox.remove();
    });

    let checkbox = clonebox.querySelector('input[type="checkbox"]');
    checkbox.checked = completed;
    if (completed) {
        label.style.textDecoration = "line-through";
    }

    checkbox.addEventListener("click", () => {
        if (checkbox.checked) {
            label.style.textDecoration = "line-through";
            if (!clonebox.classList.contains("completed")) {
                xp += 10;
                document.getElementById("xp-count").textContent = xp;
                localStorage.setItem("xp", xp);
                clonebox.classList.add("completed");
                updateStreak();
            }
        } else {
            label.style.textDecoration = "none";
            clonebox.classList.remove("completed");
        }
        tasks = tasks.map(task => task.text === taskText ? { text: task.text, completed: checkbox.checked } : task);
        saveTasks();
    });

    outerbox.insertBefore(clonebox, box3);
}

// Load saved tasks
tasks.forEach(task => createTaskElement(task.text, task.completed));

addbutton.addEventListener("click", () => {
    let inputele = document.querySelector(".box3 input[type='text']");
    let inputvalue = inputele.value.trim();

    if (inputvalue === "") {
        alert("Please enter a valid task");
        return;
    }

    tasks.push({ text: inputvalue, completed: false });
    saveTasks();
    createTaskElement(inputvalue);
    inputele.value = "";
});

// Function to update task streaks
function updateStreak() {
    let today = new Date().toDateString();

    if (lastCompletedDate !== today) {
        streak += 1;
        lastCompletedDate = today;
        localStorage.setItem("streak", streak);
        localStorage.setItem("lastCompletedDate", lastCompletedDate);
        document.getElementById("streak-count").textContent = streak;
    }
}
