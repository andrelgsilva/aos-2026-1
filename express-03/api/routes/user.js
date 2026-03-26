import { Router } from "express";

const router = Router();

// GET ALL
router.get("/", async (req, res) => {
  try {
    const users = await req.context.models.User.findAll();
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar usuários" });
  }
});

// GET BY ID
router.get("/:userId", async (req, res) => {
  try {
    const user = await req.context.models.User.findByPk(req.params.userId);
    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
    
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error: "Erro na requisição" });
  }
});

// CREATE - 201 Created
router.post("/", async (req, res) => {
  try {
    // Blindagem: pegamos apenas o que queremos
    const { username, email } = req.body;
    const user = await req.context.models.User.create({ username, email });
    
    return res.status(201).json(user);
  } catch (error) {
    // 422 para erros de validação (ex: email duplicado)
    return res.status(422).json({ error: error.message });
  }
});

// UPDATE - 200 OK
router.put("/:userId", async (req, res) => {
  try {
    const user = await req.context.models.User.findByPk(req.params.userId);
    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

    const { username, email } = req.body;
    await user.update({ username, email });
    
    return res.json(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// DELETE - 204 No Content
router.delete("/:userId", async (req, res) => {
  try {
    const user = await req.context.models.User.findByPk(req.params.userId);
    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

    await user.destroy();
    // 204 indica sucesso, mas sem corpo na resposta
    return res.status(204).send(); 
  } catch (error) {
    return res.status(500).json({ error: "Erro interno ao deletar" });
  }
});

export default router;