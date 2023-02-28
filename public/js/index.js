function openNav() {
    document.getElementById("myNav").style.width = "100%";
  }
function closeNav() {
    document.getElementById("myNav").style.width = "0%";
  }
const searchBtn = document.getElementById("searchBtn");
console.log(searchBtn); // check if searchBtn is being correctly selected
searchBtn.addEventListener("click", searchRecipes);

async function searchRecipes() {
    console.log("searchRecipes function called!");
    const query = document.getElementById("query").value;
    const cuisine = document.getElementById("cuisine").value;
    const diet = document.getElementById("diet").value;
    const intolerances = document.getElementById("intolerances").value;
    const includeInstructions = document.getElementById("includeInstructions").checked;
    const includeIngredients = document.getElementById("includeIngredients").checked;
  
    let url = `/search?query=${query}&cuisine=${cuisine}&diet=${diet}&intolerances=${intolerances}&includeNutrition=true`;
    if (includeInstructions) {
      url += "&instructionsRequired=true";
    }
    if (includeIngredients) {
      const ingredients = document.getElementById("ingredients");//.value;
      url += `&includeIngredients=${ingredients}`;
    }
  
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";
  
    // create a loading message element
    const loadingMsg = document.createElement("p");
    loadingMsg.innerText = "Loading...";
    resultsDiv.appendChild(loadingMsg);
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      // remove the loading message element
      resultsDiv.removeChild(loadingMsg);
  
      if (data && data.results) {
        data.results.forEach(recipe => {
          const recipeDiv = document.createElement("div");
          recipeDiv.innerHTML = `
            <h3>${recipe.title}</h3>
            <p>${recipe.summary}</p>
            <img src="${recipe.image}" alt="${recipe.title}">
          `;
          if (includeIngredients) {
            recipeDiv.innerHTML += `<h4>Ingredients:</h4>
              <p>${recipe.extendedIngredients.length > 0 ? recipe.extendedIngredients.map(ingredient => ingredient.original).join("<br>") : "No ingredients available."}</p>`;
          }
          if (includeInstructions) {
            recipeDiv.innerHTML += `<h4>Instructions:</h4>
              <p>${recipe.analyzedInstructions.length > 0 ? recipe.analyzedInstructions[0].steps.map(step => step.step).join("<br>") : "No instructions available."}</p>`;
          }
          resultsDiv.appendChild(recipeDiv);
        });
      } else {
        resultsDiv.innerHTML = "No results found.";
      }
    } catch (error) {
      console.error(error);
      // remove the loading message element and display an error message
      resultsDiv.removeChild(loadingMsg);
      resultsDiv.innerHTML = "An error occurred while loading the results.";
    }
  }
