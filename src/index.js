//generate question from option that contains paired two number from selected six random number from 1-9

const allNumbers = [1,2,3,4,5,6,7,8,9]
let selectedNumber = []
let pairedNumber = []
let question = 0

for(let i=0;i<6;i++){
  index = Math.floor(Math.random()*allNumbers.length)
  selectedNumber.push(allNumbers[index])

  allNumbers.splice(index,1)
}

selectedNumberDummy = selectedNumber.slice(0)
for(let i=0;i<3;i++){
  addOrSubstract = Math.floor(Math.random()*2)
  if(addOrSubstract == 0){
    randomIndex1 = Math.floor(Math.random()*selectedNumberDummy.length)
    randomIndex2 = Math.floor(Math.random()*selectedNumberDummy.length)
    while(randomIndex1==randomIndex2){
      randomIndex2 = Math.floor(Math.random()*selectedNumberDummy.length)
    }

    let chosenNumber1 = selectedNumberDummy[randomIndex1]
    let chosenNumber2 = selectedNumberDummy[randomIndex2]

    pairedNumber.push(chosenNumber1+chosenNumber2)

    selectedNumberDummy.splice(randomIndex1,1)
    if(randomIndex1<randomIndex2){
      selectedNumberDummy.splice(randomIndex2-1,1)
    }else{
      selectedNumberDummy.splice(randomIndex2,1)
    }
  }
  if(addOrSubstract == 1){
    randomIndex1 = Math.floor(Math.random()*selectedNumberDummy.length)
    randomIndex2 = Math.floor(Math.random()*selectedNumberDummy.length)
    while(randomIndex1==randomIndex2){
      randomIndex2 = Math.floor(Math.random()*selectedNumberDummy.length)
    }

    let chosenNumber1 = selectedNumberDummy[randomIndex1]
    let chosenNumber2 = selectedNumberDummy[randomIndex2]

    pairedNumber.push(chosenNumber1-chosenNumber2)

    selectedNumberDummy.splice(randomIndex1,1)
    if(randomIndex1<randomIndex2){
      selectedNumberDummy.splice(randomIndex2-1,1)
    }else{
      selectedNumberDummy.splice(randomIndex2,1)
    }
  }
}


for(let i=0;i<pairedNumber.length;i++){
  question+=pairedNumber[i]
}

let isStarted = false

//adding the selected numbers to number boxes
const numberBox = document.querySelectorAll('.numberBox')

//adding question number to quiestion box
const questionBox= document.querySelector('.question')
const questionNumber = document.createTextNode(question)
questionBox.appendChild(questionNumber)

//making timer

let timeCount = 0
let timeCountInBox = document.createTextNode(timeCount)
const time = document.querySelector('.time')
time.appendChild(timeCountInBox)

function startTimer(){
  time.removeChild(timeCountInBox)
  timeCount +=1
  timeCountInBox = document.createTextNode(timeCount)
  return time.appendChild(timeCountInBox)
}

//chosing number function
let chosenNumber = []


//chosing operator
const operator = document.querySelectorAll('.operator')
let chosenOperator = []

let chosenPair = 0

//chosing pair box
const pairBoxes = document.querySelectorAll('.upperBox')
const borderColor = ['#FF0013','#13FF00','#0013FF']
const backgroundColor = [
  'linear-gradient(-45deg, rgb(255, 0, 19, 0.2), rgb(255, 0, 19, 0.7))',
  'linear-gradient(-45deg, rgb(19, 255, 0, 0.2), rgb(19, 255, 0, 0.7))',
  'linear-gradient( -45deg, rgb(0, 19, 255, 0.2), rgb(0, 19, 255, 0.7))'
]
for(let i=0;i<pairBoxes.length;i++){
   pairBoxes[i].style.background=backgroundColor[i]
}
let chosenNumberBox = []

//funtion for select the box,number,operator
function chosePairBox(){
  if(!isStarted || this.textContent != ''){
    return
  }
  chosenBox = this
  chosenNumber=[]
  chosenNumberBox.forEach(box => box.addEventListener('click',getNumber))
  chosenNumberBox = []
  operator.forEach(e=>e.style.cursor = 'pointer')
  numberBox.forEach(e=>e.style.cursor = 'pointer')
  return chosenBox
}
pairBoxes.forEach(box => box.addEventListener('click',chosePairBox))



