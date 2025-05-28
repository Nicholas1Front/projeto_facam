// user data and other global functions

//elements
let user_data = null;
const serverLoadingOverlay = document.querySelector('.server-loading-overlay'); // overlay de carregamento para o servidor
const serverMsgSpan = serverLoadingOverlay.querySelector("#server-msg-span");
const msgPopup = document.querySelector(".msg-popup");
const popupMsgSpan = msgPopup.querySelector("#popup-msg-span");
const msgPopupCloseBtn = msgPopup.querySelector("#close-msg-popup-btn");
const entranceAnimation = "slide-in-fwd-left";
const exitAnimation = "slide-out-left";
const backTopControl = document.querySelector(".back-to-top-control");
const backTopBtn = document.querySelector(".back-to-top-btn");

// functions

async function getUserData(){
  try{
    const response = await fetch("https://projeto-facam.onrender.com/current-user");

    const data = await response.json();

    return data.userData;
  }catch(err){
    return null;
  }
}

async function calculateGrades_userData(){
  for(i=0; i < user_data.grades_data.length; i++){
    let averageNum = (user_data.grades_data[i].first_bim_grade + user_data.grades_data[i].second_bim_grade ) / 2;
    if(averageNum.length > 3){
      averageNum = averageNum.toFixed(2);
    }
  
    if(averageNum < 7){
      user_data.grades_data[i].final_average = (averageNum + user_data.grades_data[i].final_test_grade) / 2;
      if(user_data.grades_data[i].final_average.length > 3){
        user_data.grades_data[i].final_average = user_data.grades_data[i].final_average.toFixed(2);
      }
    }

    if(averageNum >= 7){
      user_data.grades_data[i].final_test_grade = 0;
      user_data.grades_data[i].final_average = averageNum;
    }

    if(user_data.grades_data[i].final_average >= 7){
      user_data.grades_data[i].situation = "Aprovado";
    }

    if(user_data.grades_data[i].final_average < 7){
      user_data.grades_data[i].situation = "Reprovado";
    }
  };
}

