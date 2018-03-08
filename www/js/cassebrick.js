var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var Lscreen=window.innerWidth;
var Hscreen=window.innerHeight;
c.style.width=Lscreen+"px";
c.style.height=Hscreen+"px";
var Lb=50;
var Hb=20;

function removeFromList(liste,id)
{
for(var rk in liste)
  {if(liste[rk].id==id){liste.splice(rk,1);}}
}

function brique(x,y,id){
  colors=["red","lime","purple","orange","blue"];
  this.id=id;
  this.x=x;
  this.y=y;
  this.color=colors[k%5];
  
  this.dessiner=function(){
  ctx.beginPath();
  ctx.fillStyle=this.color;
  ctx.strokeStyle="black";
  ctx.rect(this.x,this.y,Lb,Hb);
  ctx.fill();
  ctx.stroke();
  ctx.strokeStyle="white";
  ctx.rect(this.x+3,this.y+3,Lb-6,Hb-6);
  ctx.stroke();
  }

  this.touche=function(){
  removeFromList(Briques,this.id);
  Data.score+=20;
  if(Briques.length==0){win();}
  }
}

function balle(){
this.x=210;
this.r=10;
this.y=Raquette.y-this.r;
this.vy=0;
this.vx=0;
this.stick=true;

this.deplacement=function(){
  this.x+=this.vx;
  this.y+=this.vy;
  }
  
this.collision=function(){
  //avec les briques
  for(var i in Briques)
    {
    //touche la brique
    if(this.x+this.r>Briques[i].x && this.x-this.r<Briques[i].x+Lb && this.y+this.r>Briques[i].y && this.y-this.r<Briques[i].y+Hb)
      {
      if(Math.abs((this.x-Briques[i].x-Lb/2)/(this.y-Briques[i].y-Hb/2))>Lb/Hb)
        {this.vx*=-1;Briques[i].touche();}
        else
        {this.vy*=-1;Briques[i].touche();}
      }
    }
   //avec les bords du terrain 
    if(this.y<this.r){this.y=this.r;this.vy*=-1;}
    if(this.x<this.r){this.x=this.r;this.vx*=-1;}
    if(this.x+this.r>400){this.x=400-this.r;this.vx*=-1;}
    if(this.y>300){Balle.lost();}
    //raquette
    if(this.y+this.r>Raquette.y && this.x+this.r>Raquette.x && this.x-this.r<Raquette.x+Raquette.largeur){
    this.y=Raquette.y-this.r;
    this.vy*=-1.05;
    this.vx*=1.05;
    side=(this.x-(Raquette.x+Raquette.largeur/2))/(Raquette.largeur/2);
    this.vx+=2*side;
    }
  }
this.dessiner=function(){
  ctx.beginPath();
  ctx.fillStyle="grey";
  ctx.strokeStyle="white";
  ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(this.x+this.r/4,this.y+this.r/4,this.r/2,0,2*Math.PI);
  ctx.fillStyle="lightgrey";
  ctx.fill();
  ctx.beginPath();
  ctx.arc(this.x,this.y,this.r/2,0,2*Math.PI);
  ctx.fillStyle="grey";
  ctx.fill();
  }   

this.lost=function(){
  console.log("vous avez perdu la balle !");
  Data.vie--;
  if(Data.vie==0){gameOver();}
  this.x=210;
  this.y=270;
  this.vx=0;
  this.vy=0;
  this.stick=true;
  Raquette.x=160;
  Raquette.vx=0;
  }  
}
function raquette(){
this.x=160;
this.y=280;
this.largeur=100;
this.vx=0;
this.deplacement=function(){
  if((this.x<0 && this.vx>0 ) || (this.x>400-this.largeur && this.vx<0) || (this.x>-1 && this.x<401-this.largeur))
    {this.x+=this.vx;
    if(Balle.stick){Balle.x+=this.vx;}
    }
  }
this.dessiner=function(){
  ctx.beginPath();
  ctx.fillStyle="blue";
  ctx.strokeStyle="white";
  ctx.rect(this.x,this.y,this.largeur,10);
  ctx.fill();
  ctx.stroke();
   ctx.beginPath();
  ctx.fillStyle="orange";
  ctx.arc(this.x,this.y+5,6,0,2*Math.PI);
  ctx.arc(this.x+this.largeur,this.y+5,6,0,2*Math.PI);
  ctx.fill();
  }  


}
function data(){
this.score=0;
this.vie=3;
this.affichage=function(){
    ctx.font = "18pt Calibri,Geneva,Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Score : "+this.score, 240, 30);
    ctx.fillText("life : "+this.vie, 30, 30);
    if(Balle.stick){
    ctx.font = "18pt Calibri,Geneva,Arial";
    ctx.fillStyle = "white";
    ctx.fillText("press the space bar to launch the ball", 10, 170);
    }
 }
}

function cleanScreen(){
  ctx.beginPath();
  ctx.fillStyle="#00000080";
  ctx.rect(0,0,400,300);
  ctx.fill();
  }

function game(){
cleanScreen();
for(var b in Briques)
{Briques[b].dessiner();}
Raquette.deplacement();
Raquette.dessiner();
Data.affichage();
Balle.deplacement();
Balle.dessiner();
Balle.collision();
}


function gameOver(){
console.log("gameOver");
clearInterval(inertervalGame);
ctx.font = "30pt Calibri,Geneva,Arial";
ctx.fillStyle = "red";
ctx.fillText("GameOver",120, 170);
ctx.font = "18pt Calibri,Geneva,Arial";
ctx.fillStyle = "white";
ctx.fillText("Click to start again",120, 210);
document.addEventListener("click",start);
}
function win(){
console.log("You Win");
clearInterval(inertervalGame);
ctx.font = "30pt Calibri,Geneva,Arial";
ctx.fillStyle = "lime";
ctx.fillText("You win",140, 170);
ctx.font = "18pt Calibri,Geneva,Arial";
ctx.fillStyle = "white";
ctx.fillText("Click to start again",120, 210);
document.addEventListener("click",start);
}


function start(){
document.removeEventListener("click",start);


document.addEventListener("click",spaceBar);
Briques=[];
for(k=0;k<40;k++)
{
Briques[k]=new brique((k%8)*Lb,Math.floor(k/8)*Hb+40,k);
}
Data=new data();
Raquette=new raquette();
Balle=new balle();
if(typeof inertervalGame!=="undefined"){clearInterval(inertervalGame);}
  inertervalGame=setInterval(game,50);
}

/*function keyPush(evt)
{ if(evt.keyCode==37)//gauche
  {Raquette.vx=-10;}
  else if(evt.keyCode==39)//droite
  {Raquette.vx=10;}
}*/
function spaceBar(evt)
{
   if(Balle.stick)
     {
     Balle.vy=-5;
     Balle.stick=false;}
   else
     {Raquette.vx=0;}
   
}

start();

