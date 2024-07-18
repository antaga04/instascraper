import axios from 'axios';
import React, { useState } from 'react';
import { Toaster, toast } from 'sonner';
import './App.css';
import Footer from './components/Footer';
import InputForm from './components/InputForm';
import ResultDisplay from './components/ResultDisplay';

const CACHE_EXPIRATION_TIME = 5 * 60 * 1000;

function App() {
  const [text, setText] = useState('');

  const fetchText = async (url, clearInput) => {
    const currentTime = new Date().getTime();
    const cachedData = JSON.parse(localStorage.getItem('insta_captions') || '[]');

    const cachedItem = cachedData.find((item) => item.url === url);
    if (cachedItem && currentTime - cachedItem.timestamp < CACHE_EXPIRATION_TIME) {
      setText(cachedItem.data);
      toast.success('Text fetched from cache!');
      return;
    }

    const fetchData = () => axios.post('http://localhost:5001/scrape', { url });

    toast.promise(fetchData(), {
      loading: 'Loading...',
      success: (response) => {
        setText(response.data.text);
        const newCacheItem = {
          url: url,
          data: response.data.text,
          timestamp: currentTime,
        };
        const updatedCache = [...cachedData, newCacheItem];
        localStorage.setItem('insta_captions', JSON.stringify(updatedCache));
        clearInput();
        return 'Text fetched successfully!';
      },
      error: (error) => {
        console.error('Error fetching the text:', error);
        if (error.response && error.response.data && error.response.data.error) {
          return error.response.data.error;
        }
        return 'Failed to fetch text. Please try again.';
      },
    });
  };

  return (
    <>
      <Toaster position="top-center" richColors expand closeButton />
      <main className="">
        <h1>Instagram Caption Text Scraper</h1>
        <InputForm onFetchText={fetchText} />
        {text && <ResultDisplay text={text} />}
      </main>
      <Footer />
    </>
  );
}

export default App;
