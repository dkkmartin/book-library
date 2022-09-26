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
    if (pages <= 0) {
        alert("You must enter pages higher than 0");
        modal.style.display = "block";
        return false;
    }
    if (title == "" || author == "" || pages == "" || read == "") {
        alert("You must fill out empty spaces");
        modal.style.display = "block";
        return false;
    }
    addBookToLibrary(title, author, pages, read);
    newBookForm.reset();
});

addNewBookBtn.onclick = function () {
    modal.style.display = "none";
};

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

function displayBook() {
    let i = 1;

    //Remove every book div before constructing new divs
    const removeBooks = document.querySelectorAll("div.books > div").forEach((e) => e.remove());
    //For each item in array, create one div with id=book[i]
    myLibrary.forEach(() => {
        const booksContainer = document.getElementsByClassName("books")[0];
        const div = document.createElement("div");
        div.classList.add(`book`);
        div.setAttribute("id", `book${i}`);
        booksContainer.appendChild(div);
        i++;
    });
    //fill the div with the object in the array[i]
    for (let i = 0; i < myLibrary.length; i++) {
        for (const key in myLibrary[i]) {
            if (Object.hasOwnProperty.call(myLibrary[i], key)) {
                const element = myLibrary[i][key];
                const contentContainer = document.querySelector(`#book${i + 1}`);
                const p = document.createElement("p");
                p.textContent = element;
                contentContainer.appendChild(p);
            }
        }
    }
}

// const booksContainer = document.querySelector(".books");
// for (let x = 0; x < myLibrary.length; x++) {
//     const div = document.createElement("div");
//     div.classList.add(`content${x + 1}`);
//     booksContainer.appendChild(div);
// }
// for (let i = 0; i < myLibrary.length; i++) {
//     for (const key in myLibrary[i]) {
//         if (Object.hasOwnProperty.call(myLibrary[i], key)) {
//             const element = myLibrary[i][key];
//             const contentContainer = document.querySelector(`.content${i + 1}`);
//             const p = document.createElement("p");
//             p.textContent = element;
//             contentContainer.appendChild(p);
//         }
//     }
// }
