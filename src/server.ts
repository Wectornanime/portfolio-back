import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`The app is running at the environment: ${p*ort}`)
  console.log(`app listing at port ${port}`)
});
