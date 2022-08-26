const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let isJumping = false
let position = 0;
var pontos = 0;
var endGame = false;




function handleKeyUp(event) {
    if(event.keyCode === 32) {
        if(!isJumping) {
        jump();
        }
    }
}

function jump() {


    isJumping = true;

    let upInterval = setInterval(() =>{
        if(position >= 150) {
            clearInterval(upInterval);

            let downInterval = setInterval(() =>{
                if(position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                position -= 3;
                dino.style.bottom = position + 'px';
                }
            })
        } else {
        position += 10;
        
        dino.style.bottom = position + 'px ';
        }
    },20);

}

function createCactus() {
    if(endGame === false) {
    const cactus = document.createElement('div');
    let cactusPosition = 1000;

    let randomTime = Math.random() * 6000;
    
    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px';
    background.appendChild(cactus);

    let leftInterval = setInterval(() =>{
        if(cactusPosition < -60 ) {
            clearInterval(leftInterval);
            background.removeChild(cactus);
            pontos ++;
            console.log(pontos)
        } else if (cactusPosition > 0 && cactusPosition <60 && position <60) {
            //bateu
            clearInterval(leftInterval);
            var metros = ((performance.now())/1000).toFixed();
            document.body.innerHTML = '<h1 class="game-over"> Fim de Jogo</h1> <br><h4 class="game-over">Você pulou ' + pontos + ' cactos </h4> <br> <h4 class="game-over"> Voce andou ' + metros + ' metros <h4> <img class="morte" src="./morte.png "/>';
             endGame = true;
        } else{
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    },20)

    setTimeout(createCactus, randomTime);
    }
}



createCactus();

document.addEventListener('keyup', handleKeyUp);
