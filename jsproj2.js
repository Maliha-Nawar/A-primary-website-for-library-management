let fom = document.querySelector('.fom'),
    booklist = document.querySelector('.tbody');
class Book {
    constructor(name, by, isbn,time) {
        this.name = name;
        this.by = by;
        this.isbn = isbn;
        this.time=time;
    }
}

class UI {
    static addtobooklist(book) {
        let list = document.querySelector
            ('.tbody');
        let row = document.createElement('tr');
        row.innerHTML =
            `<td>${book.name}</td>
<td>${book.by}</td>
<td>${book.isbn}</td>
<td><a href='#' class='remub'>X</a></td>`;
        list.appendChild(row);

    }

    static clearfields() {
        document.querySelector('.name').value = '';
        document.querySelector('.by').value = '';
        document.querySelector('.isbn').value = '';
    }

    static deletefrombook(target) {
        if (target.hasAttribute('href')) {
            target.parentElement.parentElement.remove();
            Store.removeBook(target.parentElement.previousElementSibling.textContent.trim());
            //as <td>${book.isbn}</td>
            ///* <td><a href='#' class='remub'>X</a></td>` *///trim() to cutoff unnecessary space value
            UI.showalert
                ('Book have been removed!', 'success')
            //alert will be seen after book removal

        }
    }
    static showalert(message, className) {
        let div = document.createElement('div');
        div.className = `alert ${className}`;
        //<div class='alert error'>

        div.appendChild(document.createTextNode(message));
        let container = document.querySelector('.container');
        let fom = document.querySelector('.fom');
        container.insertBefore(div, fom);
        //to place div before fom under container class 

        setTimeout(() => { document.querySelector('.alert').remove(); }, 3000)
    }
}
//class UI is a colony of functions in this project....for he code's optimization
//static function->here, object won't have to be created, it can be called from direct function...if this information is confusing, please do google


//to store data after page reload, we will use local storage. To handle local storage, we will create class store
class Store {
    static getBooks() {
        let books;
      
        if
            (localStorage.getItem('books') === null) { books = []; }
        else {
            books = JSON.parse(localStorage.getItem('books'));
            
            //                 //if there is any thing as "books", we will call it as JS obj by using JSON.parse
        }
        return books;
    }
    //this function will check local storage if there is any book....if there is no book, it will return ar empty array; if not it will return the array
    static addBook(book) {
        let books = Store.getBooks();
        //     //it will call it's own class's function to check if there is any book...we will push new books in "return books"(!?)
        books.push(book);
        localStorage.setItem('books',
            JSON.stringify(books));
        
        // book.preventDefault();
    }
    //     we will add books...it will recieve the added book as a parameter

    static displayBooks() {
        let books = Store.getBooks();
        books.forEach(book => { UI.addtobooklist(book); })
    };

    static removeBook(isbn) {
        let books = Store.getBooks();
        books.forEach((book, index) => {
            if (book.isbn === isbn) { books.splice(index, 1); }
        })
        localStorage.setItem('books', JSON.stringify(books));
    }

}
document.addEventListener('DOMContentLoaded',
    Store.displayBooks());
//getbooks will be informed if there is any book in local storage already


fom.addEventListener('submit', newbook);
booklist.addEventListener('click', removebook);


function newbook(e) {
    let name = document.querySelector('.name').value,
        by = document.querySelector('.by').value,
        isbn = document.querySelector('.isbn').value;
        time = `${new Date()}`;
    if (name === '' || by === '' || isbn === '') {
        UI.showalert
            ("Please fill up all fields!", "error");
    }

    else {
        let book = new Book
            (name, by, isbn, time);
        UI.addtobooklist(book);
        UI.clearfields();
        UI.showalert
            ("Book added to the list!", "success");
        Store.addBook(book);
    }
    e.preventDefault();
}

function removebook(r) {
    UI.deletefrombook(r.target);
    r.preventDefault();
}
