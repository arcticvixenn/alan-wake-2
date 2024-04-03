document.addEventListener('DOMContentLoaded', function() {
  // Отримуємо результати з localStorage
  let storedResponses = JSON.parse(localStorage.getItem('surveyResponses') || '[]');

  // Функція для збереження даних опитування в localStorage
  function saveResponse(response) {
    storedResponses.push(response); // Додаємо нову відповідь до збережених
    localStorage.setItem('surveyResponses', JSON.stringify(storedResponses)); // Зберігаємо в localStorage
  }

  // Обробник події для надсилання форми
  const form = document.getElementById('survey-form');
  if (form) {
    form.addEventListener('submit', function(event) {
      event.preventDefault(); // Забороняємо браузеру перезавантажувати сторінку
      const formData = new FormData(form); // Отримуємо дані форми
      const response = {}; // Створюємо об'єкт для збереження відповіді

      // Перебираємо всі поля форми і зберігаємо їх значення
      formData.forEach((value, key) => {
        // Якщо поле - чекбокс з епізодами, ми додаємо значення до масиву
        if (key === 'completed-episodes') {
          if (!response[key]) {
            response[key] = [];
          }
          response[key].push(value);
        } else {
          response[key] = value;
        }
      });

      saveResponse(response); // Зберігаємо відповідь
      alert('Дякуємо за участь у опитуванні!'); // Повідомлення користувачеві
      form.reset(); // Очищаємо форму
    });
  }



  // Функція для фільтрації за платформою
  function filterByPlatform(platform) {
    const filteredResponses = storedResponses.filter(response => response.platform === platform);
    displayResponses(filteredResponses);
  }

  // Функція для фільтрації за оцінкою
  function filterByRating(minRating, maxRating) {
    const filteredResponses = storedResponses.filter(response => {
      const rating = parseInt(response.rating || 0);
      return rating >= minRating && rating <= maxRating;
    });
    displayResponses(filteredResponses);
  }

  

// Функція для фільтрації за завершеними епізодами
function filterByCompletedEpisodes() {
  const filteredResponses = storedResponses.filter(response => {
    const completedEpisodes = response['completed-episodes'] || [];
    return completedEpisodes.length === 5 && completedEpisodes.every(episode => ["episode1", "episode2", "episode3", "episode4", "episode5"].includes(episode));
  });
  displayResponses(filteredResponses);
}

  // Функція для відображення відфільтрованих відповідей
  function displayResponses(responses) {
    const responseContainer = document.getElementById('response-container');
    if (responseContainer) {
      responseContainer.innerHTML = '';

      if (responses.length === 0) {
        responseContainer.innerHTML = '<p>Немає відповідей для відображення.</p>';
      } else {
        responses.forEach(response => {
          const responseElement = document.createElement('div');
          responseElement.classList.add('response-item');

          const platform = response.platform || 'Не вказано';
          const otherWriterGames = response['other-writer-games'] === 'yes' ? 'Так' : 'Ні';
          const completedEpisodes = Array.isArray(response['completed-episodes']) ? response['completed-episodes'].join(', ') : 'Не вказано';
          const favoriteCharacter = response['favorite-character'] || 'Не вказано';
          const rating = response.rating || 'Не вказано';
          const completionDate = response['completion-date'] || 'Не вказано';
          const replayInterest = response['replay-interest'] || 'Не вказано';
          const favoriteMoment = response['favorite-moment'] || 'Не вказано';
          const email = response.email || 'Не вказано';

          responseElement.innerHTML = `
            <p><strong>Платформа:</strong> ${platform}</p>
            <p><strong>Інші ігри письменника-протагоніста:</strong> ${otherWriterGames}</p>
            <p><strong>Пройдені епізоди:</strong> ${completedEpisodes}</p>
            <p><strong>Улюблений персонаж:</strong> ${favoriteCharacter}</p>
            <p><strong>Оцінка гри:</strong> ${rating}</p>
            <p><strong>Дата завершення:</strong> ${completionDate}</p>
            <p><strong>Зацікавленість в перепроходженні:</strong> ${replayInterest}</p>
            <p><strong>Улюблений момент:</strong> ${favoriteMoment}</p>
            <p><strong>Email:</strong> ${email}</p>
          `;

          responseContainer.appendChild(responseElement);
        });
      }
    } 
  }

  window.filterByPlatform = filterByPlatform;
  window.filterByRating = filterByRating;
  window.filterByCompletedEpisodes = filterByCompletedEpisodes;
  displayResponses(storedResponses); // Відображаємо збережені відповіді при завантаженні сторінки

});

