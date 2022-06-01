import { formTemplate } from './templates';
import './index.html';
let ymaps;

const reviews = JSON.parse(localStorage.getItem('reviewsBox')) || [];

document.addEventListener('DOMContentLoaded', () => {
  // eslint-disable-line no-undef
  ymaps.ready(init);

  function init() {
    const myMap = new ymaps.Map('map', {
      center: [56.010566, 92.852571],
      zoom: 12,
    });

    reviews.forEach((element) => {
      addCluster(myMap, element.coords, true);
    });

    myMap.events.add('click', function (e) {
      const coords = e.get('coords');
      openBalloon(myMap, coords);
    });
  }
});

function getOptionsCluster(coords) {
  const clusterObjects = [];

  for (const review of reviews) {
    if (JSON.stringify(review.coords) === JSON.stringify(coords)) {
      //сравниваем координаты отзывов
      const geoObj = new ymaps.GeoObject({
        geometry: { type: 'Point', coordinates: coords },
      });
      clusterObjects.push(geoObj);
    }
  }

  return clusterObjects;
}

function getExistingOptionsCluster() {
  return reviews.map((review) => {
    return new ymaps.GeoObject({
      geometry: { type: 'Point', coordinates: review.coords },
    });
  });
}

function addCluster(map, coords, isExisting = false) {
  const clusterer = new ymaps.Clusterer({ clusterDisableClickZoom: true });
  clusterer.options.set('hasBalloon', false);

  function addToCluster() {
    const myGeoObjects = isExisting
      ? getExistingOptionsCluster()
      : getOptionsCluster(coords);

    clusterer.add(myGeoObjects); //генерируем точки
    map.geoObjects.add(clusterer); // ставим на карту
    map.balloon.close();
  }

  // console.log('1', coords);

  clusterer.events.add('click', function (e) {
    e.preventDefault();
    openBalloon(map, coords, clusterer, addToCluster);
  });

  addToCluster();
}

// function storageCluster(){

//     for (const iterator of localReviews) {
//         let localBoxReviews = localStorage.getItem('reviewsBox');
//         let localParsReviews = JSON.parse(localBoxReviews);

//     }
// }

function getReviewList(coords) {
  let reviewListHTML = '';

  for (const review of reviews) {
    if (JSON.stringify(review.coords) === JSON.stringify(coords)) {
      reviewListHTML += `
                <div class="review">
                    <div class="line">
                        <div><strong>${review.author}</strong></div>
                        <div>${review.place}</div>
                    </div>
                    <div class="line">
                        <div>${review.reviewText}</div>
                    </div>
                </div>
            `;
    }
  }
  return reviewListHTML;
}

async function openBalloon(map, coords, clusterer, fn) {
  const review = reviews.find((review) => review.coords === coords) || {};
  const localCoords = review.coords || coords;
  console.log(clusterer);
  await map.balloon.open(localCoords, {
    content: `<div class="reviews">${getReviewList(coords)}</div>${formTemplate(review)}`,
  });

  document.querySelector('#add-form').addEventListener('submit', function (e) {
    e.preventDefault();

    if (clusterer) {
      clusterer.removeAll();
    }

    reviews.push({
      coords: coords,
      author: this.elements.author.value,
      place: this.elements.place.value,
      reviewText: this.elements.review.value,
    });

    localStorage.setItem('reviewsBox', JSON.stringify(reviews));

    !fn ? addCluster(map, coords) : fn();
    map.balloon.close();
  });
}

// function setLocalStorage(){
//    localStorage.setItem('reviewsBox', JSON.stringify(reviews));
// }

// function getLocalStorage(){
//     localReviews.push(localStorage.getItem('reviewsBox'));
//     localStorage.getItem('reviewsBox')
// }
