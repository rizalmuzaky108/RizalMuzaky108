const baseUrl = "https://masak-apa.tomorisakura.vercel.app/";
const resepEndPoin = `${baseUrl}/api/recipes`;
const categoryEndPoin = `${baseUrl}/api/categorys/recipes/masakan-hari-raya`;
const proxyurl = "https://cors-anywhere.herokuapp.com/";

const contents = document.querySelector("#content-list");
const title = document.querySelector(".card-title");

function getAllRecipes() {
    title.innerHTML = "Daftar Resep"
    fetch(proxyurl + resepEndPoin)
        .then(response => response.json())
        .then(resJson => {
            let recipes = "";
            resJson.results.forEach(recipe => {
                recipes += `
                    <li class="collection-item avatar">
                        <img src="${recipe.thumb}" alt="" height="200" class="circle">
                        <span class="title"><b>${recipe.title}</b></span><br>
                        Terakhir Diperbarui: ${recipe.times}<br>
                        Kesulitan: ${recipe.dificulty}<br>
                        Porsi: ${recipe.portion}
                    </li>`
            });
            contents.innerHTML = `<ul class="collection">${recipes}</ul>`;
            const detil = document.querySelectorAll('.secondary-content');
        }).catch(err => {
            console.error(err);
        })
}

function getCategoryRecipes() {
    title.innerHTML = "Resep Hari Raya";
    fetch(proxyurl + categoryEndPoin)
        .then(response => response.json())
        .then(resJson => {
            let recipesByCategory = "";
            resJson.results.forEach(recipe => {
                recipesByCategory += `
                    <li class="collection-item avatar">
                        <img src="${recipe.thumb}" alt="" height="200" class="circle">
                        <span class="title"><b>${recipe.title}</b></span><br>
                        Terakhir Diperbarui: ${recipe.times}<br>
                        Kesulitan: ${recipe.dificulty}<br>
                        Porsi: ${recipe.portion}
                    </li>`
            });
            contents.innerHTML = `<ul class="collection">${recipesByCategory}</ul>`;
            
        }).catch(err => {
            console.error(err);
        })
}

function loadPage(page) {
    switch (page) {
        case "resepAll":
            getAllRecipes();
            break;
        case "resepByCategory":
            getCategoryRecipes();
            break;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);

    document.querySelectorAll(".sidenav a, .topnav a").forEach(elm => {
        elm.addEventListener("click", evt => {
            let sideNav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sideNav).close();
            page = evt.target.getAttribute("href").substr(1);
            loadPage(page);
        })
    })
    var page = window.location.hash.substr(1);
    if (page === "" || page === "!") page = "teams";
    loadPage(page);
});