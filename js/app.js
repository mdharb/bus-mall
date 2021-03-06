'use strict';


let container = document.getElementById('allImages');
let firstImageElement = document.getElementById('firstImage');
let middleImageElement = document.getElementById('middleImage');
let finalImageElement = document.getElementById('finalImage');

let totalAttempts = 25;
let userCounter = 0;

let firstImageIndex;
let middleImageIndex;
let finalImageIndex;

let productNames = [];
let chartClick = [];
let chartShowTimes = [];


function Product(name, filePath) {

  this.name = name;
  this.filePath = filePath;
  this.clicks = 0;
  this.showTimes = 0;

  productNames.push(this.name);
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


let threeRandomImg = [];
// console.log('before',threeRandomImg);

function renderImages() {

  firstImageIndex = randomIndex();
  middleImageIndex = randomIndex();
  finalImageIndex = randomIndex();


  while (firstImageIndex === middleImageIndex || firstImageIndex === finalImageIndex || middleImageIndex === finalImageIndex || threeRandomImg.includes(firstImageIndex) || threeRandomImg.includes(middleImageIndex) || threeRandomImg.includes(finalImageIndex)) {

    firstImageIndex = randomIndex();
    middleImageIndex = randomIndex();
    finalImageIndex = randomIndex();

  }

  threeRandomImg = [firstImageIndex, middleImageIndex, finalImageIndex];
  // console.log('After',threeRandomImg);



  firstImageElement.src = Product.allProducts[firstImageIndex].filePath;
  Product.allProducts[firstImageIndex].showTimes++;

  middleImageElement.src = Product.allProducts[middleImageIndex].filePath;
  Product.allProducts[middleImageIndex].showTimes++;

  finalImageElement.src = Product.allProducts[finalImageIndex].filePath;
  Product.allProducts[finalImageIndex].showTimes++;

}
renderImages();


container.addEventListener('click', trackUserClick);
let button = document.getElementById('myBtn');

function trackUserClick(event) {

  userCounter++;

  if (userCounter <= totalAttempts) {

    if (event.target.id === 'firstImage') {
      Product.allProducts[firstImageIndex].clicks++;

    } else if (event.target.id === 'middleImage') {
      Product.allProducts[middleImageIndex].clicks++;

    } else if (event.target.id === 'finalImage') {
      Product.allProducts[finalImageIndex].clicks++;
    }
    else {
      alert('Click on the image please!');
      userCounter--;
    }
    renderImages();


  } else {

    button.hidden = false;
    button.addEventListener('click', showingList);


    container.removeEventListener('click', trackUserClick);

    for (let i = 0; i < Product.allProducts.length; i++) {

      chartClick.push(Product.allProducts[i].clicks);
      chartShowTimes.push(Product.allProducts[i].showTimes);

    }

  }

  productDataSet();
}


function showingList() {

  let productList = document.getElementById('results-list');

  for (let i = 0; i < Product.allProducts.length; i++) {

    let productResult = document.createElement('li');
    productList.append(productResult);

    productResult.textContent = `${Product.allProducts[i].name} had ${Product.allProducts[i].clicks} clicks, and was seen ${Product.allProducts[i].showTimes} times`;

  }

  // button.removeEventListener('click', showingList);
  button.hidden = true;

  dataChart();

}


function productDataSet() {

  let stringArr = JSON.stringify(Product.allProducts);
  localStorage.setItem('product', stringArr);

}


function productDataGet() {

  let data = localStorage.getItem('product');

  let originalArr = JSON.parse(data);

  if (originalArr !== null) {
    Product.allProducts = originalArr;
  }

}
productDataGet();



function dataChart() {

  let ctx = document.getElementById('myChart').getContext('2d');
  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: '# of clicks',
        data: chartClick,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      },

      {
        label: '# of views',
        data: chartShowTimes,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }
      ]
    },

    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

}
