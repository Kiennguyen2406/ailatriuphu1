
document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        {
            question: "Thủ đô của Pháp là gì?",
            options: {
                A: "Paris",
                B: "London",
                C: "Berlin",
                D: "Madrid"
            },
            answer: "A"
        },
        {
            question: "Hành tinh nào được gọi là Hành tinh Đỏ?",
            options: {
                A: "Trái Đất",
                B: "Sao Hỏa",
                C: "Sao Mộc",
                D: "Sao Thổ"
            },
            answer: "B"
        },
        {
            question: "Ai là tác giả của 'Romeo và Juliet'?",
            options: {
                A: "Mark Twain",
                B: "Charles Dickens",
                C: "William Shakespeare",
                D: "Jane Austen"
            },
            answer: "C"
        },
        {
            question: "Đơn vị tiền tệ của Nhật Bản là gì?",
            options: {
                A: "Yuan",
                B: "Won",
                C: "Yen",
                D: "Dollar"
            },
            answer: "C"
        },
        {
            question: "Thành phố nào được gọi là 'Thành phố Ánh sáng'?",
            options: {
                A: "New York",
                B: "Paris",
                C: "Tokyo",
                D: "London"
            },
            answer: "B"
        },
        {
            question: "Ai là tổng thống thứ 16 của Hoa Kỳ?",
            options: {
                A: "George Washington",
                B: "Thomas Jefferson",
                C: "Abraham Lincoln",
                D: "Theodore Roosevelt"
            },
            answer: "C"
        },
        {
            question: "Người phát minh ra bóng đèn điện là ai?",
            options: {
                A: "Nikola Tesla",
                B: "Alexander Graham Bell",
                C: "Thomas Edison",
                D: "James Watt"
            },
            answer: "C"
        },
        {
            question: "Ngôn ngữ chính thức của Brazil là gì?",
            options: {
                A: "Tây Ban Nha",
                B: "Anh",
                C: "Pháp",
                D: "Bồ Đào Nha"
            },
            answer: "D"
        },
        {
            question: "Thành phố nào là thủ đô của Canada?",
            options: {
                A: "Toronto",
                B: "Vancouver",
                C: "Ottawa",
                D: "Montreal"
            },
            answer: "C"
        },
        {
            question: "Ai là nhà soạn nhạc của bản giao hưởng 'Fifth Symphony'?",
            options: {
                A: "Mozart",
                B: "Beethoven",
                C: "Bach",
                D: "Chopin"
            },
            answer: "B"
        },
        {
            question: "Chất hóa học nào có công thức H2O?",
            options: {
                A: "Nước",
                B: "Khí Oxy",
                C: "Muối",
                D: "Axit"
            },
            answer: "A"
        },
        {
            question: "Thành phố nào tổ chức Thế vận hội Mùa hè 2008?",
            options: {
                A: "Athens",
                B: "Sydney",
                C: "Beijing",
                D: "London"
            },
            answer: "C"
        },
        {
            question: "Ai là người sáng lập Facebook?",
            options: {
                A: "Mark Zuckerberg",
                B: "Jeff Bezos",
                C: "Bill Gates",
                D: "Steve Jobs"
            },
            answer: "A"
        },
        {
            question: "Cây cối nào tượng trưng cho Canada?",
            options: {
                A: "Sồi",
                B: "Thiên đường",
                C: "Thiên Nga",
                D: "Hồng anh"
            },
            answer: "A"
        },
        {
            question: "Tác phẩm 'The Starry Night' là của ai?",
            options: {
                A: "Vincent van Gogh",
                B: "Leonardo da Vinci",
                C: "Pablo Picasso",
                D: "Michelangelo"
            },
            answer: "A"
        }
    ];

    const prizeMoney = [100, 200, 300, 500, 1000, 2000, 4000, 8000, 16000, 32000, 64000, 125000, 250000, 500000, 1000000];
    let currentQuestionIndex = 0;
    let currentPrizeIndex = 0;
    let highScore = localStorage.getItem('highScore') || 0;

    const questionContainer = document.getElementById('question-container');
    const questionElement = document.getElementById('question');
    const optionsButtons = document.querySelectorAll('.option');
    const messageElement = document.getElementById('message');
    const highScoreElement = document.getElementById('high-score');
    const retryButton = document.getElementById('retry-button');
    const resetButton = document.getElementById('reset-button');

    highScoreElement.textContent = highScore;

    function startGame() {
        currentQuestionIndex = 0;
        currentPrizeIndex = 0;
        messageElement.textContent = '';
        retryButton.style.display = 'none';
        showNextQuestion();
    }

    function showNextQuestion() {
        if (currentQuestionIndex < questions.length) {
            const question = questions[currentQuestionIndex];
            questionElement.textContent = question.question;
            optionsButtons.forEach(button => {
                const option = button.getAttribute('data-option');
                button.textContent = `${option}. ${question.options[option]}`;
                button.disabled = false;
                button.style.backgroundColor = '#f0f0f0';
            });

        } else {
            messageElement.textContent = 'Chúc mừng! Bạn đã trả lời đúng tất cả các câu hỏi và giành được 1.000.000$!';

        }
    }

    function selectAnswer(e) {
        const selectedButton = e.target;
        const selectedOption = selectedButton.getAttribute('data-option');
        const question = questions[currentQuestionIndex];

        if (selectedOption === question.answer) {
            swal("Tuyệt vời!", "You clicked the button!", "success");
            messageElement.textContent = `Đúng rồi! Bạn đã giành được ${prizeMoney[currentPrizeIndex]}$.`;

            updateHighScore(prizeMoney[currentPrizeIndex]);
            currentQuestionIndex++;
            currentPrizeIndex++;

            setTimeout(showNextQuestion, 2000);
        } else {
            swal("Buồn ghê!", "You clicked the button!", "error");
            messageElement.textContent = `Sai rồi! Đáp án đúng là ${question.answer}. Bạn giành được ${currentPrizeIndex > 0 ? prizeMoney[currentPrizeIndex - 1] : 0}$.`;
            retryButton.style.display = 'inline-block';
            updateHighScore(prizeMoney[currentPrizeIndex--]);
        }
    }

    function updateHighScore(score) {
        if (score > highScore) {
            highScore = score;
            console.log(highScore);
            localStorage.setItem('highScore', highScore);
            highScoreElement.textContent = highScore;
        }
    }

    function retryGame() {
        startGame();
    }

    function resetGame() {
        highScore = 0;
        localStorage.setItem('highScore', highScore);
        highScoreElement.textContent = highScore;
    }

    optionsButtons.forEach(button => {
        button.addEventListener('click', selectAnswer);
    });

    optionsButtons.forEach(button => {
        button.addEventListener('click', selectAnswer);
    });

    retryButton.addEventListener('click', retryGame);
    resetButton.addEventListener("click", resetGame);

    // Start the game automatically
    startGame();
});