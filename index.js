let myLibrary = [
    {
        title: "Batman",
        author: "DC Comics",
        pages: "24",
        haveread: "Yes",
    },
    {
        title: "Spider-Man",
        author: "Marvel",
        pages: "34",
        haveread: "Yes",
    },
];

function Book(title, author, pages, haveRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
}

function addBookToLibrary() {
    const bookTitle = window.prompt("Enter book title:");
    const bookAuthor = window.prompt("Enter book author:");
    const bookPages = window.prompt("Enter book pages:");
    let bookHaveRead = window.prompt("Have you read it?:");
    const newbook = new Book(bookTitle, bookAuthor, bookPages, bookHaveRead);
    myLibrary.push(newbook);
}

function displayBook() {
    const booksContainer = document.querySelector(".books");
    for (let x = 0; x < myLibrary.length; x++) {
        const div = document.createElement("div");
        div.classList.add(`content${x + 1}`);
        booksContainer.appendChild(div);
    }
    for (let i = 0; i < myLibrary.length; i++) {
        for (const key in myLibrary[i]) {
            if (Object.hasOwnProperty.call(myLibrary[i], key)) {
                const element = myLibrary[i][key];
                const contentContainer = document.querySelector(`.content${i + 1}`);
                const p = document.createElement("p");
                p.textContent = element;
                contentContainer.appendChild(p);
            }
        }
    }
}

displayBook();
