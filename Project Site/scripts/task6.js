/* Lesson 6 */


let pokedata = [];
let maleDefault = [];
let femaleDefault = [];

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
      dostuff(pokemon);   
   });
  }

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

function reset(element) {
  let clear = element
  while(clear.firstChild) {
    clear.removeChild(clear.firstChild);
}
}
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
  let decide = eggTest(selectedMale,selectedFemale);
  if (decide == true) {
    document.querySelector('#decide').innerHTML = "You Found an EGG!"
  }else {
    document.querySelector('#decide').innerHTML = "You Didn't get Anything!"
  }
});

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

getPokemonList()