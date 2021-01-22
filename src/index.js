import artTpl from './templates/articles.hbs'
import './styles.css';
import ApiService from './js/api-service.js';
import LoadMoreBtn from './js/button-loader.js';

const formRef = document.querySelector('.js-search-form');
const articlesRef = document.querySelector('.js-articles-container');

const loadMoreBtn = new LoadMoreBtn({
 selector: '[data-action="load-more"]',
 hidden: true,
});
const apiService = new ApiService();

formRef.addEventListener('submit', searchHandler);
loadMoreBtn.refs.button.addEventListener('click', fetch);

function searchHandler(event) {
 event.preventDefault();    // блок перезагрузки после ввода
 clearArticlesContainer();  // очищаем интерфейс
 
 apiService.query = event.currentTarget.elements.input.value;  // - значение инпута
 
 if (apiService.query === '') {
  return alert('Введи слово');
 }
 
 loadMoreBtn.show();      // "загружаем"
 apiService.resetPage();  // новое значение с 1-ой стр.
 clearArticlesContainer();
 fetch();
}

function fetch() {       // выкл кнопки-загрузка данных-отрисовка-вкл кнопки
 loadMoreBtn.disable(); 
 apiService.fetchArticles().then(articles => {
  artTplMarkupHandler(articles);
  loadMoreBtn.enable();
 });
}
 
function artTplMarkupHandler(articles) { // создание шаблон(данные)
 articlesRef.insertAdjacentHTML('afterbegin', artTpl(articles));
}

function clearArticlesContainer() { // очистить интерфейс
  articlesRef.innerHTML = '';
}

