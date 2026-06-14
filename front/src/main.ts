type film = {
    titre : string,
    realisateur : string,
    annee : string
}



async function getFilm(){
    const response = await fetch(
        "http://localhost:8080/film"
    )
    const data = await response.json() as film[];
    const liste_film = document.getElementById("liste_films")
    if (!liste_film) return;
    liste_film.innerHTML="";
    data.forEach((un_film) => {
        const li = document.createElement("li");
        li.textContent = `titre : ${un_film.titre} || réalisateur : ${un_film.realisateur} || année de sortie : ${un_film.annee}`
        liste_film.appendChild(li);
    })
    
}




const button_ajouter = document.getElementById("bouton_ajouter");

async function postFilm(){

    const titre = document.getElementById("titre") as HTMLInputElement;
    const realisateur = document.getElementById("realisateur") as HTMLInputElement;
    const annee = document.getElementById("annee") as HTMLInputElement;

    const text_json = JSON.stringify(
        {
            titre : titre.value,
            realisateur : realisateur.value,
            annee : annee.value
        }
    )
    const response = await fetch(
        "http://localhost:8080/film",
        {
            method : "POST",
            headers : {"Content-type" : "application/json"},
            body : text_json

        }
    );
    if (response.ok){
        const data = await response.json();
        console.log(data);
    }
}


const bouton_rechercher = document.getElementById("bouton_recherche")
async function getRecherche(){
    const recherche = document.getElementById("recherche film") as HTMLInputElement;
    const text = recherche.value;
    const response = await fetch(
        `http://localhost:8080/film/${text}`
    )
    const data = await response.json() as film[];
    const liste_recherche = document.getElementById("resultat-recherche");
    if (!liste_recherche) return;
    data.forEach((search) =>{
        const li = document.createElement("li");
        li.textContent = `titre : ${search.titre} || réalisateur : ${search.realisateur} || année de sortie : ${search.annee}`
        liste_recherche.appendChild(li);
    })

}
getFilm();

button_ajouter?.addEventListener("click",postFilm);
button_ajouter?.addEventListener("click",getFilm);
bouton_rechercher?.addEventListener("click",getRecherche)

