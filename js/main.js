console.log("Gatitos")

const API_URL = 'https://api.thecatapi.com/v1/images/search';

function findAnotherCat() {
    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            const img = document.querySelector('img')
            img.src = data[0].url
        });
}
