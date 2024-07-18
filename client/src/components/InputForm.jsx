import React, { useState } from 'react';
import { toast } from 'sonner';

const InputForm = ({ onFetchText }) => {
  const [url, setUrl] = useState('');
  const [isValid, setIsValid] = useState(null);
  const [hasBlurred, setHasBlurred] = useState(false);

  const clearInput = () => {
    setUrl('');
    setIsValid(null);
    setHasBlurred(false);
  };

  const handleClick = () => {
    setIsValid(null);
    setHasBlurred(false);
  };

  const handleChange = (e) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
  };

  const handleBlur = (e) => {
    if (e.target.value === '') {
      return;
    }
    const regex = /^(https:\/\/www\.instagram\.com\/|instagram\.com\/|www\.instagram\.com\/)/;
    setHasBlurred(true);

    if (regex.test(url)) {
      setIsValid(true);
    } else {
      setIsValid(false);
      toast.error('The URL must be a valid URL from Instagram!');
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      validateUrl(text);
    } catch (error) {
      toast.error('Failed to read from clipboard');
      console.error('Error reading from clipboard:', error);
    }
  };

  const validateUrl = (url) => {
    const regex = /^(https:\/\/www\.instagram\.com\/|instagram\.com\/|www\.instagram\.com\/)/;
    setHasBlurred(true);

    if (regex.test(url)) {
      setIsValid(true);
    } else {
      setIsValid(false);
      toast.error(
        'The URL must start with https://www.instagram.com/, instagram.com/, or www.instagram.com/'
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onFetchText(url, clearInput);
    } else {
      toast.error('Please enter a valid URL.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        id={'input-container'}
        onClick={handleClick}
        style={{
          borderColor: hasBlurred && !isValid ? 'red' : isValid === null ? '' : 'green',
          flex: 1,
        }}
      >
        <input
          type="text"
          value={url}
          onClick={handleClick}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter Instagram URL"
          required
        />
        <button type="button" onClick={handlePaste} className="btn">
          Paste
        </button>
      </div>
      <button type="submit" disabled={!isValid} className="btn">
        Get Text
      </button>
    </form>
  );
};

export default InputForm;
