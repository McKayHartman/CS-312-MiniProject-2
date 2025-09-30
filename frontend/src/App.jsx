import './App.css';
import { useState } from 'react'


import axios from 'axios'

const API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php'


// Main App component
// Dependency: useState, axios

function App() {

  // stores the apiResponse from call
  const [apiResponse, setApiResponse] = useState(null);

  // Function: getRandomCocktail
  // Function calls the api using Axios -> sets the response using useState variable
  // Dependency: Axios

  async function getRandomCocktail(){
  try {
    const response = await axios.get(API_URL);
    setApiResponse(response);
    console.log(response);
  } 
  catch (error) {
    console.error(error);
  }
}

// Get the ingredients from the api response
const ingredients = [];
if (apiResponse) {
  // loop through 15 possible ingredients from api
  for (let i = 1; i <= 15; i++) {
    // store ingredient and measure in variables
    const ingredient = apiResponse.data.drinks[0][`strIngredient${i}`];
    const measure = apiResponse.data.drinks[0][`strMeasure${i}`];
    // check if ingredient is null or string
    if (ingredient) { ingredients.push(measure ? `${measure} ${ingredient}` : ingredient);}
    // if null break the loop
    else { break; }
  }
}



  return (
    <div>
      {/* Button to get cocktail from api call */}
      <button onClick={getRandomCocktail}>Get Random Cocktail</button>


      {/* Cocktail name display (conditional rendering) */}
      <div>

        {apiResponse ? 
        // After the button has been clicked
        <>

            <h1 className='text-4xl mb-4'> Your random cocktail is {apiResponse?.data.drinks[0].strDrink}</h1>
            <div className='grid grid-cols-2 h-screen'>

              {/* Picture of cocktail */}
              <div className='flex items-center justify-center' id="cocktail-image">
                <img src={apiResponse?.data.drinks[0].strDrinkThumb} alt="Cocktail Image Here" />
              </div>

              {/* Ingredients in cocktail */}
              <div className='flex items-center justify-center' id="recipe-ingredients">
                <div id="ingredients-list">
                  <h2 className="text-3xl">Ingredients:</h2>
                  <ul className="list-disc list-inside">
                    {ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </div>

                {/* Glass Type */}
                <div id="glass-type">
                  <h2 className="text-3xl">Glass Type:</h2>
                  <p>{apiResponse?.data.drinks[0].strGlass}</p>
                </div>

                {/* Directions for cocktail */}
                <div id="directions">
                  <h2 className="text-3xl">Directions:</h2>
                  <p>{apiResponse?.data.drinks[0].strInstructions}</p>
                </div>
              </div>
            </div></>
        : 
        // Before the button has been clicked
        <div> 
          <h1>Click the button to get a random cocktail!</h1>
        </div>
      }
      </div>
      
    </div>
  
  );
}

export default App;
