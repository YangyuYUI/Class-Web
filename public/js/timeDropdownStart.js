import { getCourses } from "../api.js";
import { createTable } from "./courseTable.js";
const startTime = 9; // 開始時間 9 點
const endTime = 18; // 結束時間 6 點

document.addEventListener("DOMContentLoaded", function () {
  // 更新下拉菜单内容
  function updateTimeDropdown() {
    var dropdownMenu = document.querySelector("#timeDropdownStart");
    dropdownMenu.innerHTML = ""; // 清空原有内容
    
    for (let hour = startTime; hour < endTime; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
          const time = `${hour.toString().padStart(2, "0")}:${minute
              .toString()
              .padStart(2, "0")}`;
  
          var dropdownItem = document.createElement("li");
          dropdownItem.classList.add("dropdown-item");
          dropdownItem.innerHTML = `<a class="dropdown-item" href="#">${time}</a>`;
          dropdownMenu.appendChild(dropdownItem);
      }
  }}
  

  // 初始化下拉菜单
  updateTimeDropdown();

  // 點及後處理
  document
    .querySelector("#timeDropdownStart")
    .addEventListener("click", function (event) {
      var selectedDate = event.target.textContent;

      alert(event.target.innerHTML);
      //document.querySelector('#dateDropdown').textContent = selectedDate;

      //選擇後操作~~~~~~~~~~~~~~~~~~
      getCourses().then((docs) => {
        const element = document.getElementById("courseTable");
        element.innerHTML = "";
        const today = Date.parse(event.target.innerHTML);
        const date = new Date(today);
        createTable(docs, date);
      });

      var selection = document.getElementById("timeDropdownStart");
      function select() {
        alert(selection.options[selection.selectedIndex].value);
      }
    });

  setInterval(function () {
    updateTimeDropdown();
  }, 600000);
});
