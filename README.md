# Instagram Tesxt Scraper

This repository contains the code for a simple Instagram text scraper application built using React for the client-side and Node.js (Express) for the server-side. The application allows users to input an Instagram URL and fetch the text content from the caption of the Instagram post.

### Features

- Enter an Instagram URL to scrape text content.
- Fetches the text from the first `<h1>` tag found on the Instagram page.
- Displays the fetched text on the web page.
- Handles errors and notifies users of any issues using [Sonner]('https://sonner.emilkowal.ski/).

### Technologies Used

- Frontend: React
- Backend: Node.js with Express
- Puppeteer for web scraping

### Usage

1. Clone the repository.
2. Navigate to the `client` directory and run `npm install` to install dependencies.
3. Navigate to the `server` directory and run `npm install` to install server dependencies.
4. Start the client and server:
   - For client: `npm start`
   - For server: `npm start`
5. Access the application in your browser at the specified port on the terminal.

## Contributing

Contributions are welcome. Please fork the repository and submit pull requests...

### Notes

- Ensure Node.js is installed on your machine to run the server.
- The client and server communicate via HTTP requests to fetch and display Instagram text content.
- Error handling is implemented to manage invalid URLs or failed scrapes.

## Links

[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/marti%C3%B1o-/)
[![Portfolio](https://img.shields.io/badge/web%20portfolio-%23519Faa.svg?&style=for-the-badge&logoColor=white)](https://adrian-anta.netlify.app/)
