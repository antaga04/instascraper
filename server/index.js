const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const puppeteer = require('puppeteer');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 15,
  message: {
    error: 'Too many requests here, please try again later.',
    info: 'You get 15 requests every 15 minutes.',
  },
});

app.use(limiter);

app.get('/', async (req, res) => {
  res.send('Server running!');
});

app.post('/scrape', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForSelector('h1');

    const result = await page.evaluate(() => {
      const h1Element = document.querySelector('h1');
      return h1Element ? h1Element.innerText : 'No text found';
    });

    await browser.close();

    const formattedText = result.replace(/\n/g, '<br>');

    res.json({ text: formattedText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to scrape the URL' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
