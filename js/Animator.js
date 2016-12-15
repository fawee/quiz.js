var App = App || {};

App.Animator = (function() {

    var that = {},
    	startScreenView = document.getElementById("startScreenView"),
    	quizScreenView = document.getElementById("quizScreenView"),
    	resultScreenView = document.getElementById("resultScreenView"),
    	backToStartBtn = document.getElementById("backToStartBtn");


    function startQuizAnimation() {
        startScreenView.classList.add("animated", "fadeOutLeft");
        setTimeout(function() {
            startScreenView.classList.add("noDisplay");
            quizScreenView.classList.remove("noDisplay");
            backToStartBtn.classList.remove("noDisplay");
            fadeInQuizScreenView();
        }, 1000);
    }

    function displayStartScreenView() {
    	fadeOutQuizScreenView();
        setTimeout(function() {
            quizScreenView.classList.add("noDisplay");
            backToStartBtn.classList.add("noDisplay");
            startScreenView.classList.remove("noDisplay");
            startScreenView.classList.remove("aimated", "fadeOutLeft");
            startScreenView.classList.add("animated", "fadeInRight");
        }, 1000);
    }

    function showNoAnswerNotification() {
    	quizScreenView.classList.remove("fadeInRight", "animated");
        quizScreenView.classList.add("animated", "shake");
        setTimeout(function() {
            quizScreenView.classList.remove("animated", "shake");
        }, 1000);
    }

    function fadeInQuizScreenView() {
        backToStartBtn.classList.remove("noClick");
        quizScreenView.classList.remove("noDisplay");
        quizScreenView.classList.remove("animated", "fadeOutLeft");
        quizScreenView.classList.add("animated", "fadeInRight");
    }

    function fadeOutQuizScreenView() {
    	backToStartBtn.classList.add("noClick");
        quizScreenView.classList.remove("animated", "fadeInRight");
        quizScreenView.classList.add("animated", "fadeOutLeft");
    }

    function fadeOutResultScreenView() {
        resultScreenView.classList.remove("animated", "fadeInRight");
        resultScreenView.classList.add("animated", "fadeOutLeft");
        setTimeout(function() {
            resultScreenView.classList.remove("animated", "fadeOutLeft");
            resultScreenView.classList.add("noDisplay");
            resultScreenView.style.backgroundImage = "";
            backToStartBtn.classList.remove("noDisplay");
            fadeInQuizScreenView();
        }, 1000);
    }

    function displayResultScreenView() {
    	backToStartBtn.classList.add("noDisplay");
        quizScreenView.classList.add("noDisplay");
        resultScreenView.classList.remove("noDisplay");
        resultScreenView.classList.add("animated", "fadeInRight");
    }

    function showFirework() {
    	resultScreenView.style.backgroundImage = "url(res/img/firework.gif)";
    }

    that.displayResultScreenView = displayResultScreenView;
    that.displayStartScreenView = displayStartScreenView;
    that.fadeOutQuizScreenView = fadeOutQuizScreenView;
    that.fadeOutResultScreenView = fadeOutResultScreenView;
    that.showFirework = showFirework;
    that.showNextQuestion = fadeInQuizScreenView;
    that.showNoAnswerNotification = showNoAnswerNotification;
    that.startQuizAnimation = startQuizAnimation;
    return that;

}());
