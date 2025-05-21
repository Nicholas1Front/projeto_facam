const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

// Libera requisições de qualquer origem (útil para desenvolvimento)
app.use(cors());

// Permite ler JSON no corpo da requisição
app.use(express.json());

// Variáveis de ambiente
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO;
const GITHUB_BRANCH = process.env.GITHUB_BRANCH;

// Função auxiliar para buscar dados do GitHub
async function fetchUserJson(username) {
  const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/users/${username}.json?ref=${GITHUB_BRANCH}`;

  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3.raw',
      }
    });
    return res.data;
  } catch (err) {
    return null;
  }
}

// -----------------------------
// 🔐 Endpoint de login
// -----------------------------
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const userData = await fetchUserJson(username);

  if (!userData) {
    return res.status(404).json({ success: false, message: "Usuário não encontrado." });
  }

  if (userData.password !== password) {
    return res.status(401).json({ success: false, message: "Senha incorreta." });
  }

  return res.status(200).json({ success: true, user: userData });
});

// -----------------------------
// ✏️ Endpoint de atualização de usuário
// -----------------------------
app.post('/update-user', async (req, res) => {
  const userObject = req.body;
  const username = userObject.username;

  const path = `users/${username}.json`;
  const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${path}`;

  try {
    // Buscar SHA do arquivo atual
    const { data: existingFile } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`
      }
    });

    const content = Buffer.from(JSON.stringify(userObject, null, 2)).toString('base64');

    await axios.put(url, {
      message: `update user ${username}`,
      content: content,
      sha: existingFile.sha,
      branch: GITHUB_BRANCH
    }, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`
      }
    });

    return res.status(200).json({ success: true, message: "Dados atualizados com sucesso." });

  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ success: false, message: "Erro ao atualizar os dados." });
  }
});

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Servidor rodando na porta ${PORT}`));
