// altena entre login e registro
function mostrarRegistro() {
    document.getElementById("register-section").classList.add("ativo");
    document.getElementById("login-section").classList.remove("ativo");
}

function mostrarLogin() {
    document.getElementById("login-section").classList.add("ativo");
    document.getElementById("register-section").classList.remove("ativo");
}

// mostra/oculta senha do login
  const inputSenha = document.getElementById("user-password-input");
  const btnMostrar = document.getElementById("show-password-btn");
  const btnOcultar = document.getElementById("hide-password-btn");

  btnMostrar.addEventListener("click", () => {
    inputSenha.type = "text";
    btnMostrar.style.display = "none";
    btnOcultar.style.display = "inline";
  });

  btnOcultar.addEventListener("click", () => {
    inputSenha.type = "password";
    btnOcultar.style.display = "none";
    btnMostrar.style.display = "inline";
  });

  //mostra/oculta senha do registro
 const inputSenhaRegistro = document.getElementById("new-password");
  const btnMostrarRegistro = document.getElementById("show-password-btn-register");
  const btnOcultarRegistro = document.getElementById("hide-password-btn-register");

  btnMostrarRegistro.addEventListener("click", () => {
    inputSenhaRegistro.type = "text";
    btnMostrarRegistro.style.display = "none";
    btnOcultarRegistro.style.display = "inline";
  });

  btnOcultarRegistro.addEventListener("click", () => {
    inputSenhaRegistro.type = "password";
    btnOcultarRegistro.style.display = "none";
    btnMostrarRegistro.style.display = "inline";
  });