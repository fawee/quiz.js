var App = App || {};

App.ResultScreen = (function() {

    var that = new App.EventPublisher(),
        quizData,
        showWrongAnswersBtnClicked = false,
        rightAnswersView = document.getElementById("rightAnswersView"),
        numOfQuestionsView = document.getElementById("numOfQuestionsView"),
        newGameBtn = document.getElementById("newGameButton"),
        showWrongAnswersBtn = document.getElementById("showWrongAnswersBtn"),
        wrongAnswersList = document.getElementById("wrongAnswersList");

    function init() {
        newGameBtn.addEventListener("click", startNewGame);
        showWrongAnswersBtn.addEventListener("click", showWrongAnswers);
    }

    /*
     * Notifies the central Module (Quiz.js) to start a new game and the Animator Module to make Animations
     */
    function startNewGame() {
        that.emit("startNewGame");
        setTimeout(function() {
            showWrongAnswersBtnClicked = false;
            showWrongAnswersBtn.classList.add("noDisplay");
            wrongAnswersList.classList.add("noDisplay");
            wrongAnswersList.innerHTML = "";
        }, 1000);

    }

    /*
     * Displays a list of all wrong answered questions 
     */
    function showWrongAnswers() {
        if (!showWrongAnswersBtnClicked) {
            showWrongAnswersBtnClicked = true;

            for (var i = 0; i < quizData.userAnswers.wrong.length; i++) {
                var li = document.createElement("li");
                var h4 = document.createElement("h4");
                var p = document.createElement("p");
                var spanQ = document.createElement("span");
                var spanA = document.createElement("span");
                li.appendChild(h4);
                li.appendChild(p);
                spanQ.appendChild(document.createTextNode("Question: "));
                spanA.appendChild(document.createTextNode("Your Answer: "));
                h4.appendChild(spanQ);
                h4.appendChild(document.createTextNode(quizData.userAnswers.wrong[i].title));
                p.appendChild(spanA);
                p.appendChild(document.createTextNode(quizData.userAnswers.wrong[i].yourAnswer));
                wrongAnswersList.appendChild(li);
            }

            wrongAnswersList.classList.remove("noDisplay");
            Materialize.showStaggeredList('#wrongAnswersList');
        }
    }

    /*
     * Displays the User Score (Number of right Answers)
     */
    function showResult(data) {
        var rightAnswers = data.userAnswers.rightAnswers,
            numOfQuestions = data.numOfQuestions;

        quizData = data;
        if (rightAnswers < numOfQuestions) {
            showWrongAnswersBtn.classList.remove("noDisplay");
        }
        rightAnswersView.innerHTML = rightAnswers;
        numOfQuestionsView.innerHTML = numOfQuestions;
        if (rightAnswers === numOfQuestions) {
            that.emit("allCorrect");
        }
    }

    that.init = init;
    that.showResult = showResult;
    return that;
}());
