/*
Sources:
https://developer.mozilla.org/en-US/docs/Games/Workflows/2D_Breakout_game_pure_JavaScript
http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
http://codeincomplete.com/posts/2013/5/18/javascript_gauntlet_collision_detection/
https://www.freelancer.com/community/articles/game-development-using-js-and-canvas
https://github.com/technogeek00/css-galaga

COLLISION
http://stackoverflow.com/questions/18040846/best-approach-for-collision-detection-with-html5-and-javascript

RESEARCH (NOT USED):
http://superpowers-html5.com/index.en.html

GOOGLE - L spiro game loop


*/

/*** OBJECT CLASSES ***/

/**
 * Global Constants
 */
class Constants {
    //game mgmt settings
    DEBUG_MODE:boolean = true;
    DEFAULT_START_LEVEL:number = 1;
    DEFAULT_HIGH_SCORE_COOKIE_NAME:string = 'RebelWarsHighScores';
    INFO_TEXT_SPACING = 24;
    //key values
    KEY_LEFT:number = 37;
    KEY_UP:number = 38;
    KEY_RIGHT:number = 39;
    KEY_DOWN:number = 40;
    //dimensions
    CLIENT_WINDOW_MARGIN:number = 10;
    CANNON_SHOT_RADIUS:number = 4;
    CANNON_SHOT_OFFSET_Y:number = -2;
    MISSILE_RADIUS:number = 6;
    MISSILE_OFFSET_Y = -2;
    DESTROYER_HEIGHT_HIT_FACTOR = 2;
    REBEL_SHIP_HEIGHT_HIT_FACTOR = 2;
    TIE_FIGHTER_HEIGHT_HIT_FACTOR = 2;
    //limits
    MISSILE_LIMIT = 1;
    CANNON_SHOT_LIMIT = 10;
    NUM_FIGHTERS_PER_LEVEL = 2;
    NUM_DESTROYERS_PER_LEVEL = 1;
    MAX_SECONDS_MULTIPLIER_PER_LEVEL = 5;
    LEVEL_LOAD_BUFFER_SECONDS = 2;
    BOSS_LEVEL_FACTOR = 5;
    //speeds
    BASE_SPEED:number = 256;
    REBEL_SHIP_SPEED:number = this.BASE_SPEED;
    TIE_FIGHTER_SPEED:number = (this.BASE_SPEED / 4);
    DESTROYER_SPEED:number = (this.BASE_SPEED / 6);
    CANNON_SHOT_SPEED:number = this.BASE_SPEED;
    MISSILE_SPEED:number = (this.BASE_SPEED / 2);
    //colors
    CANNON_SHOT_BLUE:string = 'CANNON_BLUE';
    MISSLE_PINK:string = 'MISSLE_PINK';
    WHITE:string = 'WHITE';
    //health & damage
    CANNON_SHOT_DAMAGE:number = 1;
    MISSILE_DAMAGE:number = 5;
    TIE_FIGHTER_HEALTH:number = 1;
    DESTROYER_HEALTH:number = 5;
    REBEL_SHIP_HEALTH:number = 3;
}

enum ProjectileType  {
    CANNON_SHOT,
    MISSILE
}

enum ShipType  {
    REBEL_MILLENIUM_FALCON,
    EMPIRE_TIE_FIGHTER,
    EMPIRE_DESTROYER
}

var CONSTANTS:Constants = new Constants();

/**
 * Class to store enemy kill data
 */
class EnemyKill {
    enemyType:ShipType;
    enemyStartTime:Date;
    enemyMaxHealth:number;
    killTime:Date;
    level:number;
    
    constructor(enemy:ShipType, enemyStart:Date, enemyMaxHealth:number, level:number)
    {
        //assign
        this.enemyType = enemy;
        this.enemyStartTime = enemyStart;
        this.enemyMaxHealth = enemyMaxHealth;
        this.level = level;
        //default date to now
        this.killTime = new Date(Date.now());
    }
}

/**
 * Class to store user score data
 */
class Score {
    name:string;
    gameDate:Date;
    killList:Array<EnemyKill>;
    levelStart:number;
    levelFinish:number;
    currentScore:number;
    
    constructor(name:string, level:number)
    {
        //assign
        this.name = name;
        this.levelStart = level;
        //defaults
        this.killList = new Array<EnemyKill>();
        this.gameDate = new Date(Date.now());
        this.currentScore = 0;
    }
    
    /**
     * Add to current score
     */
    updateScore(enemy:ShipType, enemyStart:Date, enemyMaxHealth:number, level:number)
    {
        //create & push new kill object
        this.killList.push(new EnemyKill(enemy,enemyStart,enemyMaxHealth,level));
        //update numeric score
        this.currentScore += enemyMaxHealth;
    }
}

/**
 * Class to store historical score data
 */
class HighScore {
    name:string;
    score:number;

    constructor(name?:string, score?:number)
    {
        this.name = name;
        this.score = score;
    }
}

/**
 * Base class for on screen objects
 */
class BaseGameObject {
	speed:number;
	locationX:number;
	maxWidth:number;
	locationY:number;
	maxHeight:number;
	
