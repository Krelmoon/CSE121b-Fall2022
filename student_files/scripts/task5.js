/* Lesson 5 */

/* IF/ELSE IF */

// Step 1: Declare and initialize a new variable to hold the current date
const d = new Date();
// Step 2: Declare another variable to hold the day of the week

// Step 3: Using the variable declared in Step 1, assign the value of the variable declared in Step 2 to the day of the week ( hint: getDay() )
let weekday = d.getDay();
// Step 4: Declare a variable to hold a message that will be displayed
let message = '';
// Step 5: Using an if statement, if the day of the week is a weekday (i.e. Monday - Friday), set the message variable to the string 'Hang in there!'
if ( weekday > 0 || weekday < 6 ) {
    message = 'Hang in there!';
} else {
    message = 'Woohoo!  It is the weekend!';
}
// Step 6: Using an else statement, set the message variable to 'Woohoo!  It is the weekend!'

/* SWITCH, CASE, BREAK */

// Step 1: Declare a new variable to hold another message
let message2 = '';
// Step 2: Use switch, case and break to set the message variable to the day of the week as a string (e.g. Sunday, Monday, etc.) using the day of week variable declared in Step 2 above
switch (weekday) {
    case 0:
        message2 = 'Sunday';
        break;
    case 1:
        message2 = 'Monday';
        break;
    case 2:
        message2 = 'Tuesday';
        break;
    case 3:
        message2 = 'Wednesday';
        break;
    case 4:
        message2 = 'Thursday';
        break;
    case 5:
        message2 = 'Friday';
        break;
    case 6:
        message2 = 'Saturday';
        break;
}
/* OUTPUT */

// Step 1: Assign the value of the first message variable to the HTML element with an ID of message1
document.querySelector('#message1').innerHTML = message;
// Step 2: Assign the value of the second message variable to the HTML element with an ID of message2
document.querySelector('#message2').innerHTML = message2;
/* FETCH */
// Step 1: Declare a global empty array variable to store a list of temples
let templeList = []
// Step 2: Declare a function named output that accepts a list of temples as an array argument and does the following for each temple:
// - Creates an HTML <article> element
// - Creates an HTML <h3> element and add the temple's templeName property to it
// - Creates an HTML <h4> element and add the temple's location property to it
// - Creates an HTML <h4> element and add the temple's dedicated property to it
// - Creates an HTML <img> element and add the temple's imageUrl property to the src attribute and the temple's templeName property to the alt attribute
// - Appends the <h3> element, the two <h4> elements, and the <img> element to the <article> element as children
// - Appends the <article> element to the HTML element with an ID of temples
function outputTempleList(data) {
    data.forEach(temple => {
        let article = document.createElement('article');
        let name = document.createElement('h3');
        let location = document.createElement('h4');
        let dedicated = document.createElement('h4');
        let img = document.createElement('img');
        name.innerHTML = temple.templeName;
        location.innerHTML = temple.location;
        dedicated.innerHTML = temple.dedicated;
        img.src = temple.imageUrl;
        img.alt = temple.templeName;
        article.appendChild(name);
        article.appendChild(location);
        article.appendChild(dedicated);
        article.appendChild(img);
        document.querySelector('#temples').append(article);   
    });
}
const baseURL = 'https://byui-cse.github.io/cse121b-course/week05/temples.json'
// Step 3: Create another function called getTemples. Make it an async function.
async function getTemples(url) {
   const response = await fetch(url);
    //check to see if the fetch was successful
    if (response.ok) {
    // the API will send us JSON...but we have to convert the response before we can use it
    // .json() also returns a promise...so we await it as well.
    const data = await response.json();
    doStuff(data);
}}
function doStuff(data) {
    templeList = data;
    outputTempleList(templeList);
  }
// Step 4: In the function, using the built-in fetch method, call this absolute URL: 'https://byui-cse.github.io/cse121b-course/week05/temples.json'. Create a variable to hold the response from your fetch. You should have the program wait on this line until it finishes.
// Step 5: Convert your fetch response into a Javascript object ( hint: .json() ). Store this in the templeList variable you declared earlier (Step 1). Make sure the the execution of the code waits here as well until it finishes.
// Step 6: Finally, call the output function and pass it the list of temples. Execute your getTemples function to make sure it works correctly.

// Step 7: Declare a function named reset that clears all of the <article> elements from the HTML element with an ID of temples
function reset() {
    let clear = document.querySelector('#temples');
    while(clear.firstChild) {
        clear.removeChild(clear.firstChild);
    }
}

// Step 8: Declare a function named sortBy that does the following:
// - Calls the reset function
// - Sorts the global temple list by the currently selected value of the HTML element with an ID of sortBy
// - Calls the output function passing in the sorted list of temples
function compare(a, b) {
    if (a.templeName > b.templeName) {
      // sort b before a
      return 1;
    } else if (a.templeName < b.templeName) {
      // a and b different but unchanged (already in the correct order)
      return -1;
    } else return 0; // a and b are equal
  }
let sortBy = (selection) => {
    if (selection == 'templeNameAscending') {
        reset()
        let templeSort = templeList.sort(compare);
        outputTempleList(templeSort)
    } 
    else {
        reset()
        let templeSort = templeList.sort(compare).reverse();
        outputTempleList(templeSort)
    }
}
// Step 9: Add a change event listener to the HTML element with an ID of sortBy that calls the sortBy function
document.querySelector('#sortBy').addEventListener('change', () => {
    let select = document.querySelector('#sortBy');
    let value = select.options[select.selectedIndex].value;
    sortBy(value);
});
/* STRETCH */

// Consider adding a "Filter by" feature that allows users to filter the list of temples
// This will require changes to both the HTML and the JavaScript files
getTemples(baseURL);

