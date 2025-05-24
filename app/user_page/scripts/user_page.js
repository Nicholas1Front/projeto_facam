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

    return data.userData;
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

async function cleanHtmlElement([...elements]){
    elements.forEach(element => {
        element.innerHTML = "";
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

document.addEventListener('DOMContentLoaded', async()=>{
  await initPageProcess();
  await displayUserData_introductionSection();
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
  await displayUserData_gradesSection();  
  await scrollToThisElement(gradesSection);
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
                    <h3>MÉD.FINAL</h3>
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
