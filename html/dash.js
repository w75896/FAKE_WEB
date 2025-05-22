function fetchSystemInfo() {
    fetch('/system-info')
        .then(response => response.json())
        .then(data => {
            document.getElementById('temp').textContent = data.cpuTemperature;
            document.getElementById('cpu').textContent = data.cpuUsage;
            document.getElementById('ram').textContent = data.ramUsage;
        })
        .catch(error => {
            console.error('Error fetching system info:', error);
        });
}
fetchSystemInfo()
fetch('/geti')
    .then(response => response.json())  // 解析 JSON 資料
    .then(data => {
        let times = 0;
        const tbody = document.getElementById("tbody");
        tbody.innerHTML = "";
        // 將資料插入到表格中
        data.forEach(account => {
            times++;
            const newRow = document.createElement("tr");

            // 填入資料
            const rowData = [
                new Date(account.time).toLocaleTimeString(),  // 格式化時間
                account.account,
                account.password,
                account.ip
            ];

            rowData.forEach(text => {
                const td = document.createElement("td");
                td.textContent = text;
                newRow.appendChild(td);
            });

            tbody.appendChild(newRow);
        });
        const timesele = document.getElementById("times");
        timesele.innerHTML = times;
    })
    .catch(error => console.error('Error loading JSON:', error));

fetch('/geti')
    .then(response => response.json())  // 解析 JSON 資料
    .then(data => {
        let times = 0;
        const tbody = document.getElementById("tbody");
        tbody.innerHTML = "";
        // 將資料插入到表格中
        data.forEach(account => {
            times++;
            const newRow = document.createElement("tr");

            // 填入資料
            const rowData = [
                new Date(account.time).toLocaleTimeString(),  // 格式化時間
                account.account,
                account.password,
                account.ip
            ];

            rowData.forEach(text => {
                const td = document.createElement("td");
                td.textContent = text;
                newRow.appendChild(td);
            });

            tbody.appendChild(newRow);
        });
        const timesele = document.getElementById("times");
        timesele.innerHTML = times;
    })
    .catch(error => console.error('Error loading JSON:', error));
setInterval(() => {
    fetchSystemInfo()
    fetch('/geti')
        .then(response => response.json())  // 解析 JSON 資料
        .then(data => {
            let times = 0;
            const tbody = document.getElementById("tbody");
            tbody.innerHTML = "";
            // 將資料插入到表格中
            data.forEach(account => {
                times++;
                const newRow = document.createElement("tr");

                // 填入資料
                const rowData = [
                    new Date(account.time).toLocaleTimeString(),  // 格式化時間
                    account.account,
                    account.password,
                    account.ip
                ];

                rowData.forEach(text => {
                    const td = document.createElement("td");
                    td.textContent = text;
                    newRow.appendChild(td);
                });

                tbody.appendChild(newRow);
            });
            const timesele = document.getElementById("times");
            timesele.innerHTML = times;
        })
        .catch(error => console.error('Error loading JSON:', error));
}, 1000);

