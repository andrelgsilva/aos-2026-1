import "dotenv/config";
import cors from "cors";
import express from "express";

import models, { sequelize } from "./models/index.js";
import routes from "./routes/index.js";

const app = express();

app.set("trust proxy", true);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  Middleware corrigido (sem quebrar o app)
app.use(async (req, res, next) => {
  try {
    req.context = {
      models,
      // pega o primeiro usuário como "logado" (simulação)
      me: await models.User.findOne(),
    };
    next();
  } catch (error) {
    console.error("Erro no context:", error);
    next(); // não trava o app
  }
});

// log de requisições
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// rotas
app.use("/session", routes.session);
app.use("/users", routes.user);
app.use("/messages", routes.message);

// rota base
app.get("/", (req, res) => {
  res.send(
    "Received a GET HTTP method\nServidor rodando!\n" + process.env.MESSAGE,
  );
});

const port = process.env.PORT ?? 3000;
const eraseDatabaseOnSync = process.env.ERASE_DATABASE_ON_SYNC === "true";

// sync do banco
sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    await createUsersWithMessages();
  }

  app.listen(port, () =>
    console.log(
      "Express-03 app listening on port " + port + "!\n" + process.env.MESSAGE,
    ),
  );
});

// seed de dados
const createUsersWithMessages = async () => {
  await models.User.create(
    {
      username: "rwieruch",
      email: "rwieruch@email.com",
      messages: [
        {
          text: "Published the Road to learn React",
        },
      ],
    },
    {
      include: [models.Message],
    },
  );

  await models.User.create(
    {
      username: "ddavids",
      email: "ddavids@email.com",
      messages: [
        {
          text: "Happy to release ...",
        },
        {
          text: "Published a complete ...",
        },
      ],
    },
    {
      include: [models.Message],
    },
  );
};

export default app;