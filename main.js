// Variables from html

const mainMenu = document.querySelector(".main-menu");
const chooseDiff = document.querySelector(".choose-difficulty");
const game = document.querySelector(".game");
const nextBtn = document.querySelector(".js-next-btn");
const backBtn = document.querySelector(".js-back-menu-btn");
const backBtnTwo = document.querySelector(".js-back-menu-btn-from-game");
const startBtn = document.querySelector(".js-start-btn");
const elSignList = document.querySelector(".sign-list");
const elSignItem = document.querySelector(".sign-item");
const elSignTitle = document.querySelector(".sign-title");
const selectDiff = document.querySelector(".js-select-diff");
const selectTime = document.querySelector(".js-select-time");
const elForm = document.querySelector(".js-form");
const elTime = document.querySelector(".js-time");
const gameOver = document.querySelector(".over-box");
const gameWin = document.querySelector(".win-box");
const correctIcon = document.querySelector(".correct-icon");
const correctVoice = document.querySelector(".correct-voice")
const errorVoice = document.querySelector(".error-voice")
const elCount = document.querySelector(".count")
const elScore = document.querySelector(".score")
const elScoreOver = document.querySelector(".score-over")
const elCountOver = document.querySelector(".count-over")
const elScoreWin = document.querySelector(".score-win")
const elCountWin = document.querySelector(".count-win")
let correctAnswerIndex = 0


// Count and Score

let count = 5
elCount.textContent = `Urinishlar soni : ${count}`
let score = 0
elScore.textContent = `Ball : ${score}`

// Listen buttons

backBtn.addEventListener("click" , (evt)=> {
    
    evt.preventDefault();
    
    chooseDiff.classList.remove("d-block");
    chooseDiff.classList.add("d-none");
    game.classList.remove("d-block");
    game.classList.add("d-none");
    mainMenu.classList.remove("d-none");
    mainMenu.classList.add("d-block");
    
});
backBtnTwo.addEventListener("click" , (evt)=> {
    
    evt.preventDefault();
    
    chooseDiff.classList.remove("d-block");
    chooseDiff.classList.add("d-none");
    game.classList.remove("d-block");
    game.classList.add("d-none");
    mainMenu.classList.remove("d-none");
    mainMenu.classList.add("d-block");
    
});
nextBtn.addEventListener("click" , (evt)=> {
    
    evt.preventDefault();
    
    mainMenu.classList.add("d-none");
    mainMenu.classList.remove("d-block");
    chooseDiff.classList.add("d-block");
    chooseDiff.classList.remove("d-none");
    
});


// Randomiz Function

function randomize(level = "Oson") {
    var result = []
    
    while (true) {
        if(
            (level == "Oson" && result.length == 10) || 
            (level == "O'rtacha" && result.length == 15) ||
            (level == "Qiyin" && result.length == 30) ||
            level > 3 || level < 1
            )
            {
                break;
            }
            
            // let randomTitle = Math.floor(Math.random() * (result.length - 1));
            // elSignTitle.textContent = randomTitle; 
            let randomItem = Math.floor(Math.random() * (roadSymbol.length - 1));
            let isExist = result.find((item) => item  == roadSymbol[randomItem])
            if(!isExist){
                result.push(roadSymbol[randomItem]);
            }
        }
        // console.log(result);
        return result;
    }
    
    
    // Render Signs
    
function renderSigns (item){
        
        const templateSign = document.querySelector(".sign-template").content;
        const fragmentSign = document.createDocumentFragment();
        const randomAnswer = Math.floor(item.length * Math.random())
        correctAnswerIndex = randomAnswer
        
        elSignList.innerHTML = "";
        
        item.forEach((symbol , index) => {
            
            const elClone = templateSign.cloneNode(true);
            
            elClone.querySelector(".js-sign-img").src = symbol.symbol_img;
            elClone.querySelector(".js-sign-img").alt = symbol.symbol_title;
            const newItem =  elClone.querySelector(".sign-item")
            newItem.addEventListener('click', e => {
                
                
                if(correctAnswerIndex === index) {
                    
                    score += 2
                    elScore.textContent = `Ball : ${score}`
                    
                    newItem.classList.add("correct-color")
                    
                    let audioCorrect = new Audio(("./sounds/correct-voice.mp3"));
                    audioCorrect.play()
                    
                    setTimeout(() => {
                        newItem.classList.remove("correct-color")
                        newItem.classList.add("disabled")
                    }, 1400);
                    
                    item.splice(index , 1)
                    
                    if(item.length == 0){
                        gameWin.classList.add("d-flex")
                        gameWin.classList.remove("d-none")
                        game.classList.remove("d-block")
                        game.classList.add("d-none")
                        elCountWin.textContent =  `Urinishlar soni : ${count}`
                        elScoreWin.textContent = `Ball : ${score}`
                    }
                    
                    renderSigns(item)
                    
                    const randomAnswer = Math.floor(item.length * Math.random())    
                    
                    correctAnswerIndex = randomAnswer
                    elSignTitle.textContent = item[randomAnswer].symbol_title; 
                    
                }else{
                    count--
                    elCount.textContent = `Urinishlar soni : ${count}`
                    score--
                    elScore.textContent = `Ball : ${score}`
                    newItem.classList.add("false-color")
                    let audio = new Audio(("./sounds/error-voice.mp3"));
                    audio.play()
                    setTimeout(() => {
                        // audio.pause()
                        newItem.classList.remove("false-color")
                    }, 1400);
                    if(count === 0){
                        gameOver.classList.add("d-flex")
                        gameOver.classList.remove("d-none")
                        game.classList.remove("d-block")
                        game.classList.add("d-none")
                        elCountOver.textContent = `Urinishlar soni qolmadi`
                        elScoreOver.textContent = `Ball : ${score}`
                    }
                    
                }
            })
            
            fragmentSign.appendChild(elClone);
        })
        elSignList.append(fragmentSign);
        elSignTitle.textContent = item[randomAnswer].symbol_title; 
    }
    
    // Listen form 
    
elForm.addEventListener("submit" , evt =>{
        evt.preventDefault()
        
        const selectDiffValue = selectDiff.value;
        const selectTimeValue = selectTime.value;
        
        let time = selectTimeValue * 60;
        var timeFn = setInterval(function(){
            let second = Math.floor(time % 60);
            let minute = Math.floor(time / 60);
            
            if(second < 10){
                second = "0" + String(second);
            }
            if(minute < 10){
                minute = "0" + String(minute);
            }
            elTime.textContent = `${minute}:${second}`;
            --time
            
            if(second == 00 && minute == 00){
                clearInterval(timeFn)
                gameOver.classList.add("d-flex")
                gameOver.classList.remove("d-none")
                game.classList.remove("d-block")
                game.classList.add("d-none")
            }
            
            
        }, 1000)
        
        
        chooseDiff.classList.remove("d-block");
        chooseDiff.classList.add("d-none");
        game.classList.remove("d-none")
        game.classList.add("d-block")
        
        
        renderSigns(randomize(selectDiffValue))
        
    })
    
    
    