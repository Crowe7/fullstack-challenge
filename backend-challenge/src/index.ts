import express from 'express';
import 'dotenv/config'
import { connectToMongo } from './services/mongo.service.js';
import { loremRouter } from './routes/lorem.js';
import { contactRouter } from './routes/contact.js';
import cors from 'cors';
const app = express();

const port = process.env.PORT || 8080;
// Connects to the db then runs cors so the POST method works. then uses both routers for both the POST and GET methods
connectToMongo()
  .then(() => {
    
    app.use(cors());

    app.use("/lorem", loremRouter);

    app.use("/contact", contactRouter);

    app.listen(port, () => {
      console.log(`server running at http://localhost:${port}`);
    });
  })
  .catch((err: Error) => {
    console.error("Connection failed!",err)
  });

export {}