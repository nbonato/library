let library = document.getElementById("library");
let addButton = document.getElementById("add-book");
let addBackground = document.getElementById("add-background");
let form = document.getElementById("add-form");
let closeButton = document.getElementsByClassName("close")[0];
let addToLibrary = document.getElementById("add-library");


addButton.addEventListener("click", () => {addBackground.style.display = "block"});
closeButton.addEventListener("click", () => {
    addBackground.style.display = "none";
    form.reset();
});
addBackground.addEventListener('submit', createNewBook);


function createNewBook(event) {
    event.preventDefault();
    let bookData = new FormData(event.target);
    book = Array.from(bookData.values());
    if (!bookData.get("read")) {
        book.push("not read it yet");
    };
    
    if ((bookData.get("author") + bookData.get("title")) !== "") {
        bookObj = new Book(...book);
        addBook(bookObj);
        form.reset();
    } else {
        alert("Insert at least a title or author name");
    };
};


function addBook (book) {
    let bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    let bookTitle = document.createElement("div");
    bookTitle.classList.add("book-title");
    bookTitle.textContent = book.title;

    let bookAuthor = document.createElement("div");
    bookAuthor.classList.add("book-author");
    bookAuthor.textContent = book.author;

    let bookPages = document.createElement("div");
    bookPages.classList.add("book-pages");
    bookPages.textContent = book.pages;

    let bookRead = document.createElement("div");
    bookRead.classList.add("book-read");
    bookRead.textContent = book.read;

    let deleteBook = document.createElement("button");
    deleteBook.textContent = "Remove";
    deleteBook.addEventListener("click", (e) => {
        e.target.parentNode.remove();
    });
    bookCard.appendChild(bookTitle);
    bookCard.appendChild(bookAuthor);
    bookCard.appendChild(bookPages);
    bookCard.appendChild(bookRead);
    bookCard.appendChild(deleteBook);

    library.appendChild(bookCard);
};

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return(`${title} is a ${pages} pages long book, written by ${author}. I have ${read}.`)
    };
}

