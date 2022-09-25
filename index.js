const addNewBookBtn = document.getElementById("add-btn");
const modal = document.getElementById("modal");
const newBookBtn = document.getElementById("add-book");
const closebtn = document.getElementsByClassName("close-btn")[0];

const newBookForm = document.getElementById("book-form");
const formtTitle = newBookForm.elements["title"];
const formAuthor = newBookForm.elements["author"];
const formPages = newBookForm.elements["pages"];
const formRead = newBookForm.elements["haveRead"];

newBookForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let title = formtTitle.value;
    let author = formAuthor.value;
    let pages = formPages.value;
    let read = formRead.value;
    addBookToLibrary(title, author, pages, read);
});

newBookBtn.onclick = function () {
    modal.style.display = "block";
};

closebtn.onclick = function () {
    modal.style.display = "none";
};

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

let myLibrary = [];

function Book(title, author, pages, haveRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
}

function addBookToLibrary(title, author, pages, haveRead) {
    const newbook = new Book(title, author, pages, haveRead);
    myLibrary.push(newbook);
    displayBook();
}

// Not working correctly. Forgot about when im adding new books.
// This func creates divs based on array.length.
// It should create divs based on array items using forEach.
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
