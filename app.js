import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import data from './our-modules/data.js';
import renderAlbumPage from './our-modules/renderAlbumPage.js'; // <--- Add this import

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
    const band = data.find(b => b.id === bandId);

    if (!band) {
        return res.status(404).json({ error: 'Band not found' });
    }

    res.json(band);
});

// Task 5: Server-rendered album pages
app.get('/music-pages/:bandId/:albumId', (req, res) => {
    const { bandId, albumId } = req.params;
    
    // Call the function we just created
    const html = renderAlbumPage(bandId, albumId);

    if (!html) {
        return res.status(404).send('Album or band not found');
    }

    res.send(html);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});