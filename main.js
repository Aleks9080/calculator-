let runningTotal = 0;
let buffer = "0";
let previousOperatorl;

const screen = document.querySelector('.screen');

function buttonClick(value){
    if(isNaN(value)){
        handleSymbool(value);
    }else{
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbool(symbol){
    switch(symbol){
        case 'C':
            buffer= '0';
            runningTotal = 0;
            break;
        case '=':
            if(previousOperatorl === null){
                return
            }
            flushOperatiom(parseInt(buffer));
            previousOperatorl = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;
        case '←':
            if(buffer.length === 1){
                buffer = '0';
            }else{
                buffer = buffer.substring(0, buffer.length -1);
            }
            break;
        case '+':
        case '−': 
        case '×': 
        case '÷': 
        handleMath(symbol);
        break;
    }
}
function handleMath (symbol){
    if(buffer === '0'){
        return
    }
    const intBuffer = parseInt(buffer);
    if (runningTotal === 0){
        runningTotal = intBuffer;
    }else{
        flushOperatiom(intBuffer);
    }
    previousOperatorl = symbol;
    buffer = '0';
}
function flushOperatiom(intBuffer){
    if(previousOperatorl === '+'){
        runningTotal += intBuffer;
    }else if(previousOperatorl === '−'){
        runningTotal -= intBuffer;
    }else if(previousOperatorl ==='×'){
        runningTotal *= intBuffer
    }else if(previousOperatorl === '÷'){
        runningTotal /= intBuffer;
    }
}

function handleNumber(numberString){
    if(buffer === '0'){
        buffer = numberString;
    }else{
        buffer += numberString;
    }
} 
function init(){
    document.querySelector('.calc-buttons').addEventListener('click',function(event){
     buttonClick(event.target.innerText);
    });
}
init();