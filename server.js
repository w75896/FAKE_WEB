const http = require('http');
const fs = require('fs');
const path = require('path');

const sendRes = (filePath, res) => {
    const extname = path.extname(filePath);
    let contentType = 'text/plain';

    // 根據副檔名設定正確的 Content-Type
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
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            res.end('找不到資源');
        } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', contentType);
            res.end(data);
        }
    });
};

const server = http.createServer((req, res) => {
    const method = req.method;
    const url = req.url;
    console.log(url, method);

    if (method === 'GET') {
        // 根據 URL 對應到 html 資料夾內的檔案
        let filePath = './html' + url;
        
        // 如果是根目錄，預設導向 index.html
        if (url === '/') {
            filePath = './html/index.html';
        }

        sendRes(filePath, res);
    } else {
        res.statusCode = 405;
        res.setHeader('Content-Type', 'text/plain');
        res.end('方法不允許');
    }
});

const port = 5001;
const ip = '127.0.0.1';
server.listen(port, ip, () => {
    console.log(`Server is running at http://${ip}:${port}`);
});
