const addButton = document.getElementById('add-button');
const addTenButton = document.getElementById('add-button-multi');
const resetButton = document.getElementById('reset-button');
const speedInput = document.getElementById('animation-speed');
const delayInput = document.getElementById('animation-delay');

const container = document.getElementById('col-cont');
const genericColumn = document.getElementsByClassName('column');

console.log(addButton);
console.log(container);

addButton.addEventListener('click', addColumn);
addTenButton.addEventListener('click', addTenColumn);
resetButton.addEventListener('click', resetColumn);
speedInput.addEventListener('change', animSpeed);
delayInput.addEventListener('change', animDelay);


function addColumn() {
    container.innerHTML += `<div class="column"></div>`;
    animSpeed();
    animDelay();
}

function addTenColumn() {
    for (let i = 0; i<10; i++) {
    container.innerHTML += `<div class="column"></div>`;
    }
    animSpeed();
    animDelay();
}

function resetColumn () {
    container.innerHTML = `<div class="column"></div>`;
    speedInput.value = "5";
    delayInput.value = "5";
}

function animSpeed () {
    var speed = speedInput.value;
    if (genericColumn.length > 0) {
        for (let i = 0; i < genericColumn.length; i++) {
            genericColumn[i].style.animationDuration = `${speed}s`;
            console.log(`${speed}s`);
        };
    
}}

function animDelay () {
    var delay = delayInput.value
    if (genericColumn.length>1) {
        for (let i = 0; i < genericColumn.length; i++) {
            let calcDelay = i * delay;
            genericColumn[i].style.animationDelay= `${calcDelay}ms`;
            console.log(`${delay}ms`);
        };
    }
}