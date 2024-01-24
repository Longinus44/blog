import dotenv from 'dotenv';
require('dotenv').config()
dotenv.config();

export const getEnv = (name: string, defaultValue = '') => {
  return process.env[name] || defaultValue;
};

