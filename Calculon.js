//Chris 23 Sep 2020

var calcStatus = {operator:"?", firstNum: 0.0, pendingReset: false};


function clear()
{
    calcStatus.operator = "?";
    calcStatus.firstNum = 0.0;
    calcStatus.pendingReset = false;
    calcStatus.myDisplay.value = calcStatus.firstNum;
    
}

function hitDigit()
{
   if (calcStatus.myDisplay.value === "0"){
      if(this.value !== "0") {
          calcStatus.myDisplay.value = this.value;
           
       }
   } else {
        if (calcStatus.pendingReset){
            clear();
            calcStatus.myDisplay.value = this.value;
        }else{
            calcStatus.myDisplay.value = calcStatus.myDisplay.value + this.value;
        }
        
    }
   
}


function hitDecimal()
{
    if (calcStatus.myDisplay.value.indexOf(".") == -1)
        {
           calcStatus.myDisplay.value = calcStatus.myDisplay.value + "."; 
        }
}

function hitOperator()
{
    calcStatus.operator = this.value;
    calcStatus.firstNum = parseFloat(calcStatus.myDisplay.value);
    calcStatus.myDisplay.value = "0";
    calcStatus.pendingReset = false;
    
    console.log(calcStatus);
}


function hitEquals()
{
    let secondNum = parseFloat(calcStatus.myDisplay.value);
    let result = 0.0;
    switch(calcStatus.operator)
        {
            case "+":  result = calcStatus.firstNum + secondNum; break;
            case "-":  result = calcStatus.firstNum - secondNum; break;
             case "*":  result = calcStatus.firstNum * secondNum; break;   
             case "/":  result = calcStatus.firstNum / secondNum; break; 
            default: break;
       
        }
    if(calcStatus.operator == "?")
        {
            calcStatus.myDisplay.value =secondNum;
        }
    else
    {
        clear();
        calcStatus.myDisplay.value = result;
    }
    calcStatus.pendingReset = !(calcStatus.pendingReset);
}

function init()
{
    console.log("JS File Loaded");
    
    
    calcStatus.myDisplay = document.getElementById("usertext");
    clear();
    
    let myButton = document.getElementById("clr");
    myButton.addEventListener('click', clear);
    
    myButton = document.getElementsByClassName('dbutton');
    
    for(let i = 0; i < myButton.length; i++)
        {
            myButton[i].addEventListener('click', hitDigit);
        }
    
    
    myButton = document.getElementById("bdec");
    myButton.addEventListener('click', hitDecimal);
    
     myButton = document.getElementsByClassName("obutton");
    for(let i = 0; i < myButton.length; i++)
        {
            myButton[i].addEventListener('click', hitOperator);
        }
    

    myButton = document.getElementById("beql");
    myButton.addEventListener('click', hitEquals);
    
    console.log("init() ended");
}