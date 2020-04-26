function initTest() {
    //  Initialize "time remaining" variable
    var timeLeft = 0;

    // created var's for all ID's that will be pulled
    var numQuestions = questions.length;
    var startTest = document.getElementById("start-button");
    var finalScoreEl = document.getElementById("final-score");
    var timeEl = document.getElementById("time-left");
    var bodyContainer = document.getElementById("body-container");
    var testContainer = document.getElementById("test-container");
    var highscoreContainerEl = document.getElementById("highscore-container");
    var highscoreButtonEl = document.getElementById("highscore-button");
    var finalContainerEl = document.getElementById("final-container");
    var submitButtonEl = document.getElementById("submit-init");
    var clearHighScore = document.getElementById("clearHighScore");
    // json var set up for local storage
    var highScores = JSON.parse(window.localStorage.getItem("scores"));

    function beginQuiz() {


        bodyContainer.setAttribute("class", "container d-none");
        testContainer.setAttribute("class", "container");
        var newRow = null;
        var colTwo = null;
        var newHeader = null;
        var buttonEl = null;
        var currentQuestion = 1;
        var score = 0;
        // quiz is set to 15 x 7 = 105 seconds in total. 
        timeLeft = numQuestions * 15;
        timeEl.setAttribute("value", timeLeft);
        // code created to cut short interval, w3 schools assisted me in the understadning of interval/clearinteval & 
        // added function to prompt final container to input intials once time is up or final answer is completed.
        var myInterval = setInterval(function () {
            if (timeLeft < 1) {
                clearInterval(myInterval);
                testContainer.setAttribute("class", "container d-none");
                finalContainerEl.setAttribute("class", "container d-none");
                return;
            }
            // time -1 every second once test begins
            timeLeft = timeLeft - 1;
            timeEl.setAttribute("value", timeLeft);
        }, 1000);
        var clickTimeout = false;
        // placed code below that created new rows, collumns, & headers for each question thats pulled 
        function createQuestion(questionNum) {
            testContainer.innerHTML = "";
            newRow = document.createElement("div");
            newRow.setAttribute("class", "row");
            testContainer.append(newRow);

            colTwo = document.createElement("div");
            colTwo.setAttribute("class", "col-0 col-sm-2");
            newRow.append(colTwo);

            colTwo = document.createElement("div");
            colTwo.setAttribute("class", "col-12 col-sm-8");
            newRow.append(colTwo);

            colTwo = document.createElement("div");
            colTwo.setAttribute("class", "col-0 col-sm-2");
            newRow.append(colTwo);

            colTwo = newRow.children[1];
            newRow = document.createElement("div");
            newRow.setAttribute("class", "row mb-3");
            colTwo.append(newRow);

            colTwo = document.createElement("div");
            colTwo.setAttribute("class", "col-12");
            newRow.append(colTwo);

            newHeader = document.createElement("h2");
            newHeader.innerHTML = questions[questionNum - 1].title;
            colTwo.append(newHeader);

            // for loop provided to input questions into newly created Div's (3 answer choices per question)
            colTwo = testContainer.children[0].children[1];
            for (var i = 0; i < 3; i++) {
                var newRow = document.createElement("div");
                newRow.setAttribute("class", "row mb-1");
                colTwo.append(newRow);

                var colThree = document.createElement("div");
                colThree.setAttribute("class", "col-12");
                newRow.append(colThree);
                // created buttons for "answers" below & appended them as needed
                buttonEl = document.createElement("button");
                buttonEl.setAttribute("class", "btn btn-primary");
                buttonEl.setAttribute("type", "button");
                buttonEl.innerHTML = questions[currentQuestion - 1].choices[i];
                colThree.append(buttonEl);
                buttonEl.addEventListener("click", function () {
                    // created correct/incorrect responses & message that shows prompt for 1.5 seconds. 
                    if (clickTimeout) {
                        return;
                    }
                    clickTimeout = true;
                    clearInterval(myInterval);
                    var colTwo = testContainer.children[0].children[1];
                    var newRow = document.createElement("div");
                    newRow.setAttribute("class", "row border-top");
                    colTwo.append(newRow);

                    colTwo = document.createElement("div");
                    colTwo.setAttribute("class", "col-12");
                    newRow.append(colTwo);

                    var highscoreEl = document.createElement("p");
                    colTwo.append(highscoreEl);
                    if (this.innerHTML === questions[currentQuestion - 1].answer) {
                        highscoreEl.innerHTML = "Correct!";
                        // created statement to subtract 10 seconds for every incorrect answer provided
                    } else {
                        highscoreEl.innerHTML = "Incorrect";
                        timeLeft = timeLeft - 10;
                        if (timeLeft < 0) {
                            timeLeft = 0;
                        }
                        timeEl.setAttribute("value", timeLeft);
                    }
                    currentQuestion++;
                    if (currentQuestion > questions.length) {
                        score = timeLeft;
                    }

                    // created code to show "correct/incorrect" statement for 1.5 seconds before continuing the test
                    setTimeout(function () {
                        if (currentQuestion > questions.length) {
                            // prompt input & final page if question length shorter than final question
                            testContainer.setAttribute("class", "container d-none");
                            finalContainerEl.setAttribute("class", "container");
                            finalScoreEl.setAttribute("value", score);
                        } else {
                            createQuestion(currentQuestion);
                            clickTimeout = false;
                            myInterval = setInterval(function () {
                                if (timeLeft < 1) {
                                    clearInterval(myInterval);
                                    testContainer.setAttribute("class", "container d-none");
                                    finalContainerEl.setAttribute("class", "container");
                                    return;
                                }
                                //  time -1 every second if questions are still going
                                timeLeft = timeLeft - 1;
                                timeEl.setAttribute("value", timeLeft);
                            }, 1000);
                        }
                        // 1.5 second prompt of "incorrect/correct"
                    }, 1500);
                });
            }


        }
        // function created to store highscores to localStorage.
        function saveScore() {
            var initialsEl = document.getElementById("initials-entry");
            var newHighScore = {
                initials: initialsEl.value,
                highScore: score
            };
            console.log(newHighScore);
            highScores.push(newHighScore);
            console.log(highScores);
            localStorage.setItem("scores", JSON.stringify(highScores));
        }
        // clear scores
        function clearScore() {
            newHighScore = {
                initials: "",
                highScore: ""
            };
            localStorage.clear
            // localStorage.setItem("initials", "")
            // localStorage.setItem("scores", "")


        }

        clearHighScore.addEventListener("click", clearScore);
        submitButtonEl.addEventListener("click", saveScore);
        createQuestion(currentQuestion);
    }
    // created event listener to start tests once start is clicked
    startTest.addEventListener("click", beginQuiz);

    // code created to hide all other containers except final score box whenever high score button is clicked
    highscoreButtonEl.addEventListener("click", function () {
        bodyContainer.setAttribute("class", "container d-none");
        testContainer.setAttribute("class", "container d-none");
        finalContainerEl.setAttribute("class", "container d-none");
        highscoreContainerEl.setAttribute("class", "container");
        var colTwo = document.getElementById("highscore-table");

        // loop created to store & format highscore outputs 
        for (i = 0; i < highScores.length; i++) {
            var newRow = document.createElement("div");
            newRow.setAttribute("class", "row mb-1");
            colTwo.append(newRow);

            var colThree = document.createElement("div");
            colThree.setAttribute("class", "col-12 text-center");
            newRow.append(colThree);

            var highscoreEl = document.createElement("div");
            highscoreEl.innerHTML = "Initials: " + highScores[i].initials + "   Score: " + highScores[i].highScore;
            colThree.append(highscoreEl);

        }
    });

}

initTest();