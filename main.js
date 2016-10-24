/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
 
(function () {

  NUM_IMAGES_TO_DISPLAY = 16;

  var outros = [
    function (imageQueue, parentNode, doneCallback) {
      var imageIndex = 0;
      var images = [];

      imageQueue.forEach(function (container, index) {
        if (index < NUM_IMAGES_TO_DISPLAY) {
          var image = container.querySelector('.media');
          images.push(image);          
        }
      });

      function next() {
        images[imageIndex++].hidden = true;
        if (imageIndex < NUM_IMAGES_TO_DISPLAY) {
          setTimeout(next, 150)
        }
        else {
          doneCallback();
        }
      }

      next();
    },
    function (imageQueue, parentNode, doneCallback) {
      var imageIndex = 0;
      var images = [];

      var flipCount = 0;

      imageQueue.forEach(function (container, index) {
        if (index < NUM_IMAGES_TO_DISPLAY) {
          var image = container.querySelector('.media');
          images.push(image);          
        }
      });

      function next() {
        if (flipCount < 4) {
          images[imageIndex + flipCount].hidden = true;
        }
        else if (flipCount < 8) {
          images[imageIndex + 11 - flipCount].hidden = true
        }

        if (++flipCount === 8) {
          flipCount = 0;
          imageIndex += 8;
        }
        if (imageIndex < NUM_IMAGES_TO_DISPLAY) {
          setTimeout(next, 150)
        }
        else {
          doneCallback();
        }
      }

      next();
    }
  ];

  var intros = [
    function (imageQueue, parentNode, doneCallback) {
      var imageIndex = 0;
      var images = [];

      imageQueue.forEach(function (container, index) {
        if (index < NUM_IMAGES_TO_DISPLAY) {
          var image = container.querySelector('.media');
          image.hidden = true;
          parentNode.appendChild(container);
          images.push(image);
        }
      });

      function next() {
        images[imageIndex++].hidden = false;
        if (imageIndex < NUM_IMAGES_TO_DISPLAY) {
          setTimeout(next, 150)
        }
        else {
          doneCallback();
        }
      }

      next();
    },
    function (imageQueue, parentNode, doneCallback) {
      var imageIndex = 0;
      var images = [];

      var flipCount = 0;

      imageQueue.forEach(function (container, index) {
        if (index < NUM_IMAGES_TO_DISPLAY) {
          var image = container.querySelector('.media');
          image.hidden = true;
          parentNode.appendChild(container);
          images.push(image);
        }
      });

      function next() {
        if (flipCount < 4) {
          images[imageIndex + flipCount].hidden = false;
        }
        else if (flipCount < 8) {
          images[imageIndex + 11 - flipCount].hidden = false
        }

        if (++flipCount === 8) {
          flipCount = 0;
          imageIndex += 8;
        }
        if (imageIndex < NUM_IMAGES_TO_DISPLAY) {
          setTimeout(next, 150)
        }
        else {
          doneCallback();
        }
      }

      next();
    }
  ];
  
  document.addEventListener('DOMContentLoaded', function (e) {

    var imageParentNode = document.body;
    var imagePool = imageParentNode.querySelectorAll('.media-container');

    Array.prototype.forEach.call(imagePool, function (image) {
      imageParentNode.removeChild(image);
    });

    function getRandomizedImageQueue() {
      var chosenIndices = [];
      var randomizedImageQueue = [];

      while (randomizedImageQueue.length < imagePool.length) {
        var randomIndex = Math.floor(Math.random() * imagePool.length);
        if (!chosenIndices[randomIndex]) {
          chosenIndices[randomIndex] = true;
          randomizedImageQueue.push(imagePool[randomIndex]);
        }
      }

      return randomizedImageQueue;
    }

    function next() {
      var intro = intros[Math.floor(Math.random() * intros.length)];
      var outro = outros[Math.floor(Math.random() * outros.length)];

      var imageQueue = getRandomizedImageQueue();

      intro(imageQueue, imageParentNode, function (){
        setTimeout(function () {
          outro(imageQueue, imageParentNode, function () {
            imageQueue.forEach(function (image) {
              if (image.parentNode) {
                imageParentNode.removeChild(image);
              }
            });
            setTimeout(next, 500);
          });
        }, 2000);
      });
    }

    next();
    
  });

})();