import { Router } from "express";

const router = Router();

//  GET ALL
router.get("/", async (req, res) => {
  const users = await req.context.models.User.findAll();
  return res.json(users);
});

//  GET BY ID
router.get("/:userId", async (req, res) => {
  const user = await req.context.models.User.findByPk(req.params.userId);

  if (!user) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }

  return res.json(user);
});

//  CREATE
router.post("/", async (req, res) => {
  try {
    const user = await req.context.models.User.create({
      username: req.body.username,
      email: req.body.email,
    });

    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

//  UPDATE
router.put("/:userId", async (req, res) => {
  try {
    const user = await req.context.models.User.findByPk(req.params.userId);

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    await user.update({
      username: req.body.username,
      email: req.body.email,
    });

    return res.json(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

//  DELETE
router.delete("/:userId", async (req, res) => {
  try {
    const user = await req.context.models.User.findByPk(req.params.userId);

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    await user.destroy();

    return res.json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

export default router;