	constructor(currentX:number, currentY:number, canvasWidth: number, canvasHeight: number, speed: number)
	{
		this.speed = speed;
		this.maxHeight = canvasHeight;
		this.maxWidth = canvasWidth;
        this.locationX = currentX;
		this.locationY = currentY;
	}
	
    /**
     * Change current X (horizontal) coordinate
     */
	moveLocationX(pixels:number)
	{
		this.locationX = this.locationX + (pixels * this.speed);
	}
	
    /**
     * Change current Y (vertical) coordinate
     */
	moveLocationY(pixels:number)
	{
		this.locationY = this.locationY + (pixels * this.speed);
	}
}

/**
 * Base ship object
 */
class ShipObject extends BaseGameObject {
    objImage:HTMLImageElement;
    maxHealth:number;
    health:number;
    startDate:Date;
    type:ShipType;
    heightHitFactor:number;
    
	constructor(currentX:number, currentY:number, canvasWidth: number, 
        canvasHeight: number, speed:number, type:ShipType, 
        createDate:Date, health:number, heightHitFactor:number)
	{
        //base constructor
        super(currentX, currentY, canvasWidth, canvasHeight, speed);
        
        //assign
        this.type = type;
        this.health = health;
        this.maxHealth = health;
        this.startDate = createDate;
        this.heightHitFactor = heightHitFactor;
	}
    
    /**
     * Get current Y (vertical) coordinate
     */
	getLocationY() : number
	{
		if(this.locationY < 1) 
		{ 
			this.locationY = 0; 
		}
		else if (this.locationY > this.maxHeight - this.objImage.naturalHeight)
		{
			this.locationY = this.maxHeight - this.objImage.naturalHeight;
		}

		return this.locationY;
	}
	
    /**
     * Get Y (vertical) coordinate including height of image
     */
    getMaximumY() : number
    {
        return this.getLocationY() + (this.objImage.naturalHeight / this.heightHitFactor);
    }
    
    /**
     * Get current X (horizontal) coordinate
     */
	getLocationX() : number
	{
		if(this.locationX < 1) 
		{ 
			this.locationX = 0; 
		}
		else if (this.locationX > this.maxWidth - this.objImage.naturalWidth)
		{
			this.locationX = this.maxWidth - this.objImage.naturalWidth;
		}

		return this.locationX;
	}
    
    /**
     * Get X (horizontal) coordinate including width of image
     */
    getMaximumX() : number
    {
        return this.getLocationX() + this.objImage.naturalWidth;
    }
    
    /**
     * Retrieve the starting X coordinate for a projectile
     */
    getProjectileLocationStartX(): number
    {
        return this.getLocationX() + (this.objImage.naturalWidth / 2);
    }
    
    /**
     * Retrieve the starting Y coordinate for a projectile
     */
    getProjectileLocationStartY(offset:number): number
    {
        return this.getLocationY() + offset;
    }
    
    /**
     * Check if object has reached the bottom limit of the screen
     */
    isAtBottomOfScreen(): boolean
    {
        var atBottom:boolean = false;
        
        if((this.locationY + this.objImage.naturalHeight) > browserHeight)
        {
            atBottom = true;
        }
        
        return atBottom;
    }
    
    /**
     * Check if object start time is less than current time
     */
    startTimeIsValid(time:number): boolean
    {
        if(time > this.startDate.getTime())
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    
    /**
     * Enemy ship specific Y (vertical) coordinate change
     */
	moveEnemyShip(pixels:number)
	{
        var factor:number = (pixels * this.speed);
        
        //check if object is a destroyer & is near top of screen
        if ( this.type == ShipType.EMPIRE_DESTROYER && 
            this.locationY < (this.objImage.naturalHeight / 2) )
        {
            //check if current position change is smaller than image size
            if(factor < this.objImage.naturalHeight)
            {
                //larger images appear to not move if the pixel
                //change is too low so we amplify their initial movement
                factor = (pixels * this.speed) * 1.5; 
            }
        }
        
		this.locationY = this.locationY + factor;
	}
}

/**
 * User controlled Rebel Ship
 */
class RebelShipObject extends ShipObject {
	constructor(canvasWidth: number, canvasHeight: number)
	{
        //create & assign image
		var image:HTMLImageElement = new Image();
		image.src = 'images/falcon2.png';
        image.onload = function(){ isRebelShipLoaded = true; }
        this.objImage = image;
        
        var currentX:number = canvasWidth / 2;
        var currentY:number = canvasHeight;
        
        //base constructor
        super(currentX, currentY, canvasWidth, canvasHeight, 
            CONSTANTS.REBEL_SHIP_SPEED, ShipType.REBEL_MILLENIUM_FALCON,
            new Date(Date.now()), CONSTANTS.REBEL_SHIP_HEALTH, CONSTANTS.REBEL_SHIP_HEIGHT_HIT_FACTOR);
	}
    
