var App = App || {};

App.StartScreen = (function() {

    var that = new App.EventPublisher(),
        startScreen = document.getElementById("startScreen"),
        Quiz;

    function init() {
        var startButton = document.getElementById("startButton");
        startButton.addEventListener("click", onStartClicked);
    }

    function onStartClicked() {
        that.emit("startQuiz");
    }

    that.init = init;
    return that;
}());
