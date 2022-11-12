window.addEventListener('load', function () {
    //canvas setup
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 500;

    class InputHandler {
        constructor(game) {
            this.game = game;
            window.addEventListener('keydown', e => {
                if ((  (e.key === 'ArrowUp')|| 
                       (e.key === 'ArrowDown')
                
                )&& this.game.keys.indexOf(e.key) === -1){
                    this.game.keys.push(e.key);
                }
                console.log(this.game.keys);

            });
            window.addEventListener('keyup', e => {
                if (this.game.keys.indexOf(e.key) > -1){
                    this.game.keys.splice(this.game.keys.indexOf(e.key), 1);
                }
                console.log(this.game.keys);
            });
        }

    }
    class Projecttile {

    }
    class Particle {

    }
    class Player {
        constructor(game) {
            this.game = game;
            this.width = 120;
            this.height = 190;
            this.x = 20;
            this.y = 100;
            this.speedy = 0;
            this.maxSpeed = 3;
        }
        update() {
            if(this.game.keys.includes('ArrowUp')) this.speedy = -this.maxSpeed;
            else if (this.game.keys.includes('ArrowDown')) this.speedy = this.maxSpeed;
            else this.speedy = 0;
            this.y += this.speedy;
        }
        draw(context) {
            context.fillRect(this.x, this.y, this.width, this.height);
        }

    }
    class Enemy {

    }
    class Layer {

    }
    class Background {

    }
    class UI {

    }
    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.keys = [];

        }
        update() {
            this.player.update();
        }
        draw(context) {
            this.player.draw(context);
        }
    }
    const game = new Game(canvas.width, canvas.height);
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update();
        game.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate();
});