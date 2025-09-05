document.addEventListener("DOMContentLoaded",()=>{

    // Buttons
    nextButton = document.getElementById("next-question");
    startButton = document.getElementById("start-quiz");
    restartButton = document.getElementById("restart-quiz");

    //Sections
    questionContainer = document.getElementById("question-container");
    startQuizSection = document.getElementById("start-quiz-section");
    resultSection = document.getElementById("result-section");
    

    questionsList = [
        {
            'question':'What is capital of India ?',
            'choices':["Rajasthan","Delhi","Gujarat","Goa"],
            'correct':"Delhi"
        },
        {
            'question':'Which city is IT Hub of India ?',
            'choices':["Gandhinagar","Pune","Assam","Bangalore"],
            'correct':"Bangalore"
        },
        {
            'question':'India won the World Cup for the very first time in which year ?',
            'choices':["1983","2001","2011","2023"],
            'correct':"1983"
        }
    ]

    //Main Code
    let score = 0;
    let checkQuestionIndex = 0;

    function start_quiz(){
        checkQuestionIndex = 0;
        score = 0;
        startQuizSection.classList.add("hidden")
        questionContainer.classList.remove("hidden")
        resultSection.classList.add('hidden');

        show_question();
    }

    function show_question(){
        nextButton.classList.add("hidden");

        document.getElementById("question-text").innerHTML = questionsList[checkQuestionIndex]['question'];

        let choices = document.getElementById("choices");
        choices.innerHTML = "";

        questionsList[checkQuestionIndex]['choices'].forEach(choice => {
            let li = document.createElement("li");
            li.textContent = choice;
            li.addEventListener("click",()=>check_answer(choice));

            choices.appendChild(li);
        });
    }

    function check_answer(choice){
        nextButton.classList.remove("hidden");

        let correctAnswer = questionsList[checkQuestionIndex]['correct'];

        if(correctAnswer == choice){
            score += 1;
        }
    }

    function processing_question(){
        checkQuestionIndex += 1;
        if(checkQuestionIndex < questionsList.length){
            show_question();
        }else{
            show_score();
        }
    }

    function show_score(){
        startQuizSection.classList.add("hidden");
        questionContainer.classList.add("hidden");

        resultSection.classList.remove("hidden");
        document.getElementById("score").innerHTML = `${score} out of ${questionsList.length}`;
    }

    restartButton.addEventListener('click',start_quiz);

    nextButton.addEventListener('click',processing_question);

    //Start Quiz
    startButton.addEventListener('click',start_quiz);


})