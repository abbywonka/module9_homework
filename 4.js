// Получаем ссылки на элементы на странице
const pageInput = document.querySelector('#page-input');
const limitInput = document.querySelector('#limit-input');
const requestBtn = document.querySelector('#request-btn');
const imageList = document.querySelector('#image-list');

// Загружаем последние успешно выполненные запросы из localStorage
let lastPage = localStorage.getItem('lastPage') || 1;
let lastLimit = localStorage.getItem('lastLimit') || 10;

// Заполняем input значениями последнего запроса
pageInput.value = lastPage;
limitInput.value = lastLimit;

// Обработчик клика по кнопке
requestBtn.addEventListener('click', () => {
  const page = parseInt(pageInput.value);
  const limit = parseInt(limitInput.value);

  // Проверяем, что оба числа находятся в диапазоне от 1 до 10 и являются числами
  if (isNaN(page) || page < 1 || page > 10) {
    // Выводим сообщение об ошибке
    imageList.innerHTML = 'Номер страницы вне диапазона от 1 до 10';
    return;
  }

  if (isNaN(limit) || limit < 1 || limit > 10) {
    // Выводим сообщение об ошибке
    imageList.innerHTML = 'Лимит вне диапазона от 1 до 10';
    return;
  }

  // Оба числа в диапазоне, формируем URL для запроса
  const url = `https://picsum.photos/v2/list?page=${page}&limit=${limit}`;

  // Делаем запрос
  fetch(url)
    .then((response) => {
      // Парсим ответ в JSON
      return response.json();
    })
    .then((data) => {
      // Сохраняем значения последнего успешного запроса в localStorage
      localStorage.setItem('lastPage', page);
      localStorage.setItem('lastLimit', limit);

      // Очищаем список картинок на странице
      imageList.innerHTML = '';

      // Добавляем картинки в список
      data.forEach((item) => {
        const img = document.createElement('img');
        img.src = item.download_url;
        imageList.appendChild(img);
      });
    })
    .catch((error) => {
      // Выводим сообщение об ошибке
      imageList.innerHTML = `Ошибка: ${error.message}`;
    });
});
