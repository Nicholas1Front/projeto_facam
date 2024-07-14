// elements

const linksControl = document.querySelectorAll(".links-control");
const linksControl_symbol = document.querySelectorAll(".links-control i");
const linksControl_link = document.querySelectorAll(".links-control a");

const coursesControl = document.querySelectorAll(".courses-items-control");
const coursesImgs = document.querySelectorAll(".course-img");
const coursesLinks = document.querySelectorAll(".courses-items-control a");

// testing
console.log(linksControl);
console.log(linksControl_symbol);
console.log(linksControl_link);
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

// booting 

/*Este bloco de código é iniciado no momento que a página é carregada
e os loopings são executados que por sua vez chamam as funções hoverIn e hoverOut*/
document.addEventListener('DOMContentLoaded',function(event){
    for(let i = 0; i < linksControl.length ; i++){
        linksControl[i].addEventListener('mouseenter',function(event){
            event.preventDefault();
        
            hoverInLinksControl(i);
        });
    }
    
    for(let i = 0; i < linksControl.length ; i++){
        linksControl[i].addEventListener('mouseleave',function(event){
            event.preventDefault();
        
            hoverOutLinksControl(i);
        });
    }
    
})