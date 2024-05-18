// 定義時間範圍
const startTime = 9; // 開始時間 9 點
const endTime = 18; // 結束時間 6 點

// 建立時間標題
const titles = ["時間/教室", "教室1", "教室2", "教室3", "交誼廳", "三能/線上"];

function createTable(docs, today) {
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");

  const trHead = document.createElement("tr");
  titles.forEach((title) => {
    const th = document.createElement("th");
    th.textContent = title;
    trHead.appendChild(th);
  });
  thead.appendChild(trHead);

  // 將標題行加入表頭
  table.appendChild(thead);

  // 生成每半小時的時間段
  for (let hour = startTime; hour < endTime; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")} - ${(hour + (minute === 30 ? 1 : 0))
        .toString()
        .padStart(2, "0")}:${minute === 30 ? "00" : "30"}`;
      const row = document.createElement("tr");
      const timeCell = document.createElement("td");

      timeCell.textContent = time;
      row.appendChild(timeCell);

      for (let i = 0; i < titles.length - 1; i++) {
        const emptyCell = document.createElement("td");

        docs.forEach((doc) => {
          const todayYear = today.getFullYear();
          const todayMonth = today.getMonth() + 1; // 月份从 0 开始，所以要加 1
          const todayDate = today.getDate();
          // 检查日期是否为今天
          const docDate = new Date(doc["Date"].seconds * 1000);
          const docYear = docDate.getFullYear();
          const docMonth = docDate.getMonth() + 1;
          const docDay = docDate.getDate();

          const isToday =
            todayYear === docYear &&
            todayMonth === docMonth &&
            todayDate === docDay;
          if (isToday) {
            const title = titles[i];

            if (title === doc["Classroom"] && (doc["Sections"].includes(time))) {
              
              
            
              emptyCell.textContent = `${doc["Teacher"] || "N/A"} / ${
                doc["Course"] || "N/A"
              }`;
              
            
            
            

              // if (timeInSections(time, doc["Sections"])) {
              //   emptyCell.textContent = `${doc["Teacher"] || "N/A"} / ${
              //     doc["Course"] || "N/A"
              //   }`;
                // console.log(`${docYear} ${docMonth} ${docDate}`);
                // console.log(title, doc["Classroom"]);
                // console.log(doc["Course"]);
              // }
            }
          }
        });

        row.appendChild(emptyCell);
      }

      // 加入時間行到表格主體
      tbody.appendChild(row);
    }
  }

  // 將表格主體加入表格
  table.appendChild(tbody);

  // 取得現有的時間表格，然後替換為新的時間表格，或者將新的時間表格加入到父元素中
  const existingTable = document.getElementById("timetable");
  if (existingTable) {
    existingTable.parentNode.replaceChild(table, existingTable);
  } else {
    document.getElementById("courseTable").appendChild(table);
  }
}





export { createTable };
