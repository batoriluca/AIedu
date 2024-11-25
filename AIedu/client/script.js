const menu_open_btn=document.getElementById("openmenu");
const menu_close_btn=document.getElementById("closemenu");

menu_open_btn.addEventListener("click", ()=>{
    document.querySelector("menu").setAttribute("style","left:0;")
})

menu_close_btn.addEventListener("click", ()=>{
    document.querySelector("menu").setAttribute("style","left:100vw;")
})