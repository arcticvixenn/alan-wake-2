document.addEventListener('DOMContentLoaded', function() {
  const questionsContainer = document.getElementById('questions');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');
  let data; // Змінна для зберігання даних

  fetch('questions.json')
    .then(response => response.json())
    .then(jsonData => {
      data = jsonData; // Збереження даних у змінну
      data.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');

        const questionText = document.createElement('p');
        questionText.textContent = `${index + 1}. ${question.question}`;
        questionDiv.appendChild(questionText);

        question.answers.forEach(answer => {
          const answerLabel = document.createElement('label');
          const radioInput = document.createElement('input');
          radioInput.type = 'radio';
          radioInput.name = `question${index}`;
          radioInput.value = answer;
          answerLabel.appendChild(radioInput);
          answerLabel.appendChild(document.createTextNode(answer));
          questionDiv.appendChild(answerLabel);
        });

        questionsContainer.appendChild(questionDiv);
      });
    });

  submitButton.addEventListener('click', function() {
    const allQuestions = document.querySelectorAll('.question');
    let score = 0;

    allQuestions.forEach((question, index) => {
      const selectedAnswer = question.querySelector('input:checked');
      if (selectedAnswer) {
        const selectedValue = selectedAnswer.value;
        const correctAnswer = data[index].correct_answer;

        if (selectedValue === correctAnswer) {
          score++;
        }
      }
    });

    resultsContainer.textContent = `You scored ${score} out of ${allQuestions.length}`;
  });
});