function getNumber(){
  if( typeof chosenBox == 'undefined' || this.style.background != ''){
    return
  }
  if(chosenNumber.length==1 && chosenOperator.length==0){
    chosenNumberBox[0].style.background = ''
    chosenNumber=[]
    delete chosenBox
    return
  }

  number = Number(this.textContent)
  chosenNumber.push(number)
  chosenNumberBox.push(this)
  this.style.background=chosenBox.style.background
  
  if(chosenNumber.length==2 && chosenOperator.length==1){
    if(chosenOperator[0]=='+'){
      result = chosenNumber[0]+chosenNumber[1]
      chosenBox.textContent = result
      chosenNumber=[]
      chosenOperator=[]
      this.style.background=chosenBox.style.background
      delete chosenBox  
      ceckTotal()
    }else if(chosenOperator[0]=='-'){
      result = chosenNumber[0]-chosenNumber[1]
      chosenBox.textContent = result
      chosenNumber=[]
      chosenOperator=[]
      this.style.background=chosenBox.style.background
      delete chosenBox
      ceckTotal()
    }
  }
  chosenNumberBox.forEach(e => e.removeEventListener('click',getNumber))
}
numberBox.forEach(box => box.addEventListener('click', getNumber))



function getOperator(){
  if( typeof chosenBox == 'undefined'){
    return
  }
  if(chosenOperator.length==1||chosenNumber.length!=1){
    chosenOperator=[]
    chosenNumber=[]
    delete chosenBox
    return
  }
  theOperator = this.textContent
  return chosenOperator.push(theOperator) 
}
operator.forEach(e => e.addEventListener('click',getOperator))

resetButton = document.querySelector('.resetButton')
function reset(){
  numberBox.forEach(e=>e.style.background='')
  pairBoxes.forEach(e=>e.textContent='')
}
resetButton.addEventListener('click',reset)


startButton = document.querySelector('.startButton')
function start(){
  isStarted = true
  timeCount = 0
  timer = setInterval(startTimer,1000)
  startButton.textContent = 'STOP'
  resetButton.style.cursor='pointer'
  pairBoxes.forEach(e=>e.style.cursor = 'pointer')
  //adding the selected numbers to number boxes  
  for(let i=0;i<numberBox.length;i++){                      
    number = document.createTextNode(selectedNumber[i])
    numberBox[i].appendChild(number)
  }

  startButton.addEventListener('click',changeButton, {once: true})
}
startButton.addEventListener('click',start, {once: true})


function changeButton(){
  clearInterval(timer)
  resetButton.style.cursor = ''
  numberBox.forEach(e=>e.style.cursor = '')
  operator.forEach(e=>e.style.cursor = '')
  pairBoxes.forEach(e=>e.style.cursor = '')
  resetButton.removeEventListener('click',reset)
  numberBox.forEach(e=>e.removeEventListener('click',getNumber))
  startButton.textContent='RESTART'
  startButton.addEventListener('click',()=>{location.reload()}, {once: true})
}


ceckTotal = ()=>{
  pairBoxesNumbers = 0
  filledPairBoxes = document.querySelectorAll('.upperBox')
  for(let i=0;i<filledPairBoxes.length;i++){
    pairBoxesNumbers += Number(filledPairBoxes[i].textContent)
  }
  if(pairBoxesNumbers == question && filledPairBoxes[0].textContent != '' && filledPairBoxes[1].textContent != '' && filledPairBoxes[2].textContent != ''){
    clearInterval(timer)
    resetButton.style.cursor = ''
    numberBox.forEach(e=>e.style.cursor = '')
    operator.forEach(e=>e.style.cursor = '')
    pairBoxes.forEach(e=>e.style.cursor = '')
    resetButton.removeEventListener('click',reset)
    startButton.textContent = 'YOU WON!'
    isStarted = false
    setTimeout(()=>{alert('YOU WON BY '+timeCount+' SECONDS!')},500)
  }
}


//how to play expan

const expandsMore = document.querySelectorAll('[expand-more]')

function expand(){
  const descContent = document.getElementById(this.dataset.target)
  if (descContent.classList.contains('expand-active')){
    this.innerHTML = this.dataset.showtext
  } else {
    this.innerHTML = this.dataset.hidetext
  }
  descContent.classList.toggle('expand-active')
}
expandsMore.forEach(expandMore => {
  expandMore.addEventListener('click', expand)
})
