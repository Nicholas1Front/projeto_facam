// user data and other global functions

//elements
let user_data = null;
const serverLoadingOverlay = document.querySelector('.server-loading-overlay'); // overlay de carregamento para o servidor
const serverMsgSpan = serverLoadingOverlay.querySelector("#server-msg-span");
const msgPopup = document.querySelector(".msg-popup");
const popupMsgSpan = msgPopup.querySelector("#popup-msg-span");
const closePopupMsgBtn = msgPopup.querySelector("#close-popup-msg-btn");
// functions

async function getUserData(){
  try{
    const response = await fetch("https://projeto-facam.onrender.com/current-user");

    const data = await response.json();

    return data;
  }catch(err){
    return null;
  }
}

async function initPageProcess(){
  await showHtmlElement([serverLoadingOverlay], "flex");
  user_data = await getUserData();
  console.log(user_data);
  if(user_data.message === "Nenhum usuário autenticado."){
    await showHtmlElement([serverMsgSpan],"block");
    return
  }
  await hideHtmlElement([serverLoadingOverlay]);
}

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

  checkIcon.style.display = "none";
  exclamationIcon.style.display = "none";

  if(msgType === "sucessMsg"){
    msgPopup.style.backgroundColor = "#025cc4";
    checkIcon.style.display = "block";
  }

  if(msgType === "errorMsg"){
    msgPopup.style.backgroundColor = "#e3483d";
    exclamationIcon.style.display = "block";
  }

  popupMsgSpan.innerHTML = "";
  popupMsgSpan.innerHTML = msgText;

  setTimeout(async()=>{
    await closeMsgPopup()
  },5000)
}

async function closeMsgPopup(){
  await hideHtmlElement([msgPopup]);
}

// booting and event listerners

document.addEventListener('DOMContentLoaded', ()=>{
  initPageProcess();
});

closePopupMsgBtn.addEventListener("click", ()=>{
  closeMsgPopup();
});

// header menu

// elements
const allMainMenuBtns = document.querySelectorAll('.main-menu-btn');
const exitLink = document.querySelector('.exit-control a');
const lookGradesBtn = document.querySelector('#look-grades-btn');

// functions

async function scrollToThisElement(element){
  await showHtmlElement([element], "flex");
  element.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

// event listeners or booting

console.log(allMainMenuBtns);

setTimeout(()=>{
    for(let i = 0; i < allMainMenuBtns.length; i++){
        allMainMenuBtns[i].addEventListener('mouseenter', () => {
            let btnSymbol = allMainMenuBtns[i].querySelector('i');
            btnSymbol.style.color = "#025cc4";
            let btnSpan = allMainMenuBtns[i].querySelector('span');
            btnSpan.classList.add('active');
        });

        allMainMenuBtns[i].addEventListener('mouseleave', ()=>{
            let btnSymbol = allMainMenuBtns[i].querySelector('i');
            btnSymbol.style.color = "#fff";
            let btnSpan = allMainMenuBtns[i].querySelector('span');
            btnSpan.classList.remove('active');
        })
    }

    exitLink.addEventListener('mouseenter', ()=>{
        let symbol = exitLink.querySelector('i');
        let span = exitLink.querySelector('span');
        symbol.style.color = "#025cc4";
        span.style.color = "#025cc4";
    })

    exitLink.addEventListener('mouseleave', ()=>{
        let symbol = exitLink.querySelector('i');
        let span = exitLink.querySelector('span');
        symbol.style.color = "#fff";
        span.style.color = "#fff";
    })
},100);

lookGradesBtn.addEventListener('click', async()=>{
    await scrollToThisElement(gradesSection);
})

// introduction-section

// elements
const introductionSection = document.querySelector('.introduction-section');

// grades-section

// elements
const gradesSection = document.querySelector('.grades-section');
