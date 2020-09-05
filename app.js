import express from 'express';
import cors from 'cors';
import { db } from './models/index.js';
import { gradeRouter } from './routes/gradeRouter.js';

(async () => {
  try {
    await db.mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB started...');
  } catch (error) {
    console.log(error);
    process.exit();
  }
})();

const config = {
  port: process.env.PORT || 8081,
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
};

const app = express();
app.use(express.json());
app.use(cors({ origin: config.corsOrigin }));

app.get('/', (req, res) => {
  res.send('API started...');
});

app.use(gradeRouter);

app.listen(config.port, () => {
  console.log('API Started...');
});
