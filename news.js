const API_KEY1 = "API_KEY (for url - 1)";
const API_KEY2 = "API_KEY (for url - 2)";
const url1 = "https://newsapi.org/v2/everything?q=";
const url2 = "https://api.currentsapi.services/v1/latest-news?";

window.addEventListener("load", () => fetchNews1("technology"));

async function fetchNews1(query) {
    try {
        const res1 = await fetch(`${url1}${query}&apiKey=${API_KEY1}`);
        const data1 = await res1.json();
        console.log(data1);

        bindData1(data1.articles.slice(0, 10));
    } catch (error) {
        console.log("Error fetching news from API 1:", error);
    }
}

async function fetchNews2() {
    try {
        const res2 = await fetch(`${url2}apiKey=${API_KEY2}`);
        const data2 = await res2.json();
        console.log(data2);
        bindData2(data2.news.slice(0, 10));
    } catch (error) {
        console.log("Error fetching news from API 2:", error);
    }
}

function bindData1(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");
    cardsContainer.innerHTML = "";
    articles.forEach(article => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataCard1(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function bindData2(newsItems) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");
    cardsContainer.innerHTML = "";
    newsItems.forEach(item => {
        if (!item.image) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataCard2(cardClone, item);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataCard1(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector(".news-desc");

    newsImg.src = article.urlToImage || "assets/fallback.jpg";;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

function fillDataCard2(cardClone, item) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector(".news-desc");

    newsImg.src = item.image || "assets/fallback.jpg";;
    newsTitle.innerHTML = item.title;
    newsDesc.innerHTML = item.description;

    const date = new Date(item.published).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${item.author} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(item.url, "_blank");
    });
}

async function fetchNotes() {
    const res = await fetch("http://localhost:3000/notes");
    const notes = await res.json();
    const list = document.getElementById("notes-list");
    list.innerHTML = "";

    notes.forEach(note => {
        const li = document.createElement("li");
        li.textContent = note.text;

        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.onclick = async () => {
            await fetch(`http://localhost:3000/notes/${note._id}`, {
                method: "DELETE"
            });
            fetchNotes();
        };

        li.appendChild(delBtn);
        list.appendChild(li);
    });
}

async function saveNote() {
    const text = document.getElementById("note-input").value;
    if (!text.trim()) return;

    await fetch("http://localhost:3000/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
    });

    document.getElementById("note-input").value = "";
    fetchNotes();
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews1(id);
    document.getElementById("cards-container").style.display = "grid";
    document.getElementById("notes-section").style.display = "none";
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
}

const global = document.getElementById("global-button");
global.addEventListener("click", () => {
    fetchNews2();
    document.getElementById("notes-section").style.display = "none";
    document.getElementById("cards-container").style.display = "grid";
    curSelectedNav?.classList.remove("active");
    curSelectedNav = global;
    curSelectedNav.classList.add("active");
});

const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-text');

searchButton.addEventListener('click', () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews1(query);
    document.getElementById("notes-section").style.display = "none";
    document.getElementById("cards-container").style.display = "grid";
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});

document.getElementById("notes-tab").addEventListener("click", () => {
    document.getElementById("notes-section").style.display = "block";
    document.getElementById("cards-container").style.display = "none";
    fetchNotes();
});
