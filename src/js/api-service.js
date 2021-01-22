const API_KEY = 'aebb4988aa9e43bfb51cf485459e26ea';
const BASE_URL = 'http://newsapi.org/v2';
const options = {
 headers: {
  Authorization: API_KEY,
 },
};

export default class ApiService {   
 constructor() {
  this.queryRef = '';      // изначальное значение инпута - пустой
  this.page = 1;           // изначальный запрос с 1-ой стр.
 }
 fetchArticles() {         // забирает данные с url
  const url = `${BASE_URL}/everything?q=${this.queryRef}&pageSize=5&page=${this.page}`;

  return fetch(url, options)
  .then(response => response.json())
  .then(data => {           // {articles}
   this.incrementPage();    // this.page += 1
   return data.articles;    // articles
  });
 }
 incrementPage() {
  this.page += 1;
 }
 resetPage() {
  this.page = 1;  // новый запрос с 1-ой стр.
 }
 get query() {
  // console.log(this.queryRef);
  return this.queryRef;    // - значение инпута
 }
 set query(newQueryRef) {
  this.queryRef = newQueryRef; 
  // console.log(newQueryRef);
 }
}