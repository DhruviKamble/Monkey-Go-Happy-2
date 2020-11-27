var monkeyImage, monkey;
var bananaImage, banana, banana_group;
var obstacleImage, obstacle, obstacle_group;
var jungleImage, jungle;
var score = 0;
var ground;

function preload() {
    monkeyImage = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
    bananaImage = loadImage("banana.png");
    obstacleImage = loadImage("stone.png");
    jungleImage = loadImage("jungle.jpg");
}

function setup () {
    jungle = createSprite(300, 150, 10,10);
	jungle.addImage(jungleImage);
    jungle.velocityX = -2;
    
    monkey = createSprite(80, 400, 10,10);
	monkey.addAnimation("hungryMonkey",monkeyImage);
    monkey.scale=0.2;

    ground = createSprite(400, 460, 800, 7);
    ground.visible = false;

    banana_group = new Group();
    obstacle_group = new Group();
}


function draw () {
    createCanvas(800, 500);

    if (jungle.x<300) {
        jungle.x = 400;
    }

    if (keyDown("space") && monkey.y >= 395.2) {
        monkey.velocityY = -15;
    }

    monkey.velocityY = monkey.velocityY+0.5;

    monkey.collide(ground);

    if (frameCount%230 === 0) {
        spawnBananas();
    }

    if (frameCount%300 === 0) {
        spawnObstacles();
    }

    if (banana_group.isTouching(monkey)) {
        banana_group.destroyEach();
        score = score+1
    }

    if (obstacle_group.isTouching(monkey)) {
        monkey.scale=0.1;
        obstacle_group.destroyEach();
    }
    
    switch(score) {
        case 10: monkey.scale = 0.12;
            break;
        case 20: monkey.scale = 0.14;
            break;
        case 30: monkey.scale = 0.16;
            break;
        case 40: monkey.scale = 0.18;
            break;
        case 50: monkey.scale = 0.2;
            break;
            default: break;
    }

    drawSprites();
    textSize(30);
    fill("white");
    text("Score: " + score,30 ,30);
}

function spawnBananas () {
    banana = createSprite(810, 200, 10,10);
    banana.addImage(bananaImage);
    banana.velocityX = -3;
    banana.y = Math.round(random(180, 390));
    banana.scale = 0.07;
    banana.lifetime = 267;

    banana_group.add(banana);
}

function spawnObstacles () {
    obstacle = createSprite(810, 420, 10, 10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -3;
    obstacle.scale = 0.2;
    obstacle.lifetime = 267;

    obstacle_group.add(obstacle);
}