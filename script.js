let dt = new Date();
fetchtask();
document.querySelector('#addlist').onclick = function () {
    if (document.querySelector('#item').value.length == 0) {
        alert("Enter a Task");
    }
    else {
        let todos = localStorage.getItem("todos");
        if (todos) {
            let task = JSON.parse(todos);
            task.push({ title: document.querySelector('#item').value })
            localStorage.setItem("todos", JSON.stringify(task));
        }
        else {
            let task = [];
            task.push({ title: document.querySelector('#item').value })
            localStorage.setItem("todos", JSON.stringify(task));
        }
        document.querySelector("#item").value = "";
        fetchtask();
    }
}
function fetchtask() {
    let tasks = JSON.parse(localStorage.getItem("todos"));
    for (let i = 0; i < tasks.length; i++) {
        document.querySelector('#contents').innerHTML += `
            <div class="task">
            <span id = "taskname">
                ${tasks[i].title}
            </span>
            <button class = "delete">
            <i class="fas fa-trash-alt"></i>
            </button>
            </div>
            `;
    }
    let current_task = document.querySelectorAll(".delete");
    for (let i = 0; i < current_task.length; i++) {
        current_task[i].onclick = function () {
            this.parentNode.remove();
        }
    }
    let task1 = document.querySelectorAll(".task")
    for (let i = 0; i < task1.length; i++) {
        task1[i].onclick = function () {
            this.classList.toggle('completed')
        }
    }
}
function CurrentDat() {
    let today = new Date();
    const endDate = new Date(
        dt.getFullYear(),
        dt.getMonth() + 1,
        0
    ).getDate();
    const prevMonth = new Date(
        dt.getFullYear(),
        dt.getMonth(),
        0
    ).getDate();
    const nextMonth = new Date(
        dt.getFullYear(),
        dt.getMonth() + 2,
        0
    ).getDate();
    const Months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    const curr = new Date();
    document.getElementById("prsnt_date").innerHTML = curr.toDateString();
    document.getElementById("month").innerHTML = Months[dt.getMonth()];

    let cell = "";
    let x = dt;
    x.setDate(1);
    let day = x.getDay();
    console.log(day);
    for (let i = day - 1; i >= 0; i--)
        cell += "<div class = 'p_date'>" + parseInt(prevMonth - i) + "</div>";

    for (let i = 1; i <= endDate; i++) {
        if (i === today.getDate() && dt.getMonth() === today.getMonth() && today.getFullYear() === dt.getFullYear())
            cell += "<div class = 'today'>" + i + "</div>";
        else
            cell += "<div>" + i + "</div>";
    }

    const remainDate = parseInt(7 - ((day + endDate) % 7));
    for (let i = 1; i <= remainDate; i++)
        cell += "<div class = 'n_date'>" + i + "</div>";

    document.getElementsByClassName("dates")[0].innerHTML = cell;

}
function ChangeDate(value) {
    if (value === 'prev')
        dt.setMonth(dt.getMonth() - 1);
    else
        dt.setMonth(dt.getMonth() + 1);
    CurrentDat();
}
setInterval(() => {
    const d = new Date();
    let hrs = d.getHours();
    let min = d.getMinutes();
    let sec = d.getSeconds();
    let H_rot = 30 * hrs + min / 2;
    let M_rot = 6 * min;
    let S_rot = 6 * sec;

    hour.style.transform = `rotate(${H_rot}deg)`;
    minute.style.transform = `rotate(${M_rot}deg)`;
    second.style.transform = `rotate(${S_rot}deg)`;
    document.querySelector(".time").innerHTML = `${hrs}:${min}:${sec}`
}, 1000)