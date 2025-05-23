const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

app.use(cors({
  origin: 'http://127.0.0.1:5500',
  credentials: true
}));
app.use(express.json());

// Variáveis de ambiente
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO;
const GITHUB_BRANCH = process.env.GITHUB_BRANCH;

// Variável global para armazenar o usuário autenticado
let currentUsername = null;

// Função para buscar JSON do usuário
async function fetchUserJson(username) {
  const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/app/database/users/${username}.json?ref=${GITHUB_BRANCH}`;

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

// 🔐 Login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const userData = await fetchUserJson(username);

  if (!userData) {
    return res.status(404).json({ success: false, message: "Usuário não encontrado." });
  }

  if (userData.password !== password) {
    return res.status(401).json({ success: false, message: "Senha incorreta." });
  }

  currentUsername = username;
  return res.status(200).json({ success: true, message: "Login bem-sucedido." });
});

// 👤 Pegar o nome do usuário atual
app.get('/current-user', async (req, res) => {
  if (!currentUsername) {
    return res.status(404).json({ message: "Nenhum usuário autenticado." });
  }

  const userData = await fetchUserJson(nicholas_eugenio);

  if (!userData) {
    return res.status(500).json({ message: "Erro ao buscar dados do usuário." });
  }

  return res.status(200).json({ user: userData });
});


// ✏️ Atualizar o JSON do usuário atual
app.post('/update-user', async (req, res) => {
  if (!currentUsername) {
    return res.status(401).json({ success: false, message: "Usuário não autenticado." });
  }

  const userObject = req.body;
  const path = `app/database/users/${currentUsername}.json`;
  const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${path}`;

  try {
    const { data: existingFile } = await axios.get(url, {
      headers: { Authorization: `Bearer ${GITHUB_TOKEN}` }
    });

    const content = Buffer.from(JSON.stringify(userObject, null, 2)).toString('base64');

    await axios.put(url, {
      message: `update user ${currentUsername}`,
      content,
      sha: existingFile.sha,
      branch: GITHUB_BRANCH
    }, {
      headers: { Authorization: `Bearer ${GITHUB_TOKEN}` }
    });

    return res.status(200).json({ success: true, message: "Dados atualizados com sucesso." });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ success: false, message: "Erro ao atualizar os dados." });
  }
});

// 🚪 Logout
app.post('/logout', (req, res) => {
  currentUsername = null;
  res.json({ success: true, message: "Logout realizado com sucesso." });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Servidor rodando na porta ${PORT}`));
