define('shooter', ['resources', 'controle', 'player', 'scene'], function(resources, controle, player, scene) {


	var bgLayer1  = {
		live:true,
		x:0,
		update: function() {
			this.x -= 5;

			if ( this.x <= -800 ){
				this.x = 0;	
			}

		},
		draw: function() {
			context.drawImage(resources.images.bgLayer1, this.x,0);
			context.drawImage(resources.images.bgLayer1, this.x + 800 ,0);		
		}
	}

	var bgLayer2 = {
		live:true,
		x:0,
		update: function() {
			this.x -= 15;

			if ( this.x <= -800 ){
				this.x = 0;	
			}

		},
		draw: function() {
			context.drawImage(resources.images.bgLayer1, this.x,0);
			context.drawImage(resources.images.bgLayer1, this.x + 800 ,0);		
		}	
	}

	scene.addElement(bgLayer1);
	scene.addElement(bgLayer2);


	scene.addElement(player);

	var WIDTH = 800;
	var HEIGHT = 480;

	var context, canvas;

	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");

	canvas.width = WIDTH;
	canvas.height = HEIGHT;

	function Enemy() {
		this.x = WIDTH;
		this.y = (Math.random() * HEIGHT)+ 1;
		this.live = true;
		this.height = 60;
		this.width = 46;
		this.draw = function(context) {
			// drawColision("red", this.x, this.y, this.width, this.height);			
			context.drawImage(resources.images.enemy,this.x,this.y);

		}

		this.update = function() {
			this.x -= 5;
			if (this.x < 0 ) {
				this.live = false;
			}
		}
	}

	function drawColision(color, x, y, width, height) {
		context.beginPath();
		context.lineWidth="3";
		context.strokeStyle=color;
		context.rect(x,y,width,height);
		context.stroke();
	}

	setInterval(function(){
		draw();
		update();
	}, 33);

	setInterval(function(){
		scene.addEnemy(new Enemy());
	}, 1000);


	function draw() {
		context.clearRect(0,0, WIDTH,HEIGHT);

		context.drawImage(resources.images.mainbackground, 0,0);

        scene.draw(context);

        context.font = "30px Arial";
		context.fillText('Scenes : ' + scene.getElements().length ,10,30) 
		context.fillText('Bullets : ' + scene.getBullets().length ,170,30) 
	}

	function detectColision(bullet, enemy) {
		return (bullet.x + bullet.width > enemy.x) &&
			   (enemy.y + enemy.height > bullet.y) &&
			   (enemy.y < bullet.y + bullet.height) ;
	}

	function update() {


		player.move(controle);

		scene.getEnemies().forEach(function(enemy) {
			enemy.update();

			scene.getBullets().forEach(function(bullet) {
				if(detectColision(bullet,enemy)) {
					enemy.live = bullet.live = false;
					resources.sounds.explosion.currentTime = 0;
					resources.sounds.explosion.play();
					if(player.speed <= 15)
						player.speed += 3;
				}
			});

		});		


   //      enemies.forEach(function(enemy) {
        	// enemy.update();
			// bullets.forEach(function(bullet) {
			// 	if(detectColision(bullet, enemy)) {
			// 		enemy.live = bullet.live = false;
			// 		resources.sounds.explosion.currentTime = 0;
			// 		resources.sounds.explosion.play();
			// 		if(player.speed <= 15)
			// 			player.speed += 3;
			// 	}
   //      	});        	
   //      });

        scene.update();

	}
});


