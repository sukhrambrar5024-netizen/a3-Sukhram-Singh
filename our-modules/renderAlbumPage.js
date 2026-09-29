import data from './data.js';

function renderAlbumPage(bandId, albumId) {
    // 1. Find the correct band
    const band = data.find(b => b.id === bandId);
    if (!band) return null;

    // 2. Find the correct album
    const album = band.topAlbums.find(a => a.id === albumId);
    if (!album) return null;

    // 3. Return the HTML markup using a template literal
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${album.name}</title>
    <link rel="stylesheet" href="/pages/style.css">
</head>
<body>
    <h1>${album.name}</h1>
    <p>Artist: ${band.name}</p>
    <p>Released in: ${album.year}</p>
</body>
</html>`;
}

export default renderAlbumPage;
