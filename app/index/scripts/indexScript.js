// elements

const linksControl = document.querySelectorAll(".links-control");
const linksControl_Symbol = document.querySelectorAll(".links-control i");
const linksControl_Link = document.querySelectorAll(".links a");

// functions

function hoverInLinkControl(){
    linksControl_Symbol.forEach((symbol) => {
        symbol.style.fontWeight = "900";
        symbol.style.color = "#00489A";
        symbol.style.transition = "0.2s";
    })

    linksControl_Link.forEach((link) => {
        link.style.fontWeight = "900";
        link.style.color = "#00489A";
        link.style.transition = "0.2s";
    })
}

function hoverOutLinkControl(){
    linksControl_Symbol.forEach((symbol) => {
        symbol.style.fontWeight = "bold";
        symbol.style.color = "black";
        symbol.style.transition = "0.2s";
    })

    linksControl_Link.forEach((link) => {
        link.style.fontWeight = "normal";
        link.style.color = "black";
        link.style.transition = "0.2s";
    })
}

// event listeners

linksControl.forEach((link) => {
    link.addEventListener("mouseenter", function(event){
        event.preventDefault();
        hoverInLinkControl();
    });
})