Claro! Aqui está a versão aprimorada e formatada do seu Markdown, com uma estrutura mais clara, padronização de maiúsculas e minúsculas, melhor uso de títulos e formatação consistente para facilitar a leitura e manutenção:

---

# 🎨 Guia de Estilo – Frontend da Aplicação

## 🎨 Cores

| Descrição     | Cor Hex   |
| ------------- | --------- |
| Preta         | `#000000` |
| Azul          | `#00489A` |
| Branca        | `#FFFFFF` |
| Cinza claro 1 | `#E6E7E8` |
| Cinza claro 2 | `#DDDDDD` |

---

## 🖋️ Fontes e Tamanhos

* **Títulos grandes**:
  `h2` com `font-size: 55px` (ajustar conforme necessidade do design)

* **Títulos pequenos/médios**:
  `h3` com `font-size: 22px` a `19px`

* **Subtítulos (abaixo do título)**:
  `h4` com o `font-size` padrão do CSS

* **Parágrafos**:
  `p` com `font-size: 16px` ou `17px` (ajustar conforme necessidade do design)

* **Links com ícones**:
  `a` com estilo normal, sem `text-decoration: underline`
  `i` com `font-size: 50px` a `60px`, dependendo do uso

* **Botões**:

  * Tamanho depende do uso
  * Sempre usar `border-radius: 25px`
  * Usar `padding` adequado

---

## 🧱 Estrutura HTML e CSS

### 📌 Exemplo de organização HTML

```html
<section class="register-section">
  <div class="register-container">
    <div class="title-container">
      <!-- Título aqui -->
    </div>
    <div class="register-form-container">
      <!-- Formulário aqui -->
    </div>
    <div class="submit-container">
      <!-- Botão de envio aqui -->
    </div>
  </div>
</section>
```

### 🎯 Boas práticas CSS

* Utilizar **classes globais**, evitando `IDs` sempre que possível
* A estrutura no CSS deve refletir a do HTML:

```css
.register-section > .register-container > .title-container { 
  /* estilos aqui */ 
}
```

---

## 💻 Organização do JavaScript

Dividir o código de acordo com as seções HTML.

### 🧩 Exemplo:

```js
// register-section

// Elements
const registerSection = document.querySelector('.register-section');

// Functions
async function showSomething() {
  // lógica aqui
}

// Event Listeners / Booting
btn.addEventListener('click', showSomething);
```

---

## 🌐 GitHub – Regras de Versionamento

* **Todas as mudanças devem ser feitas na branch `main`**
* **Sempre avisar sobre qualquer alteração feita no código**
* Evitar subir arquivos com erros de formatação ou lógica não testada

---
