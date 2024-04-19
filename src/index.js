function displayRecipe(response) {
  new Typewriter("#recipe", {
    strings: response.data.answer,
    autoStart: true,
    delay: 0.5,
    cursor: "",
  });
}

function generateRecipe(event) {
  event.preventDefault();

  // build the API url
  let ingredientsInput = document.querySelector("#ingredients");
  let ingredientsToAvoid = document.querySelector("#ingredients-to-avoid");
  let servings = document.querySelector("#servings");
  let time = document.querySelector("#time");
  let macros = document.querySelector("#macros");
  let units = document.querySelector(".radio-options");
  let apiKey = "2dbe7af4434o3f6bf61f8t7c0caf3496";
  let prompt = `generate a recipe using most or all ingredients from ${ingredientsInput.value}, strictly excluding all ingredients from ${ingredientsToAvoid.value}, using the number of servings provided in ${servings.value}, that can be cooked within the amount of time provided in ${time.value} and respecting the macronutrient indications per portion from ${macros.value}. Please also display the recipe either in metric or imperial units, according to ${units.value}. Please style the recipe with simple HTML, as indicated in the context.`;
  let context =
    "You are a healthy food expert who loves being challenged by creating surprising recipes inspired by cuisines from all over the world, with random ingredients. You ALWAYS style the recipes in basic HTML, as follows and in this order: ALWAYS start with the recipe title in <h2>, then information about how many serves the recipes provide, how much time the recipe will take to make, and give a calorie and macro breakdown of the recipe per serving, then the ingredients section heading as <h3>, then the ingredients as a dotted list separated with <br />, then the instructions section heading as <h3>, then the instructions as a numbered list with each step separated by <br /> and finally 2 <br /> followed by a little pun at the end. You do not mention the prompt at the beginning of the response and jump right into to recipe information. You like to slide in a couple of jokes. The HTML styling is extremely important!";
  let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;

  let recipeElement = document.querySelector("#recipe");
  recipeElement.classList.remove("hidden");
  recipeElement.innerHTML = `<div class="blink">⏳ Generating a yummy recipe for you</div>`;

  // make a call to the API using axios
  axios.get(apiUrl).then(displayRecipe);
}

let recipeFormElement = document.querySelector("#recipe-generator-form");
recipeFormElement.addEventListener("submit", generateRecipe);
