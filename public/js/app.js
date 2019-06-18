'use strict';
// I need:

//Constructor that makes a product
//Array of said products
//array of past votes (object)
//new Vote function(winnerPosition, winnerName){
//this.
//1:{name:'name', vote:false},
//2:{name:'name', vote:false},
//3:{name:'name', vote:false}
//fn to choose new

//Get click val
document.getElementById('image-table').addEventListener('click', (event) => {
  let eID = event.target.id;
  if (eID === 'img-one' || eID === 'img-two' || eID === 'img-three') {
    new Vote(eID, event.target.attributes.prodName.value);
  }
});
var voteHistory = [];
var Product = function (name, imgSRC) {
  this.name = name;
  this.imgSRC = imgSRC;
  this.votes = 0;
  this.timesShown = 0;
};

//Setup to create elements:
let productNames = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'
];
//Create the products Array.
var pickAndDrawImages = () => {
  var products = [];
  for (let i = 0; i < productNames.length; i++) {
    products.push(new Product(productNames[i].split('.')[0], `./public/img/${productNames[i]}`));
  }
  let rollRandom = (min, max) => {
    return Math.floor(
      Math.random() * Math.random() * (max - min + 1)
    ) + min;
  };
  let prod1Index = rollRandom(0, products.length - 1),
    prod2Index = null,
    prod3Index = null;
  //a != b || b != c || c != a
  do {
    prod2Index = rollRandom(0, products.length - 1);
    prod3Index = rollRandom(0, products.length - 1);

  } while (prod1Index === prod2Index || prod2Index === prod3Index || prod3Index === prod1Index);
  //TODO->Refactor this shit is wet as flip.
  //grab Containers
  let imgOneContainer = document.getElementById('img-one'),
    imgTwoContainer = document.getElementById('img-two'),
    imgThreeContainer = document.getElementById('img-three');
  //clear containers
  imgOneContainer.innerHTML = '';
  imgTwoContainer.innerHTML = '';
  imgThreeContainer.innerHTML = '';
  //create images
  let imgOne = document.createElement('img');
  imgOne.src = products[prod1Index].imgSRC;

  let imgTwo = document.createElement('img');
  imgTwo.src = products[prod2Index].imgSRC;

  let imgThree = document.createElement('img');
  imgThree.src = products[prod3Index].imgSRC;

  //Create image titles and set values
  let imgOneTitle = document.createElement('h3');
  imgOneTitle.innerText = products[prod1Index].name;
  let imgTwoTitle = document.createElement('h3');
  imgTwoTitle.innerText = products[prod2Index].name;
  let imgThreeTitle = document.createElement('h3');
  imgThreeTitle.innerText = products[prod3Index].name;
  //set image/title values

  imgOneContainer.appendChild(imgOneTitle);
  imgOneContainer.appendChild(imgOne);

  imgTwoContainer.appendChild(imgTwoTitle);
  imgTwoContainer.appendChild(imgTwo);

  imgThreeContainer.appendChild(imgThreeTitle);
  imgThreeContainer.appendChild(imgThree);

  imgOne.src = products[prod1Index].imgSRC;
  imgTwo.src = products[prod2Index].imgSRC;
  imgThree.src = products[prod3Index].imgSRC;

};
// pick three random/different products;
pickAndDrawImages();

var Vote = function (winningSpot, winnerName) {
  this.one = false;
  this.two = false;
  this.three = false;
  if (winningSpot === 'img-one') {
    this.one = true;
  } else if (winningSpot === 'img-two') {
    this.two = true;
  } else {
    this.three = true;
  }
  this.winnerName = winnerName;
  //every time a vote is created, the vote is pushed to the vote history.
  voteHistory.push(this);
};



