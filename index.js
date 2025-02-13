const myLibrary = [];
let bookId = 4;

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
	const book = new Book(id, title, author, +pages, read, link);
	myLibrary.push(book);
}

const cards = document.querySelector('.cards');

let cardImages = document.querySelectorAll('.card-image');

// When called, creates card structure with elements from book in a certain passed id
function displayBook(id) {
	const card = document.createElement('div');
	cards.appendChild(card);
	card.classList.add('card');
	card.setAttribute('data-id', id);

	const cardImage = document.createElement('div');
	card.appendChild(cardImage);
	cardImage.classList.add('card-image');
	cardImage.setAttribute('data-id', id);
	if (myLibrary[findLibraryIndex(id)].link != '') {
		cardImage.style.backgroundImage = `url(${myLibrary[findLibraryIndex(id)].link})`;
	}
	const cardButtons = document.createElement('div');
	cardImage.appendChild(cardButtons);
	cardButtons.classList.add('card-buttons');
	if (myLibrary[findLibraryIndex(id)].read) {
		const eyeSvg = '<svg class="hide" data-type="mark-unread"' + ` data-id=${id} ` + 'xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>"Mark as not read"</title><path d="M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z" /></svg>';
		cardButtons.innerHTML = eyeSvg;
	}
	else {
		const eyeSvg = '<svg class="hide" data-type="mark-read"' + ` data-id=${id} ` + 'xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>"Mark as read"</title><path d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z" /></svg>';
		cardButtons.innerHTML = eyeSvg;
	}
	const pencilSvg = '<svg class="hide" data-type="edit"' + ` data-id=${id} ` + 'xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>"Edit"</title><path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"/></svg>';
	const deleteSvg = '<svg class="hide" data-type="delete"' + ` data-id=${id} ` + 'xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>"Delete"</title><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg>';
	cardButtons.innerHTML += pencilSvg;
	cardButtons.innerHTML += deleteSvg;
	cardButtons.setAttribute('data-id', id);

	const cardDetails = document.createElement('div');
	card.appendChild(cardDetails);
	cardDetails.classList.add('card-details');
	cardDetails.setAttribute('data-id', id);
	const movieTitle = document.createElement('h4');
	movieTitle.textContent = myLibrary[findLibraryIndex(id)].title;
	const movieAuthor = document.createElement('p');
	movieAuthor.textContent = myLibrary[findLibraryIndex(id)].author;
	const moviePages = document.createElement('p');
	moviePages.textContent = myLibrary[findLibraryIndex(id)].pages;
	cardDetails.appendChild(movieTitle);
	cardDetails.appendChild(movieAuthor);
	cardDetails.appendChild(moviePages);

	cardImages = updateCardImages();

	addImageListeners();
}

addBookToLibrary(0, 'The Book Thief', 'Markus Zusak', 592, './images/the-book-thief.jpg', true);
addBookToLibrary(1, 'The Alchemist', 'Paulo Coelho', 182, './images/the-alchemist.jpg', true);
addBookToLibrary(2, 'To Kill a Mockingbird', 'Harper Lee', 323, './images/to-kill-a-mockingbird.jpg', false);
addBookToLibrary(3, 'The da Vinci Code', 'Dan Brown', 480, './images/the-da-vinci-code.jpg', false);

for (let i = 0; i < 4; i++) {
	displayBook(i);
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
	displayBook(bookId);

	e.target.reset();
	document.querySelector('#name').focus();
	bookId++;
});

// Finds book with a certain index in the array with key == argument "id"
function findLibraryIndex(id) {
	return myLibrary.findIndex((book) => book.id == id)
}

// Get modal dialog element and form
const dialog = document.querySelector('#modal');
const dialogForm = document.querySelector('.modal-form');
// Get all dialog fields
const dialogTitle = document.querySelector('#modal-name');
const dialogAuthor = document.querySelector('#modal-author');
const dialogPages = document.querySelector('#modal-pages');
const dialogLink = document.querySelector('#modal-image');
const dialogClose = document.querySelector('.modal-close');

