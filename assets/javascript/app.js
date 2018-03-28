//Game Object
var GameObj = {
    correctAnswers: 0,
    incorrectAnswers: 0,
    unAnswers: 0,
    time: 10,
    timer: 0,
    randomQ: null,
    totalQuestions: 0,
    triviaQA: [{
        Question: "Normal adult dogs have how many teeth?",
        Answers: {
            a: "24.", 
            b: "38.", 
            c: "42.", 
            d: "32."
        },
        correctAnswer: "c"
    }, {
        Question: "Through what part of the body do dogs sweat?",
        Answers: {
            a: "Mouth.", 
            b: "Ears.", 
            c: "Nose.", 
            d: "Paws."
        },
        correctAnswer: "d"
    }, {
        Question: "What is the most common training command taught to dogs?",
        Answers: {
            a: "Stay.", 
            b: "Beg.", 
            c: "Sit.", 
            d: "Dance."
        },
        correctAnswer: "c"
    }, {
        Question: "What is a dog’s most highly developed sense?",
        Answers: {
            a: "Taste.", 
            b: "Smell.", 
            c: "Sight.", 
            d: "Touch."
        },
        correctAnswer: "b"
    }, {
        Question: "Puppies are delivered how many weeks after conception?",
        Answers: {
            a: "36.", 
            b: "22.", 
            c: "9.", 
            d: "16."
        },
        correctAnswer: "c"
    }, {
        Question: "What is the favorite dog breed of the Queen of England?",
        Answers: {
            a: "Corgi.", 
            b: "Basenji.", 
            c: "Poodle.", 
            d: "Pomeranian."
        },
        correctAnswer: "a"
    }, {
        Question: "Which TV series had a dog named K9 who was also a robot?",
        Answers: {
            a: "Full House.", 
            b: "Star Trek.", 
            c: "Doctor Who.", 
            d: "Law & Order."
        },
        correctAnswer: "c"
    }, {
        Question: "Which dog breed is the smallest of them all?",
        Answers: {
            a: "Dachshund.", 
            b: "Shih tzu.", 
            c: "Pomeranian.", 
            d: "Chihuahua."
        },
        correctAnswer: "d"
    }, {
        Question: "Which breed was once known as St. John’s Newfoundland?",
        Answers: {
            a: "Newfoundland.", 
            b: "Golden retriever.", 
            c: "Labrador.", 
            d: "Puli."
        },
        correctAnswer: "c"
    }, {
        Question: "Which dog breed has a black tongue?",
        Answers: {
            a: "Husky.", 
            b: "Labrador.", 
            c: "Weimaraner.", 
            d: "Chow chow."
        },
        correctAnswer: "d"
    }, {
        Question: "The first dogs registered in the American Kennel Club belonged to what group?",
        Answers: {
            a: "Herding.", 
            b: "Sporting.", 
            c: "Working.", 
            d: "Hound."
        },
        correctAnswer: "b"
    }, {
        Question: "What is the name of the dog on the front of the Cracker Jack box?",
        Answers: {
            a: "Jack.", 
            b: "Max.", 
            c: "Bingo.", 
            d: "Fido."
        },
        correctAnswer: "c"
    }],

    //Reset all variables and timer for new game
    reset: function () {
        GameObj.correctAnswers= 0;
        GameObj.incorrectAnswers= 0;
        GameObj.unAnswers= 0;
        GameObj.time = 10;
        GameObj.randomQ= null;
        GameObj.totalQuestions= 0;
        clearTimeout(timer);
        $("#startAgain").hide();
        $("#content, #buttons, #displayTimer, #displayQuesiton, #answer, #showResults, #choices").html("");
        GameObj.loadQuestion();
    },

    //showResults function is called when totalQuestions equals 10
    showResults: function () {
        clearTimeout(timer);
        $("#answer").html("<h1 class='QA'>Completed! Results Below<br />" 
                        + "Correct Answers: " + GameObj.correctAnswers
                        + "<br />Incorrect Answers: " + GameObj.incorrectAnswers
                        + "<br />Unanswers: " + GameObj.unAnswers
                        + "</h1>");
        $("#displayTimer").html("");
        $("#startAgain").show();
        $("#startAgain").on("click", function () {
            GameObj.reset();
        })
    },

    //Each time user submit an answer will invoke validateAnswer function
    validateAnswer: function (result) {
        for (result in randomQ.Answers) {
            //if time's up and correct answer click
            if (result == randomQ.correctAnswer) {
                GameObj.totalQuestions++;
                return randomQ.Answers[result];
            }
            //Incorrect answer click
            else {
                result = randomQ.correctAnswer;
                GameObj.totalQuestions++;
                return randomQ.Answers[result];
            }
        }
    },

    //Function to check whether totalQuestions is up to show results
    checktotalQuestions: function () {
        if (GameObj.totalQuestions == 10) {
            GameObj.showResults();
            clearTimeout(timer);
        }
        else {
            clearTimeout(timer);
            GameObj.time = 10;
            setTimeout(GameObj.loadQuestion,3000);     
        } 
    },

    //Timing count down function
    timeRemaining: function (secs) {  
        if (secs <= 5) {
            $("#displayTimer").html("<h2 class='timeRemainingRed'>Time Remaining: " + secs +"s</h2>");
        }
        else {
            $("#displayTimer").html("<h2 class='timeRemaining'>Time Remaining: "+ secs +"s</h2>");
        }
        secs--;
        timer = setTimeout('GameObj.timeRemaining(' + secs + ')', 1000);

        if (secs < 0) {
            clearTimeout(timer);
            var result = GameObj.validateAnswer(randomQ.correctAnswer);
            $("#answer").html("<h1 class='timeRemainingRed'>Time's Up!"+"</h1>"
            + "<h1 class='QA'>Correct Answer: " + result + "<h1>" 
            + '<img class="startGameImg" src="assets/images/unanswer.jpg">'
            + "</h1>");
            GameObj.unAnswers++;
            $("#choices, #displayQuestion").html("");
            GameObj.checktotalQuestions();
        }
        //User answer
        $("#choices").off("click");
        //Incorrect Answer Clicked
        $("#choices").on("click", ".choiceBtn", function () {
            if ($(this).val() != randomQ.correctAnswer) {
                var $pickedAnswer = GameObj.validateAnswer($(this).val());
                $("#answer").html("<h1 class='timeRemainingRed'>Incorrect!"+"</h1>"
                + "<h1 class='QA'>Correct Answer: " + $pickedAnswer + "</h1>" 
                + '<img class="startGameImg" src="assets/images/incorrect.jpg">'
                + "</h1>");
                $("#choices, #displayQuestion").html("");
                GameObj.incorrectAnswers++;
                GameObj.checktotalQuestions();
            }
            //Correct Answer Clicked
            else if ($(this).val() == randomQ.correctAnswer) {
                var $pickedAnswer = GameObj.validateAnswer($(this).val());
                $("#answer").html("<h1 class='timeRemaining'>Correct!"+"</h1>"
                    + '<img class="startGameImg" src="assets/images/correct.jpg">');
                $("#choices, #displayQuestion").html("");
                GameObj.correctAnswers++;
                GameObj.checktotalQuestions();
            }  
        });
    },

    //Random loadQuestion when user click start game
    loadQuestion: function () {
        randomQ = GameObj.triviaQA[Math.floor(Math.random()*GameObj.triviaQA.length)];
        $("#displayQuestion").html("<h1 class='QA'>"+randomQ.Question+"</h1>");
        var i = 0;
        for (letter in randomQ.Answers) {
            var $choiceBtn = $("<button id='choiceBtn" + i + "'>");
            $choiceBtn.addClass("btn col-11 col-md-4 choiceBtn").attr("value", letter);
            $choiceBtn.html("<p>" + letter + ". " + randomQ.Answers[letter] + "</p>");
            $("#choices").append($choiceBtn,'<br />');  
            i++;
        }
        $("#answer").html("");
        GameObj.timeRemaining(GameObj.time);
    },

    //startGame fucntion
    startGame: function () {
        $("#content, #buttons, #displayTimer, #displayQuesiton, #answer, #showResults").html("");
        $("#startAgain").hide();
        //Click to start game
        $("#startGame").on("click", function () {
            //Hide startGameImg and startGame button
            $("#startContent, #buttons, #showResults").html("");
            GameObj.loadQuestion();          
        });
    }
}

GameObj.startGame();