///////by OBJECT ORIENTED PROGRAMMING//////////
let tbody=document.querySelector('.tbody');
class list {
    constructor(name, by, isbn) {
        this.name = name;
        this.by = by;
        this.isbn = isbn;
    }

}
class UI {
     
   static addtoui(book) 
{let tbody=document.querySelector('.tbody'),
tr=document.createElement('tr');
tr.innerHTML=
`<td>${book.name}</td>
<td>${book.by}</td>
<td>${book.isbn}</td>
<td><a href='#' class='remub'>X</a></td>`;
// href=# jeno page reload na kore
tbody.appendChild(tr);
}
static clearfom()
 {document.querySelector('.name').value=' ';document.querySelector('.by').value=' ';
 document.querySelector('.isbn').value=' ';}
  
static showAlert(message, className)
{let div=document.createElement('div');
 div.className=`alert ${className}`;
 div.appendChild(document.createTextNode(message));
 let container=document.querySelector('.container');
let fom=document.querySelector('.fom');
container.insertBefore(div,fom);


setTimeout(()=>
{document.querySelector('.alert').remove();},
3000);}


static deleteBook(target)
{
if (target.hasAttribute('href'))
{
target.parentElement.parentElement.remove();
UI.showAlert('Book removed!','success');}}

}

class Locallystore
{
 static getbooks ()
 {let books;
  if(localStorage.getItem('books')===null)
{books=[];}
else
{books=JSON.parse(localStorage.getItem('books'));}
return books;
}


static addBook(book)
{let books=Locallystore.getBooks();
books.push(book);
localStorage.setItem
('books',JSON.stringify(books));}

}


let fom = document.querySelector('.fom');
fom.addEventListener('submit', submit);
tbody.addEventListener('click',removeBook);

function submit(s) {
    let name = document.querySelector('.name').value,
    by = document.querySelector('.by').value,
    isbn = document.querySelector('.isbn').value;
if(name ==='' || by ==='' || isbn ==='')
{UI.showAlert
("Please fill up all fields!","error");}

else
 {let 
    book = new list(name, by, isbn);
     
    UI.addtoui(book);
    UI.clearfom();
    UI.showAlert
    ("Book added!","success");
    // Locallystore.addBook(books);
    Locallystore.addBook(book)
}
    s.preventDefault();
}


function removeBook(b)
{    UI.deleteBook(b.target);
    
    b.preventDefault();}
