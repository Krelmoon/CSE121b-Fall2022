function outputMale(data) {
  data.forEach(male => {
    let article = document.createElement('article');
    let name = document.createElement('h2');
    let img = document.createElement('img');
    let click = document.createElement('input');
    click.setAttribute("type", "radio");
    click.setAttribute('id', male.name);
    click.setAttribute('name', 'male');
    click.setAttribute('value', male.name);
    name.innerHTML = male.name.charAt(0).toUpperCase() + male.name.slice(1);
    img.src = male.sprite;
    img.alt = male.name;
    article.appendChild(click);
    article.appendChild(name);
    article.appendChild(img);
    document.querySelector('#male').append(article);
  });
}
function outputFemale(data) {
  data.forEach(female => {
    let article = document.createElement('article');
    let name = document.createElement('h2');
    let img = document.createElement('img');
    let click = document.createElement('input');
    click.setAttribute("type", "radio");
    click.setAttribute('id', female.name);
    click.setAttribute('name', 'female');
    click.setAttribute('value', female.name);
    name.innerHTML = female.name.charAt(0).toUpperCase() + female.name.slice(1);
    img.src = female.sprite;
    img.alt = female.name;
    article.appendChild(click);
    article.appendChild(name);
    article.appendChild(img);
    document.querySelector('#female').append(article);
  });
}