// Listen for clicks on read/edit/delete buttons
document.body.addEventListener('click', (e) => {
	if (e.target.getAttribute('data-type') == 'edit') {
		const editButtonId = e.target.getAttribute('data-id');
		editBook(editButtonId);
	}
	else if (e.target.getAttribute('data-type') == 'delete') {
		const deleteButtonId = e.target.getAttribute('data-id');
		deleteBook(deleteButtonId);
	}
	else if (e.target.getAttribute('data-type') == 'mark-read') {
		const notReadButtonId = e.target.getAttribute('data-id');
		readStatus(notReadButtonId);
	}
	else if (e.target.getAttribute('data-type') == 'mark-unread') {
		const readButtonId = e.target.getAttribute('data-id');
		readStatus(readButtonId);
	}
});

document.body.addEventListener('mouseover', (e) => {
	if (e.target.classList.contains('card-image')) {
		showButtons(e.target.querySelectorAll('svg'));
	}
});


// Receives a book's id when the edit button is clicked
// Sets the dialog's fields to the data in the library
function editBook(id) {
	dialogTitle.value = myLibrary[findLibraryIndex(id)].title;
	dialogAuthor.value = myLibrary[findLibraryIndex(id)].author;
	dialogPages.value = myLibrary[findLibraryIndex(id)].pages;
	dialogLink.value = myLibrary[findLibraryIndex(id)].link;

	dialog.showModal();

	dialogForm.setAttribute('data-id', id);
};

// When form is submitted, update array values and DOM element's text content
dialogForm.addEventListener('submit', (e) => {
	e.preventDefault();

	const currentCardIndex = +dialogForm.getAttribute('data-id')
	myLibrary[findLibraryIndex(currentCardIndex)].title = dialogTitle.value;
	myLibrary[findLibraryIndex(currentCardIndex)].author = dialogAuthor.value;
	myLibrary[findLibraryIndex(currentCardIndex)].pages = +dialogPages.value;
	myLibrary[findLibraryIndex(currentCardIndex)].link = dialogLink.value;

	const cardHeader = document.querySelector(`.card-details[data-id="${currentCardIndex}"] h4`);
	const cardAuthor = document.querySelector(`.card-details[data-id="${currentCardIndex}"] p:nth-child(2)`);
	const cardPages = document.querySelector(`.card-details[data-id="${currentCardIndex}"] p:nth-child(3)`);

	cardHeader.textContent = dialogTitle.value;
	cardAuthor.textContent = dialogAuthor.value;
	cardPages.textContent = +dialogPages.value;

	dialog.close();
});

dialogClose.addEventListener('click', () => {
	dialog.close();
});

// Remove book from the array and remove the child and subsequent children from cards container
function deleteBook(id) {
	const indexToRemove = findLibraryIndex(id);
	myLibrary.splice(indexToRemove, 1);
	const cardAtIndex = document.querySelector(`div[data-id="${id}"]`);
	cards.removeChild(cardAtIndex);
}

// Checks if array's object read status is true or false
// If true, changes svg innerHTML to non read one, sets svg attribute to the opposite and updates object's read status in array
function readStatus(id) {
	currentSvg = document.querySelector(`.card-buttons[data-id="${id}"] svg:nth-child(1)`);
	if (myLibrary[findLibraryIndex(id)].read) {
		currentSvg.innerHTML = '<title>"Mark as read"</title><path d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z" />';
		currentSvg.setAttribute('data-type', 'mark-read');
		myLibrary[findLibraryIndex(id)].read = false;
	}
	else if (!myLibrary[findLibraryIndex(id)].read) {
		currentSvg.innerHTML = '<title>"Mark as not read"</title><path d="M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z" />';
		currentSvg.setAttribute('data-type', 'mark-unread');
		myLibrary[findLibraryIndex(id)].read = true;
	}
}

function updateCardImages() {
	return document.querySelectorAll('.card-image');
}

function addImageListeners() {
	document.querySelectorAll('.card-image').forEach(card => {
		card.addEventListener('mouseenter', () => {
			showButtons(card.querySelectorAll('svg'));
		});
		card.addEventListener('mouseleave', () => {
			hideButtons(card.querySelectorAll('svg'));
		});
	});
}

function showButtons(buttons) {
	buttons.forEach((button) => {
		button.classList.remove('hide');
	});
}

function hideButtons(buttons) {
	buttons.forEach((button) => {
		button.classList.add('hide');
	});
}