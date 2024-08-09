const isProd = process.env.NODE_ENV === 'production';

const config = {
  API_URL: isProd ? 'https://titianbakat.com/api' : 'http://localhost:8000/api',
};

export default config;