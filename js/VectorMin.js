
var Vector;(function(Vector){var Waypoint=(function(){function Waypoint(targetX,targetY){this.targetX=targetX;this.targetY=targetY;}
Waypoint.prototype.getNextLocation=function(currentX,currentY,step){var newX=0;var newY=0;var distance=getDistance(currentX,currentY,this.targetX,this.targetY);if(distance<=step){newX=this.targetX;newY=this.targetY;}
else{var coords=getNormalizedPoint((this.targetX-currentX),(this.targetY-currentY));newX=coords.targetX*step;newY=coords.targetY*step;newX=currentX+newX;newY=currentY+newY;}
return new Waypoint(newX,newY);};return Waypoint;})();Vector.Waypoint=Waypoint;function getNormalizedPoint(x,y){var length=Math.sqrt(Math.pow(x,2)+Math.pow(y,2));return new Waypoint((x/length),(y/length));}
function getDistance(startX,startY,endX,endY){return getQuadratic((startX-endX),(startY-endY));}
function getQuadratic(a,b){return Math.sqrt(Math.pow(a,2)+Math.pow(b,2));}
function getTargetedWaypoint(startX,startY,targetX,targetY,targetVelocityX,targetVelocityY,projectileSpeed){var aimX=0;var aimY=0;var diffX=startX-targetX;var diffY=startY-targetY;var a=Math.pow(targetVelocityX,2)+Math.pow(targetVelocityY,2)-Math.pow(projectileSpeed,2);var b=2*((targetVelocityX*diffX)+(targetVelocityY*diffY));var c=Math.pow(diffX,2)+Math.pow(diffY,2);var ts=solveQuadratic(a,b,c);if(ts==null){ts=new Waypoint(targetX,targetY);}
var t0=ts.targetX;var t1=ts.targetY;var t=Math.min(t0,t1);if(t<0)
t=Math.max(t0,t1);if(t>0){aimX=targetX+targetVelocityX*t;aimY=targetY+targetVelocityY*t;}
return new Waypoint(aimX,aimY);}
Vector.getTargetedWaypoint=getTargetedWaypoint;function solveQuadratic(a,b,c){var point=null;if(Math.abs(a)<1e-6){if(Math.abs(b)<1e-6){point=Math.abs(c)<1e-6?new Waypoint(0,0):null;}
else{point=new Waypoint(-c/b,-c/b);}}
else{var disc=b*b-4*a*c;if(disc>=0){disc=Math.sqrt(disc);a=2*a;point=new Waypoint((-b-disc)/a,(-b+disc)/a);}}
return point;}
function getRandomWaypoint(minLocationX,maxLocationX,minLocationY,maxLocationY){var randomX=GameLogic.getRandomInteger(minLocationX,maxLocationX);var randomY=GameLogic.getRandomInteger(minLocationY,maxLocationY);return new Waypoint(randomX,randomY);}
Vector.getRandomWaypoint=getRandomWaypoint;})(Vector||(Vector={}));