async function initPageProcess(){
  await showHtmlElement([serverLoadingOverlay], "flex");
  user_data = await getUserData();
  console.log(user_data);
  if(user_data.message === "Nenhum usuário autenticado."){
    await showHtmlElement([serverMsgSpan],"block");
    return
  }
  await calculateGrades_userData();
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

// booting and event listerners

document.addEventListener('DOMContentLoaded', async()=>{
  await initPageProcess();
  await displayUserData_introductionSection();
});

msgPopupCloseBtn.addEventListener("click", async()=>{
  await closeMsgPopup();
})

// header menu

// elements
const header = document.querySelector('header');
const allMainMenuBtns = document.querySelectorAll('.main-menu-btn');
const exitLink = document.querySelector('.exit-control a');
const lookGradesBtn = document.querySelector('#look-grades-btn');
const lookTicketsBtn = document.querySelector('#look-tickets-btn');
const lookRegistrationBtn = document.querySelector('#look-registration-btn');
const lookChangeDataBtn = document.querySelector('#look-change-data-btn');
// functions

async function scrollToThisElement(element){
  const allSections = [
    gradesSection,
    ticketsSection,
    registrationSection,
    changeDataSection,
  ]

  if(element === header){
    element.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
    
    return;
  }

  allSections.forEach((section)=>{
    hideHtmlElement([section]);
  })

  await showHtmlElement([element], "flex");
  element.scrollIntoView({
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

// event listeners or booting

document.addEventListener('scroll', async()=>{
  await showBackTopBtn();
});

backTopBtn.addEventListener("click", async()=>{
  await scrollToThisElement(header);
})

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
  await displayUserData_gradesSection();  
  await scrollToThisElement(gradesSection);
})

lookTicketsBtn.addEventListener('click', async()=>{
  await displayUserData_latestTickets();
  await displayUserData_allTickets();
  await scrollToThisElement(ticketsSection);
})

lookRegistrationBtn.addEventListener('click', async()=>{
  await displayUserData_registrationSection();
  await scrollToThisElement(registrationSection);
});

lookChangeDataBtn.addEventListener('click', async()=>{
  await scrollToThisElement(changeDataSection);
})

// introduction-section

// elements
const introductionSection = document.querySelector('.introduction-section');

// functions

async function displayUserData_introductionSection(){
  const userInfo_name = introductionSection.querySelector('.user-info_name');
  const userInfo_registrationCode = introductionSection.querySelector('.user-info_registration-code');
  const userInfo_course = introductionSection.querySelector('.user-info_course');
  const userInfo_typeCourse = introductionSection.querySelector('.user-info_type-course');
  const userInfo_agreement = introductionSection.querySelector('.user-info_agreement');

  userInfo_name.innerHTML = "";
  userInfo_registrationCode.innerHTML = "";
  userInfo_course.innerHTML = "";
  userInfo_typeCourse.innerHTML = "";
  userInfo_agreement.innerHTML = "";

  userInfo_name.innerHTML = user_data.name;
  userInfo_registrationCode.innerHTML = user_data.registration_data?.registration_code;
  userInfo_course.innerHTML =  `${user_data.course_data?.name}-${user_data.course_data?.shift}-${user_data.course_data?.actual_period}`;
  userInfo_typeCourse.innerHTML = user_data.course_data?.type;
  userInfo_agreement.innerHTML = user_data.registration_data?.agreement_type;
}

// grades-section

// elements
const gradesSection = document.querySelector('.grades-section');
const gradesContainer = gradesSection.querySelector('.grades-container');

// functions 

async function displayUserData_gradesSection(){
  gradesContainer.innerHTML = "";
  
  for(i = 0 ; i < user_data.grades_data.length; i++){
    const gradeControlString = 
    `
      <div class="grade-control">
                <div class="title-container">
                    <h3>${user_data.grades_data[i].name}</h3>
                </div>

                <div class="grade-title-control">
                    <h3>1° BIM.</h3>
                    <h3>FALTAS</h3>
                    <h3>2° BIM.</h3>
                    <h3>FALTAS</h3>
                    <h3>P.FINAL</h3>
                    <h3>MD.FINAL</h3>
                    <h3>SITUAÇÃO</h3>
                </div>

                <div class="grade-info-control">
                    <span>${user_data.grades_data[i].first_bim_grade}</span>
                    <span>${user_data.grades_data[i].first_bim_faults}</span>
                    <span>${user_data.grades_data[i].second_bim_grade}</span>
                    <span>${user_data.grades_data[i].second_bim_faults}</span>
                    <span>${user_data.grades_data[i].final_test_grade}</span>
                    <span>${user_data.grades_data[i].final_average}</span>
                    <span>${user_data.grades_data[i].situation}</span>
                </div>
            </div>
    `

    const parse = new DOMParser();
    const doc = parse.parseFromString(gradeControlString, 'text/html');
    const gradeControl = doc.querySelector('.grade-control');
    gradesContainer.appendChild(gradeControl);
    
  }
  
  console.log(user_data);
} 

// tickets-section

// elements
const ticketsSection = document.querySelector('.tickets-section');
const ticketsContainer = ticketsSection.querySelector('.tickets-container');

// functions

async function displayUserData_latestTickets(){
  let allTickets = user_data.tickets_data;

  allTickets.sort((a, b) =>{
    return dayjs(b.due_data).valueOf() - dayjs(a.due_data).valueOf();
  });

  let actualTicket = allTickets[allTickets.length - 2];
  let actualTicketDueDate = dayjs(actualTicket.due_date).format('DD/MM/YYYY');
  let actualTicketCreationDate = dayjs(actualTicket.creation_date).format('DD/MM/YYYY');

  let nextTicket = allTickets[allTickets.length - 1];
  let nextTicketDueDate = dayjs(nextTicket.due_date).format('DD/MM/YYYY');
  let nextTicketCreationDate = dayjs(nextTicket.creation_date).format('DD/MM/YYYY');

  console.log(actualTicket);
  console.log(nextTicket);

  const actualTicketContainer = ticketsSection.querySelector('.actual-ticket-container');
  const actualTicket_documentLink = actualTicketContainer.querySelector('.link-to-ticket');
  const nextTicketContainer = ticketsSection.querySelector('.next-ticket-container');
  const nextTicket_documentLink = nextTicketContainer.querySelector('.link-to-ticket');

  actualTicketContainer.querySelector(".ticket-name-span").innerHTML = "";
  actualTicketContainer.querySelector(".ticket-creation-date-span").innerHTML ="";
  actualTicketContainer.querySelector(".ticket-due-date-span").innerHTML ="";
  actualTicketContainer.querySelector(".ticket-value-span").innerHTML ="";
  actualTicketContainer.querySelector(".ticket-payment-situation-span").innerHTML ="";

  nextTicketContainer.querySelector(".ticket-name-span").innerHTML = "";
  nextTicketContainer.querySelector(".ticket-creation-date-span").innerHTML ="";
  nextTicketContainer.querySelector(".ticket-due-date-span").innerHTML ="";
  nextTicketContainer.querySelector(".ticket-value-span").innerHTML ="";
  nextTicketContainer.querySelector(".ticket-payment-situation-span").innerHTML ="";

  actualTicketContainer.querySelector(".ticket-name-span").innerHTML = actualTicket.number;
  actualTicketContainer.querySelector(".ticket-creation-date-span").innerHTML = actualTicketCreationDate;
  actualTicketContainer.querySelector(".ticket-due-date-span").innerHTML = actualTicketDueDate;
  actualTicketContainer.querySelector(".ticket-value-span").innerHTML = actualTicket.value;
  actualTicketContainer.querySelector(".ticket-payment-situation-span").innerHTML = actualTicket.status;
  actualTicket_documentLink.href = actualTicket.link;

  if(actualTicket.status === "Pago"){
    actualTicketContainer.querySelector(".ticket-payment-situation-span").style.backgroundColor = "#4dc96e";
  }

  if(actualTicket.status === "Pendente"){
    actualTicketContainer.querySelector(".ticket-payment-situation-span").style.backgroundColor = "#eb9b34";
  }

  if(actualTicket.status === "Vencido"){
    actualTicketContainer.querySelector(".ticket-payment-situation-span").style.backgroundColor = "#e34034";
  }

  nextTicketContainer.querySelector(".ticket-name-span").innerHTML = nextTicket.number;
  nextTicketContainer.querySelector(".ticket-creation-date-span").innerHTML = nextTicketCreationDate;
  nextTicketContainer.querySelector(".ticket-due-date-span").innerHTML = nextTicketDueDate;
  nextTicketContainer.querySelector(".ticket-value-span").innerHTML = nextTicket.value;
  nextTicketContainer.querySelector(".ticket-payment-situation-span").innerHTML = nextTicket.status;
  nextTicket_documentLink.href = nextTicket.link;

  if(nextTicket.status === "Pago"){
    nextTicketContainer.querySelector(".ticket-payment-situation-span").style.backgroundColor = "#4dc96e";
  }

  if(nextTicket.status === "Pendente"){
    nextTicketContainer.querySelector(".ticket-payment-situation-span").style.backgroundColor = "#eb9b34";
  }

  if(nextTicket.status === "Vencido"){
    nextTicketContainer.querySelector(".ticket-payment-situation-span").style.backgroundColor = "#e34034";
  }
}

async function displayUserData_allTickets(){
  
  let allTickets = user_data.tickets_data;

  let allTicketsControl = ticketsContainer.querySelectorAll(".ticket-control");

  if(allTicketsControl.length > 0 || allTicketsControl !== undefined){
    allTicketsControl.forEach((ticketControl)=>{
      ticketControl.remove();
    });
  }

  allTickets.forEach((ticket)=>{
    let dueDateFormatted = dayjs(ticket.due_date).format('DD/MM/YYYY');
    let creationDateFormatted = dayjs(ticket.creation_date).format('DD/MM/YYYY');

    const ticketControlString = 
    `
      <div class="ticket-control">
          <span class="ticket-number-span">${ticket.number}</span>
          <span class="ticket-creation-date-span">${creationDateFormatted}</span>
          <span class="ticket-due-date-span">${dueDateFormatted}</span>
          <span class="ticket-value-span">${ticket.value}</span>
          <span class="ticket-payment-situation-span">${ticket.status}</span>
          <a href="${ticket.link}" target="_blank" class="link-to-ticket">Abrir boleto</a>
      </div>
    `;

    const parse = new DOMParser();
    const doc = parse.parseFromString(ticketControlString, 'text/html');
    const ticketControl = doc.querySelector('.ticket-control');
    ticketsContainer.appendChild(ticketControl);
  });

  setTimeout(()=>{
    const allTicketsControls = ticketsContainer.querySelectorAll('.ticket-control');
  
    allTicketsControls.forEach((ticketControl)=>{
      const ticketPaymentSituationSpan = ticketControl.querySelector('.ticket-payment-situation-span');

      console.log(ticketPaymentSituationSpan.innerHTML);
      
      if(ticketPaymentSituationSpan.innerHTML === "Pago"){
        ticketPaymentSituationSpan.style.color = "#4dc96e";
      }

      if(ticketPaymentSituationSpan.innerHTML === "Pendente"){
        ticketPaymentSituationSpan.style.color = "#eb9b34";
      }

      if(ticketPaymentSituationSpan.innerHTML === "Vencido"){
        ticketPaymentSituationSpan.style.color = "#e34034";
      }
    });
  },100)

}

// registration-section

// elements
const registrationSection = document.querySelector(".registration-section");
const registrationContainer = registrationSection.querySelector(".registration-container");
const registrationBtn = registrationContainer.querySelector(".registration-btn");

// functions

async function displayUserData_registrationSection(){
  registrationSection.querySelector(".user-info_name").innerHTML = "";
  registrationSection.querySelector(".user-info_registration-code").innerHTML = "";
  registrationSection.querySelector(".user-info_course-class").innerHTML = "";
  registrationSection.querySelector(".user-info_agreement").innerHTML = "";

  registrationSection.querySelector(".user-info_name").innerHTML = user_data.name;
  registrationSection.querySelector(".user-info_registration-code").innerHTML = user_data.registration_data.registration_code;
  registrationSection.querySelector(".user-info_course-class").innerHTML = `${user_data.course_data.acronym} - ${user_data.course_data.shift} - ${user_data.course_data.actual_period}`;
  registrationSection.querySelector(".user-info_agreement").innerHTML = user_data.registration_data.agreement_type;

  if(user_data.registration_user_semester !== "2025.1"){
    registrationContainer.querySelector("h3").innerHTML = "";
    registrationContainer.querySelector("h3").innerHTML = "Você não está matriculado no semestre atual. Clique no botão abaixo para efetuar sua rematrícula.";

    await showHtmlElement([registrationContainer.querySelector(".button-control")], "flex");
  }

  if(user_data.registration_user_semester === "2025.1"){
    registrationContainer.querySelector("h3").innerHTML = "";
    registrationContainer.querySelector("h3").innerHTML = "Você está matriculado no semestre atual. Não é necessário realizar a rematrícula.";

    await hideHtmlElement([registrationContainer.querySelector(".button-control")]);
  }
}

async function registrationProcess(){
  let userIsApproved = true;

  user_data.grades_data.forEach((grade)=>{
    if(grade.situation === "Reprovado"){
      userIsApproved = false;
    }
  });

  if(userIsApproved){
    user_data.registration_data.user_semester = "2025.1";
    await showMsgPopup("Rematrícula realizada com sucesso!","sucessMsg");
    await displayUserData_registrationSection();
  }else{
    await showMsgPopup("Você não está apto a realizar a rematrícula. Você precisa estar aprovado em todas as disciplinas.","errorMsg");
  }
}

// event listeners or booting

registrationBtn.addEventListener("click", async()=>{
  await registrationProcess();
})

// change-data-section

// elements
const changeDataSection = document.querySelector(".change-data-section");
const userNameInput = changeDataSection.querySelector("#user-name-input");
const userPasswordInput = changeDataSection.querySelector("#user-password-input");
const showPasswordBtn = changeDataSection.querySelector("#show-password-btn");
const hidePasswordBtn = changeDataSection.querySelector("#hide-password-btn");
const changeUserDataBtn = changeDataSection.querySelector("#change-user-data-btn");

// functions

async function changenDataLoginProcess(){
  if(userNameInput.value === "" || userPasswordInput.value === ""){
    await showMsgPopup("Preencha todos os campos.","errorMsg");
    return;
  }

  if(userNameInput.value === user_data.username){
    await showMsgPopup("Novo nome de usuário não pode ser o mesmo do atual.","errorMsg");
    return;
  }

  if(userPasswordInput.value === user_data.password){
    await showMsgPopup("Nova senha não pode ser a mesma da atual.","errorMsg");
    return;
  }

  user_data.username = userNameInput.value;
  user_data.password = userPasswordInput.value;

  await showMsgPopup("Alterações realizadas com sucesso!","sucessMsg");
  await scrollToThisElement(introductionSection);
}

// event listerners or booting

showPasswordBtn.addEventListener("click", ()=>{
  userPasswordInput.type = "text";
  showPasswordBtn.style.display = "none";
  hidePasswordBtn.style.display = "block";
})

hidePasswordBtn.addEventListener("click", ()=>{
  userPasswordInput.type = "password";
  showPasswordBtn.style.display = "block";
  hidePasswordBtn.style.display = "none";
});

changeUserDataBtn.addEventListener("click", async()=>{
  await changenDataLoginProcess();
});