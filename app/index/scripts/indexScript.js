//elements
const getKnow_section = document.querySelector(".get-know-section")
const graduation_section = document.querySelector(".graduation-section");

const linksControl = document.querySelectorAll(".links-control");
const linksControl_symbol = document.querySelectorAll(".links-control i");
const linksControl_link = document.querySelectorAll(".links-control a");

const registration_section = document.querySelector(".registration-section");

const slides = document.querySelectorAll(".slide");
const slideNextBtn = document.querySelector(".slide-next-control");
const slidePrevBtn = document.querySelector(".slide-prev-control");

const slideBreadcrumbs = document.querySelectorAll(".slide-breadcrumb");

const coursesControl = document.querySelectorAll(".courses-items-control");
const coursesImgs = document.querySelectorAll(".course-img");
const coursesImgsHover = document.querySelectorAll(".course-img-hover");
const coursesLinks = document.querySelectorAll(".courses-items-control a");

const postGraduation_section = document.querySelector(".post-graduation-section");
const contentControl = document.querySelector(".content-control");
const informationsBox = document.querySelectorAll(".information-box");

const backTopControl = document.querySelector(".back-to-top-control");
const backTopBtn = document.querySelector(".back-to-top-btn");

// testing


//registration slides

//esta parte diz respeito a todos os elementos e functions que formam o mecanismo de slides da registration-section

//slide autoplay mecanism
setInterval(()=>{
    let scrollValue = window.scrollY || document.documentElement.scrollTop;

    setTimeout(()=>{
        autoplaySlides(scrollValue);
    },4000);

},7000)

//slide elements
let slidesCounter = 0;

//slide functions
function prevSlideProcess(){
    if(slidesCounter <= 0){
        hideBreadcrumb(slidesCounter);
        hideSlide(slidesCounter);
        removeAnimation(slidesCounter);

        slidesCounter = slides.length - 1;

        showAnimation(slidesCounter, "slide-in-right");
        showBreadcrumb(slidesCounter);
        showSlide(slidesCounter);

        return;
    }else if(slidesCounter >= 0){
        slidesCounter = slidesCounter - 1;

        console.log(`SlidesCounter = ${slidesCounter}`);

        hideSlide(slidesCounter+1);
        showSlide(slidesCounter);

        hideBreadcrumb(slidesCounter+1);
        showBreadcrumb(slidesCounter);

        showAnimation(slidesCounter, "slide-in-left");
        removeAnimation(slidesCounter+1);
    }
}

function nextSlideProcess(){
    if(slidesCounter == slides.length-1 || slidesCounter > slides.length){
        hideBreadcrumb(slidesCounter);
        hideSlide(slidesCounter);
        removeAnimation(slidesCounter);

        slidesCounter = 0;

        showAnimation(slidesCounter, "slide-in-left");
        showBreadcrumb(slidesCounter);
        showSlide(slidesCounter);
        
        return;
    }else if(slidesCounter < slides.length){
        slidesCounter++;

        console.log(`SlidesCounter = ${slidesCounter}`)

        hideSlide(slidesCounter-1);
        showSlide(slidesCounter);

        showBreadcrumb(slidesCounter);  
        hideBreadcrumb(slidesCounter-1);

        showAnimation(slidesCounter,"slide-in-right");
        removeAnimation(slidesCounter-1);
    }

}

let graduation_section_topScrollPosition = 0;
let registration_section_topScrollPosition = 0;

function autoplaySlides(scrollValue){

    graduation_section_topScrollPosition = getElementTopPosition(graduation_section);
    registration_section_topScrollPosition = getElementTopPosition(registration_section);

    if(scrollValue >= registration_section_topScrollPosition){
        nextSlideProcess();
    }else if(scrollValue > graduation_section_topScrollPosition || scrollValue < registration_section_topScrollPosition){
        return;
    }

}

function showBreadcrumb(param){
    slideBreadcrumbs[param].classList.add("breadcrumb-selected");
}

function hideBreadcrumb(param){
    slideBreadcrumbs[param].classList.remove("breadcrumb-selected")
}

function showSlide(param){
    slides[param].style.display = "flex";
}

function hideSlide(param){
    slides[param].style.display = "none";
}

function showAnimation(param , animation){
    slides[param].classList.add(animation);
}

function removeAnimation(param){
    slides[param].classList.remove("slide-in-right");
    slides[param].classList.remove("slide-in-left");
}

function initSlides(slides){
    showSlide(0);

    for(let i = 1 ; i <= slides.length-1 ; i++){
        hideSlide(i);
    };
};

//slide event listeners
slidePrevBtn.addEventListener("click", function(event){
    event.preventDefault();

    prevSlideProcess();

})

slideNextBtn.addEventListener("click", function(event){
    event.preventDefault();

    nextSlideProcess();

});

