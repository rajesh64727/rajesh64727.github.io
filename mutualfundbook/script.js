////////////////////// DATA START /////////////////////////

const books = [
    {name:"Select a Book"}, 
    {name:"Mutual Fund Foundation", pages: 306, bookID: "897687"}, 
    {name:"Mutual Fund Distributors", pages: 430, bookID: "897649"},
    {name:"Mutual Fund Distributors - Hindi", pages: 380, bookID: "897606"},
    {name:"Mutual Fund Distributors 2", pages: 216, bookID: "897607"},
    {name:"Principles of Economics", pages: 552, bookID: "897700"},
    {name:"Fundamentals of Investments", pages: 632, bookID: "897674"}
];
let baseURL = 'https://virtualbooks.taxmann.com/flipbooks/897649/files/mobile/';
let totalPages = 430;
let currentPageNumber = 1;
let currentURL = "";

////////////////////// DATA END /////////////////////////


////////////////////// EVENTS START /////////////////////////

document.querySelector('#start').addEventListener('click', function(){ currentPageNumber = 1; updateIFrame(); });
document.querySelector('#end').addEventListener('click', function(){ currentPageNumber = totalPages; updateIFrame(); });
document.querySelector('#previous').addEventListener('click', function(){ currentPageNumber--; updateIFrame(); });
document.querySelector('#next').addEventListener('click', function(){ currentPageNumber++; updateIFrame(); });

document.querySelector('#bookSource').addEventListener('click', function(){ 
    document.querySelector('#bookSource').classList.toggle("full");
});

function updateIFrame(){
    if(currentPageNumber < 1 || currentPageNumber > totalPages ) { currentPageNumber = 1; }
    
    currentURL = baseURL + currentPageNumber + ".jpg";
    document.querySelector("#bookSource").setAttribute('src', currentURL);
    document.getElementById("pages").selectedIndex = currentPageNumber - 1;
}

function addPages() {
    const ddl = document.getElementById("pages");
    ddl.length = 0;
    for(let i=1; i<= totalPages; i++){
        let option = document.createElement("OPTION");
        option.innerHTML = i;
        option.value = i;
        ddl.options.add(option);
    }            
}

function loadSelectedPage(){
    const ddl = document.getElementById("pages");
    let selectedPage = parseInt(ddl[ddl.selectedIndex].value);
    if(selectedPage != null && selectedPage != undefined){
        currentPageNumber = selectedPage;
        updateIFrame();
    }
}

function loadBooks(){
    const ddl = document.getElementById("books");
    ddl.length = 0;
    for(let i=0; i< books.length; i++){
        let option = document.createElement("OPTION");
        option.innerHTML = books[i].name;
        option.value = books[i].bookID;
        ddl.options.add(option);
    }
}

function loadSelectedBook(){
    const ddl = document.getElementById("books");
    let selectedBookID = parseInt(ddl[ddl.selectedIndex].value);
    if(selectedBookID != null && selectedBookID != undefined){
        baseURL = 'https://virtualbooks.taxmann.com/flipbooks/'+selectedBookID+'/files/mobile/';
        totalPages = books[ddl.selectedIndex].pages;
        currentPageNumber = 1;
        addPages();
        updateIFrame();
        document.querySelector('.bookContent').classList.remove('hide');
    }else{
        document.querySelector('.bookContent').classList.add('hide');
    }
}

////////////////////// EVENTS END /////////////////////////


////////////////////// ON PAGE LOAD START /////////////////////////
loadBooks();
////////////////////// ON PAGE LOAD END /////////////////////////