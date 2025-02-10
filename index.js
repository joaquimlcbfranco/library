const myLibrary = [];

function Book(name, author, pages, read) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(name, author, pages, read) {
  // take params, create a book then store it in the array
  const book = new Book(name, author, pages, read);
  myLibrary.push(book);
}