    reset()
    {
        this.locationX =  this.maxWidth / 2;
        this.locationY = this.maxHeight;
    }
}

/**
 * Fighter class enemy ship
 */
class TieFighterObject extends ShipObject {
	constructor(currentX:number, currentY:number, canvasWidth: number, canvasHeight: number, startTime:Date)
	{
        //base constructor
        super(currentX, currentY, canvasWidth, canvasHeight, 
            CONSTANTS.TIE_FIGHTER_SPEED, ShipType.EMPIRE_TIE_FIGHTER, 
            startTime, CONSTANTS.TIE_FIGHTER_HEALTH, CONSTANTS.TIE_FIGHTER_HEIGHT_HIT_FACTOR);
        //create & assign image
		var image:HTMLImageElement = new Image();
		image.src = 'images/TieFighter3.png';
        image.onload = function(){ isTieFighterLoaded = true; }
        this.objImage = image;
	}
}

/**
 * Destroyer class enemy ship
 */
class DestroyerObject extends ShipObject {
	constructor(currentX:number, currentY:number, canvasWidth: number, canvasHeight: number, startTime:Date)
	{
        //base constructor
        super(currentX, currentY, canvasWidth, canvasHeight, 
            CONSTANTS.DESTROYER_SPEED, ShipType.EMPIRE_DESTROYER, 
            startTime, CONSTANTS.DESTROYER_HEALTH,
            CONSTANTS.DESTROYER_HEIGHT_HIT_FACTOR);
        //create & assign image
		var image:HTMLImageElement = new Image();
		image.src = 'images/Destroyer3.png';
        image.onload = function(){ isDestroyerLoaded = true; }
        this.objImage = image;
	}
}

/**
 * Base projectile class
 */
class Projectile extends BaseGameObject {
    id:number;
    isAlive:boolean;
    isFirst:boolean;
    type:ProjectileType;
    createTime:number;
    radius:number;
    color:string;
    damage:number;
    
    constructor(currentX:number, currentY:number, 
    speed:number, canvasWidth: number, 
    canvasHeight: number, type:ProjectileType,
    id:number, now:number, radius:number, color:string,
    damage:number)
    {
        this.isAlive = false;
        this.isFirst = true;
        this.type = type;
        this.id = id;
        this.createTime = now;
        this.radius = radius;
        this.color = color;
        this.damage = damage;
        
        //base constructor
        super(currentX, currentY, canvasWidth, canvasHeight, speed);
    }
    
    /**
     * Get lowest X (horizontal) value for rendered projectile
     */
    getMinimumX() : number
    {
        return this.locationX - this.radius;
    }
    
    /**
     * Get highest X (horizontal) value for rendered projectile
     */
    getMaximumX() : number
    {
        return this.locationX + this.radius;
    }
    
    /**
     * Get lowest Y (vertical) value for rendered projectile
     */
    getMinimumY() : number
    {
        return this.locationY - this.radius;
    }
    
    /**
     * Get highest Y (vertical) value for rendered projectile
     */
    getMaximumY() : number
    {
        return this.locationY + this.radius;
    }
}

/*** INITIALIZE PAGE ***/

//Get container dimensions
var browserWidth:number = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) - CONSTANTS.CLIENT_WINDOW_MARGIN;
var browserHeight:number = (window.innerHeight || document.documentElement.clientHeight  || document.body.clientHeight) - CONSTANTS.CLIENT_WINDOW_MARGIN;

//create canvas
var gameCanvas:HTMLCanvasElement = <HTMLCanvasElement>document.createElement("canvas");
gameCanvas.width = browserWidth;
gameCanvas.height = browserHeight;

//add canvas to page
document.body.appendChild(gameCanvas);

/*** INITIALIZE GAME OBJECTS ***/

//user controlled ship
var rebelShip:RebelShipObject = new RebelShipObject(browserWidth, browserHeight);

//list of enemy ships
var enemyShipList:Array<ShipObject> = new Array<ShipObject>();
var bossList:Array<ShipObject> = new Array<ShipObject>();

//list of cannon shots
var cannonShotList:Array<Projectile> = getPopulatedProjectileList(ProjectileType.CANNON_SHOT, 
CONSTANTS.CANNON_SHOT_SPEED,
CONSTANTS.CANNON_SHOT_LIMIT,
gameCanvas.width,
gameCanvas.height);

//list of missiles
var missileList:Array<Projectile> = getPopulatedProjectileList(ProjectileType.MISSILE, 
CONSTANTS.MISSILE_SPEED,
CONSTANTS.MISSILE_LIMIT,
gameCanvas.width,
gameCanvas.height);

//manage user input controls
var rightArrowKeyed = false;
var leftArrowKeyed = false;

//bind keyboard event handlers
document.addEventListener("keydown",keyDownHandler,false);
document.addEventListener("keyup",keyUpHandler,false);

//init game mgmt vars
var intervalHolder:number = null;
var isRebelShipLoaded:boolean = false;
var isTieFighterLoaded:boolean = false;
var isDestroyerLoaded:boolean = false;
var isGameReady:boolean = false;
var currentLevel:number = CONSTANTS.DEFAULT_START_LEVEL;
var timePrevious:number = Date.now();

//init user stats
var currentUserScore:Score = new Score("Player 1",currentLevel);
var currentUserHighScore:HighScore = new HighScore();
var highScoreList:Array<HighScore> = new Array<HighScore>();
//get user input
if(!CONSTANTS.DEBUG_MODE)
{
    openWelcomeWindow();
}
else
{
    startDebugGame();
}



/*** GAME FUNCTIONS ***/

/**
 * Setup objects in new level
 */
