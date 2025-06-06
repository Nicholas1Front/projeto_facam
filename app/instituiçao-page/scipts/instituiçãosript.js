const backTopControl = document.querySelector(".back-to-top-control");
const backTopBtn = document.querySelector(".back-to-top-btn");

function scrollToTop(){
    window.scrollTo({
        top : document.body.offsetTop,
        behavior : "smooth",
    })
}

function showBackTopBtn(){
    let scrollValue = window.scrollY || document.documentElement.scrollTop;

    if(scrollValue > 300){
        backTopControl.style.display = "flex";
        backTopControl.style.justifyContent = "center";
        backTopControl.style.alignItems = "center"
        backTopControl.style.transition = "0.3s";
        backTopBtn.classList.remove("slide-out-bottom");
        backTopBtn.classList.add("slide-in-bottom");
    } else if (scrollValue < 300){
        backTopBtn.classList.remove("slide-in-bottom");
        backTopBtn.classList.add("slide-out-bottom");
    }
}

// evento de rolagem
window.addEventListener("scroll", function(){
    showBackTopBtn();
});

// evento de clique no botão
backTopBtn.addEventListener("click", function(){
    scrollToTop();
});
