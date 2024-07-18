let form = document.querySelector(".input-form");

let formDiv = document.querySelector(".input-div");

let insertTask = document.querySelector(".taskShowcase");

let completeTask = document.querySelector(".taskCompleted");

let input = document.querySelector(".task-input");

let date = document.querySelector("#date-input");

let today = new Date();

date.setAttribute("min", `${today.toISOString().slice(0, 10).toString()}`);
date.setAttribute("max", `${(today.getFullYear() + 1).toString()}-01-01`);

let cardHeader = false;

let completeCardHeader = false;

function showCardHeader() {
  let showListHeader = document.querySelector(".sub-header");
  let showCompleteListHeader = document.querySelector(".sub-header-complete");
  if (cardHeader === true) {
    showListHeader.style.display = "block";
  } else {
    showListHeader.style.display = "none";
  }

  if (completeCardHeader === true) {
    showCompleteListHeader.style.display = "block";
  } else {
    showCompleteListHeader.style.display = "none";
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let errorMsg = document.createElement("p");
  errorMsg.classList.add("handle-error");
  errorMsg.innerHTML = "* A required field cannot be empty.";
  let task;
  if (!task) {
    if (input.value === " ") {
      formDiv.appendChild(errorMsg);
      setTimeout(function () {
        input.value = "";
        date.value = "";
        formDiv.removeChild(errorMsg);
      }, 2500);
    } else {
      task = input.value;
      let curdate = new Date(date.value).toDateString();
      let btn = document.querySelector(".submit");
      btn.addEventListener("click", addTaskCard(task, curdate));
    }
  }
});

completedCard();

function addTaskCard(task, curdate) {
  input.value = "";
  date.value = "";

  let card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
    <input type="radio" name="taskCompleted" id="input-radio" />
          <h3 class="insertTask">${task}</h3>
          <h5 class="date">${curdate}</h5>
          <h3 class="deleteTitle"> <img class="trash" src="./images/trash.svg" alt="Delete Button" /></h3>
`; //Delete
  insertTask.appendChild(card);

  if (insertTask.children[1]) {
    cardHeader = true;
    showCardHeader();
  }
}

function removeCard() {
  insertTask.addEventListener("click", (e) => {
    if (e.target.className === "trash") {
      if (e.target.parentNode.parentNode.className == "card") {
        e.target.parentNode.parentNode.remove();

        if (insertTask.children[1] === undefined) {
          cardHeader = false;
          showCardHeader();
        }
      }
    }
  });
}

removeCard();

function removeCompleteCard() {
  completeTask.addEventListener("click", (e) => {
    if (e.target.className === "trash") {
      if (e.target.parentNode.parentNode.className == "card card-complete") {
        e.target.parentNode.parentNode.remove();
      }

      if (completeTask.children[1] === undefined) {
        completeCardHeader = false;
        showCardHeader();
      }
    }
  });
}
removeCompleteCard();

function completedCard() {
  insertTask.addEventListener("click", (e) => {
    if (e.target.id === "input-radio") {
      let userTask = Array.from(e.target.parentNode.children);

      let completeCard = document.createElement("div");
      completeCard.classList.add("card");
      completeCard.classList.add("card-complete");
      completeCard.innerHTML = `
            <h3 class="completedTask">${userTask[1].innerText}</h3>
            <h5 class="date">${userTask[2].innerText}</h5>
            <h3 class="deleteTitle"> <img class="trash" src="./images/trash.svg" alt="Delete Button" /></h3>
  `; //Delete

      completeTask.appendChild(completeCard);

      if (e.target.parentNode.className == "card") {
        e.target.parentNode.remove();
      }

      if (completeTask.children[1]) {
        completeCardHeader = true;
        showCardHeader();
      }

      if (insertTask.children[1] === undefined) {
        cardHeader = false;
        showCardHeader();
      }
    }
  });
}
