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
  document.body.scrollIntoView({
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

  console.log(response);

  const data = await response.json();

  console.log(data);

  if(data.success){
    await closeMsgPopup();
    
    setTimeout(()=>{
      showMsgPopup("Login efetuado com sucesso!", "sucessMsg");
    },600)

    setTimeout(()=>{
      window.location.href = "http://127.0.0.1:5500/app/user_page/user_page.html";
    },3000);

    return;
  }

  if(!data.success){
    await closeMsgPopup();
    await showMsgPopup(data.message, "errorMsg");
    return;
  }

}

// event listerners

verifyPasswordBtn.addEventListener("click", async()=>{
  await userLoginProcess();
})

// register-section

// elements

let newUser_data = null;
const registerUser_cpf = document.querySelector("#cpf");
const registerUser_registrationCode = document.querySelector("#matricula");
const registerUser_name = document.querySelector("#new-user-name");
const registerUser_username = document.querySelector("#new-username");
const registerUser_password = document.querySelector("#new-password");

// functions

async function newUserRegisterProcess(){
  if(
    registerUser_cpf.value === "" ||
    registerUser_registrationCode.value === "" ||
    registerUser_name.value === "" ||
    registerUser_username.value === "" ||
    registerUser_password.value === ""
  ){
    await showMsgPopup("Preencha todos os campos!", "errorMsg");
    return;
  }

  await showMsgPopup("Registrando novo usuário...", "loadingMsg");

  newUser_data = {
  username: registerUser_username.value,
  password: registerUser_password.value,
  name: registerUser_name.value,
  cpf : registerUser_cpf.value,
  registration_data: {
    registration_code: registerUser_registrationCode.value,
    agreement_type: "Parcelado",
    user_semester: "2025.1",
    educational_contract_form_link: "https://example.com/contract.pdf",
    clauses_educational_contract_link: "https://example.com/clauses.pdf"
  },
  course_data: {
    name: "Análise e Desenvolvimento de Sistemas",
    acronym: "ADS",
    type: "Graduação - Tecnólogo",
    modality: "Presencial",
    shift: "Noturno",
    actual_period: "5° período"
  },
  grades_data: [
    {
      name: "Engenharia de software II",
      first_bim_grade: 10,
      first_bim_faults: 1,
      second_bim_grade: 10,
      second_bim_faults: 10,
      final_test_grade: 9,
      final_average: null,
      situation: null
    },
    {
      name: "Banco de Dados II",
      first_bim_grade: 9,
      first_bim_faults: 2,
      second_bim_grade: 8,
      second_bim_faults: 3,
      final_test_grade: 7,
      final_average: null,
      situation: null
    },
    {
      name: "Desenvolvimento Web",
      first_bim_grade: 10,
      first_bim_faults: 0,
      second_bim_grade: 9,
      second_bim_faults: 1,
      final_test_grade: 8,
      final_average: null,
      situation: null
    },
    {
      name: "Programação Orientada a Objetos",
      first_bim_grade: 8,
      first_bim_faults: 4,
      second_bim_grade: 9,
      second_bim_faults: 2,
      final_test_grade: 6,
      final_average: null,
      situation: null
    },
    {
      name: "Redes de Computadores",
      first_bim_grade: 7,
      first_bim_faults: 3,
      second_bim_grade: 8,
      second_bim_faults: 5,
      final_test_grade: 7,
      final_average: null,
      situation: null
    },
    {
      name: "Gestão de Projetos",
      first_bim_grade: 9,
      first_bim_faults: 2,
      second_bim_grade: 8,
      second_bim_faults: 3,
      final_test_grade: 7,
      final_average: null,
      situation: null
    },
    {
      name: "Estastica",
      first_bim_grade: 10,
      first_bim_faults: 0,
      second_bim_grade: 9,
      second_bim_faults: 1,
      final_test_grade: 8,
      final_average: null,
      situation: null
    }
  ],
  tickets_data: [
    {
      number: 1,
      creation_date: "2025-02-01",
      due_date: "2025-03-01",
      value: "R$ 100,10",
      status: "Pago",
      link: "https://nicholas1front.github.io/projeto_facam/documents/boleto_example.pdf"
    },
    {
      number: 2,
      creation_date: "2025-03-01",
      due_date: "2025-04-01",
      value: "R$ 100,10",
      status: "Pago",
      link: "https://nicholas1front.github.io/projeto_facam/documents/boleto_example.pdf"
    },
    {
      number: 3,
      creation_date: "2025-04-01",
      due_date: "2025-05-01",
      value: "R$ 100,10",
      status: "Vencido",
      link: "https://nicholas1front.github.io/projeto_facam/documents/boleto_example.pdf"
    },
    {
      number: 4,
      creation_date: "2025-05-01",
      due_date: "2025-06-01",
      value: "R$ 100,10",
      status: "Vencido",
      link: "https://nicholas1front.github.io/projeto_facam/documents/boleto_example.pdf"
    },
    {
      number: 5,
      creation_date: "2025-06-01",
      due_date: "2025-07-01",
      value: "R$ 100,10",
      status: "Pendente",
      link: "https://nicholas1front.github.io/projeto_facam/documents/boleto_example.pdf"
    }
  ]
  };

  newUser_data = JSON.stringify(newUser_data);

  const response = await fetch("https://projeto-facam.onrender.com/register-user", {})


}

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