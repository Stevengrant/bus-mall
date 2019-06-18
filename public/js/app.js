'use strict';
var voteCount = 0;
var showResAfter = 10;
var products=[];
var voteHistory = [];

//Constructors
var Product = function (name, imgSRC) {
  this.name = name;
  this.imgSRC = imgSRC;
  this.votes = 0;
  this.timesShown = 0;
  this.productPower = 0;
};
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
  voteCount++;
  voteHistory.push(this);
};

document.getElementById('image-table').addEventListener('click', (event) => {
  let eID = event.target.id;
  if (eID === '0' || eID === '1' || eID === '2') {
    let winnerIndex= findProductIndex(products,event.target.attributes.name.value);
    let winningProd = products[winnerIndex];
    winningProd.votes++;
    winningProd.productPower = winningProd.votes/winningProd.timesShown;
    // products[winnerIndex].productPower = votesA/products[winnerIndex].timesShown;

    new Vote(eID, event.target.attributes.name);
    pickAndDrawImages();
    if (voteCount > showResAfter) {
      drawChart(voteHistory);
    }
  }
});
function shapeVoteHistoryData(voteHistory, productNames) {
  let res = [];

  for (let prodNameIndex = 0; prodNameIndex<productNames.length; prodNameIndex++){
    res.push(0);
    for (let vHI= 0; vHI <voteHistory.length; vHI++){
      let bar = productNames[prodNameIndex];
      let bazz= voteHistory[vHI].winnerName.textContent;
      let foo = bar.indexOf(bazz);
      if(foo>-1){
        res[prodNameIndex]++;
      }
    }
  }
  return res;
}
function drawChart(voteHistory) {
  let voteData = shapeVoteHistoryData(voteHistory, productNames);
  // Yoink => https://www.chartjs.org/docs/latest/
  let ctx = document.getElementById('myChart').getContext('2d');
  // eslint-disable-next-line no-undef
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: '# of Votes',
        data: voteData,
        borderWidth: 5
      }]
    },
    options: {
    }
  });

  let productPower = [];
  products.forEach( e => {
    productPower.push(e.productPower * 42);
  });

  let productPowerElem = document.getElementById('productPower').getContext('2d');
  // eslint-disable-next-line no-undef
  new Chart(productPowerElem, {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: 'Product Power',
        data: productPower,
        borderWidth: 5
      }]
    },
    options: {
    }
  });
}

//Setup to create elements:
let productNames = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'
];
function findProductIndex(products, name){
  let res = -0;
  for(let i = 0; i < products.length; i++){
    if(products[i].name === name){
      res = i;
      break;
    }
  }
  return res;
}
function generateProducsArray (){
  for (let i = 0; i < productNames.length; i++) {
    products.push(new Product(productNames[i].split('.')[0], `./public/img/${productNames[i]}`));
  }
}
generateProducsArray();
//Create the products Array.
var pickAndDrawImages = () => {
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
  //After we've picked products, update products array objects shown prop.
  products[prod1Index].timesShown++;
  products[prod2Index].timesShown++;
  products[prod3Index].timesShown++;
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
  imgOne.id = '0';
  imgOne.setAttribute('name', products[prod1Index].name);

  let imgTwo = document.createElement('img');
  imgTwo.src = products[prod2Index].imgSRC;
  imgTwo.id = '1';
  imgTwo.setAttribute('name', products[prod2Index].name);

  let imgThree = document.createElement('img');
  imgThree.src = products[prod3Index].imgSRC;
  imgThree.id = '2';
  imgThree.setAttribute('name', products[prod3Index].name);

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
console.log(findProductIndex(products, 'boots'));

