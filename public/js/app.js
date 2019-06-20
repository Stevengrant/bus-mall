'use strict';
var voteCount = localStorage.getItem('voteCount');
var showResAfter = 25;
var products = getInfo('products') ? getInfo('products') : [] ;
var voteHistory = getInfo('voteHistory') ? getInfo('voteHistory') : [] ;
var availableToDisplay = products, displayThese = [], iceThese = [];
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
  if (winningSpot === 'img-0') {
    this.one = true;
  } else if (winningSpot === 'img-two') {
    this.two = true;
  } else {
    this.three = true;
  }

  this.winnerName = winnerName;
  //every time a vote is created, the vote is pushed to the vote history.
  voteCount++;
  localStorage.setItem('voteCount',voteCount);
  voteHistory.push(this);
  updateVoteHistory('voteHistory', this);
};
function updateVoteHistory(key, data) {
  let a = JSON.parse(localStorage.getItem(key));
  let b = a? a : [];
  b.push(data);
  localStorage.setItem(key, JSON.stringify(b));
}
function getInfo(key) {
  return JSON.parse(localStorage.getItem(key));
}
var imageTable = document.getElementById('image-table');
imageTable.addEventListener('click', (event) => {
  let eID = event.target.id;
  if (eID === '0' || eID === '1' || eID === '2') {
    let winnerIndex = findProductIndex(products, event.target.attributes.name.value);
    let winningProd = products[winnerIndex];
    winningProd.votes++;
    winningProd.productPower = winningProd.votes / winningProd.timesShown;

    new Vote(eID, event.target.attributes.name.value);
    pickAndDrawImages();
    if (voteCount > showResAfter) {
      drawChart(voteHistory);
    }
  }
});
function shapeVoteHistoryData(voteHistory, productNames) {
  let res = [];

  for (let prodNameIndex = 0; prodNameIndex < productNames.length; prodNameIndex++) {
    res.push(0);
    for (let vHI = 0; vHI < voteHistory.length; vHI++) {
      let prodNameA = productNames[prodNameIndex];
      let prodNameB = voteHistory[vHI].winnerName;
      let indexOfprod = prodNameA.indexOf(prodNameB);
      if (indexOfprod > -1) {
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
  products.forEach(e => {
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
function findProductIndex(products, name) {
  let res = -0;
  for (let i = 0; i < products.length; i++) {
    if (products[i].name === name) {
      res = i;
      break;
    }
  }
  return res;
}
function generateProducsArray() {
  for (let i = 0; i < productNames.length; i++) {
    products.push(new Product(productNames[i].split('.')[0], `./public/img/${productNames[i]}`));
    localStorage.setItem('products', JSON.stringify(products));
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
  let combinedArray = availableToDisplay.concat(iceThese);
  availableToDisplay = combinedArray;
  iceThese = [];
  iceThese = displayThese;
  displayThese = [];

  for (let i = 0; i < 3; i++) {
    let rndmNmb = rollRandom(0, availableToDisplay.length - 1);
    products[rndmNmb].timesShown++;
    let holder = availableToDisplay.splice(rndmNmb, 1);
    displayThese.push(holder[0]);
  }
  for (let i = 0; i < displayThese.length; i++) {
    let imgContainer = document.getElementById(`img-${i}`);
    imgContainer.innerHTML = '';
    let imgEl = document.createElement('img');
    imgEl.src = displayThese[i].imgSRC;
    imgEl.id = i;
    imgEl.setAttribute('name', displayThese[i].name);
    let imgTitle = document.createElement('h3');
    imgTitle.innerText = displayThese[i].name;
    imgContainer.appendChild(imgTitle);
    imgContainer.appendChild(imgEl);
  }
  localStorage.setItem('products', JSON.stringify(products));

};
// pick three random/different products;
pickAndDrawImages();

if (voteCount > showResAfter){
  console.log(voteHistory);
  drawChart(voteHistory);
}

