
// const KEY = "2b5ed3001d5444a9a22dc7ccc959582e";

// fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${KEY}`)
// .then(response => response.json())
// .then((data) => console.log(data))
// .catch((error) => console.log(error));

// 1)  Base URL;
// 2) resource;
// 3) params


const form = document.querySelector('.form');
const select = document.querySelector('.category');
const pageSizeInput = document.querySelector('.page-size');
const list = document.querySelector('.list');
const counter = document.querySelector('.counter');
const totalPages = document.querySelector('.totalPages');
const loardMore = document.querySelector('.loardMore')
const KEY = "2b5ed3001d5444a9a22dc7ccc959582e";
const BASE_URL = "https://newsapi.org/v2";
let page = 1;

// const URL = `${BASE_URL}/top-headlines?apiKey=${KEY}&category=sports&country=fr&pageSize=10&page=${page}`

const updateUi = (data, pageSize) => {
    counter.textContent = `Total articles: ${data?.totalResults}`; 
    list.innerHTML = "";
    totalPages.textContent = `Найдено статей на ${Math.ceil(data?.totalResults / pageSize)} страниц`;
}

const createUrl = () => {
    const category = select.value;
    const pageSize = pageSizeInput.value;
    const url = `${BASE_URL}/top-headlines?apiKey=${KEY}&category=${category}&country=fr&pageSize=${pageSize}&page=${page}`
    return url;
}


// Главная функция

const handleSubmit = (e) => {
    e.preventDefault();
    const url = createUrl();
    
    fetch(url).then((res) => res.json())
    .then((data) => {
        // console.log(data)
        if (e.type === 'submit') {
            updateUi(data, pageSize);
        }
       
        insertContent(data.articles);
        page += 1;
        if (page > Math.ceil(data?.totalResults / pageSize)){
            console.log('check');
        loardMore.classList.add('hide')}
    })
    .catch((error) => {
        console.log(error)
    });
    // .finally(() => {});
};

form.addEventListener('submit', handleSubmit);
loardMore.addEventListener('click', handleSubmit);





const createListItem = (item) => `
<li>
${item.urlToImage ? `<img src="${item.urlToImage}" alt="${item.description}">` : ""}
<h2>${item.title}</h2>
<p>${item.description ? item.description : ""}</p>
<p>${item.author ?? ""}</p>
<a href="${item.url}" terget="_blank">Перейти до статьи</a>
</li>`;

const generateContent = (array) => array?.reduce((acc, item) => acc + createListItem(item), "");


const insertContent = (array) => {
    const result = generateContent(array);
   
list.insertAdjacentHTML("beforeend", result);
}

