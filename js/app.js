'use strict';


let firstImageElement = document.getElementById('firstImage');
let middleImageElement = document.getElementById('middleImage');
let finalImageElement = document.getElementById('finalImage');

let totalAttempts = 10;
let userCounter = 0;

let firstImageIndex;
let middleImageIndex;
let finalImageIndex;



function Product(name, filePath) {

  this.name = name;
  this.filePath = filePath;
  this.clicks = 0;

  Product.allProducts.push(this);

}


Product.allProducts = [];

new Product('Bag', 'img/bag.jpg');
new Product('Banana', 'img/banana.jpg');
new Product('Bathroom', 'img/bathroom.jpg');
new Product('Boots', 'img/boots.jpg');
new Product('Breakfast', 'img/breakfast.jpg');
new Product('Bubblegum', 'img/bubblegum.jpg');
new Product('Chair', 'img/chair.jpg');
new Product('Cthulhu', 'img/cthulhu.jpg');
new Product('Dog-Duck', 'img/dog-duck.jpg');
new Product('Dragon', 'img/cthulhu.jpg');
new Product('Pen', 'img/pen.jpg');
new Product('Pet-Sweep', 'img/pet-sweep.jpg');
new Product('Scissors', 'img/scissors.jpg');
new Product('Shark', 'img/shark.jpg');
new Product('Sweep', 'img/sweep.png');
new Product('Tauntaun', 'img/tauntaun.jpg');
new Product('Unicorn', 'img/unicorn.jpg');
new Product('USB', 'img/usb.gif');
new Product('Water-Can', 'img/water-can.jpg');
new Product('Water-Glass', 'img/wine-glass.jpg');


function randomIndex() {

  return Math.floor(Math.random() * Product.allProducts.length);
}


function renderImages() {

  firstImageIndex = randomIndex();
  middleImageIndex = randomIndex();
  finalImageIndex = randomIndex();



  while (firstImageIndex === middleImageIndex || firstImageIndex === finalImageIndex || middleImageIndex === finalImageIndex) {
    firstImageIndex = randomIndex();
    middleImageIndex = randomIndex();
    finalImageIndex = randomIndex();

  }


  firstImageElement.src = Product.allProducts[firstImageIndex].filePath;
  middleImageElement.src = Product.allProducts[middleImageIndex].filePath;
  finalImageElement.src = Product.allProducts[finalImageIndex].filePath;

}


renderImages();


firstImageElement.addEventListener('click', trackUserClick);
middleImageElement.addEventListener('click', trackUserClick);
finalImageElement.addEventListener('click', trackUserClick);

function trackUserClick(event) {

  // console.log(event.target.id);

  userCounter++;

  if (userCounter <= totalAttempts) {

    if (event.target.id === 'firstImage') {
      Product.allProducts[firstImageIndex].clicks++;

    } else if (event.target.id === 'middleImage') {
      Product.allProducts[middleImageIndex].clicks++;

    } else {
      Product.allProducts[finalImageIndex].clicks++;
    }

    renderImages();

  } else {


    let productList = document.getElementById('results-list');

    for (let i = 0; i < Product.allProducts.length; i++) {
      let productResult = document.createElement('li');

      productList.append(productResult);

      productResult.textContent = `${Product.allProducts[i].name} has ${Product.allProducts[i].clicks} clicks`;

    }

    firstImageElement.removeEventListener('click', trackUserClick);
    middleImageElement.removeEventListener('click', trackUserClick);
    finalImageElement.removeEventListener('click', trackUserClick);

  }

}
