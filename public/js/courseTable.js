function createTable(docs, today) {
  // default data
  //firestoreDataDiv.innerHTML = JSON.stringify(docs, null, 4);

  // create table
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");

  // define type tr表格行/th單個 粗體/td可與tbody/footu一起
  const titles = [
    "時間/教室",
    "教室1",
    "教室2",
    "教室3",
    "交誼廳",
    "三能/線上",
  ];

  const trHead = document.createElement("tr");
  titles.forEach((title) => {
    const th = document.createElement("th");
    th.textContent = title;
    trHead.appendChild(th);
  });
  thead.appendChild(trHead);

  const timeRows = {}; // 用來存放各個時間對應的行

  // Sort the docs based on the first section's start time
  docs.sort((a, b) => {
    const timeA = a["Sections"][0].split("-")[0].trim();
    const timeB = b["Sections"][0].split("-")[0].trim();
    return new Date(`2024-01-01 ${timeA}`) - new Date(`2024-01-01 ${timeB}`);
  });

  docs.forEach((doc) => {
    const sections = doc["Sections"] || [];
    const time = sections.length > 0 ? sections[0] : "N/A";

    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth() + 1; // 月份从 0 开始，所以要加 1
    const todayDate = today.getDate();
    // 检查日期是否为今天
    const docDate = new Date(doc["Date"].seconds * 1000);
    const docYear = docDate.getFullYear();
    const docMonth = docDate.getMonth() + 1;
    const docDay = docDate.getDate();
    const isToday =
      todayYear === docYear && todayMonth === docMonth && todayDate === docDay;

    // Check if a row with this time already exists and the date is today
    let tr = timeRows[time];
    if (!tr && isToday) {
      tr = document.createElement("tr");
      timeRows[time] = tr;

      const timeTd = document.createElement("td");
      timeTd.textContent = time;
      tr.appendChild(timeTd);

      titles.slice(1).forEach((title) => {
        const td = document.createElement("td");
        td.textContent = "."; // Set default value to '.'
        tr.appendChild(td);
      });
    }

    // Populate the cells for Classroom, Teacher, and Course if the date is today
    if (isToday) {
      titles.slice(1).forEach((title, index) => {
        const td = tr.children[index + 1]; // Skip the first td for time
        if (title === doc["Classroom"]) {
          td.textContent = `${doc["Teacher"] || "N/A"} / ${
            doc["Course"] || "N/A"
          }`;
        }
      });
    }

    if (isToday) {
      tbody.appendChild(tr);
    }
  });
  table.innerHTML = "";
  table.appendChild(thead);
  table.appendChild(tbody);

  // replace the existing table with the new one
  const existingTable = document.getElementById("timetable");
  if (existingTable) {
    existingTable.parentNode.replaceChild(table, existingTable);
  } else {
    document.getElementById("courseTable").appendChild(table);
  }
}

export { createTable };
