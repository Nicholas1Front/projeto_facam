const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

const allowedOrigins = [
  'http://127.0.0.1:5500',
  'https://nicholas1front.github.io'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

// Variáveis de ambiente
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO;
const GITHUB_BRANCH = process.env.GITHUB_BRANCH;

// Variável global do usuário autenticado
let currentUsername = null;

// Função para buscar o arquivo users.json
async function fetchUsersJson() {
  const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/app/database/users.json?ref=${GITHUB_BRANCH}`;

  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3.raw'
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
  const users = await fetchUsersJson();

  const user = users.find(u => u.username === username);

  if (!user) {
    return res.status(404).json({ success: false, message: "Usuário não encontrado." });
  }

  if (user.password !== password) {
    return res.status(401).json({ success: false, message: "Senha incorreta." });
  }

  currentUsername = username;
  return res.status(200).json({ success: true, message: "Login bem-sucedido." });
});

// 👤 Dados do usuário atual
app.get('/current-user', async (req, res) => {
  if (!currentUsername) {
    return res.status(404).json({ message: "Nenhum usuário autenticado." });
  }

  const users = await fetchUsersJson();
  const user = users.find(u => u.username === currentUsername);

  if (!user) {
    return res.status(500).json({ message: "Erro ao buscar dados do usuário." });
  }

  return res.status(200).json({ user });
});

// ✏️ Atualizar dados do usuário atual
app.post('/update-user', async (req, res) => {
  if (!currentUsername) {
    return res.status(401).json({ success: false, message: "Usuário não autenticado." });
  }

  const updatedUser = req.body;
  const path = `app/database/users.json`;
  const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${path}`;

  try {
    const { data: existingFile } = await axios.get(url, {
      headers: { Authorization: `Bearer ${GITHUB_TOKEN}` }
    });

    const users = await fetchUsersJson();
    const index = users.findIndex(u => u.username === currentUsername);

    if (index === -1) {
      return res.status(404).json({ success: false, message: "Usuário não encontrado para atualização." });
    }

    users[index] = updatedUser;

    const content = Buffer.from(JSON.stringify(users, null, 2)).toString('base64');

    await axios.put(url, {
      message: `update user ${currentUsername}`,
      content,
      sha: existingFile.sha,
      branch: GITHUB_BRANCH
    }, {
      headers: { Authorization: `Bearer ${GITHUB_TOKEN}` }
    });

    return res.status(200).json({ success: true, message: "Dados atualizados e publicados no GitHub Pages." });

  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ success: false, message: "Erro ao atualizar os dados." });
  }
});

// 🚀 Register User
app.post('/register-user', async (req, res) => {
  const newUser = req.body;

  // Buscar users.json atual
  const path = `app/database/users.json`;
  const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${path}`;

  try {
    // Buscar SHA do arquivo atual
    const { data: existingFile } = await axios.get(url, {
      headers: { Authorization: `Bearer ${GITHUB_TOKEN}` }
    });

    const users = await fetchUsersJson();

    // Verificar se username já existe
    const userExists = users.some(u => u.username === newUser.username);

    if (userExists) {
      return res.status(409).json({ success: false, message: "❌ Nome de usuário já existe." });
    }

    // Adicionar novo usuário
    users.push(newUser);

    const content = Buffer.from(JSON.stringify(users, null, 2)).toString('base64');

    // Atualizar no GitHub
    await axios.put(url, {
      message: `register user ${newUser.username}`,
      content,
      sha: existingFile.sha,
      branch: GITHUB_BRANCH
    }, {
      headers: { Authorization: `Bearer ${GITHUB_TOKEN}` }
    });

    // Atualiza currentUsername
    currentUsername = newUser.username;

    return res.status(200).json({ success: true, message: "✅ Usuário registrado com sucesso." });

  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ success: false, message: "Erro ao registrar usuário." });
  }
});


// 🚪 Logout
app.post('/logout', (req, res) => {
  currentUsername = null;
  res.json({ success: true, message: "Logout realizado com sucesso." });
});

// 🔥 Inicializa servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Servidor rodando na porta ${PORT}`));
