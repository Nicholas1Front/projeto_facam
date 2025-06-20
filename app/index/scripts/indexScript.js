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

// functions 

async function showHtmlElement([...elements], displayType){
    elements.forEach((element) => {
        element.style.display = displayType;
    });
}

async function hideHtmlElement([...elements]){
    elements.forEach((element)=>{
        element.style.display = "none";
    })
}


//registration slides

//esta parte diz respeito a todos os elementos e functions que formam o mecanismo de slides da registration-section

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

        hideSlide(slidesCounter-1);
        showSlide(slidesCounter);

        showBreadcrumb(slidesCounter);  
        hideBreadcrumb(slidesCounter-1);

        showAnimation(slidesCounter,"slide-in-right");
        removeAnimation(slidesCounter-1);
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

// post-graduation-ead-section

// elements

const postGraduationEadSection = document.querySelector(".post-graduation-ead-section");
const scaleOutVerTop_animation = "scale-out-ver-top";
const scaleInVerTop_animation = "scale-in-ver-top";
const postGraduationContainer = postGraduationEadSection.querySelector(".post-graduation-container");
const eadContainer = postGraduationEadSection.querySelector(".ead-container");

// functions

async function showInfoContainer_postGraduationEadSection(fatherContainer){
    const titleContainer = fatherContainer.querySelector(".title-container");
    const titleIcon = titleContainer.querySelector("i");
    const infoContainer = fatherContainer.querySelector(".info-container");

    if(infoContainer.classList.contains("hidden")){
        infoContainer.classList.remove(scaleOutVerTop_animation);

        titleIcon.classList.remove("fa-chevron-down");
        titleIcon.classList.add("fa-chevron-up");

        await showHtmlElement([infoContainer], "flex");
        infoContainer.classList.add(scaleInVerTop_animation);

        infoContainer.classList.remove("hidden");
        infoContainer.classList.add("active")
    }    
}

async function hideInfoContainer_postGraduationEadSection(fatherContainer){
    const titleContainer = fatherContainer.querySelector(".title-container");
    const titleIcon = titleContainer.querySelector("i");
    const infoContainer = fatherContainer.querySelector(".info-container");

    if(infoContainer.classList.contains("active")){
        infoContainer.classList.remove(scaleInVerTop_animation);

        titleIcon.classList.remove("fa-chevron-up");
        titleIcon.classList.add("fa-chevron-down");

        infoContainer.classList.add(scaleOutVerTop_animation);

        setTimeout(()=>{
            hideHtmlElement([infoContainer]);            
            infoContainer.classList.remove(scaleOutVerTop_animation);

            infoContainer.classList.remove("active");
            infoContainer.classList.add("hidden");
        }, 550);
    }
}

// event listeners

postGraduationContainer.querySelector(".title-container").addEventListener("click", async()=>{
    const infoContainer = postGraduationContainer.querySelector(".info-container");

    if(infoContainer.classList.contains("hidden")){
        await showInfoContainer_postGraduationEadSection(postGraduationContainer);
    }else if(infoContainer.classList.contains("active")){
        await hideInfoContainer_postGraduationEadSection(postGraduationContainer);
    }
});

eadContainer.querySelector(".title-container").addEventListener("click", async()=>{
    const infoContainer = eadContainer.querySelector(".info-container");

    if(infoContainer.classList.contains("hidden")){
        await showInfoContainer_postGraduationEadSection(eadContainer);
    }else if(infoContainer.classList.contains("active")){
        await hideInfoContainer_postGraduationEadSection(eadContainer);
    }
});

// news slides
//esta parte diz respeito a todos os elementos e functions que formam o mecanismo de slides da news-section

//slide elements

const newsSlides = document.querySelectorAll(".news-slide");
const newsBreadcrumbs = document.querySelectorAll(".news-slide-breadcrumb");
const newsSlidePrevControl = document.querySelector(".news-slide-prev-control");
const newsSlideNextControl = document.querySelector(".news-slide-next-control")
let newsSlidesCounter = 0;

//slide functions
function prevNewsSlideProcess(){
    if(newsSlidesCounter <= 0){
        hideNewsBreadcrumb(newsSlidesCounter);
        hideNewsSlide(newsSlidesCounter);
        removeAnimation(newsSlidesCounter);

        newsSlidesCounter = newsSlides.length - 1;

        showNewsAnimation(newsSlidesCounter, "slide-in-right");
        showNewsBreadcrumb(newsSlidesCounter);
        showNewsSlide(newsSlidesCounter);

        return;
    }else if(newsSlidesCounter >= 0){
        newsSlidesCounter = newsSlidesCounter - 1;

        hideNewsSlide(newsSlidesCounter+1);
        showNewsSlide(newsSlidesCounter);

        hideNewsBreadcrumb(newsSlidesCounter+1);
        showNewsBreadcrumb(newsSlidesCounter);

        showNewsAnimation(newsSlidesCounter, "slide-in-left");
        removeNewsAnimation(newsSlidesCounter+1);
    }
}

function nextNewsSlideProcess(){
    if(newsSlidesCounter == newsSlides.length-1 || newsSlidesCounter > newsSlides.length){
        hideNewsBreadcrumb(newsSlidesCounter);
        hideNewsSlide(newsSlidesCounter);
        removeNewsAnimation(newsSlidesCounter);

        newsSlidesCounter = 0;

        showNewsAnimation(newsSlidesCounter, "slide-in-left");
        showNewsBreadcrumb(newsSlidesCounter);
        showNewsSlide(newsSlidesCounter);
        
        return;
    }else if(newsSlidesCounter < newsSlides.length){
        newsSlidesCounter++;

        hideNewsSlide(newsSlidesCounter-1);
        showNewsSlide(newsSlidesCounter);

        showNewsBreadcrumb(newsSlidesCounter);  
        hideNewsBreadcrumb(newsSlidesCounter-1);

        showNewsAnimation(newsSlidesCounter,"slide-in-right");
        removeNewsAnimation(newsSlidesCounter-1);
    }

};

function showNewsSlide(param){
    newsSlides[param].style.display = "flex";
}

function hideNewsSlide(param){
    newsSlides[param].style.display = "none";
}

function showNewsBreadcrumb(param){
    newsBreadcrumbs[param].classList.add("news-breadcrumb-selected");
}

function hideNewsBreadcrumb(param){
    newsBreadcrumbs[param].classList.remove("news-breadcrumb-selected");
}

function showNewsAnimation(param , animation){
    newsSlides[param].classList.add(animation);
}

function removeNewsAnimation(param){
    newsSlides[param].classList.remove("slide-in-right");
    newsSlides[param].classList.remove("slide-in-left");
}

function initNewsSlides(newsSlides){
    showNewsSlide(0);
    showNewsBreadcrumb(0)

    for(let i = 1 ; i <= newsSlides.length-1 ; i++){
        hideNewsSlide(i);
    };
};

//slide event listeners

newsSlidePrevControl.addEventListener("click", (event)=>{
    event.preventDefault();
    prevNewsSlideProcess();
})

newsSlideNextControl.addEventListener("click", (event)=>{
    event.preventDefault();
    nextNewsSlideProcess(); 
})

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

    //slide init : esconde os outros slides e mostra o primeiro slide
    initSlides(slides); 
    initNewsSlides(newsSlides);

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

});

window.addEventListener("scroll",function(){
    showBackTopBtn();
})

backTopBtn.addEventListener("click",function(){
    scrollToTop();
})


