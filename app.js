import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Task 2: Serve static files from the public folder
app.get('/pages/:filename', (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(__dirname, 'public', filename);

    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).send('File not found');
        }
    });
});

// Task 3: Redirect both "/" and "/pages" to "/pages/index.html"
app.get(['/', '/pages'], (req, res) => {
    res.redirect('/pages/index.html');
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});