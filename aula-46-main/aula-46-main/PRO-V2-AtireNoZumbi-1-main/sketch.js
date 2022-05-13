
var fundo, fundo_tela, jogador, jogador_img1,jogador_img2 ;
var um_coracao_img, dois_coracao_img, tres_coracao_img,um_coracao,dois_coracao,tres_coracao;
var zumbi1, zumbi_img, zumbi_grupo;
var bala = 1000;
var bala_grupo;
var gameState = "comeco";

function preload(){
  fundo_tela = loadImage ("assets/bg.jpeg");
  jogador_img1 = loadImage ("assets/shooter_2.png");
  jogador_img2 = loadImage ("assets/shooter_3.png");
  um_coracao_img = loadImage("assets/heart_1.png");
  dois_coracao_img = loadImage("assets/heart_2.png");
  tres_coracao_img = loadImage("assets/heart_3.png");
  zumbi_img = loadImage("assets/zombie.png");
  
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adicionando a imagem de fundo
 fundo = createSprite (displayWidth/2 - 20,displayHeight/2 - 40, 20, 20);
 fundo.addImage (fundo_tela);
 fundo.scale = 1.1;
//criando o sprite do jogador
 jogador = createSprite (displayWidth - 1150,displayHeight-300, 50, 50);
 jogador.addImage (jogador_img1);
 jogador.scale = 0.3;
 
 jogador.setCollider ("rectangle", 0,0,300,300);
 jogador.debug = true;

 um_coracao = createSprite(displayWidth - 150, 40, 20,20);
 um_coracao.addImage(um_coracao_img);
 um_coracao.scale = 0.4;

 um_coracao.visible = false;

 dois_coracao = createSprite(displayWidth - 100, 40, 20,20);
 dois_coracao.addImage(dois_coracao_img);
 dois_coracao.scale = 0.4;

 dois_coracao.visible = false;

 tres_coracao = createSprite(displayWidth - 170, 40, 20,20);
 tres_coracao.addImage(tres_coracao_img);
 tres_coracao.scale = 0.4;
 
 zumbi_grupo = new Group ();
 bala_grupo = new Group ();
}

function draw() {
  background(0); 
 if(gameState === "comeco"){
  //movendo o jogador para cima e para baixo e tornando o jogo compatível com dispositivos móveis usando toques
 if(keyDown("W")|| touches.length > 0) {
  jogador.y = jogador.y - 30;
  }
  if(keyDown("S")|| touches.length > 0) {
   jogador.y = jogador.y + 30;
   }
 
   
 
  //solte balas e mude a imagem do atirador para a posição de tiro quando a tecla de espaço for pressionada
   if (keyWentDown("space")) {
 
     bala = createSprite (displayWidth-1150, player.y - 30, 20, 10);
     bala.velocityX = 20;
     bala_grupo.add (bala);
     bala = bala -1;
     jogador.addImage (jogador_img2);
   }//o jogador volta à imagem original quando pararmos de pressionar a barra de espaço
   else if (keyWentUp("space")) {
   jogador.addImage (jogador_img1);
   }
 
   if(zumbi_grupo.isTouching(bala_grupo)) {
     for (var i = 0; i < zumbi_grupo.length; i++){
       if(zumbi_grupo[i].isTouching(bala_grupo)){
         zumbi_grupo[i].destroy ();
         bala_grupo.destroy ();
       }
     }
   }
 
   
 
   if(zumbi_grupo.isTouching(jogador)){
    for (var i = 0; i < zumbi_grupo.length; i++){
      if(zumbi_grupo[i].isTouching(jogador)){
       zumbi_grupo[i].destroy ();
      }
    }
    
 
   }
 
   zumbi();
 }
 drawSprites();
 
 if(gameState === "perdeu"){
   textSize (100);
   fill("red");
  text ("você perdeu", 400, 400);
  jogador.destroy();
  zumbi_grupo.destroyEach();
 }
 else if(gameState === "ganhou"){
   textSize (100);
   fill("green");
  text ("você ganhou", 400, 400);
  jogador.destroy();
  zumbi_grupo.destroyEach();
 }
 else if (gameState === "recarrega") {
   textSize (100);
   fill("green");
  text ("acabou sua munição", 400, 400);
  jogador.destroy();
  zumbi_grupo.destroyEach();
  bala_grupo.destroyEach();
  
}

}

function zumbi () {
  if (frameCount%50 === 0 ) {
  zumbi1 = createSprite(random(500,1100), random(100,500), 40,40);
  zumbi1.addImage (zumbi_img);
  zumbi1.scale = 0.15;
  zumbi1.velocityX = -3;

  zumbi1.setCollider ("rectangle", 0,0,400,400);
  zumbi1.debug = true;

  zumbi1.lifeTime = 400;
  zumbi_grupo.add (zumbi1);
  }
}
