const API_KEY = "Ab9ri7O5s00zTVOCZaNoYrfZKd3BVVAz";

$(document).ready(function() {
    loadDefaultHeroes();
    $("#add-superhero").on("click", addHeroes);
    $("#superhero-buttons").on("click", ".superhero-button", fetchHeroes);
    $("#superheroes").on("click",".hero-gif",toggleMovement);
});

function loadDefaultHeroes(){
    const temas = ["antman","batman", "black-panther", "spiderman",  "captain-america"];
    const shButtons = $("#superhero-buttons");
    temas.forEach(hero => shButtons.append(`<button class="superhero-button">${hero}</button>`));
}

function addHeroes(e){
    e.preventDefault();
    const searchTerm = $("#superhero-input").val();
    if (searchTerm.trim() !== "") {
        $("#superhero-buttons").append(`<button class="superhero-button">${searchTerm}</button>`);
        $("#superhero-input").val("");
    }   
}

function renderHeroes(response){
    const container = $("#superheroes");
    container.empty();
    response.data.forEach(gif =>{
        const image = $("<img>");
        image.attr("src", gif.images.fixed_height_still.url);
        image.attr("class","hero-gif");
        image.attr("data-animated", "false");
        image.attr("data-gif", gif.images.fixed_height.url);
        image.attr("data-still", gif.images.fixed_height_still.url);
        
        const element = $("<div>")
        element.attr("class","hero-item");
        element.append(image);
        element.append($("<div>").text(`Rating: ${gif.rating}`));
       
        container.append(element);
    });
}

function fetchHeroes(e){
    e.preventDefault();
    const searchName = $(this).text();
    $.ajax({
        url: `https://api.giphy.com/v1/gifs/search`,
        type:"get",
        data:{
            api_key: API_KEY,
            q: searchName,
            limit: 10,
            lang: "en"
        },
        success: renderHeroes,
        error: function (err) {
            alert("No se pudieron obtener las imágenes");
            console.log("Error [fetchHeroes]: ", err);
        }
    })
}

function toggleMovement(){
    $(this).parent().toggleClass("gradient-border");
    if($(this).attr("data-animated") === "false" ){
        $(this).attr("data-animated","true");
        $(this).attr("src", $(this).attr("data-gif"));
    }else{
        $(this).attr("src", $(this).attr("data-still")); 
    }
}
