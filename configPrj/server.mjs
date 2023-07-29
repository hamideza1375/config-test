import path from 'path';
import fs from 'fs';
import ReactDOMServer from 'react-dom/server';
import express from 'express';

const app = express();


app.get('*', (req, res) => {
  const app = ReactDOMServer.renderToString('<div>App</div>');
  const indexFile = path.resolve('./build/index.html');

  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('Oops, better luck next time!');
    }

    return res.send(
      data.replace('<div dir="rtl" id="root"></div>', `<div dir="rtl" id="root">${app}</div>`)
    );
  });
});

app.use(express.static('./build'));

const PORT = process.env.PORT || 3006;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});