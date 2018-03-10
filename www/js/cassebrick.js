var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");


var Dt=100;
var Largeur=300;
var Hauteur=200;
var ax=0;
var ay=0;
function clean()
{
ctx.fillStyle="#FFFFFF";//on nettoie avec une peinture un peu transparente.
ctx.beginPath();
ctx.rect(0,0,Largeur,Hauteur);
ctx.fill();
}

function Balle(x,y,vx,vy)
{
  //positions
  this.x=x;
  this.y=y;
  //vitesses
  this.vx=vx;
  this.vy=vy;
  //couleur de la balle
  this.color="red";
  //rayon
  this.r=2;
  //évolution
  this.deplacement=function(){
    //modification de la vitesse avec la gravité.
    this.vx+=ax*Dt/1000;
	this.vy+=ay*Dt/1000;
    if(this.x+this.r>Largeur)//rebond sur le coté droit
      {
      this.vx*=-1;
      this.x=Largeur-this.r;
      }
    if(this.x-this.r<0)//rebond sur le coté gauche
      {
      this.vx*=-1;
      this.x=this.r;
      }
    if(this.y+this.r>Hauteur)//rebond sur le coté en bas
      {
      this.vy*=-0.95;
      this.y=Hauteur-this.r;
      }
    if(this.y-this.r<0)//rebond sur le coté en haut
      {
      this.vy*=-1; 
      this.y=0;
      }
    //calcul de la nouvelle position
    this.x+=this.vx*Dt/1000;
    this.y+=this.vy*Dt/1000;
  }
  
  this.dessiner=function(){
    ctx.fillStyle=this.color;
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
    ctx.fill();
  }
}


function rendu()
{
clean(); 
maBalle.deplacement();
maBalle.dessiner();
}

//création des balles
maBalle=new Balle(200,100 ,0,0);


setInterval(rendu,Dt)

