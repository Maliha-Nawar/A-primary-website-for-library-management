///////by OBJECT ORIENTED PROGRAMMING//////////

class list {
    constructor(name, by, isbn) {
        this.name = name;
        this.by = by;
        this.isbn = isbn;
    }

}
class UI {
    constructor() 
    { } 
    addtoui(book) 
    {let tbody=document.querySelector('.tbody');
tbody.innerHTML=`<tr>
<td>${book.name}</td>
<td>${book.by}</td>
<td>${book.isbn}</td>
<td><a href='#' class='remub'>X</a></td>
</tr>`;
}
 clearfom()
 {document.querySelector('.name').value=' ';document.querySelector('.by').value=' ';
 document.querySelector('.isbn').value=' ';}
  

}
let fom = document.querySelector('.fom');
fom.addEventListener('submit', submit);


function submit(s) {
    let name = document.querySelector('.name').value,
    by = document.querySelector('.by').value,
    isbn = document.querySelector('.isbn').value,
    book = new list(name, by, isbn);
    let ui = new UI();
    ui.addtoui(book);
ui.clearfom();

    s.preventDefault();
}