/* Lesson 6 */

// Set global variables one for main data from the fetch and one each for male and female pokemon on screen.
let pokedata = [];
let maleDefault = [];
let femaleDefault = [];

// Fetch function async promises to api only pulling first 151 entries (there are over 1000 pokemon now!).
async function getPokemonList() {
  const promises = [];
  for (let i = 1; i <= 151 ; i++) 
    {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then(resp => resp.json()));
    };
  Promise.all(promises).then( results => 
    {
      // trying to get info for a dateing profile only could display name and sprite(img)
    let pokemon = results.map(data => 
     ( { name   : data.name
       , id     : data.id
       , sprite : data.sprites["front_default"]
       , type   : data.types["0"].type.name
      }
      ));
      dostuff(pokemon);   
   });
  }
// dostuff places fetch data in global array and sets up inital group of pokemon for site display
function dostuff(data) {
  pokedata = data;
  maleDefault = pokedata.filter(obj => {
    return obj.id === 132 | obj.id === 4 | obj.id === 32 | obj.id === 74;
  });
  outputMale(maleDefault);
  femaleDefault = pokedata.filter(obj => {
    return obj.id === 132 | obj.id === 17 | obj.id === 125 | obj.id === 54;
  });
  outputFemale(femaleDefault);
} 

// wanted to make the reset function more reusable so I had the querySelector line closer to the call than in the function itself.
function reset(element) {
  let clear = element
  while(clear.firstChild) {
    clear.removeChild(clear.firstChild);
}
}
// radio buttons as selectors was something I wasn't sure was going to work but it did.
document.querySelector('#date').addEventListener('click', () => {
  let maleclick = document.querySelectorAll('input[name="male"]');
  let femaleclick = document.querySelectorAll('input[name="female"]');
  let selectedMale;
            for (const radioButton of maleclick) {
                if (radioButton.checked) {
                    selectedMale = radioButton.value;
                    break;
                }
              }
  let selectedFemale;
            for (const radioButton of femaleclick) {
                if (radioButton.checked) {
                        selectedFemale = radioButton.value;
                        break;
                    }
                  }
                  //I had a hard time implementing an obvious ES module here for the eggtest function it's quite posible I'm missing something simple.
  let decide = eggTest(selectedMale,selectedFemale);
  if (decide == true) {
    document.querySelector('#decide').innerHTML = "You Found an EGG!"
  }else {
    document.querySelector('#decide').innerHTML = "You Didn't get Anything!"
  }
});

// Still dont know the best way to get a good value out of a selection drop down. This one works if you don't pick the first thing on the menu first.
document.querySelector('#maleChoice').addEventListener('change', () => {
  let select = document.querySelector('#maleChoice');
  let value = select.options[select.selectedIndex].value;
  let addtionalMale = pokedata.filter(obj => {
    return obj.name == value
  });
  maleDefault.push(...addtionalMale);
  malediv = document.querySelector('#male');
  reset(malediv);
  outputMale(maleDefault)
});

document.querySelector('#femaleChoice').addEventListener('change', () => {
  let select = document.querySelector('#femaleChoice');
  let value = select.options[select.selectedIndex].value;
  let addtionalFemale = pokedata.filter(obj => {
    return obj.name == value
  });
  femaleDefault.push(...addtionalFemale);
  femalediv = document.querySelector('#female');
  reset(femalediv);
  outputFemale(femaleDefault)
});

// placed here to get things started
getPokemonList()