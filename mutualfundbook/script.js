////////////////////// DATA START /////////////////////////

const books = [
    {name:"Please Select a Book", pages: 0, bookID: "-1"}, 
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
let prevPageNumber = 1;
let nextPageNumber = 2;
let currentURL = "";

////////////////////// DATA END /////////////////////////


////////////////////// EVENTS START /////////////////////////

const btnStart = document.querySelector('#start');
const btnNext = document.querySelector('#next');
const btnPrev = document.querySelector('#previous');
const btnEnd = document.querySelector('#end');
const pageImage = document.querySelector('#bookSource');
const bookContainer = document.querySelector('#container');

btnStart.addEventListener('click', function(){ currentPageNumber = 1; updateIFrame(); });
btnPrev.addEventListener('click', function(){ currentPageNumber--; updateIFrame(); });
btnNext.addEventListener('click', function(){ currentPageNumber++; updateIFrame(); });
btnEnd.addEventListener('click', function(){ currentPageNumber = totalPages; updateIFrame(); });

pageImage.addEventListener('click', function(){ pageImage.classList.toggle("full");});

bookContainer.addEventListener('click', 
    function(event){ 
        if( event.target.id == 'bookContent'){
            if(event.clientX < window.innerWidth/2){
                currentPageNumber--; updateIFrame();
            }else if(event.clientX > window.innerWidth/2){
                currentPageNumber++; updateIFrame();
            }
        }
    });

function updateIFrame(){
    if(currentPageNumber < 1 || currentPageNumber > totalPages ) { currentPageNumber = 1; }
    
    currentURL = baseURL + currentPageNumber + ".jpg";
    pageImage.setAttribute('src', currentURL);
    document.getElementById("pages").selectedIndex = currentPageNumber - 1;

    prevPageNumber = currentPageNumber - 1;
    nextPageNumber = currentPageNumber + 1;

    if(prevPageNumber < 1){  prevPageNumber = 1; }
    if(nextPageNumber > totalPages){ nextPageNumber = totalPages; }
    
    bookContainer.style.backgroundImage = "url("+baseURL+prevPageNumber+".jpg), url("+baseURL+nextPageNumber+".jpg)";
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
    if(ddl[ddl.selectedIndex].value != -1){
        baseURL = 'https://virtualbooks.taxmann.com/flipbooks/' + ddl[ddl.selectedIndex].value + '/files/mobile/';
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