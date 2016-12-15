/*
 * quiz.js v1.0
 * - Make your own Quiz! -
 * - An Interactive and Responsive Quiz -
 * coded by Fabian Fuchs with ♥ (https://github.com/fawee)
 */

var App = App || {};

App.Quiz = (function() {

	var that = {},
		StartScreen = App.StartScreen,
		QuizScreen = App.QuizScreen,
		ResultScreen = App.ResultScreen,
		Animator = App.Animator;


	/*
     * Init Function of Quiz.js
     */
	function init() {
		initModules();
		initEvents();
	}

	function initEvents() {
		StartScreen.on("startQuiz", startQuiz);
		QuizScreen.on("backToStart", onBackToStart);
		QuizScreen.on("noAnswerSelected", onNoAnswerSelected);
		QuizScreen.on("nextButtonPressed", onNextButtonPressed);
		QuizScreen.on("showNextQuestion", showNextQuestion);
		QuizScreen.on("quizFinished", onQuizFinished);
		ResultScreen.on("allCorrect", onAllCorrect);
		ResultScreen.on("startNewGame", startNewGame);
	}

	function initModules() {
		StartScreen.init();
		QuizScreen.init();
		ResultScreen.init();
	}

	function startNewGame() {
		Animator.fadeOutResultScreenView();
		QuizScreen.startQuiz();
	}

	function onAllCorrect() {
		Animator.showFirework();
	}

	function onQuizFinished(quizData) {
		Animator.displayResultScreenView();
		ResultScreen.showResult(quizData);
	}

	function showNextQuestion() {
		Animator.showNextQuestion();
	}

	function onNextButtonPressed() {
		Animator.fadeOutQuizScreenView();
	}

	function onNoAnswerSelected() {
		Animator.showNoAnswerNotification();
	}

	function onBackToStart() {
		Animator.displayStartScreenView();
	}

	function startQuiz() {
		Animator.startQuizAnimation();
		QuizScreen.startQuiz();
	}

	that.init = init;
	return that;
}());