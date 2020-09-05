import express from 'express';
import cors from 'cors';
import { db } from './models/index.js';
import {gradeRouter} from './routes/gradeRouter.js';

(async () => {
  try {
    await db.mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log(error);
    process.exit();
  }
})();

const app = express();
app.use(express.json());

//define o dominio de origem para consumo do servico
app.use(
  cors({
    origin: `http://localhost:${process.env.PORT}`,
  })
);

app.get('/', (req, res) => {
  res.send('API started...');
});

app.use(gradeRouter);

app.listen(process.env.PORT || 8081, () => {
  console.log('API Started...');
});
