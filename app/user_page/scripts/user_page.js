// header menu

// elements
const allMainMenuBtns = document.querySelectorAll('.main-menu-btn');
const exitLink = document.querySelector('.exit-control a');
console.log(exitLink);
// event listenet or booting

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

async function loginProcess(username, password) {
  try {
    const response = await fetch("https://projeto-facam.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (response.ok){
      console.log("✅ Login bem-sucedido!");
      await getUserData();
    } else {
      console.warn("❌ Falha no login:", data.message || "Credenciais inválidas");
    }
  } catch (error) {
    console.error("⚠️ Erro na requisição:", error);
  }
}

async function getUserData(){
  try{
    const response = await fetch("https://projeto-facam.onrender.com/current-user");

    const data = await response.json();

    console.log("Dados do usuário atual:", data);
  }catch(error){
    console.error("Erro ao buscar dados do usuário:", error); 
  }
}


loginProcess("nicholas_eugenio", "@Nick04072004");