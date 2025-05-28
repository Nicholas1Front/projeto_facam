// popup de msg e botão de voltar ao topo da página

// elements
const msgPopup = document.querySelector(".msg-popup");
const popupMsgSpan = msgPopup.querySelector("#popup-msg-span");
const msgPopupCloseBtn = msgPopup.querySelector("#close-msg-popup-btn");
const entranceAnimation = "slide-in-fwd-left";
const exitAnimation = "slide-out-left";
const backTopControl = document.querySelector(".back-to-top-control");
const backTopBtn = document.querySelector(".back-to-top-btn");


// functions
async function showHtmlElement([...elements], displayType){
    elements.forEach(element => {
        element.style.display = displayType;
    });
}

async function hideHtmlElement([...elements]){
    elements.forEach(element => {
        element.style.display = "none";
    });
}

async function showMsgPopup(msgText, msgType){
  const checkIcon = msgPopup.querySelector(".check_icon");
  const exclamationIcon = msgPopup.querySelector(".exclamation_icon");
  const loadingIcon = msgPopup.querySelector(".loading_icon");

  checkIcon.style.display = "none";
  exclamationIcon.style.display = "none";
  loadingIcon.style.display = "none";

  msgPopup.classList.remove(exitAnimation);

  popupMsgSpan.innerHTML = "";
  popupMsgSpan.innerHTML = msgText;

  if(msgType === "sucessMsg"){
    msgPopup.style.backgroundColor = "#4dc96e";
    checkIcon.style.display = "block";
    await showHtmlElement([msgPopup], "flex");
    msgPopup.classList.add(entranceAnimation);

    setTimeout(async()=>{
      await closeMsgPopup()
    },5000)
  }

  if(msgType === "errorMsg"){
    msgPopup.style.backgroundColor = "#e3483d";
    exclamationIcon.style.display = "block";

    await showHtmlElement([msgPopup], "flex");
    msgPopup.classList.add(entranceAnimation);

    setTimeout(async()=>{
      await closeMsgPopup()
    },5000)
  }

  if(msgType === "loadingMsg"){
    msgPopup.style.backgroundColor = "#025cc4";
    loadingIcon.style.display = "block";

    await showHtmlElement([msgPopup], "flex");
    msgPopup.classList.add(entranceAnimation);
  }
}

async function closeMsgPopup(){
  msgPopup.classList.remove(entranceAnimation);
  msgPopup.classList.add(exitAnimation);

  setTimeout(()=>{
    hideHtmlElement([msgPopup]);
  },500)
}

async function scrollToTop(){
  window.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

async function showBackTopBtn(){
    let scrollValue = window.scrollY || document.documentElement.scrollTop;

    if(scrollValue > 300){
        backTopControl.style.display = "flex";
        backTopControl.style.justifyContent = "center";
        backTopControl.style.alignItems = "center"
        backTopControl.style.transition = "0.3s";
        backTopBtn.classList.remove("slide-out-bottom")
        backTopBtn.classList.add("slide-in-bottom");
    }else if (scrollValue < 300){
        backTopBtn.classList.remove("slide-in-bottom");
        backTopBtn.classList.add("slide-out-bottom");
    }
}

// booting and event listerners

document.addEventListener('scroll', async()=>{
  await showBackTopBtn();
});

msgPopupCloseBtn.addEventListener("click", async()=>{
  await closeMsgPopup();
})

backTopBtn.addEventListener("click", async()=>{
  await scrollToTop();
})

// user-login-section

// elements
const userNameInput = document.querySelector("#user-name-input");
const userPasswordInput = document.querySelector("#user-password-input");
const verifyPasswordBtn = document.querySelector("#verify-password-btn");
// functions

async function userLoginProcess(){
  if(userNameInput.value === "" || userPasswordInput.value === ""){
    await showMsgPopup("Preencha todos os campos!", "errorMsg");
    return;
  }

  await showMsgPopup("Carregando...", "loadingMsg");

  const response = await fetch("https://projeto-facam.onrender.com/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: userNameInput.value,
      password: userPasswordInput.value
    })

  })

  const data = await response.json();

  if(data.sucess){
    await closeMsgPopup();
    await showMsgPopup("Login realizado com sucesso!", "sucessMsg");
    setTimeout(() => {
      window.location.href = "C:/Users/nicho/OneDrive/Área de Trabalho/projeto_facam/app/user_page/user_page.html";
    }, 2000);

    return;
  }

  if(!data.sucess){
    await closeMsgPopup();
    await showMsgPopup(data.message, "errorMsg");
    return;
  }

}

// event listerners

verifyPasswordBtn.addEventListener("click", async()=>{
  await userLoginProcess();
})

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