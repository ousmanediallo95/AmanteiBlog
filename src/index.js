import "./assets/styles/styles.scss";
import "./index.scss";

const articleContainerElement = document.querySelector('.articles-container');

const createArticle = (articles) => {
    const articlesDom = articles.map((article) => {
        const articleDom = document.createElement('div');
        articleDom.classList.add("article");
        articleDom.innerHTML = `
        <img src="${article.img}" alt="profile">
        <h2>${article.title}</h2>
        <p class="article-author">${article.author} - ${new Date(article.createdAt).toLocaleDateString("fr-FR", {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        })}</p>
        <p class="article-content"> ${article.content}</p>
        <div class="article-action">
            <button class="btn btn-danger" data-id = ${article._id}>Supprimer</button>
            <button class="btn btn-primary" data-id = ${article._id}>Modifier</button>
        </div>
        `;
        return articleDom;

    })
    articleContainerElement.innerHTML = '';
    articleContainerElement.append(...articlesDom);
    const deletesButton = articleContainerElement.querySelectorAll(".btn-danger");
    const editButtons = articleContainerElement.querySelectorAll(".btn-primary");


    editButtons.forEach(button => {
        button.addEventListener('click', async event => {
            try {
                const target = event.target;
                const articleId = target.dataset.id;
                location.assign(`/form.html?id=${articleId}`);

            } catch (e) {
                console.error("e : ", e);
            }

            fetchArticle();
        })
    });


    deletesButton.forEach(button => {
        button.addEventListener('click', async event => {
            try {
                const target = event.target;
                const articleId = target.dataset.id;
                const responses = await fetch(`https://restapi.fr/api/ousmane/${articleId}`, {
                    method: "DELETE"
                });
            } catch (e) {
                console.error("e : ", e);
            }

            fetchArticle();
        })
    });


}

const fetchArticle = async () => {
    try {

        const responses = await fetch("https://restapi.fr/api/ousmane");
        const articles = await responses.json();
        createArticle(articles);

    } catch (e) {
        console.error("error : ", e);
    }


}

fetchArticle();

