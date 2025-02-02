let addbutton = document.getElementById("add");
let box2template = document.querySelector(".box2");
box2template.style.display = "none";

let outerbox = document.querySelector(".outerbox");
let box3 = document.querySelector(".box3");

// Retrieve XP and streak from local storage
let xp = localStorage.getItem("xp") ? parseInt(localStorage.getItem("xp")) : 0;
let streak = localStorage.getItem("streak") ? parseInt(localStorage.getItem("streak")) : 0;
let lastCompletedDate = localStorage.getItem("lastCompletedDate") || null;

document.getElementById("xp-count").textContent = xp;
document.getElementById("streak-count").textContent = streak;

addbutton.addEventListener("click", () => {
    let inputele = document.querySelector(".box3 input[type='text']");
    let inputvalue = inputele.value.trim();

    if (inputvalue === "") {
        alert("Please enter a valid task");
        return;
    }

    // Clone task template
    let clonebox = box2template.cloneNode(true);
    clonebox.style.display = "flex";

    let label = clonebox.querySelector("label");
    label.textContent = inputvalue;  // Fixing the text issue

    inputele.value = "";

    outerbox.insertBefore(clonebox, box3);

    // Add delete functionality
    let deleteButton = clonebox.querySelector("#delete");
    deleteButton.addEventListener("click", () => {
        clonebox.remove();
    });

    // Checkbox functionality
    let clonecheckbox = clonebox.querySelector('input[type="checkbox"]');
    clonecheckbox.addEventListener("click", () => {
        if (clonecheckbox.checked) {
            label.style.textDecoration = "line-through";

            // Add XP only if task is newly completed
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
    });
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
