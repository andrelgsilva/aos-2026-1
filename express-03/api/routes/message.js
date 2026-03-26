import { Router } from "express";

const router = Router();

//  GET ALL
router.get("/", async (req, res) => {
  const messages = await req.context.models.Message.findAll();
  return res.json(messages);
});

//  GET BY ID
router.get("/:messageId", async (req, res) => {
  const message = await req.context.models.Message.findByPk(
    req.params.messageId
  );

  if (!message) {
    return res.status(404).json({ error: "Mensagem não encontrada" });
  }

  return res.json(message);
});

//  CREATE
router.post("/", async (req, res) => {
  try {
    if (!req.context.me) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }

    const message = await req.context.models.Message.create({
      text: req.body.text,
      userId: req.context.me.id,
    });

    return res.status(201).json(message);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

//  UPDATE 
router.put("/:messageId", async (req, res) => {
  try {
    const message = await req.context.models.Message.findByPk(
      req.params.messageId
    );

    if (!message) {
      return res.status(404).json({ error: "Mensagem não encontrada" });
    }

    await message.update({
      text: req.body.text,
    });

    return res.json(message);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

//  DELETE
router.delete("/:messageId", async (req, res) => {
  try {
    const message = await req.context.models.Message.findByPk(
      req.params.messageId
    );

    if (!message) {
      return res.status(404).json({ error: "Mensagem não encontrada" });
    }

    await message.destroy();

    return res.json({ message: "Mensagem deletada com sucesso" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

export default router;