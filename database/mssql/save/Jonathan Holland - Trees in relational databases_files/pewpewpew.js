// PEW PEW PEW
var pewpewpew=new function()
{var rockSpeed=3;var shipSpeed=7;var numRocks=15;var rocks=[];var bullets=[];var LEFT=1;var RIGHT=2;var UP=3;var DOWN=4;var NONE=0;var gameTimer;var rockTimer;var scoreTimer;var score=0;var ship=document.createElement('DIV');var scoreLabel=document.createElement('SPAN');var masterDiv=document.createElement('DIV');window.size=function()
{var w=0;var h=0;if(!window.innerWidth)
{if(!(document.documentElement.clientWidth==0))
{w=document.documentElement.clientWidth;h=document.documentElement.clientHeight;}
else
{w=document.body.clientWidth;h=document.body.clientHeight;}}
else
{w=window.innerWidth;h=window.innerHeight;}
return{width:w,height:h};}
function doRocks()
{var wsize=window.size();for(var r in rocks)
{var newTop=parseInt(rocks[r].style.top.replace('px',''),10)+rockSpeed;if(newTop>=wsize.height-60)
{rocks[r].style.left=Math.floor(Math.random()*wsize.width)-80+'px';rocks[r].style.top="-150px";}
else
{rocks[r].style.top=newTop+'px';}}}
function fixCoords(i)
{return parseInt(i.replace('px',''),10);}
function doShip()
{var wsize=window.size();var offL;var offT;if(ship.style.backgroundPosition.split(' ')[1]=='0pt'||ship.style.backgroundPosition.split(' ')[1]=='0px')
offT='-46px';else
offT='0';if(ship.direction==LEFT)
offL='0px';else if(ship.direction==RIGHT)
offL='-90px';else
offL='-39px';ship.style.backgroundPosition=offL+' '+offT;if(ship.moving)
{if(ship.direction==UP)
{var newTop=fixCoords(ship.style.top)-shipSpeed;if(newTop>=0)
ship.style.top=newTop+'px';}
if(ship.direction==DOWN)
{var newTop=fixCoords(ship.style.top)+shipSpeed;if(newTop<=wsize.height-45)
ship.style.top=newTop+'px';}
if(ship.direction==LEFT)
{var newLeft=fixCoords(ship.style.left)-shipSpeed;if(newLeft>=0)
ship.style.left=newLeft+'px';}
if(ship.direction==RIGHT)
{var newLeft=fixCoords(ship.style.left)+shipSpeed;if(newLeft<=(wsize.width-45))
ship.style.left=newLeft+'px';}}}
function checkCollisions()
{for(var r in rocks)
{var rockX=fixCoords(rocks[r].style.left)-2;var rockY=fixCoords(rocks[r].style.top)-2;var rockX2=rockX+50;var rockY2=rockY+48;var shipX=fixCoords(ship.style.left)+20;var shipY=fixCoords(ship.style.top)+20;if((shipX>=rockX&&shipX<=rockX2)&&(shipY>=rockY&&shipY<=rockY2))
return true;}
return false;}
function cleanUp()
{clearInterval(gameTimer);clearInterval(scoreTimer);clearInterval(rockTimer);document.body.removeChild(masterDiv);document.onkeypress=function(){};document.onkeyup=function(){};document.body.style.overflow='visible';}
function shootBullet()
{var bullet=document.createElement('DIV');bullet.style.position='absolute';bullet.style.background="url('pew.png') no-repeat";bullet.style.width='5px';bullet.style.height='11px';bullet.style.left=fixCoords(ship.style.left)+20+"px";bullet.style.top=fixCoords(ship.style.top)-11+"px";masterDiv.appendChild(bullet);bullets.push(bullet);}
function doBullets()
{var checkRocks=function(bulletX,bulletY)
{for(var r=0;r<rocks.length;r++)
{var rockX=fixCoords(rocks[r].style.left)-2;var rockY=fixCoords(rocks[r].style.top)-2;var rockX2=rockX+50;var rockY2=rockY+48;if((bulletX>=rockX&&bulletX<=rockX2)&&(bulletY>=rockY&&bulletY<=rockY2))
{rocks[r].style.left=Math.floor(Math.random()*window.size().width)-80+"px";rocks[r].style.top=Math.floor(Math.random()*window.size().height)*-1+"px";return true;}}
return false;};for(var b=0;b<bullets.length;b++)
{if(fixCoords(bullets[b].style.top)>-15)
{bullets[b].style.top=fixCoords(bullets[b].style.top)-10+"px";if(checkRocks(fixCoords(bullets[b].style.left),fixCoords(bullets[b].style.top)))
{score+=20;masterDiv.removeChild(bullets[b]);bullets.splice(b,1);}}
else
{masterDiv.removeChild(bullets[b]);bullets.splice(b,1);}}}
return{Go:function(){document.body.style.overflow='hidden';masterDiv.style.position='absolute';masterDiv.style.overflow='hidden';masterDiv.style.width=window.size().width+'px';masterDiv.style.height=window.size().height+'px';masterDiv.style.zIndex='1000';document.body.insertBefore(masterDiv,document.body.firstChild);ship.isDead=false;ship.moving=false;ship.direction=NONE;ship.style.position='absolute';ship.style.background="url('shippay.png') no-repeat";ship.style.width='42px';ship.style.height='42px';ship.style.backgroundPosition='-39px 0';for(var i=0;i<numRocks;i++)
{var rock=document.createElement('DIV');rock.style.position='absolute';rock.style.background="url('rockey.png') no-repeat";rock.style.width='57px';rock.style.height='53px';rock.style.left=Math.floor(Math.random()*window.size().width)-80+"px";rock.style.top=Math.floor(Math.random()*window.size().height)*-1+"px";masterDiv.appendChild(rock);rocks.push(rock);}
masterDiv.appendChild(ship);scoreLabel.style.position='absolute';scoreLabel.style.color="#FFF";masterDiv.appendChild(scoreLabel);document.onkeydown=function(e)
{var evt=(e)?e:window.event;var char=(evt.charCode)?evt.charCode:evt.keyCode;if(char==40||char==38||char==37||char==39)
{ship.moving=true;if(char==40)
ship.direction=DOWN;else if(char==38)
ship.direction=UP;else if(char==37)
ship.direction=LEFT;else if(char==39)
ship.direction=RIGHT;else
ship.direction=NONE;}
if(char==32)
shootBullet();return false;};document.onkeyup=function(e)
{var evt=(e)?e:window.event;var char=(evt.charCode)?evt.charCode:evt.keyCode;if(char!=32)
{ship.moving=false;ship.direction=NONE;}};ship.style.left=(window.size().width/2)-25+"px";ship.style.top=(window.size().height/2)-25+"px";gameTimer=setInterval(function()
{if(ship.isDead)
{cleanUp();alert("Final Score: "+score);return;}
doShip();doRocks();doBullets();ship.isDead=checkCollisions();scoreLabel.innerHTML="LEVEL: "+(rockSpeed-2)+" SCORE: "+score;},75);rockTimer=setInterval(function(){rockSpeed++;},5000);scoreTimer=setInterval(function(){score++;},500);}};}();