import { getCourses } from "../api.js";
import { createTable } from "./courseTable.js";
const startTime = 9; // 開始時間 9 點
const endTime = 19; // 結束時間 6 點
var timeNum = 0;
//總共有19個時間選項

document.addEventListener("DOMContentLoaded", function () {
  // 更新下拉菜单内容
  function updateTimeDropdown() {
    var dropdownMenu = document.querySelector("#timeDropdownEnd");
    dropdownMenu.innerHTML = ""; // 清空原有内容
    var numCount = 0;

    for (let hour = startTime; hour < endTime; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
          const time = `${hour.toString().padStart(2, "0")}:${minute
              .toString()
              .padStart(2, "0")}`;
  



          var dropdownItem = document.createElement("li");
          dropdownItem.classList.add("dropdown-item");
          
          
          dropdownItem.value = numCount;
          
          numCount++;

          dropdownItem.innerHTML = time;
          dropdownMenu.appendChild(dropdownItem);
          
          
      }
  }}
  

  // 初始化下拉菜单
  updateTimeDropdown();

  // 點及後處理
  document
    .querySelector("#timeDropdownEnd")
    .addEventListener("click", function (event) {
      var selectedDate = event.target.textContent;

      
      //document.querySelector('#dateDropdown').textContent = selectedDate;

      //選擇後操作~~~~~~~~~~~~~~~~~~
      getCourses().then((docs) => {
        const element = document.getElementById("courseTable");
        element.innerHTML = "";
        const today = Date.parse(event.target.innerHTML);
        const date = new Date(today);
        createTable(docs, date);
      });

      var selection = document.getElementById("timeDropdownEnd");
      function select() {
        
      }
    });

  setInterval(function () {
    updateTimeDropdown();
  }, 600000);
});
