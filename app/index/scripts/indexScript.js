//elements
const linksControl = document.querySelectorAll(".links-control");
const linksControl_symbol = document.querySelectorAll(".links-control i");
const linksControl_link = document.querySelectorAll(".links-control a");

const slides = document.querySelectorAll(".slide");


document.addEventListener("DOMContentLoaded",function(){
    for(let i = 1 ; i < slides.length ; i++){
        hideOtherSlides(i);
    }
})

const coursesControl = document.querySelectorAll(".courses-items-control");
const coursesImgs = document.querySelectorAll(".course-img");
const coursesImgsHover = document.querySelectorAll(".course-img-hover");
const coursesLinks = document.querySelectorAll(".courses-items-control a");

// testing
console.log(coursesControl);
console.log(coursesImgs);
console.log(coursesLinks);
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

function hideOtherSlides(param){
    slides[0].style.display = "flex";
    slides[param].style.display = "none";
}

// booting 

/*Este bloco de código é iniciado no momento que a página é carregada
e os loopings são executados que por sua vez chamam as funções hoverIn e hoverOut*/
document.addEventListener('DOMContentLoaded',function(event){
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
    
})

