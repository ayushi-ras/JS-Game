window.addEventListener('load', function () {
  let finalscore = 0;
  // Winning animation
  function makeItConfetti(){
    var confettiPlayers = [];
    var confetti = document.querySelectorAll('.confetti');
    
    if (!confetti[0].animate) {
      return false;
    }

    for (var i = 0, len = confetti.length; i < len; ++i) {
      var candycorn = confetti[i];
      candycorn.innerHTML = '<div class="rotate"><div class="askew"></div></div>';
      var scale = Math.random() * .7 + .3;
      var player = candycorn.animate([
        { transform: `translate3d(${(i/len*100)}vw,-5vh,0) scale(${scale}) rotate(0turn)`, opacity: scale },
        { transform: `translate3d(${(i/len*100 + 10)}vw,105vh,0) scale(${scale}) rotate(${ Math.random() > .5 ? '' : '-'}2turn)`, opacity: 1 }
      ], {
        duration: Math.random() * 3000 + 5000,
        iterations: Infinity,
        delay: -(Math.random() * 7000)
      });
      
      confettiPlayers.push(player);
    }
  }
  let ifdone = false;
  // all functions after winning
  function make(score){
    if(!ifdone){
      finalscore = score;

      document.querySelector("#win").style.visibility = "visible";
      makeItConfetti()
      document.querySelector(".fscore").innerHTML = `Your Final Score is : ${score}`;

      navigator.clipboard.writeText(score);

      const link = encodeURI(window.location.href);
      const msg = encodeURIComponent(`Hey, my final score is: ${finalscore}`);

      const fb = document.querySelector('#fb');
      fb.href = `https://www.facebook.com/share.php?u=${link}`;

      const twitter = document.querySelector('#xt');
      twitter.href = `http://twitter.com/share?&url=${link}&text=${msg}&hashtags=javascript_game`;

      const linkedIn = document.querySelector('#in');
      linkedIn.href = `https://www.linkedin.com/`;
      
      const instagram = document.querySelector('#insta');
      instagram.href = `https://www.instagram.com`;

      ifdone = true;
    }
  }
  //canvas setup
  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');
  canvas.width = 500;
  canvas.height = 500;

  // JavaScript to toggle the Instructions Modal
  const instructionsButton = document.getElementById('instructions-button');
  const instructionsModal = document.getElementById('instructions-modal');
  const closeButton = document.querySelector('.close-button');

  instructionsButton.addEventListener('click', () => {
    instructionsModal.style.display = 'block';
  });

  closeButton.addEventListener('click', () => {
    instructionsModal.style.display = 'none';
  });

  // Prevent clicks outside of the modal from closing it
  instructionsModal.addEventListener('click', (event) => {
    if (event.target === instructionsModal) {
      event.stopPropagation(); // Stop the event propagation
    }
  });

  window.addEventListener('click', (event) => {
    if (event.target === instructionsModal) {
      instructionsModal.style.display = 'none';
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !game.gameStart) {
      // Check if Spacebar is pressed and the game is not already started
      game.gameStart = true; // Set gameStart to true to start the game
    }
  });

  // Get the social sharing modal and close button elements
  const socialSharingModal = document.getElementById('socialSharingModal');
  const socialShareButton = document.getElementById('share-button');
  const closeSocialModal = document.getElementById('closeSocialModal');

  // Open the social sharing modal when the share button is clicked
  socialShareButton.addEventListener('click', function () {
    socialSharingModal.style.display = 'block';
  });

  // Close the social sharing modal when the close button (×) is clicked
  closeSocialModal.addEventListener('click', function () {
    socialSharingModal.style.display = 'none';
  });

  // Function to share on Instagram
  document
    .getElementById('instagram-share')
    .addEventListener('click', function () {
      const shareUrl = 'https://www.instagram.com/';
      window.open(shareUrl, '_blank', 'width=600,height=400');
    });

  // Function to share on LinkedIn
  document
    .getElementById('linkedin-share')
    .addEventListener('click', function () {
      const shareUrl =
        'https://www.linkedin.com/shareArticle?url=' +
        encodeURIComponent(window.location.href);
      window.open(shareUrl, '_blank', 'width=600,height=400');
    });

  // Close the social sharing modal if the user clicks outside of it
  window.addEventListener('click', function (event) {
    if (event.target === socialSharingModal) {
      socialSharingModal.style.display = 'none';
    }
  });

  // Function to share on Facebook
  document
    .getElementById('facebook-share')
    .addEventListener('click', function () {
      const shareUrl =
        'https://www.facebook.com/sharer/sharer.php?u=' +
        encodeURIComponent(window.location.href);
      window.open(shareUrl, '_blank', 'width=600,height=400');
    });

  // Function to share on Twitter
  document
    .getElementById('twitter-share')
    .addEventListener('click', function () {
      const shareUrl =
        'https://twitter.com/intent/tweet?url=' +
        encodeURIComponent(window.location.href);
      window.open(shareUrl, '_blank', 'width=600,height=400');
    });

  // Function to toggle fullscreen mode
  function toggleFullscreen() {
    const canvas = document.getElementById('canvas1');

    if (!document.fullscreenElement) {
      canvas
        .requestFullscreen()
        .then(() => {
          // Adjust canvas size after entering fullscreen
          canvas.width = 900;
        })
        .catch((err) => {
          console.error('Error attempting to enable fullscreen:', err);
        });
    } else {
      document.exitFullscreen();
    }
  }

  // Listen for fullscreen change event
  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
      // Adjust canvas size after exiting fullscreen
      const canvas = document.getElementById('canvas1');
      canvas.width = 500;
      canvas.height = 500;
    }
  });

  // Add a click event listener to the fullscreen button
  const fullscreenButton = document.getElementById('fullscreen-button');
  fullscreenButton.addEventListener('click', toggleFullscreen);

  class InputHandler {
    constructor(game) {
      this.game = game;
      window.addEventListener('keydown', (e) => {
        if (
          (e.key === 'ArrowUp' || e.key === 'ArrowDown') &&
          this.game.keys.indexOf(e.key) === -1
        ) {
          this.game.keys.push(e.key);
        } else if (e.key === ' ') {
          this.game.player.shootTop();
        } else if (e.key === 'd') {
          this.game.debug = !this.game.debug;
        }
      });
      window.addEventListener('keyup', (e) => {
        if (this.game.keys.indexOf(e.key) > -1) {
          this.game.keys.splice(this.game.keys.indexOf(e.key), 1);
        }
      });
    }
  }
  class Projectile {
    constructor(game, x, y) {
      this.game = game;
      this.x = x;
      this.y = y;
      this.width = 10;
      this.height = 3;
      this.speed = 3;
      this.markedForDeletion = false;
      this.image = document.getElementById('projectile');
    }
    update() {
      this.x += this.speed;
      if (this.x > this.game.width * 0.8) this.markedForDeletion = true;
    }
    draw(context) {
      context.drawImage(this.image, this.x, this.y);
    }
  }
  class Particle {
    constructor(game, x, y) {
      this.game = game;
      this.x = x;
      this.y = y;
      this.image = document.getElementById('gears');
      this.frameX = Math.floor(Math.random() * 3);
      this.frameY = Math.floor(Math.random() * 3);
      this.spriteSize = 50;
      this.sizeModifier = (Math.random() * 0.5 + 0.5).toFixed(1);
      this.size = this.spriteSize * this.sizeModifier;
      this.speedX = Math.random() * 6 - 3;
      this.speedY = Math.random() * -15;
      this.gravity = 0.5;
      this.markedForDeletion = false;
      this.angle = 0;
      this.va = Math.random() * 0.2 - 0.1;
      this.bounced = false;
      this.bottomBounceBoundary = 100;
      this.bottomBounceBoundary = Math.random() * 80 + 60;
    }
    update() {
      this.angle += this.va;
      this.speedY += this.gravity;
      this.x -= this.speedX + this.game.speed;
      this.y += this.speedY;
      if (this.y > this.game.height + this.size || this.x < 0 - this.size)
        this.markedForDeletion = true;
      if (
        this.y > this.game.height - this.bottomBounceBoundary &&
        this.bounced < 5
      ) {
        this.bounced++;
        this.speedY *= -0.7;
      }
    }
    draw(context) {
      context.save();
      context.translate(this.x, this.y);
      context.rotate(this.angle);
      context.drawImage(
        this.image,
        this.frameX * this.spriteSize,
        this.frameY * this.spriteSize,
        this.spriteSize,
        this.spriteSize,
        this.size * -0.5,
        this.size * -0.5,
        this.size,
        this.size
      );
      context.restore();
    }
  }
  class Player {
    constructor(game) {
      this.game = game;
      this.width = 120;
      this.height = 190;
      this.x = 20;
      this.y = 100;
      this.frameX = 0;
      this.frameY = 0;
      this.maxFrame = 37;
      this.speedy = 0;
      this.maxSpeed = 3;
      this.projectiles = [];
      this.image = document.getElementById('player');
      this.powerUp = false;
      this.powerUpTimer = 0;
      this.powerUpLimit = 10000;
    }
    update(deltaTime) {
      if (this.game.keys.includes('ArrowUp')) this.speedy = -this.maxSpeed;
      else if (this.game.keys.includes('ArrowDown'))
        this.speedy = this.maxSpeed;
      else this.speedy = 0;
      this.y += this.speedy;
      //vertical Boundaries
      if (this.y > this.game.height - this.height * 0.5)
        this.y = this.game.height - this.height * 0.5;
      else if (this.y < -this.height * 0.5) this.y = -this.height * 0.5;
      //handle projectiles
      this.projectiles.forEach((projectile) => {
        projectile.update();
      });
      this.projectiles = this.projectiles.filter(
        (projectile) => !projectile.markedForDeletion
      );
      // sprite animation
      if (this.frameX < this.maxFrame) {
        this.frameX++;
      } else {
        this.frameX = 0;
      }
      //power up
      if (this.powerUp) {
        if (this.powerUpTimer > this.powerUpLimit) {
          this.powerUpTimer = 0;
          this.powerUp = false;
          this.frameY = 0;
        } else {
          this.powerUpTimer += deltaTime;
          this.frameY = 1;
          this.game.anmo += 0.1;
        }
      }
    }
    draw(context) {
      if (this.game.debug)
        context.strokeRect(this.x, this.y, this.width, this.height);
      this.projectiles.forEach((projectile) => {
        projectile.draw(context);
      });
      context.drawImage(
        this.image,
        this.frameX * this.width,
        this.frameY * this.height,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
    shootTop() {
      if (this.game.anmo > 0) {
        this.projectiles.push(
          new Projectile(this.game, this.x + 80, this.y + 30)
        );
        this.game.anmo--;
      }
      if (this.powerUp) this.shootBottom();
    }
    shootBottom() {
      if (this.game.anmo > 0) {
        this.projectiles.push(
          new Projectile(this.game, this.x + 80, this.y + 175)
        );
      }
    }
    enterPowerUp() {
      this.powerUpTimer = 0;
      this.powerUp = true;
      if (this.game.anmo < this.game.maxAnmo)
        this.game.anmo = this.game.maxAnmo;
    }
  }
  class Enemy {
    constructor(game) {
      this.game = game;
      this.x = this.game.width;
      this.speedX = Math.random() * -1.5 - 0.5;
      this.markedForDeletion = false;

      this.frameX = 0;
      this.frameY = 0;
      this.maxFrame = 37;
    }
    update() {
      this.x += this.speedX - this.game.speed;
      if (this.x + this.width < 0) this.markedForDeletion = true;
      //sprite animation
      if (this.frameX < this.maxFrame) {
        this.frameX++;
      } else this.frameX = 0;
    }
    draw(context) {
      if (this.game.debug)
        context.strokeRect(this.x, this.y, this.width, this.height);
      context.drawImage(
        this.image,
        this.frameX * this.width,
        this.frameY * this.height,
        this.width,
        this.height,
        this.x,
        this.y,
        this.height,
        this.width
      );
      if (this.game.debug) {
        context.font = '20px Bangers';
        context.fillText(this.lives, this.x, this.y);
      }
    }
  }
  class Angler1 extends Enemy {
    constructor(game) {
      super(game);
      this.width = 228;
      this.height = 169;
      this.y = Math.random() * (this.game.height * 0.95 - this.height);
      this.image = document.getElementById('angler1');
      this.frameY = Math.floor(Math.random() * 3);
      this.lives = 2;
      this.score = this.lives;
    }
  }
  class Angler2 extends Enemy {
    constructor(game) {
      super(game);
      this.width = 213;
      this.height = 165;
      this.y = Math.random() * (this.game.height * 0.95 - this.height);
      this.image = document.getElementById('angler2');
      this.frameY = Math.floor(Math.random() * 2);
      this.lives = 3;
      this.score = this.lives;
    }
  }
  class LuckyFish extends Enemy {
    constructor(game) {
      super(game);
      this.width = 99;
      this.height = 95;
      this.y = Math.random() * (this.game.height * 0.95 - this.height);
      this.image = document.getElementById('lucky');
      this.frameY = Math.floor(Math.random() * 2);
      this.lives = 3;
      this.score = 15;
      this.type = 'lucky';
    }
  }
  class HiveWhale extends Enemy {
    constructor(game) {
      super(game);
      this.width = 400;
      this.height = 227;
      this.y = Math.random() * (this.game.height * 0.95 - this.height);
      this.image = document.getElementById('hivewhale');
      this.frameY = 0;
      this.lives = 15;
      this.score = this.lives;
      this.type = 'hive';
      this.speedX = Math.random() * -1.2 - 0.2;
    }
  }
  class Drone extends Enemy {
    constructor(game, x, y) {
      super(game);
      this.width = 115;
      this.height = 95;
      this.x = x;
      this.y = y;
      this.image = document.getElementById('drone');
      this.frameY = Math.floor(Math.random() * 2);
      this.lives = 3;
      this.score = this.lives;
      this.type = 'drone';
      this.speedX = Math.random() * -4.2 - 0.5;
    }
  }
  class Layer {
    constructor(game, image, speedModifier) {
      this.game = game;
      this.image = image;
      this.speedModifier = speedModifier;
      this.width = 1768;
      this.height = 500;
      this.x = 0;
      this.y = 0;
    }
    update() {
      if (this.x <= -this.width) this.x = 0;
      this.x -= this.game.speed * this.speedModifier;
    }
    draw(context) {
      context.drawImage(this.image, this.x, this.y);
      context.drawImage(this.image, this.x + this.width, this.y);
    }
  }
  class Background {
    constructor(game) {
      this.game = game;
      this.image1 = document.getElementById('layer1');
      this.image2 = document.getElementById('layer2');
      this.image3 = document.getElementById('layer3');
      this.image4 = document.getElementById('layer4');
      this.layer1 = new Layer(this.game, this.image1, 0.2);
      this.layer2 = new Layer(this.game, this.image2, 0.4);
      this.layer3 = new Layer(this.game, this.image3, 1);
      this.layer4 = new Layer(this.game, this.image4, 1.5);
      this.layers = [this.layer1, this.layer2, this.layer3];
    }
    update() {
      this.layers.forEach((layer) => layer.update());
    }
    draw(context) {
      this.layers.forEach((layer) => layer.draw(context));
    }
  }
  class UI {
    constructor(game) {
      this.game = game;
      this.fontSize = 25;
      this.fontFamily = 'Bangers';
      this.color = 'white';
    }
    drawPauseIndicator(context) {
      if (this.game.paused) {
        if (document.getElementById('canvas1').width === 900) {
          this.game.width = 900;
        } else {
          this.game.width = 500;
        }
        // This code block will execute when the game is paused
        context.fillStyle = 'rgba(0, 0, 0, 0.1)';
        context.fillRect(0, 0, this.game.width, this.game.height);
        context.fillStyle = 'white';
        context.font = '10px sans-serif';
        context.fillText(
          'PAUSED',
          this.game.width / 2 - 24,
          this.game.height / 2
        );
      }
    }
    draw(context) {
      if (document.getElementById('canvas1').width === 900) {
        this.game.width = 900;
      } else {
        this.game.width = 500;
      }
      console.log(this.fontSize);
      context.fillStyle = this.color;
      context.shadowOffsetX = 2;
      context.shadowOffsetY = 2;
      context.shadowColor = 'black';
      context.font = this.fontSize + 'px' + this.fontFamily;
      //score
      context.fillText('Score: ' + this.game.score, 20, 40);

      //timer
      const formattedTime = (this.game.gameTime * 0.001).toFixed(1);
      context.fillText('Timer: ' + formattedTime, 20, 100);
      //game over messages
      if (this.game.gameOver) {
        context.textAlign = 'center';
        let message1;
        let message2;
        if (this.game.score > this.game.winningScore) {
          message1 = 'Most Wondrous!';
          message2 = 'Well done explorer!';
          make(this.game.score);
        } else {
          message1 = 'Blazes';
          message2 = 'Get my repair kit and Try Again!';
        }
        context.font = '70px ' + this.fontFamily;
        context.fillText(
          message1,
          this.game.width * 0.5,
          this.game.height * 0.5 - 20
        );
        context.font = '25px ' + this.fontFamily;
        context.fillText(
          message2,
          this.game.width * 0.5,
          this.game.height * 0.5 + 20
        );
      }
      //anmo
      if (this.game.player.powerUp) context.fillStyle = '#ffffbd';
      for (let i = 0; i < this.game.anmo; i++) {
        context.fillRect(20 + 5 * i, 50, 3, 20);
      }
      this.drawPauseIndicator(context);
      context.restore();
    }
  }
  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.background = new Background(this);
      this.player = new Player(this);
      this.input = new InputHandler(this);
      this.ui = new UI(this);
      this.keys = [];
      this.enemies = [];
      this.particles = [];
      this.enemyTimer = 0;
      this.enemyInterval = 1000;
      this.anmo = 20;
      this.maxAnmo = 50;
      this.anmoTimer = 0;
      this.anmoInterval = 500;
      this.gameStart = false;
      this.gameOver = false;
      this.score = 0;
      this.winningScore = 10;
      this.gameTime = 0;
      this.timeLimit = 15000;
      this.speed = 1;
      this.debug = false;
      this.paused = false;
      this.pauseKey = 'p';
      window.addEventListener('keydown', (e) => {
        if (e.key === this.pauseKey) {
          this.togglePause();
        }
      });
    }
    togglePause() {
      this.paused = !this.paused;
    }
    update(deltaTime) {
      if (!this.gameOver) this.gameTime += deltaTime;
      if (this.gameTime > this.timeLimit) this.gameOver = true;
      this.background.update();
      this.background.layer4.update();
      this.player.update(deltaTime);
      if (this.anmoTimer > this.anmoInterval) {
        if (this.anmo < this.maxAnmo) this.anmo++;
        this.anmoTimer = 0;
      } else {
        this.anmoTimer += deltaTime;
      }
      this.particles.forEach((particle) => particle.update());
      this.particles = this.particles.filter(
        (particle) => !particle.markedForDeletion
      );
      this.enemies.forEach((enemy) => {
        enemy.update();
        if (this.checkCollision(this.player, enemy)) {
          enemy.markedForDeletion = true;
          for (let i = 0; i < enemy.score; i++) {
            this.particles.push(
              new Particle(
                this,
                enemy.x + enemy.width * 0.5,
                enemy.y + enemy.height * 0.5
              )
            );
          }
          if (enemy.type === 'lucky') this.player.enterPowerUp();
          else this.score--;
        }
        this.player.projectiles.forEach((projectile) => {
          if (this.checkCollision(projectile, enemy)) {
            enemy.lives--;
            projectile.markedForDeletion = true;
            this.particles.push(
              new Particle(
                this,
                enemy.x + enemy.width * 0.5,
                enemy.y + enemy.height * 0.5
              )
            );
            if (enemy.lives <= 0) {
              for (let i = 0; i < enemy.score; i++) {
                this.particles.push(
                  new Particle(
                    this,
                    enemy.x + enemy.width * 0.5,
                    enemy.y + enemy.height * 0.5
                  )
                );
              }
              enemy.markedForDeletion = true;
              if (enemy.type === 'hive') {
                for (let i = 0; i < 5; i++) {
                  this.enemies.push(
                    new Drone(
                      this,
                      enemy.x + Math.random() * enemy.width,
                      enemy.y + Math.random() * enemy.height * 0.5
                    )
                  );
                }
              }
              if (!this.gameOver) this.score += enemy.score;
              if (this.score > this.winningScore) this.gameOver = true;
            }
          }
        });
      });
      this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);
      if (this.enemyTimer > this.enemyInterval && !this.gameOver) {
        this.addEnemy();
        this.enemyTimer = 0;
      } else {
        this.enemyTimer += deltaTime;
      }
    }
    draw(context) {
      this.background.draw(context);
      this.ui.draw(context);
      this.player.draw(context);
      this.particles.forEach((particle) => particle.draw(context));
      this.enemies.forEach((enemy) => {
        enemy.draw(context);
      });
      this.background.layer4.draw(context);
    }
    addEnemy() {
      const randomize = Math.random();
      if (randomize < 0.3) this.enemies.push(new Angler1(this));
      else if (randomize < 0.6) this.enemies.push(new Angler2(this));
      else if (randomize < 0.8) this.enemies.push(new HiveWhale(this));
      else this.enemies.push(new LuckyFish(this));
    }
    checkCollision(rect1, rect2) {
      return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.height + rect1.y > rect2.y
      );
    }
  }
  const game = new Game(canvas.width, canvas.height);
  let lastTime = 0;
  //animation loop
  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the game layers first
    game.background.draw(ctx);

    // Dark overlay
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'; // Dark semi-transparent black
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    game.ui.drawPauseIndicator(ctx);

    if (game.gameStart && !game.paused) {
      ctx.font = '10px sans-serif';
      game.update(deltaTime);
      game.draw(ctx);
    } else {
      // If the game is not started or is paused, you can display a "Start" message or wait for an event to start the game.
      if (!game.gameStart) {
        ctx.fillStyle = 'white';
        ctx.font = '50px Bangers';
        ctx.fillText(
          'Press Enter to start',
          canvas.width / 2 - 190,
          canvas.height / 2 + 20
        );
      }
    }

    requestAnimationFrame(animate);
  }

  animate(0);
});
