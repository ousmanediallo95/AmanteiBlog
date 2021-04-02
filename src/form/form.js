import "./form.scss";
import "../assets/styles/styles.scss";


const form = document.querySelector("form");
const errorElement = document.querySelector('#errors');
const btnCancel = document.querySelector(".btn-secondary");
let errors = [];

const initForm = async () => {
    const params = new URL(location.href);
    const articleId = params.searchParams.get('id');
    if (articleId) {
        const responses = await fetch(`https://restapi.fr/api/ousmane/${articleId}`);
        if (responses.status < 300){
            const article = await responses.json();
            console.log(article);
        }
    }

}
initForm();

btnCancel.addEventListener('click', event => {
    location.assign("/index.html");
})
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const entries = formData.entries();
    const article = Object.fromEntries(entries);
    // const obj = Array.from(entries).reduce((acc, value) => {
    //     acc[value[0]] = value[1];
    //     return acc;

    // }, {})
    if (formIsValid(article)) {
        //fetch 
        try {
            const json = JSON.stringify(article);
            const responses = await fetch("https://restapi.fr/api/ousmane", {
                method: "POST",
                body: json,
                headers: {
                    'Content-Type': 'application/json'
                }

            });
            if (responses.status < 299) {
                location.assign('/index.html')
            }

        } catch (e) {
            console.error('e :', e);
        }

    }
    form.reset();


})

// Gestion d'erreur 

const formIsValid = (article) => {
    if (!article.author || !article.category || !article.content || !article.title || !article.img) {
        errors.push('Vous devez renseigner tous les champs');
    } else {
        errors = [];
    };

    if (errors.length) {
        let errorHtml = '';
        errors.forEach((e) => {
            errorHtml += `<li>${e}</li>`;
        });
        errorElement.innerHTML = errorHtml;
        errors = [];
        return false;

    } else {
        errorElement.innerHTML = '';
        errors = [];
        return true;
    }

};