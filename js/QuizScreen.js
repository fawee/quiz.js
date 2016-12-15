var App = App || {};

App.QuizScreen = (function() {

    var that = new App.EventPublisher(),
        questions,
        currentQuestion,
        userAnswers,
        currentQuestionIndex,
        currentQuestionCounter;

    /*
     * UI ELEMENTS
     */
    var options = document.getElementsByName("options"),
        option1Span = document.getElementById("option1Span"),
        option2Span = document.getElementById("option2Span"),
        option3Span = document.getElementById("option3Span"),
        option4Span = document.getElementById("option4Span"),
        option1Value = document.getElementById("option1Value"),
        option2Value = document.getElementById("option2Value"),
        option3Value = document.getElementById("option3Value"),
        option4Value = document.getElementById("option4Value"),
        questionCounterView = document.getElementById("questionCounterView"),
        questionTitle = document.getElementById("questionTitle");



    function init() {
        initUI();
        questions = App.Questions;
    }

    /*
     * Initializes the Next Button & Back to Main Menu Button
     */
    function initUI() {
        var backToStartBtn = document.getElementById("backToStartBtn");
        var nextButton = document.getElementById("nextButton");

        nextButton.addEventListener("click", saveAndNextQuestion);
        backToStartBtn.addEventListener("click", backToStart);
    }
    /*
     * Start the Quiz by resetting all components
     */
    function startQuiz() {
        userAnswers = { rightAnswers: 0, wrong: [] };
        currentQuestionIndex = 0;
        currentQuestionCounter = 0;
        shuffle(questions);
        displayNextQuestion();
    }

    /*
     * Shuffles Questions
     */
    function shuffle(a) {
        var j, x, i;
        for (i = a.length; i; i--) {
            j = Math.floor(Math.random() * i);
            x = a[i - 1];
            a[i - 1] = a[j];
            a[j] = x;
        }
    }

    /*
     * Displays Question, Answers and Progress on the View
     */
    function displayNextQuestion() {
        currentQuestion = questions[currentQuestionIndex];
        resetRadioButtons();
        shuffle(currentQuestion.options);
        currentQuestionCounter++;
        questionCounterView.innerHTML = currentQuestionCounter + " of " + questions.length;
        questionTitle.innerHTML = currentQuestionCounter + ". " + currentQuestion.title;
        option1Span.innerHTML = currentQuestion.options[0];
        option2Span.innerHTML = currentQuestion.options[1];
        option3Span.innerHTML = currentQuestion.options[2];
        option4Span.innerHTML = currentQuestion.options[3];
        option1Value.value = currentQuestion.options[0];
        option2Value.value = currentQuestion.options[1];
        option3Value.value = currentQuestion.options[2];
        option4Value.value = currentQuestion.options[3];
    }

    /*
     * Unchecks Radio Buttons
     */
    function resetRadioButtons() {
        for (var i = 0; i < options.length; i++) {
            options[i].checked = false;
        }
    }

    /*
     * Checks if an answers was selected:
     * Yes: Displays next question or notifies Animator to show the result
     * No: Notifies Animator to show a "nothing picked notification"
     */
    function saveAndNextQuestion() {
        var isOptionChecked = false;

        for (var i = 0; i < options.length; i++) {
            if (options[i].checked) {
                isOptionChecked = true;
                checkUserAnswer(options[i].value);
                break;
            }
        }
        if (!isOptionChecked) {
            that.emit("noAnswerSelected");
        } else {

            that.emit("nextButtonPressed");
            setTimeout(function() {
                currentQuestionIndex++;
                if (currentQuestionIndex === questions.length) {
                    that.emit("quizFinished", { "userAnswers": userAnswers, "numOfQuestions": questions.length });

                } else {
                    that.emit("showNextQuestion");
                    displayNextQuestion();
                }
            }, 1000);

        }
    }

    /*
     * Checks if the answer was right or wrong
     */
    function checkUserAnswer(answer) {
        if (answer === currentQuestion.answer) {
            userAnswers.rightAnswers++;
        } else {
            userAnswers.wrong.push({ title: currentQuestion.title, yourAnswer: answer });
        }
    }

    /*
     * Notifies the Animator to display the StartScreenView
     */
    function backToStart() {
        if (currentQuestionIndex === questions.length) {
            return;
        }
        that.emit("backToStart");
    }

    that.init = init;
    that.startQuiz = startQuiz;
    return that;
}())
