// Getting all required elements
const start_button = document.querySelector(".start_button button");
const info_box = document.querySelector(".info_box");
const exit_button = info_box.querySelector(".buttons .quit");
const continue_button = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const next_button = quiz_box.querySelector(".next_button");
const bottom_ques_counter = quiz_box.querySelector(".total_ques");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const timeCount = quiz_box.querySelector(".timer .timer_sec");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

//If start quiz button is clicked
start_button.onclick = ()=> {
    info_box.classList.add("activeInfo");
}

//If Exit button is clicked
exit_button.onclick = ()=> {
    window.close();
}

//If continue button is clicked
continue_button.onclick = ()=> {
    quiz_box.classList.add("activeQuiz");
    info_box.classList.remove("activeInfo");
    showQues(0);
    que_counter(1);
    startTimer(15);
}

restart_quiz.onclick = ()=> {
    window.location.reload();
}

quit_quiz.onclick = ()=> {
    window.close();
}

let ques_count = 0;
let que_num = 1;
let counter;
let timeValue = 15;
let userScore = 0;

//If next button is clicked
next_button.onclick = ()=> {
    if(ques_count < questions.length - 1){
        ques_count++;
        que_num++;
        showQues(ques_count);
        que_counter(que_num);
        clearInterval(counter);
        startTimer(timeValue);
        next_button.style.display = "none";
    } else {
        clearInterval(counter);
        console.log("Question Completed");
        result_box.classList.add("activeResult");
        quiz_box.classList.remove("activeQuiz");
        const scoreText = result_box.querySelector(".score_text");
        if(userScore < 50){
            let scoreTag = '<span> Your score is <p>' + userScore + '</p> out of <p>' + (questions.length * 10) + '.</p> </span>';
            scoreText.innerHTML = scoreTag;        
        } else {
            let scoreTag = '<span> Congrats! Your score is <p>' + userScore + '</p> out of <p>' + (questions.length * 10) + '.</p></span>';
            scoreText.innerHTML = scoreTag;
        }     
    }
} 

//Getting questions and options from array
function showQues(index) {
    const que_text = document.querySelector(".que_text");
    let que_tag = '<span>' + questions[index].number+ ". " + questions[index].question + '</span>';
    let option_tag = '<div class ="options">' + questions[index].options[0] + '<span></span></div>'
                    + '<div class ="options">' + questions[index].options[1] + '<span></span></div>'
                    + '<div class ="options">' + questions[index].options[2] +'<span></span></div>'
                    + '<div class ="options">' + questions[index].options[3] + '<span></span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    const options = option_list.querySelectorAll(".options");
    for (let i = 0; i < options.length; i++) {
        options[i].setAttribute("onclick","optionSelected(this)");
    }
}

let tickIcon = '<div class="icon_tick"> <i class="fas fa-check"></i></div>';
let crossIcon = '<div class="icon_cross"> <i class="fas fa-times"></i></div>';

function optionSelected(answer) {
    clearInterval(counter);
    let userAns = answer.textContent;
    let crctAns = questions[ques_count].answer;
    let allOptions = option_list.children.length;
    if(userAns == crctAns){
        userScore += 10;
        console.log(userScore);
        answer.classList.add("correct");
        console.log("You have selected the correct answer");
        answer.insertAdjacentHTML("beforeend", tickIcon);
    } else {
        answer.classList.add("incorrect");
        console.log("Your answer is wrong!");
        answer.insertAdjacentHTML("beforeend", crossIcon);

        for(let i = 0; i < allOptions; i++) {
            if(option_list.children[i].textContent == crctAns) {
                option_list.children[i].setAttribute("class","options correct");
                option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
            }
        }
    }

    for (let i = 0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled");
    }
    next_button.style.display = "block";
}

function que_counter(index){
    let total_ques_count_tag = '<span><p>' + index + '</p>of <p>' + questions.length + '</p> Questions </span>';
    bottom_ques_counter.innerHTML =total_ques_count_tag;
}

function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = time;
        time--;
        if(time < 9){
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if(time < 0) {
            clearInterval(counter);
            timeCount.textContent = "00";

            let crctAns = questions[ques_count].answer;
            let allOptions = option_list.children.length;

            for(let i = 0; i < allOptions; i++) {
                if(option_list.children[i].textContent == crctAns) {
                    option_list.children[i].setAttribute("class","options correct");
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
                }
            }
            for (let i = 0; i < allOptions; i++ ){
                option_list.children[i].classList.add("disabled");
            }
            next_button.style.display = "block";
        }
    }
}
