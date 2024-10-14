// api.js

import axios from 'axios';

export const sendTokenToBackend = async (idToken) => {
  try {
    const response = await axios.post('http://srv14.mikr.us:20242/api/register', {
      idToken,
    });
    return response.data;
  } catch (error) {
    console.error('Error sending token to backend:', error);
    throw error;
  }
};
