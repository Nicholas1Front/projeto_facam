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
},100)