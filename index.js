const addNewBookBtn = document.getElementById('add-btn')
const modal = document.getElementById('modal')
const newBookBtn = document.getElementById('add-book')
const closebtn = document.getElementsByClassName('close-btn')[0]
const newBookForm = document.getElementById('book-form')
let newbook

const removeBook = document.getElementById('remove-book')
const formtTitle = newBookForm.elements.title
const formAuthor = newBookForm.elements.author
const formPages = newBookForm.elements.pages
const formRead = newBookForm.elements.haveRead

const myLibrary = []

newBookForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const title = formtTitle.value
  const author = formAuthor.value
  const pages = formPages.value
  const read = formRead.value
  if (title === '' || author === '' || pages === '' || read === '') {
    alert('You must fill out empty spaces')
    modal.style.display = 'block'
    return false
  }
  if (pages <= 0) {
    alert('You must enter pages higher than 0')
    modal.style.display = 'block'
    return false
  }
  addBookToLibrary(title, author, pages, read)
  newBookForm.reset()
})

addNewBookBtn.onclick = function () {
  modal.style.display = 'none'
}

newBookBtn.onclick = function () {
  modal.style.display = 'block'
}

closebtn.onclick = function () {
  modal.style.display = 'none'
}

window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = 'none'
  }
}

function removeBookFromLibrary (id) {
  const arrayIndex = id.getAttribute('data-array-index')
  myLibrary.splice(arrayIndex, 1)
  displayBook()
}

function changeReadStatus (id) {
  const arrayIndex = id.getAttribute('data-array-index')
  const readStatus = myLibrary[arrayIndex].haveRead
  if (readStatus === 'Not read') {
    myLibrary[arrayIndex].haveRead = 'Have read'
  }
  if (readStatus === 'Have read') {
    myLibrary[arrayIndex].haveRead = 'Not read'
  }
  displayBook()
}

function Book (title, author, pages, haveRead) {
  this.title = title
  this.author = author
  this.pages = pages
  this.haveRead = haveRead
}

function addBookToLibrary (title, author, pages, haveRead) {
  newbook = new Book(title, author, pages, haveRead)
  myLibrary.push(newbook)
  displayBook()
}

function displayBook () {
  let i = 1

  // Remove every book div before constructing new divs
  const removeBooks = document.querySelectorAll('div.books > div').forEach((e) => e.remove())
  // For each item in array, create one div with id=book[i]
  myLibrary.forEach(() => {
    const booksContainer = document.getElementsByClassName('books')[0]
    const div = document.createElement('div')
    div.classList.add('book')
    div.setAttribute('id', `book${i}`)
    booksContainer.appendChild(div)
    i++
  })

  // fill the div with the object in the array[x]
  for (let x = 0; x < myLibrary.length; x++) {
    const contentContainer = document.querySelector(`#book${x + 1}`)
    for (const key in myLibrary[x]) {
      if (Object.hasOwnProperty.call(myLibrary[x], key)) {
        const element = myLibrary[x][key]
        const p = document.createElement('p')
        if (typeof element === 'function') {
          continue
        }
        p.textContent = element
        contentContainer.appendChild(p)
      }
    }
    // Create a remove button
    const removeBook = document.createElement('button')
    removeBook.setAttribute('id', 'remove-book')
    removeBook.setAttribute('onclick', 'removeBookFromLibrary(this)')
    removeBook.setAttribute('data-array-index', `${x}`)
    removeBook.textContent = 'Remove'
    contentContainer.appendChild(removeBook)

    // Create a read toggle button
    const readToggle = document.createElement('button')
    readToggle.textContent = 'Read'
    readToggle.setAttribute('id', 'read-toggle')
    readToggle.setAttribute('data-array-index', `${x}`)
    readToggle.setAttribute('onclick', 'changeReadStatus(this)')
    contentContainer.appendChild(readToggle)
  }
}
