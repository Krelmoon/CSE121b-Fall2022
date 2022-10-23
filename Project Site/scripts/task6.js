/* Lesson 6 */


/* FETCH */
// Step 1: Declare a global empty array variable to store a list of temples
let pokedata = [];

// Step 2: Declare a function named output that accepts a list of temples as an array argument and does the following for each temple:
// - Creates an HTML <article> element
// - Creates an HTML <h3> element and add the temple's templeName property to it
// - Creates an HTML <h4> element and add the temple's location property to it
// - Creates an HTML <h4> element and add the temple's dedicated property to it
// - Creates an HTML <img> element and add the temple's imageUrl property to the src attribute and the temple's templeName property to the alt attribute
// - Appends the <h3> element, the two <h4> elements, and the <img> element to the <article> element as children
// - Appends the <article> element to the HTML element with an ID of temples
function outputMale(data) {
    data.forEach(male => {
        let article = document.createElement('article');
        let name = document.createElement('h2');
        let id = document.createElement('li');
        let type = document.createElement('dd');
        let img = document.createElement('img');
        name.innerHTML = male.name;
        id = male.id
        type = male.type
        img.src = male.sprite;
        img.alt = male.name;
        article.appendChild(name);
        article.appendChild(img);
        document.querySelector('#male').append(article); 
    });
}
function outputFemale(data) {
    data.forEach(female => {
        let article = document.createElement('article');
        let name = document.createElement('h2');
        let id = document.createElement('h3');
        let type = document.createElement('h3');
        let img = document.createElement('img');
        name.innerHTML = female.name;
        id = female.id
        type = female.type
        img.src = female.sprite;
        img.alt = female.name;
        article.appendChild(name);
        article.appendChild(img);
        document.querySelector('#female').append(article); 
    });
}
// Step 3: Create another function called getTemples. Make it an async function.
async function getPokemonList() {
  const promises = [];
  for (let i = 1; i <= 151 ; i++) 
    {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then(resp => resp.json()));
    };
  Promise.all(promises).then( results => 
    {
    let pokemon = results.map(data => 
     ( { name   : data.name
       , id     : data.id
       , sprite : data.sprites["front_default"]
       , type   : data.types["0"].type.name
      }
      ));
      console.log(pokemon);
      dostuff(pokemon)   
   });
  }
function dostuff(data) {
  pokedata = data;
  let maleDefault = pokedata.filter(obj => {
    return obj.id === 132 | obj.id === 4 | obj.id === 32 | obj.id === 74;
  });
  outputMale(maleDefault);
  let femaleDefault = pokedata.filter(obj => {
    return obj.id === 132 | obj.id === 17 | obj.id === 81 | obj.id === 54;
  });
  outputFemale(femaleDefault);
} 
// Step 4: In the function, using the built-in fetch method, call this absolute URL: 'https://byui-cse.github.io/cse121b-course/week05/temples.json'. Create a variable to hold the response from your fetch. You should have the program wait on this line until it finishes.
// Step 5: Convert your fetch response into a Javascript object ( hint: .json() ). Store this in the templeList variable you declared earlier (Step 1). Make sure the the execution of the code waits here as well until it finishes.
// Step 6: Finally, call the output function and pass it the list of temples. Execute your getTemples function to make sure it works correctly.
getPokemonList()
// Step 7: Declare a function named reset that clears all of the <article> elements from the HTML element with an ID of temples


// Step 8: Declare a function named sortBy that does the following:
// - Calls the reset function
// - Sorts the global temple list by the currently selected value of the HTML element with an ID of sortBy
// - Calls the output function passing in the sorted list of temples


// Step 9: Add a change event listener to the HTML element with an ID of sortBy that calls the sortBy function