function buildLevel()
{
    //clear enemy list
    enemyShipList = new Array<ShipObject>();
    
    //get # of enemies
    var totalNumFighters = CONSTANTS.NUM_FIGHTERS_PER_LEVEL * currentLevel;
    var totalNumDestroyers = CONSTANTS.NUM_DESTROYERS_PER_LEVEL * currentLevel;
    
    //populate fighters
    addEnemyShips(totalNumFighters, ShipType.EMPIRE_TIE_FIGHTER);
    
    //populate destroyers
    addEnemyShips(totalNumDestroyers, ShipType.EMPIRE_DESTROYER);
}

/**
 * Populate enemy ship list with new objects
 */
function addEnemyShips(numberOfShips:number, type:ShipType)
{
    //loop until limit reached
    for(var i = 0; i < numberOfShips; i++)
    {
        var ship:ShipObject = getNewEnemyShip(type);
        enemyShipList.push(ship); //add new object
    }
}

/**
 * Initialize new enemy ship object based on type requested
 */
function getNewEnemyShip(type:ShipType) : ShipObject
{
    var ship:ShipObject = null;
    var randomX:number = getRandomInteger(0,browserWidth);
    var randomSeconds:number = getRandomInteger(0, (currentLevel * CONSTANTS.MAX_SECONDS_MULTIPLIER_PER_LEVEL));
    var randomTime:Date = addSecondsToDate(Date.now(), (randomSeconds + CONSTANTS.LEVEL_LOAD_BUFFER_SECONDS));
    
    switch(type)
    {
        case ShipType.EMPIRE_DESTROYER:
            ship = new DestroyerObject(randomX,0,browserWidth, browserHeight, randomTime);
        break;
        case ShipType.EMPIRE_TIE_FIGHTER:
        default:
            ship = new TieFighterObject(randomX,0,browserWidth, browserHeight, randomTime);
        break; 
    }
    
    return ship;
}

/**
 * Returns random integer
 */
