let healthPoints = 100;

function updateHealthPoints(points) {

    healthPoints = points;

     let healthBar = document.getElementById("healthBar");

     healthBar.style.width = points + "%";

     if(healthPoints < 1){
         document.getElementById("finalScore").innerHTML="Final Score: ";
         document.getElementById("finalScore").innerHTML+=score;
        document.getElementById("restart").style.display="block";
     }
}
let score=0;
let audio= new Audio("GunShot-trim.mp3");
let audio_enemyDead = new Audio("enemy-dead.mp3");
function shoot(enemy) {
    
    audio.play();
    audio_enemyDead.play();
    score+=5;
    document.getElementById("score").innerHTML="Score: ";
    document.getElementById("score").innerHTML+=score;

    enemy.classList.add("dead");
    

    setInterval(() => {
        enemy.classList.remove("dead");
    }, 5000);
}


function enemyAttack(enemy) {

    if(healthPoints > 1){

        enemy.classList.add("showing");

        setTimeout(() => {
            enemyShoot(enemy);
        }, 1000);

        setTimeout(() => {
            enemy.classList.remove("showing");
        }, 3000);
    }
}

let audio_enemyShootMe = new Audio("bullet-hitting-me.mp3");
function enemyShoot(enemy) {
    if (!enemy.classList.contains("dead")) {

        audio_enemyShootMe.play();
        enemy.classList.add("shooting");

        updateHealthPoints(healthPoints-10);

        setTimeout(() => {
            enemy.classList.remove("shooting")
        }, 1000);
    }
    
}

function livingEnemies(){
    return document.querySelectorAll(".enemy:not(.dead)");
}

function randomEnemyAttack(){

    let randomEnemyNo = Math.random() * livingEnemies().length;
    randomEnemyNo = Math.floor(randomEnemyNo);

    let enemy = livingEnemies()[randomEnemyNo];

    let randomDelay = Math.random() * 2000 + 1000;

    setTimeout(() => {
        enemyAttack(enemy);
        randomEnemyAttack();
    }, randomDelay);
}

function gunSound() {
    audio.play();
    
}

function newGame(){

    randomEnemyAttack();
    document.querySelector("button").style.display= "none";
}