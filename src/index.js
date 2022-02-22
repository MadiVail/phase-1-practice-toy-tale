const toyUrl = 'http://localhost:3000/toys'
const addBtn = document.querySelector('#new-toy-btn');
const toyForm = document.querySelector('.container');
let addToy = false;


document.addEventListener("DOMContentLoaded", () => {
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

fetch(toyUrl)
.then(resp => resp.json())
.then((toys) => renderToys(toys));

function renderToys(toys) {
  const loc = document.getElementById('toy-collection');
    toys.forEach(Toy => {
      const card = document.createElement("div");
      const h2 = document.createElement("h2");
      const image = document.createElement("img");
      const p = document.createElement("p");
      p.setAttribute("id", "likes-field");
      const button = document.createElement("button");

      button.setAttribute("id", "like-button" + Toy.id);

      likeButtonUpdate(Toy, button);

      card.setAttribute("class", "card");
      h2.innerText = Toy.name;
      image.src = Toy.image;
      image.setAttribute("class", "toy-avatar");
      p.innerText = Toy.likes + " likes";
      button.innerText = "Like";

      card.appendChild(h2);
      card.appendChild(image);
      card.appendChild(p);
      card.appendChild(button);

      loc.appendChild(card);

    })
}

document.addEventListener("DOMContentLoaded", () => {
  const toySubmit = document.querySelector(".submit");
  toySubmit.addEventListener("click", () => {
    let toyData = {id:"", name:"", image:"", likes:"0"};
    toyData.name = document.getElementById("name").value;
    toyData.image = document.getElementById("image").value;

    fetch(toyUrl, {
    method: "POST",
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(toyData),
  })
  });
});

function likeButtonUpdate(toy, button) {
  let numberOfLikes = toy.likes;
  
  button.addEventListener("click", () => {
    const likesField = document.getElementById("likes-field");
    let newNumberOfLikes = numberOfLikes + 1;

   return fetch(toyUrl + "/" + toy.id, {
    method: "PATCH",
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      "likes": newNumberOfLikes,
    }),
  })
  .then(response => response.json())
  .then(data => (likesField.innerText = data.likes + " likes"));
  });
}