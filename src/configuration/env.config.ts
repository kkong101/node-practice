import 'dotenv/config';

export default () => ({
  database: {
    port: process.env.PORT,
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    synchronize: process.env.SYNCHRONIZE === 'true',
    logging: process.env.LOGGING === 'true',
  },
});
