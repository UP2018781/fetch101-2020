'use strict';

async function showMessage(elem,url){

    //must use await and async because js is single threaded.

    const response = await fetch(url);
    const text = await response.text(); 
    elem.textContent = text;

}

async function showList(elem,url){
    
    const response = await fetch(url);
    const data = await response.json();

    for (let i = 0;i<data.length;i++){
        const listPiece = document.createElement("li");
        listPiece.textContent = data[i];
        elem.appendChild(listPiece);
    }
}

async function startShowingMessage(elem,url){

    const response = await fetch(url);
    if (response.ok){
        const data = await response.text();
        elem.textContent = data;
    } else {
        elem.textContent = "Error";
    }
    setTimeout(()=>{startShowingMessage(elem,url);},1000); //cool af use of recursion <

}

async function handleError(elem,url){
    const response = await fetch(url);
    if (response.ok){
        const data = await response.text();
        elem.textContent = data;
    } else {
        elem.textContent = "OH DEAR";
    }
}

async function drawBox(canvas,url){
    const colours = ['black','blue','green','red','pink','yellow']
    const response = await fetch(url);
    if(response.ok){
        const data = await response.json();
        if (data.x < 180 && data.y <180){
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0,0,999,999);
            ctx.fillStyle = colours[Math.floor(Math.random() * 6)];
            ctx.fillRect(data.x,data.y,20,20);
        }
    } else {
        const data = `${response.status} ${response.statusText} when loading`;
    }

    setTimeout(() => {drawBox(canvas,url);}, 1000);
}