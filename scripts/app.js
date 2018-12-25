(function() {
  'use strict';

  var app = {
    isLoading: true,
    visibleCards: {},
    spinner: document.querySelector('.loader'),
    cardTemplate: document.querySelector('.cardTemplate'),
    container: document.querySelector('.main'),
    offLineMsg: document.querySelector('#offline-msg')
  };

  app.updateForecastCard = function(data) {
    
    var card = app.visibleCards[data.key];
    data.forEach(item => {
      card = app.cardTemplate.cloneNode(true);
      card.classList.remove('cardTemplate');
      card.querySelector('#card-title').textContent = item.name;
      card.querySelector('#card-time').textContent = item.time;
      card.querySelector('.status').textContent = item.status;
      card.removeAttribute('hidden');
      app.container.appendChild(card);
      app.visibleCards[data.key] = card;
    });
    if (app.isLoading) {
      app.spinner.setAttribute('hidden', true);
      app.container.removeAttribute('hidden');
      app.isLoading = false;
    }
  };
  var initialWeatherForecast = [
    {
      name: "Maltas to Amsterdam",
      time: '08:45',
      status: 'on time'
    },
    {
      name: "Maltas to London",
      time: '09:45',
      status: 'delayed'
    },
    {
      name: "Maltas to Poznan",
      time: '10:45',
      status: 'on time'
    },
    {
      name: "Maltas to London",
      time: '11:05',
      status: 'on time'
    },
    {
      name: "Maltas to Bangalore",
      time: '12:45',
      status: 'on time'
    },
    {
      name: "Maltas to Delhi",
      time: '08:45',
      status: 'delayed'
    }
  ];
  app.updateForecastCard(initialWeatherForecast);
  if('serviceWorker' in navigator) {
    navigator.serviceWorker
    .register('../service-worker.js')
    .then(() => console.log('service worker registered'));
  }
 if(!navigator.onLine) {
  app.offLineMsg.textContent = 'please check your internet connection settings';
  app.offLineMsg.style.display = 'block';
  app.container.style.padding = '130px 0 0 0';
 }
})();
