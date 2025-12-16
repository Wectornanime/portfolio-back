import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`The app is running at the environment: ${process.env.NODE_ENV}`);
  console.log(`App listing at port: ${port}`);
});
