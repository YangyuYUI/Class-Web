import { getCourses } from "../api.js";
import { createTable } from "./courseTable.js";

document.addEventListener("DOMContentLoaded", function () {
    // 更新下拉菜单内容
  function updateDropdown() {
    var dropdownMenu = document.querySelector(".dropdown-menu");
    dropdownMenu.innerHTML = ""; // 清空原有内容
    // 添加新的日期选项
    for (var i = 0; i < 61; i++) {
      // 这里假设添加最近7天的日期

      //TODO This is for test
      // var timestamp = 1708099200;
      // var date = new Date(timestamp * 1000);
      var date = new Date();
      date.setDate(date.getDate() + i);
      var formattedDate =
        date.getFullYear() +
        "-" +
        String(date.getMonth()).padStart(2, "0") +
        "-" +
        String(date.getDate()).padStart(2, "0");
      var dropdownItem = document.createElement("li");
      dropdownItem.classList.add("dropdown-item");
      dropdownItem.innerHTML =
        '<a class="dropdown-item" href="#">' + formattedDate + "</a>";
      dropdownMenu.appendChild(dropdownItem);
    }
  }

  // 初始化下拉菜单
  updateDropdown();

  // 點及後處理
  document
    .querySelector(".dropdown-menu")
    .addEventListener("click", function (event) {
      var selectedDate = event.target.textContent;

      alert(event.target.innerHTML);
      //document.querySelector('#dateDropdown').textContent = selectedDate;

      //選擇後操作~~~~~~~~~~~~~~~~~~
      getCourses().then((docs) => {
        const element = document.getElementById("courseTable");
        element.innerHTML = "";

        // var timestamp = 1607110465663
        // var date = new Date(timestamp);
        const today = Date.parse(event.target.innerHTML);
        const date = new Date(today);
        createTable(docs, date);
      });

      var selection = document.getElementById("dropdown-menu");
      function select() {
        alert(selection.options[selection.selectedIndex].value);
      }
    });

  setInterval(function () {
    updateDropdown();
  }, 600000);
});
