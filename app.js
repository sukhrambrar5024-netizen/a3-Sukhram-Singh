import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import data from './our-modules/data.js'; // <--- Add this import

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

// Task 4: API route for bands
app.get('/api/music/:bandId', (req, res) => {
    const { bandId } = req.params;

    // Use the Array.find method to find the band
    const band = data.find(b => b.id === bandId);

    if (!band) {
        return res.status(404).json({ error: 'Band not found' });
    }

    // Send the band as a JSON object
    res.json(band);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});