// news slides
//esta parte diz respeito a todos os elementos e functions que formam o mecanismo de slides da news-section

// todo : fazer todos os processos relacionados aos slides relacionados a news-section

// functions

function hoverInLinksControl(param){
    linksControl_symbol[param].style.color = "#00489A";
    linksControl_symbol[param].style.fontWeight = "800";
    linksControl_symbol[param].style.transition = "0.2s";

    linksControl_link[param].style.color = "#00489A";
    linksControl_link[param].style.fontWeight = "bold";
    linksControl_link[param].style.transition = "0.2s";
}

function hoverOutLinksControl(param){
    linksControl_symbol[param].style.color = "black";
    linksControl_symbol[param].style.fontWeight = "bold";
    linksControl_symbol[param].style.transition = "0.2s";

    linksControl_link[param].style.color = "black";
    linksControl_link[param].style.fontWeight = "normal";
    linksControl_link[param].style.transition = "0.2s";
}

/*
Esta função pega a altura em pixels de um elemento a partir do inicio do página,
utilizando element como argumento. 
*/

function getElementTopPosition(element) {
    if (!element || !(element instanceof Node)) {
        console.error("Elemento inválido.");
        return null;
    }

    // Verificar se o elemento está no documento
    if (!document.body.contains(element)) {
        console.error("O elemento não está no documento.");
        return null;
    }

    // Obter a posição do elemento
    const rect = element.getBoundingClientRect();
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

    return rect.top + scrollTop;
}

function hoverInCoursesControl(param){
    coursesImgsHover[param].style.display = "block";
    coursesImgsHover[param].style.transition = "0.2s";

    coursesImgs[param].style.display = "none";
    coursesImgs[param].style.transition = "0.2s";

    coursesLinks[param].style.color = '#025cc4';
    coursesLinks[param].style.transition = "0.2s";
}

function hoverOutCoursesControl(param){
    coursesImgsHover[param].style.display = "none";
    coursesImgsHover[param].style.transition = "0.2s";

    coursesImgs[param].style.display = "block";
    coursesImgs[param].style.transition = "0.2s";

    coursesLinks[param].style.color = 'white';
    coursesLinks[param].style.transition = "0.2s";
}

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
        backTopBtn.classList.remove("slide-out-bottom")
        backTopBtn.classList.add("slide-in-bottom");
    }else if (scrollValue < 300){
        backTopBtn.classList.remove("slide-in-bottom");
        backTopBtn.classList.add("slide-out-bottom");
    }
}

function showAnimationContentControl(){

    let scrollValue = window.scrollY || document.documentElement.scrollTop;

    let postGraduation_section_topScrollPosition = getElementTopPosition(postGraduation_section);

    if (scrollValue >= postGraduation_section_topScrollPosition){
       
        setTimeout(()=>{
            contentControl.classList.add("slide-in-blurred-bottom");
        },900)

    }else{
        return;
    }
}

function increaseBoxShadow_informationBox(param){
    informationsBox[param].style.boxShadow = "0px 1px 12px 12px #025cc4";
    informationsBox[param].style.transition = "0.4s";
}

function decreaseBoxShadow_informationBox(param){
    informationsBox[param].style.boxShadow = "0px 1px 12px 9px #025cc4";
    informationsBox[param].style.transition = "0.4s";
}

// booting and event listerners

/*Este bloco de código é iniciado no momento que a página é carregada
e os loopings são executados que por sua vez chamam as funções hoverIn e hoverOut*/
document.addEventListener('DOMContentLoaded',function(){
    for(let i = 0; i < linksControl.length ; i++){
        linksControl[i].addEventListener('mouseenter',function(event){
            event.preventDefault();
        
            hoverInLinksControl(i);
        });
    };
    
    for(let i = 0; i < linksControl.length ; i++){
        linksControl[i].addEventListener('mouseleave',function(event){
            event.preventDefault();
        
            hoverOutLinksControl(i);
        });
    };

    initSlides(slides); //slide init : esconde os outros slides e mostra o primeiro slide

    for(let i = 0; i < coursesControl.length ; i++){
        coursesControl[i].addEventListener("mouseenter",function(event){
            event.preventDefault();
            hoverInCoursesControl(i);
        });

        coursesControl[i].addEventListener("mouseleave",function(event){
            event.preventDefault();
            hoverOutCoursesControl(i);
        })
    };

    for(let i = 0 ; i < informationsBox.length ; i++){
        informationsBox[i].addEventListener("mouseenter",()=>{
            increaseBoxShadow_informationBox(i);
        });

        informationsBox[i].addEventListener("mouseleave",()=>{
            decreaseBoxShadow_informationBox(i);
        })
    }

});

window.addEventListener("scroll",function(){
    showBackTopBtn();
    showAnimationContentControl();
})

backTopBtn.addEventListener("click",function(){
    scrollToTop();
})


