const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=2';
const API_URL_FAVORITES = 'https://api.thecatapi.com/v1/favourites?api_key=live_LczcUgDsqlvkBsiQeQaz6VBJIDTzzQaUJIIxYGPOv0ORZWsPROvQvXgPs5m756C1'
const API_URL_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}?api_key=live_LczcUgDsqlvkBsiQeQaz6VBJIDTzzQaUJIIxYGPOv0ORZWsPROvQvXgPs5m756C1`
const spanError = document.getElementById('spanError');

async function reloadCats() {
   const res = await fetch(API_URL_RANDOM);
   const data = await res.json();

   console.log('Random')
   console.log(data);

   if(res.status !== 200){
    spanError.innerHTML = "Hubo un error: " + data.message;
   } else {     
   const img1 = document.getElementById('img1');
   const img2 = document.getElementById('img2');
   const btn1 = document.getElementById('btn1')
   const btn2 = document.getElementById('btn2')
   img1.src = data[0].url;
   img2.src = data[1].url;
   btn1.onclick = () => addCatToFavorites(data[0].id);
   btn2.onclick = () => addCatToFavorites(data[1].id);
   }
}

async function loadFavoriteCats() {
    const res = await fetch(API_URL_FAVORITES);
    const data = await res.json();
    console.log('favorites')
    console.log(data);
    if(res.status !== 200){
     spanError.innerHTML = "Hubo un error: " + data.message;
    } else {
        const section = document.getElementById('favoriteCats');
        section.innerHTML = "";

        const h2= document.createElement('h2');
        const h2Text = document.createTextNode("favoriteCats");
        h2.appendChild(h2Text);
        section.appendChild(h2);

        data.forEach(cat => {
            const article = document.createElement('article');
            const img = document.createElement('img');
            const btn =document.createElement('button');
            const btnText = document.createTextNode('Delete cat from favorites');

            img.src = cat.image.url
            btn.appendChild(btnText);
            btn.onclick = () => deleteCatFromFavorites(cat.id);
            article.appendChild(img);
            article.appendChild(btn);
            section.appendChild(article);
        });
    }
 }

async function addCatToFavorites(id) {
    const res = await fetch(API_URL_FAVORITES, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            image_id: id
        }),
    });
    const data = await res.json();
    console.log('Save');
    console.log(res)
    if(res.status !== 200){
        spanError.innerHTML = "Hubo un error: " + data.message;
   } else {
    console.log('Cat saved');
    loadFavoriteCats();
   }
 }
 async function deleteCatFromFavorites(id) {
    const res = await fetch(API_URL_DELETE(id), {
        method: 'DELETE',
    });
    const data = await res.json();
    console.log('Delete');
    console.log(res)
    
    if(res.status !== 200){
        spanError.innerHTML = "Hubo un error: " + data.message;
   }
   else{
    console.log('Cat deleted');
    loadFavoriteCats()
   }
 }
 reloadCats();
 loadFavoriteCats();