function getRandomInteger(min:number, max:number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Add a user provided amount of seconds to the passed in date
 */
function addSecondsToDate(dateNumber:number, seconds:number) {
    return new Date(dateNumber + seconds*1000);
}

/**
 * Check if two number ranges overlap.
 */
function isOverlapPresent(firstObjectFloor:number,firstObjectCeiling:number,
    secondObjectFloor:number, secondObjectCeiling:number) : boolean
{
    return (firstObjectFloor <= secondObjectCeiling && secondObjectFloor <= firstObjectCeiling);
}

/**
 * Get amount of enemy ships remaining
 */
function getRemainingEnemies() : number
{
    return enemyShipList.length + bossList.length;
}

/**
 * Reset game state and advance to next level
 */
function continueGame()
{   
    //game active
    isGameReady = true;
    
    //increment new level
    currentLevel += 1;
    
    //check missiles
    equipMissiles();
    
    //reset objects
    resetObjects();
    
    //build new level
    buildLevel();
    
    //reset time var
    timePrevious = Date.now();
}

/**
 * Reset game objects
 */
function resetObjects()
{
    //reset rebel ship
    rebelShip.reset();
    
    //reset projectiles
    resetProjectiles(cannonShotList);
    resetProjectiles(missileList);
    
    //reset user input
    rightArrowKeyed = false;
    leftArrowKeyed = false;
}

/**
 * Reset missiles and their availability based on current level
 */
function equipMissiles()
{
    //check if current level is multiple
    if( currentLevel % CONSTANTS.BOSS_LEVEL_FACTOR == 0 )
    {
        //init missile
        var id:number = missileList.length;
        var radius:number = CONSTANTS.MISSILE_RADIUS;
        var color:string = CONSTANTS.MISSLE_PINK;
        var damage:number = CONSTANTS.MISSILE_DAMAGE;
        var missile:Projectile = new Projectile(0,0,CONSTANTS.MISSILE_SPEED,
            gameCanvas.width,gameCanvas.height,ProjectileType.MISSILE,
            id,0,radius, color, damage);
        //add missile
        missileList.push(missile);
    }
}

/**
 * Create list populated with Projectile projects
 */
function getPopulatedProjectileList(type:ProjectileType, speed:number, limit:number, canvasWidth:number, canvasHeight:number) : Array<Projectile>
{
    var list:Array<Projectile> = new Array<Projectile>();
    var radius:number = 0;
    var color:string = '';
    var damage:number = 0;
    
    switch(type)
    {
        case ProjectileType.MISSILE:
            radius = CONSTANTS.MISSILE_RADIUS;
            color = CONSTANTS.MISSLE_PINK;
            damage = CONSTANTS.MISSILE_DAMAGE;
        break;
        case ProjectileType.CANNON_SHOT:
        default:
            radius = CONSTANTS.CANNON_SHOT_RADIUS;
            color = CONSTANTS.CANNON_SHOT_BLUE;
            damage = CONSTANTS.CANNON_SHOT_DAMAGE;
        break;
    }
    
    for (var i = 0; i < limit; i++) {
        list.push(new Projectile(0,0,speed,canvasWidth,canvasHeight,type,i,0,radius, color, damage));
    }
    
    return list;
}

/**
 * Get id of the first unused projectile object
 */
function getUnusedProjectileId(list:Array<Projectile>) : number
{
    var id:number = -1; //init to negative
    
    //only return objects not alive
    var filteredList = getProjectilesByStatus(list, false);
    
    //check if found
    if(filteredList.length > 0)
    {
        id = filteredList[0].id; //get id from first index
    }
    
    return id;
}

/**
 * Retrieve only projectiles in a certain status
 */
function getProjectilesByStatus(list:Array<Projectile>, isActive:boolean)
{
    return list.filter(function (proj) { 
        //check for a specific type
        if(proj.type == ProjectileType.MISSILE && !isActive)
        {
            //if needing an inactive missile, only return first shot
            return (proj.isAlive === isActive && proj.isFirst === true);
        }
        else
        {
            return proj.isAlive === isActive;
        }
    });
}

/**
 * Create new projectile object
 */
function fireProjectile(list:Array<Projectile>, offset:number)
{
    //get id of next available unused projectile
    var id: number = getUnusedProjectileId(list);

    //check if id is valid
    if (id >= 0) {
        //get current location of ship
        var x: number = rebelShip.getProjectileLocationStartX();
        var y: number = rebelShip.getProjectileLocationStartY(offset);
        
        //activate projectile
        activateProjectile(id, list, x, y);
    }
}

/**
 * Activate projectile object for a specific id
 */
function activateProjectile(id:number, list:Array<Projectile>, currentX:number, currentY:number)
{
    //get index of id
    var index:number = list.map(function (proj) { return proj.id; }).indexOf(id);
    
    //update projectile properties
    list[index].createTime = Date.now();
    list[index].isAlive = true; //now active object to render
    list[index].isFirst = false; //not the first use
    list[index].locationX = currentX;
    list[index].locationY = currentY;
}

/**
 * deactivate all projectiles within a list
 */
function resetProjectiles(list:Array<Projectile>)
{
    list.forEach(proj => {
        proj.isAlive = false;
    });
}

/**
 * Loop through list and update the Y position of all active objects
 */
function incrementProjectilePosition(list:Array<Projectile>, modifier:number)
{
    //loop through list
    list.forEach(proj => {
        //check if active
        if(proj.isAlive)
        {
            //decrease Y position (zero is top of screen so using negative value)
            proj.moveLocationY(-modifier);
            //check if position exceeds screen
            if(proj.locationY < 1)
            {
                proj.isAlive = false; //deactivate projectile
            }
        }
    });
}

/**
 * User presses key down
 */
function keyDownHandler(event:KeyboardEvent)
{
    var keyCode:number = event.keyCode || event.which;
    keyHandler(keyCode, true);
}

/**
 * User lets up on key
 */
function keyUpHandler(event:KeyboardEvent) {
    var keyCode:number = event.keyCode || event.which;
    keyHandler(keyCode, false);
}

/**
 * Generic key handler
 */
function keyHandler(keyCode:number, isDown:boolean)
{
    switch(keyCode)
    {
        case CONSTANTS.KEY_UP:
        {
            //check if key up
            if(!isDown)
            {
                fireProjectile(cannonShotList, CONSTANTS.CANNON_SHOT_OFFSET_Y); //add new shot
            }
            break;
        }
        case CONSTANTS.KEY_DOWN:
        {
            //check if key up
            if(!isDown)
            {
                fireProjectile(missileList, CONSTANTS.MISSILE_OFFSET_Y); //add new missile
            }
            break;
        }
        case CONSTANTS.KEY_LEFT:
        {
            leftArrowKeyed = isDown;
            break;
        }
        case CONSTANTS.KEY_RIGHT:
        {
            rightArrowKeyed = isDown;
            break;
        }
    }
}

/**
 * Retrieve hex color values
 */
function getColor(key:string): string {
    switch (key) {
        case CONSTANTS.CANNON_SHOT_BLUE:
            return '#00ffdf';
        case CONSTANTS.MISSLE_PINK:
            return '#f000ff';
        case CONSTANTS.WHITE:
        default:
        {
            return '#FFF';
        }
    }
}

/**
 * Check if a specific ship types image has been loaded already
 */
function isShipLoaded(type:ShipType) : boolean
{
    var loaded:boolean = false;
    
    switch(type)
    {
        case ShipType.EMPIRE_DESTROYER:
            loaded = isDestroyerLoaded;
        break;
        case ShipType.EMPIRE_TIE_FIGHTER:
            loaded = isTieFighterLoaded;
        break;
        case ShipType.REBEL_MILLENIUM_FALCON:
            loaded = isRebelShipLoaded;
        break;
    }
    
    return loaded;
}

/**
 * Verify if a ShipObject collided with a projectile 
 * and apply damage dealt if so.
 */
function hasBeenHit(enemy:ShipObject) : boolean
{
    var isHit:boolean = false;
    var damage:number = 0;
    
    //check for shot damage
    damage += doesListContainCollision(enemy.getLocationX(),
        enemy.getMaximumX(), enemy.getLocationY(), enemy.getMaximumY(),
        getProjectilesByStatus(cannonShotList, true));
    //check for missile damage
    damage += doesListContainCollision(enemy.getLocationX(),
        enemy.getMaximumX(), enemy.getLocationY(), enemy.getMaximumY(),
        getProjectilesByStatus(missileList, true));
    
    //check if damage found
    if(damage > 0)
    {
        //subtract from health & indicate hit
        enemy.health -= damage;
        isHit = true;
    }
    
    return isHit;
}

/**
 * Return the damage done by a projectile colliding with a specific 
 * coordinate range
 */
function doesListContainCollision(minX:number, maxX:number, minY:number, 
    maxY:number, list:Array<Projectile>) : number
{
    var damage:number = 0;
    var hasOverlapX:boolean = false;
    var hasOverlapY:boolean = false;
    
    list.forEach(proj => {
        
        if(damage == 0)
        {
            //check if x has overlap
            hasOverlapX = isOverlapPresent(minX,maxX,proj.getMinimumX(),proj.getMaximumX());
            
            //check if x has overlap
            hasOverlapY = isOverlapPresent(minY,maxY,proj.getMinimumY(),proj.getMaximumY());
            
            //check if occupying same space
            if(hasOverlapX && hasOverlapY)
            {
                //assign damage
                damage = proj.damage;
                //deactivate projectile
                proj.isAlive = false;
            }
        }
    });
    
    return damage;
}

/**
 * Check for user input
 */
function rebelShipUserInput(modifier:number)
{
    //check if arrow pressed and if so, move object
    if(rightArrowKeyed)
    {
        rebelShip.moveLocationX(modifier);
    }
    else if (leftArrowKeyed)
    {
        rebelShip.moveLocationX(-modifier);
    }
}

/**
 * Handles moving all projectiles to their next position
 */
function moveProjectiles(modifier:number)
{
    //move cannon shots
    incrementProjectilePosition(cannonShotList, modifier);
    
    //move missiles
    incrementProjectilePosition(missileList, modifier);
}

/**
 * Handles moving all enemy ships to their next position
 */
function moveEnemyShips(modifier:number, timeNow:number)
{
    for(var i = 0; i < enemyShipList.length; i++)
    {
        var type:ShipType = enemyShipList[i].type;
        
        //check if start time is valid
        if (enemyShipList[i].startTimeIsValid(timeNow)) 
        {    
            //check if image has been loaded
            if(isShipLoaded(enemyShipList[i].type))
            {
                enemyShipList[i].moveEnemyShip(modifier); //move
            }
                    
            //check if position exceeds screen edge
            if (enemyShipList[i].isAtBottomOfScreen()) {
                enemyShipList.splice(i, 1); //remove from list
            }
        }
    }
}

/**
 * Render the rebel ship object
 */
function drawRebelShip(canvasContext:CanvasRenderingContext2D)
{   
    //check if context is valid
    //check if object has been loaded & if so, render
	if (canvasContext && isShipLoaded(rebelShip.type)) 
    {
        canvasContext.drawImage(rebelShip.objImage, rebelShip.getLocationX(), rebelShip.getLocationY());
    }
}

/**
 * Render enemy ships
 */
function drawEnemyShips(canvasContext:CanvasRenderingContext2D, timeNow:number)
{   
    //check if context is valid
    //and that there are enemies to render
	if (canvasContext && enemyShipList.length > 0) 
    {        
        for(var i = 0; i < enemyShipList.length; i++)
        {
            //check if image has been loaded
            //and if timing is valid
            if (isShipLoaded(enemyShipList[i].type) && enemyShipList[i].startTimeIsValid(timeNow)) 
            {
                //render object
                canvasContext.drawImage(enemyShipList[i].objImage, enemyShipList[i].getLocationX(), enemyShipList[i].getLocationY());
                
                //check for collision
                //and check if no health left
                if(hasBeenHit(enemyShipList[i]) && enemyShipList[i].health < 1)
                {
                    //update score
                    currentUserScore.updateScore(enemyShipList[i].type, enemyShipList[i].startDate, 
                        enemyShipList[i].maxHealth, currentLevel);
                    //remove from list
                    enemyShipList.splice(i, 1); 
                }
            }
        }
    }
}

/**
 * Render current Score and Health
 */
function drawInfoPanel(canvasContext:CanvasRenderingContext2D)
{
    if(canvasContext)
    {
        var level:string = "Level: " + currentLevel;
        var remainingEnemies:string = "Empire: " + getRemainingEnemies().toString();
        var health:string = "Health: " + rebelShip.health.toString();
        var missiles:string = "Missiles: " + getProjectilesByStatus(missileList, true).length.toString();
        missiles += " / " + missileList.length;
        
        //Score Info
        canvasContext.fillStyle = "rgb(250, 250, 250)";
        canvasContext.font = "16px 'Press Start 2P'";
        canvasContext.textAlign = "left";
        canvasContext.textBaseline = "top";
        canvasContext.fillText(level, CONSTANTS.INFO_TEXT_SPACING, CONSTANTS.INFO_TEXT_SPACING);
        canvasContext.fillText(remainingEnemies, CONSTANTS.INFO_TEXT_SPACING, CONSTANTS.INFO_TEXT_SPACING * 2);
        
        //Ship Info
        canvasContext.fillStyle = "rgb(239, 255, 0)";
        canvasContext.fillText(health, CONSTANTS.INFO_TEXT_SPACING, CONSTANTS.INFO_TEXT_SPACING * 3);
        canvasContext.fillText(missiles, CONSTANTS.INFO_TEXT_SPACING, CONSTANTS.INFO_TEXT_SPACING * 4);
    }
}

/**
 * Draw all projectiles to canvas
 */
function drawProjectiles(canvasContext:CanvasRenderingContext2D) 
{
    //check if context is valid
    if (canvasContext)
    {
        //handle missiles
        renderProjectileList(canvasContext, missileList);
        //handle shots
        renderProjectileList(canvasContext, cannonShotList);
    }
}

/**
 * Render a list of projectile objects
 */
function renderProjectileList(canvasContext:CanvasRenderingContext2D, list:Array<Projectile>) 
{
    //check if context is valid
    //check if any exist
    if (canvasContext && list.length > 0)
    {
        list.forEach(proj => {
            //check if active
            if(proj.isAlive)
            {
                canvasContext.beginPath();
                canvasContext.arc(proj.locationX, proj.locationY, proj.radius, 0, 2 * Math.PI);
                canvasContext.fillStyle = getColor(proj.color);
                canvasContext.fill();
                canvasContext.closePath();
            }
        });
    }
}

/**
 * MAIN GAME LOOP
 */
function main() {
    //get the current canvas
    var canvasContext:CanvasRenderingContext2D =  gameCanvas.getContext("2d"); 
    
    //clear canvas
    canvasContext.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    
    //get current time & compare to past time to get delta
    var timeNow:number = Date.now();
	var delta:number = (timeNow - timePrevious) / 1000;
    
    //check if ready to render
    if(isGameReady)
    {
        //check for user input
        rebelShipUserInput(delta);
        moveProjectiles(delta);
        moveEnemyShips(delta, timeNow);
        
        //render objects
        drawRebelShip(canvasContext);
        drawEnemyShips(canvasContext, timeNow);
        
        //render projectiles
        drawProjectiles(canvasContext);
        
        //render score
        drawInfoPanel(canvasContext);
    }
    
    //store current time as previous
    timePrevious = timeNow;
    
    //check if enemies left
    if(enemyShipList.length == 0)
    {
        //game flag to inactive
        isGameReady = false;
        
        //notify user level is complete
        loadLevelCompleteModal();
    }
    
    //re-animate
    requestAnimationFrame(main);
    
};

/*** START THE GAME ***/

/**
 * Start the game
 */
function startGame()
{
    //set game active
    isGameReady = true;
    
    //init game state vars
    timePrevious = Date.now();

    //create initial level
    buildLevel();

    //start main loop
    main();
}

/*** WINDOW MANAGEMENT ***/

/**
 * Load Modal that notifies user that the level is complete
 */
function loadLevelCompleteModal()
{
    //get page items
    var userNameLabel:HTMLLabelElement = <HTMLLabelElement>window.document.getElementById('lvlCompleteUserName');
    var levelLabel:HTMLLabelElement = <HTMLLabelElement>window.document.getElementById('lvlCompleteLevel');
    var scoreLabel:HTMLLabelElement = <HTMLLabelElement>window.document.getElementById('lvlCompleteScore');
    
    //assign values
    userNameLabel.textContent = currentUserScore.name;
    levelLabel.textContent = currentLevel.toString();
    scoreLabel.textContent = currentUserScore.currentScore.toString();
    
    //open window
    openLevelCompleteWindow(); 
}

/**
 * Initialize start of game. Stores current user name
 */
function UserIsReady()
{
    //get user input
    var welcomeUserNameTextbox:HTMLInputElement = <HTMLInputElement>window.document.getElementById('welcomeUserName');
    var name:string = welcomeUserNameTextbox.value;
    
    //init user data obj
    currentLevel = CONSTANTS.DEFAULT_START_LEVEL;
    currentUserScore = new Score(name, currentLevel);
    currentUserHighScore = new HighScore(name, getCurrentUserHighScore(name));
    
    //close window
    closeWelcomeWindow();
    
    //start game
    startGame();    
}

/**
 * Bypass welcome screen & init default values to get straight to game
 */
function startDebugGame()
{
    var name:string = "Kylo Ren";
    //init user data obj
    currentLevel = CONSTANTS.DEFAULT_START_LEVEL;
    currentUserScore = new Score(name, currentLevel);
    currentUserHighScore = new HighScore(name, 0);
    //start game
    startGame();  
}

/**
 * Initialize next level of game
 */
function UserContinue()
{
    //close window
    closeLevelCompleteWindow();
    
    //exit current level
    continueGame();
}

/**
 * Get string value from cookie of a specific name
 */
function getCookieValue(cname:string) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

/**
 * Get stored high score data
 */
function getHighScoreCookieData()
{
    return JSON.parse(getCookieValue(CONSTANTS.DEFAULT_HIGH_SCORE_COOKIE_NAME));
}

/**
 * Get stored high score for specific user
 */
function getCurrentUserScoreCookieData(name:string)
{
    return getCookieValue(CONSTANTS.DEFAULT_HIGH_SCORE_COOKIE_NAME + name);
}

/**
 * Set High Score Cookie
 */
function setHighScoreCookie(value:any)
{
    document.cookie = CONSTANTS.DEFAULT_HIGH_SCORE_COOKIE_NAME + "=" + JSON.stringify(value);
}

/**
 * Create a default High Score Cookie w/ dummy data
 */
function setDefaultHighScoreCookie()
{
    //create new object
    var defaultHighScoreList:Array<HighScore> = new Array<HighScore>();
    defaultHighScoreList.push(new HighScore('Player 1',5));
    defaultHighScoreList.push(new HighScore('Player 2',20));
    defaultHighScoreList.push(new HighScore('Player 3',15));
    //store
    setHighScoreCookie(defaultHighScoreList);
}

/**
 * Open Welcome Window
 */
function openWelcomeWindow()
{
    initializeHighScores();
    
    displayHighScoreData();
    
    var link:HTMLLinkElement = <HTMLLinkElement>window.document.getElementById('welcomeLink');
    link.click();
}

/**
 * Dynamically add table to Welcome Window containing high scores
 */
function displayHighScoreData()
{
    var table:HTMLTableElement = <HTMLTableElement>document.createElement("table");
    table.classList.add("centerTable");
    
    if(highScoreList.length > 0)
    {
        //create row
        var titleRow:HTMLTableRowElement = <HTMLTableRowElement>document.createElement("tr");
        //create cells
        var titleCell:HTMLTableCellElement = <HTMLTableCellElement>document.createElement("td");
        titleCell.colSpan = 2;
        titleCell.align = "center";
        //create text
        var titleText:Text = <Text>document.createTextNode("HIGH SCORES");
        //add to table
        titleCell.appendChild(titleText);
        titleRow.appendChild(titleCell);
        table.appendChild(titleRow);
        
        //create row
        var headerRow:HTMLTableRowElement = <HTMLTableRowElement>document.createElement("tr");
        //create cells
        var headerCellName:HTMLTableCellElement = <HTMLTableCellElement>document.createElement("td");
        headerCellName.align = "left";
        var headerCellScore:HTMLTableCellElement = <HTMLTableCellElement>document.createElement("td");
        headerCellScore.align = "left";
        //create text
        var headerNameText:Text = <Text>document.createTextNode("NAME");
        var headerScoreText:Text = <Text>document.createTextNode("SCORE");
        
        //add to table
        headerCellName.appendChild(headerNameText);
        headerCellScore.appendChild(headerScoreText);
        headerRow.appendChild(headerCellName);
        headerRow.appendChild(headerCellScore);
        table.appendChild(headerRow);
        
        for(var i = 0; i < highScoreList.length; i++)
        {
            //create row
            var newRow:HTMLTableRowElement = <HTMLTableRowElement>document.createElement("tr");
            //create cells
            var nameCell:HTMLTableCellElement = <HTMLTableCellElement>document.createElement("td");
            nameCell.align = "left";
            var scoreCell:HTMLTableCellElement = <HTMLTableCellElement>document.createElement("td");
            scoreCell.align = "center";
            //create text
            var nameText:Text = <Text>document.createTextNode(highScoreList[i].name);
            var scoreText:Text = <Text>document.createTextNode(highScoreList[i].score.toString());
            
            nameCell.appendChild(nameText);
            scoreCell.appendChild(scoreText);
            newRow.appendChild(nameCell);
            newRow.appendChild(scoreCell);

            table.appendChild(newRow);
        }
    }
    
    var div:HTMLDivElement = <HTMLDivElement>document.getElementById("highScoreDiv");
    div.appendChild(table);
}

/**
 * Retrieve previous high scores among all users
 */
function initializeHighScores()
{
    //wipe list
    highScoreList.splice(0);
    
    //get high score data
    var values = getHighScoreCookieData();
    
    //ensure not null
    if(values != null)
    {
        //sort from highest to lowest, returns list of keys
        var keysSorted = Object.keys(values).sort(function(a,b){return values[a].score-values[b].score}).reverse();
        //limit to 5 scores
        var max:number = keysSorted.length;
        if(max > 5) { max = 5; }
        var name:string;
        var score:number;
        //use keys to populate global object
        for(var i = 0; i < max; i++)
        {
            highScoreList.push(new HighScore(values[keysSorted[i]].name, values[keysSorted[i]].score));
        }
    }
    else
    {
        setDefaultHighScoreCookie();
    }
}

/**
 * Retrieve highest score for current user
 */
function getCurrentUserHighScore(name:string) : number
{
    var score:number = 0;
    
    score = Number(getCurrentUserScoreCookieData(name));
    
    return score;
}

function closeWelcomeWindow()
{
    var link:HTMLLinkElement = <HTMLLinkElement>window.document.getElementById('closeWelcomeLink');
    link.click();
}

function openLevelCompleteWindow()
{
    var link:HTMLLinkElement = <HTMLLinkElement>window.document.getElementById('levelCompleteLink');
    link.click();
    var continueButton:HTMLButtonElement = <HTMLButtonElement>window.document.getElementById('buttonContinue');
    continueButton.focus();
}

function closeLevelCompleteWindow()
{
    var link:HTMLLinkElement = <HTMLLinkElement>window.document.getElementById('closeLevelCompleteLink');
    link.click();
}

