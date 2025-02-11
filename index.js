const myLibrary = [];
let bookId = 0;

function Book(id, title, author, pages, read, link) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.link = link
}

function addBookToLibrary(id, title, author, pages, link, read) {
  // take params, create a book then store it in the array
  const book = new Book(id, title, author, pages, read, link);
  myLibrary.push(book);
}

const cards = document.querySelector('.cards');

// When called, creates card structure with elements from book in a certain passed id
function displayBook(id) {
  const card = document.createElement('div');
  cards.appendChild(card);
  card.classList.add('card');

  const cardImage = document.createElement('div');
  card.appendChild(cardImage);
  cardImage.classList.add('card-image');
  const cardButtons = document.createElement('div');
  cardImage.appendChild(cardButtons);
  cardButtons.classList.add('card-buttons');
  if (myLibrary[id].read) {
    const eyeSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>eye-minus</title><path d="M12 4.5A11.8 11.8 0 0 0 1 12A11.8 11.8 0 0 0 12 19.5H13.1A3.8 3.8 0 0 1 13 18.5A9.9 9.9 0 0 1 13.2 16.8L12 17A5 5 0 1 1 17 12A2.8 2.8 0 0 1 16.9 12.9A5.2 5.2 0 0 1 19 12.5A5.6 5.6 0 0 1 22.3 13.5A10.1 10.1 0 0 0 23 12A11.8 11.8 0 0 0 12 4.5M12 9A3 3 0 1 0 15 12A2.9 2.9 0 0 0 12 9M15 17.5V19.5H23V17.5Z" /></svg>';
    cardButtons.innerHTML = eyeSvg;
  }
  else {
    const eyeSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>eye-plus</title><path d="M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C12.36,19.5 12.72,19.5 13.08,19.45C13.03,19.13 13,18.82 13,18.5C13,17.94 13.08,17.38 13.24,16.84C12.83,16.94 12.42,17 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12C17,12.29 16.97,12.59 16.92,12.88C17.58,12.63 18.29,12.5 19,12.5C20.17,12.5 21.31,12.84 22.29,13.5C22.56,13 22.8,12.5 23,12C21.27,7.61 17,4.5 12,4.5M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M18,14.5V17.5H15V19.5H18V22.5H20V19.5H23V17.5H20V14.5H18Z" /></svg>';
    cardButtons.innerHTML = eyeSvg;
  }
  const pencilSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>pencil</title><path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"/></svg>';
  const deleteSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>delete</title><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg>';
  cardButtons.innerHTML += pencilSvg;
  cardButtons.innerHTML += deleteSvg;

  const cardDetails = document.createElement('div');
  card.appendChild(cardDetails);
  cardDetails.classList.add('card-details');
  const movieTitle = document.createElement('h4');
  movieTitle.textContent = myLibrary[id].title;
  const movieAuthor = document.createElement('p');
  movieAuthor.textContent = myLibrary[id].author;
  const moviePages = document.createElement('p');
  moviePages.textContent = myLibrary[id].pages;
  cardDetails.appendChild(movieTitle);
  cardDetails.appendChild(movieAuthor);
  cardDetails.appendChild(moviePages);
}

const form = document.querySelector('.main-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const formTitle = document.querySelector('#name').value;
  const formAuthor = document.querySelector('#author').value;
  const formPages = document.querySelector('#pages').value;
  const formLink = document.querySelector('#image').value;
  const formRead = document.querySelector('#read').checked;

  addBookToLibrary(bookId, formTitle, formAuthor, formPages, formLink, formRead);
  console.table(myLibrary);
  displayBook(bookId);
  bookId++;
});

