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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*** OBJECT CLASSES ***/
/**
 * Global Constants
 */
var Constants = (function () {
    function Constants() {
        //game mgmt settings
        this.DEBUG_MODE = true;
        this.DEFAULT_START_LEVEL = 1;
        this.DEFAULT_HIGH_SCORE_COOKIE_NAME = 'RebelWarsHighScores';
        this.INFO_TEXT_SPACING = 24;
        //key values
        this.KEY_LEFT = 37;
        this.KEY_UP = 38;
        this.KEY_RIGHT = 39;
        this.KEY_DOWN = 40;
        //dimensions
        this.CLIENT_WINDOW_MARGIN = 10;
        this.CANNON_SHOT_RADIUS = 4;
        this.CANNON_SHOT_OFFSET_Y = -2;
        this.MISSILE_RADIUS = 6;
        this.MISSILE_OFFSET_Y = -2;
        this.DESTROYER_HEIGHT_HIT_FACTOR = 2;
        this.REBEL_SHIP_HEIGHT_HIT_FACTOR = 2;
        this.TIE_FIGHTER_HEIGHT_HIT_FACTOR = 2;
        //limits
        this.MISSILE_LIMIT = 1;
        this.CANNON_SHOT_LIMIT = 10;
        this.NUM_FIGHTERS_PER_LEVEL = 2;
        this.NUM_DESTROYERS_PER_LEVEL = 1;
        this.MAX_SECONDS_MULTIPLIER_PER_LEVEL = 5;
        this.LEVEL_LOAD_BUFFER_SECONDS = 2;
        this.BOSS_LEVEL_FACTOR = 5;
        //speeds
        this.BASE_SPEED = 256;
        this.REBEL_SHIP_SPEED = this.BASE_SPEED;
        this.TIE_FIGHTER_SPEED = (this.BASE_SPEED / 4);
        this.DESTROYER_SPEED = (this.BASE_SPEED / 6);
        this.CANNON_SHOT_SPEED = this.BASE_SPEED;
        this.MISSILE_SPEED = (this.BASE_SPEED / 2);
        //colors
        this.CANNON_SHOT_BLUE = 'CANNON_BLUE';
        this.MISSLE_PINK = 'MISSLE_PINK';
        this.WHITE = 'WHITE';
        //health & damage
        this.CANNON_SHOT_DAMAGE = 1;
        this.MISSILE_DAMAGE = 5;
        this.TIE_FIGHTER_HEALTH = 1;
        this.DESTROYER_HEALTH = 5;
        this.REBEL_SHIP_HEALTH = 3;
    }
    return Constants;
})();
var ProjectileType;
(function (ProjectileType) {
    ProjectileType[ProjectileType["CANNON_SHOT"] = 0] = "CANNON_SHOT";
    ProjectileType[ProjectileType["MISSILE"] = 1] = "MISSILE";
})(ProjectileType || (ProjectileType = {}));
var ShipType;
(function (ShipType) {
    ShipType[ShipType["REBEL_MILLENIUM_FALCON"] = 0] = "REBEL_MILLENIUM_FALCON";
    ShipType[ShipType["EMPIRE_TIE_FIGHTER"] = 1] = "EMPIRE_TIE_FIGHTER";
    ShipType[ShipType["EMPIRE_DESTROYER"] = 2] = "EMPIRE_DESTROYER";
})(ShipType || (ShipType = {}));
var CONSTANTS = new Constants();
/**
 * Class to store enemy kill data
 */
var EnemyKill = (function () {
    function EnemyKill(enemy, enemyStart, enemyMaxHealth, level) {
        //assign
        this.enemyType = enemy;
        this.enemyStartTime = enemyStart;
        this.enemyMaxHealth = enemyMaxHealth;
        this.level = level;
        //default date to now
        this.killTime = new Date(Date.now());
    }
    return EnemyKill;
})();
/**
 * Class to store user score data
 */
var Score = (function () {
    function Score(name, level) {
        //assign
        this.name = name;
        this.levelStart = level;
        //defaults
        this.killList = new Array();
        this.gameDate = new Date(Date.now());
        this.currentScore = 0;
    }
    /**
     * Add to current score
     */
    Score.prototype.updateScore = function (enemy, enemyStart, enemyMaxHealth, level) {
        //create & push new kill object
        this.killList.push(new EnemyKill(enemy, enemyStart, enemyMaxHealth, level));
        //update numeric score
        this.currentScore += enemyMaxHealth;
    };
    return Score;
})();
/**
 * Class to store historical score data
 */
var HighScore = (function () {
    function HighScore(name, score) {
        this.name = name;
        this.score = score;
    }
    return HighScore;
})();
/**
 * Base class for on screen objects
 */
var BaseGameObject = (function () {
    function BaseGameObject(currentX, currentY, canvasWidth, canvasHeight, speed) {
        this.speed = speed;
        this.maxHeight = canvasHeight;
        this.maxWidth = canvasWidth;
        this.locationX = currentX;
        this.locationY = currentY;
    }
    /**
     * Change current X (horizontal) coordinate
     */
    BaseGameObject.prototype.moveLocationX = function (pixels) {
        this.locationX = this.locationX + (pixels * this.speed);
    };
    /**
     * Change current Y (vertical) coordinate
     */
    BaseGameObject.prototype.moveLocationY = function (pixels) {
        this.locationY = this.locationY + (pixels * this.speed);
    };
    return BaseGameObject;
})();
/**
 * Base ship object
 */
var ShipObject = (function (_super) {
    __extends(ShipObject, _super);
    function ShipObject(currentX, currentY, canvasWidth, canvasHeight, speed, type, createDate, health, heightHitFactor) {
        //base constructor
        _super.call(this, currentX, currentY, canvasWidth, canvasHeight, speed);
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
    ShipObject.prototype.getLocationY = function () {
        if (this.locationY < 1) {
            this.locationY = 0;
        }
        else if (this.locationY > this.maxHeight - this.objImage.naturalHeight) {
            this.locationY = this.maxHeight - this.objImage.naturalHeight;
        }
        return this.locationY;
    };
    /**
     * Get Y (vertical) coordinate including height of image
     */
    ShipObject.prototype.getMaximumY = function () {
        return this.getLocationY() + (this.objImage.naturalHeight / this.heightHitFactor);
    };
    /**
     * Get current X (horizontal) coordinate
     */
    ShipObject.prototype.getLocationX = function () {
        if (this.locationX < 1) {
            this.locationX = 0;
        }
        else if (this.locationX > this.maxWidth - this.objImage.naturalWidth) {
            this.locationX = this.maxWidth - this.objImage.naturalWidth;
        }
        return this.locationX;
    };
    /**
     * Get X (horizontal) coordinate including width of image
     */
    ShipObject.prototype.getMaximumX = function () {
        return this.getLocationX() + this.objImage.naturalWidth;
    };
    /**
     * Retrieve the starting X coordinate for a projectile
     */
    ShipObject.prototype.getProjectileLocationStartX = function () {
        return this.getLocationX() + (this.objImage.naturalWidth / 2);
    };
    /**
     * Retrieve the starting Y coordinate for a projectile
     */
    ShipObject.prototype.getProjectileLocationStartY = function (offset) {
        return this.getLocationY() + offset;
    };
    /**
     * Check if object has reached the bottom limit of the screen
     */
    ShipObject.prototype.isAtBottomOfScreen = function () {
        var atBottom = false;
        if ((this.locationY + this.objImage.naturalHeight) > browserHeight) {
            atBottom = true;
        }
        return atBottom;
    };
    /**
     * Check if object start time is less than current time
     */
    ShipObject.prototype.startTimeIsValid = function (time) {
        if (time > this.startDate.getTime()) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * Enemy ship specific Y (vertical) coordinate change
     */
    ShipObject.prototype.moveEnemyShip = function (pixels) {
        var factor = (pixels * this.speed);
        //check if object is a destroyer & is near top of screen
        if (this.type == ShipType.EMPIRE_DESTROYER &&
            this.locationY < (this.objImage.naturalHeight / 2)) {
            //check if current position change is smaller than image size
            if (factor < this.objImage.naturalHeight) {
                //larger images appear to not move if the pixel
                //change is too low so we amplify their initial movement
                factor = (pixels * this.speed) * 1.5;
            }
        }
        this.locationY = this.locationY + factor;
    };
    return ShipObject;
})(BaseGameObject);
/**
 * User controlled Rebel Ship
 */
var RebelShipObject = (function (_super) {
    __extends(RebelShipObject, _super);
    function RebelShipObject(canvasWidth, canvasHeight) {
        //create & assign image
        var image = new Image();
        image.src = 'images/falcon2.png';
        image.onload = function () { isRebelShipLoaded = true; };
        this.objImage = image;
        var currentX = canvasWidth / 2;
        var currentY = canvasHeight;
        //base constructor
        _super.call(this, currentX, currentY, canvasWidth, canvasHeight, CONSTANTS.REBEL_SHIP_SPEED, ShipType.REBEL_MILLENIUM_FALCON, new Date(Date.now()), CONSTANTS.REBEL_SHIP_HEALTH, CONSTANTS.REBEL_SHIP_HEIGHT_HIT_FACTOR);
    }
    RebelShipObject.prototype.reset = function () {
        this.locationX = this.maxWidth / 2;
        this.locationY = this.maxHeight;
    };
    return RebelShipObject;
})(ShipObject);
/**
 * Fighter class enemy ship
 */
var TieFighterObject = (function (_super) {
    __extends(TieFighterObject, _super);
    function TieFighterObject(currentX, currentY, canvasWidth, canvasHeight, startTime) {
        //base constructor
        _super.call(this, currentX, currentY, canvasWidth, canvasHeight, CONSTANTS.TIE_FIGHTER_SPEED, ShipType.EMPIRE_TIE_FIGHTER, startTime, CONSTANTS.TIE_FIGHTER_HEALTH, CONSTANTS.TIE_FIGHTER_HEIGHT_HIT_FACTOR);
        //create & assign image
        var image = new Image();
        image.src = 'images/TieFighter3.png';
        image.onload = function () { isTieFighterLoaded = true; };
        this.objImage = image;
    }
    return TieFighterObject;
})(ShipObject);
/**
 * Destroyer class enemy ship
 */
var DestroyerObject = (function (_super) {
    __extends(DestroyerObject, _super);
    function DestroyerObject(currentX, currentY, canvasWidth, canvasHeight, startTime) {
        //base constructor
        _super.call(this, currentX, currentY, canvasWidth, canvasHeight, CONSTANTS.DESTROYER_SPEED, ShipType.EMPIRE_DESTROYER, startTime, CONSTANTS.DESTROYER_HEALTH, CONSTANTS.DESTROYER_HEIGHT_HIT_FACTOR);
        //create & assign image
        var image = new Image();
        image.src = 'images/Destroyer3.png';
        image.onload = function () { isDestroyerLoaded = true; };
        this.objImage = image;
    }
    return DestroyerObject;
})(ShipObject);
/**
 * Base projectile class
 */
var Projectile = (function (_super) {
    __extends(Projectile, _super);
    function Projectile(currentX, currentY, speed, canvasWidth, canvasHeight, type, id, now, radius, color, damage) {
        this.isAlive = false;
        this.isFirst = true;
        this.type = type;
        this.id = id;
        this.createTime = now;
        this.radius = radius;
        this.color = color;
        this.damage = damage;
        //base constructor
        _super.call(this, currentX, currentY, canvasWidth, canvasHeight, speed);
    }
    /**
     * Get lowest X (horizontal) value for rendered projectile
     */
    Projectile.prototype.getMinimumX = function () {
        return this.locationX - this.radius;
    };
    /**
     * Get highest X (horizontal) value for rendered projectile
     */
    Projectile.prototype.getMaximumX = function () {
        return this.locationX + this.radius;
    };
    /**
     * Get lowest Y (vertical) value for rendered projectile
     */
    Projectile.prototype.getMinimumY = function () {
        return this.locationY - this.radius;
    };
    /**
     * Get highest Y (vertical) value for rendered projectile
     */
    Projectile.prototype.getMaximumY = function () {
        return this.locationY + this.radius;
    };
    return Projectile;
})(BaseGameObject);
/*** INITIALIZE PAGE ***/
//Get container dimensions
var browserWidth = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) - CONSTANTS.CLIENT_WINDOW_MARGIN;
var browserHeight = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) - CONSTANTS.CLIENT_WINDOW_MARGIN;
//create canvas
var gameCanvas = document.createElement("canvas");
gameCanvas.width = browserWidth;
gameCanvas.height = browserHeight;
//add canvas to page
document.body.appendChild(gameCanvas);
/*** INITIALIZE GAME OBJECTS ***/
//user controlled ship
var rebelShip = new RebelShipObject(browserWidth, browserHeight);
//list of enemy ships
var enemyShipList = new Array();
var bossList = new Array();
//list of cannon shots
var cannonShotList = getPopulatedProjectileList(ProjectileType.CANNON_SHOT, CONSTANTS.CANNON_SHOT_SPEED, CONSTANTS.CANNON_SHOT_LIMIT, gameCanvas.width, gameCanvas.height);
//list of missiles
var missileList = getPopulatedProjectileList(ProjectileType.MISSILE, CONSTANTS.MISSILE_SPEED, CONSTANTS.MISSILE_LIMIT, gameCanvas.width, gameCanvas.height);
//manage user input controls
var rightArrowKeyed = false;
var leftArrowKeyed = false;
//bind keyboard event handlers
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
//init game mgmt vars
var intervalHolder = null;
var isRebelShipLoaded = false;
var isTieFighterLoaded = false;
var isDestroyerLoaded = false;
var isGameReady = false;
var currentLevel = CONSTANTS.DEFAULT_START_LEVEL;
var timePrevious = Date.now();
//init user stats
var currentUserScore = new Score("Player 1", currentLevel);
var currentUserHighScore = new HighScore();
var highScoreList = new Array();
//get user input
if (!CONSTANTS.DEBUG_MODE) {
    openWelcomeWindow();
}
else {
    startDebugGame();
}
/*** GAME FUNCTIONS ***/
/**
 * Setup objects in new level
 */
function buildLevel() {
    //clear enemy list
    enemyShipList = new Array();
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
function addEnemyShips(numberOfShips, type) {
    //loop until limit reached
    for (var i = 0; i < numberOfShips; i++) {
        var ship = getNewEnemyShip(type);
        enemyShipList.push(ship); //add new object
    }
}
/**
 * Initialize new enemy ship object based on type requested
 */
function getNewEnemyShip(type) {
    var ship = null;
    var randomX = getRandomInteger(0, browserWidth);
    var randomSeconds = getRandomInteger(0, (currentLevel * CONSTANTS.MAX_SECONDS_MULTIPLIER_PER_LEVEL));
    var randomTime = addSecondsToDate(Date.now(), (randomSeconds + CONSTANTS.LEVEL_LOAD_BUFFER_SECONDS));
    switch (type) {
        case ShipType.EMPIRE_DESTROYER:
            ship = new DestroyerObject(randomX, 0, browserWidth, browserHeight, randomTime);
            break;
        case ShipType.EMPIRE_TIE_FIGHTER:
        default:
            ship = new TieFighterObject(randomX, 0, browserWidth, browserHeight, randomTime);
            break;
    }
    return ship;
}
/**
 * Returns random integer
 */
function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
/**
 * Add a user provided amount of seconds to the passed in date
 */
function addSecondsToDate(dateNumber, seconds) {
    return new Date(dateNumber + seconds * 1000);
}
/**
 * Check if two number ranges overlap.
 */
function isOverlapPresent(firstObjectFloor, firstObjectCeiling, secondObjectFloor, secondObjectCeiling) {
    return (firstObjectFloor <= secondObjectCeiling && secondObjectFloor <= firstObjectCeiling);
}
/**
 * Get amount of enemy ships remaining
 */
function getRemainingEnemies() {
    return enemyShipList.length + bossList.length;
}
/**
 * Reset game state and advance to next level
 */
function continueGame() {
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
function resetObjects() {
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
function equipMissiles() {
    //check if current level is multiple
    if (currentLevel % CONSTANTS.BOSS_LEVEL_FACTOR == 0) {
        //init missile
        var id = missileList.length;
        var radius = CONSTANTS.MISSILE_RADIUS;
        var color = CONSTANTS.MISSLE_PINK;
        var damage = CONSTANTS.MISSILE_DAMAGE;
        var missile = new Projectile(0, 0, CONSTANTS.MISSILE_SPEED, gameCanvas.width, gameCanvas.height, ProjectileType.MISSILE, id, 0, radius, color, damage);
        //add missile
        missileList.push(missile);
    }
}
/**
 * Create list populated with Projectile projects
 */
function getPopulatedProjectileList(type, speed, limit, canvasWidth, canvasHeight) {
    var list = new Array();
    var radius = 0;
    var color = '';
    var damage = 0;
    switch (type) {
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
        list.push(new Projectile(0, 0, speed, canvasWidth, canvasHeight, type, i, 0, radius, color, damage));
    }
    return list;
}
/**
 * Get id of the first unused projectile object
 */
function getUnusedProjectileId(list) {
    var id = -1; //init to negative
    //only return objects not alive
    var filteredList = getProjectilesByStatus(list, false);
    //check if found
    if (filteredList.length > 0) {
        id = filteredList[0].id; //get id from first index
    }
    return id;
}
/**
 * Retrieve only projectiles in a certain status
 */
function getProjectilesByStatus(list, isActive) {
    return list.filter(function (proj) {
        //check for a specific type
        if (proj.type == ProjectileType.MISSILE && !isActive) {
            //if needing an inactive missile, only return first shot
            return (proj.isAlive === isActive && proj.isFirst === true);
        }
        else {
            return proj.isAlive === isActive;
        }
    });
}
/**
 * Create new projectile object
 */
function fireProjectile(list, offset) {
    //get id of next available unused projectile
    var id = getUnusedProjectileId(list);
    //check if id is valid
    if (id >= 0) {
        //get current location of ship
        var x = rebelShip.getProjectileLocationStartX();
        var y = rebelShip.getProjectileLocationStartY(offset);
        //activate projectile
        activateProjectile(id, list, x, y);
    }
}
/**
 * Activate projectile object for a specific id
 */
function activateProjectile(id, list, currentX, currentY) {
    //get index of id
    var index = list.map(function (proj) { return proj.id; }).indexOf(id);
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
function resetProjectiles(list) {
    list.forEach(function (proj) {
        proj.isAlive = false;
    });
}
/**
 * Loop through list and update the Y position of all active objects
 */
function incrementProjectilePosition(list, modifier) {
    //loop through list
    list.forEach(function (proj) {
        //check if active
        if (proj.isAlive) {
            //decrease Y position (zero is top of screen so using negative value)
            proj.moveLocationY(-modifier);
            //check if position exceeds screen
            if (proj.locationY < 1) {
                proj.isAlive = false; //deactivate projectile
            }
        }
    });
}
/**
 * User presses key down
 */
function keyDownHandler(event) {
    var keyCode = event.keyCode || event.which;
    keyHandler(keyCode, true);
}
/**
 * User lets up on key
 */
function keyUpHandler(event) {
    var keyCode = event.keyCode || event.which;
    keyHandler(keyCode, false);
}
/**
 * Generic key handler
 */
function keyHandler(keyCode, isDown) {
    switch (keyCode) {
        case CONSTANTS.KEY_UP:
            {
                //check if key up
                if (!isDown) {
                    fireProjectile(cannonShotList, CONSTANTS.CANNON_SHOT_OFFSET_Y); //add new shot
                }
                break;
            }
        case CONSTANTS.KEY_DOWN:
            {
                //check if key up
                if (!isDown) {
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
function getColor(key) {
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
function isShipLoaded(type) {
    var loaded = false;
    switch (type) {
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
function hasBeenHit(enemy) {
    var isHit = false;
    var damage = 0;
    //check for shot damage
    damage += doesListContainCollision(enemy.getLocationX(), enemy.getMaximumX(), enemy.getLocationY(), enemy.getMaximumY(), getProjectilesByStatus(cannonShotList, true));
    //check for missile damage
    damage += doesListContainCollision(enemy.getLocationX(), enemy.getMaximumX(), enemy.getLocationY(), enemy.getMaximumY(), getProjectilesByStatus(missileList, true));
    //check if damage found
    if (damage > 0) {
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
function doesListContainCollision(minX, maxX, minY, maxY, list) {
    var damage = 0;
    var hasOverlapX = false;
    var hasOverlapY = false;
    list.forEach(function (proj) {
        if (damage == 0) {
            //check if x has overlap
            hasOverlapX = isOverlapPresent(minX, maxX, proj.getMinimumX(), proj.getMaximumX());
            //check if x has overlap
            hasOverlapY = isOverlapPresent(minY, maxY, proj.getMinimumY(), proj.getMaximumY());
            //check if occupying same space
            if (hasOverlapX && hasOverlapY) {
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
function rebelShipUserInput(modifier) {
    //check if arrow pressed and if so, move object
    if (rightArrowKeyed) {
        rebelShip.moveLocationX(modifier);
    }
    else if (leftArrowKeyed) {
        rebelShip.moveLocationX(-modifier);
    }
}
/**
 * Handles moving all projectiles to their next position
 */
function moveProjectiles(modifier) {
    //move cannon shots
    incrementProjectilePosition(cannonShotList, modifier);
    //move missiles
    incrementProjectilePosition(missileList, modifier);
}
/**
 * Handles moving all enemy ships to their next position
 */
function moveEnemyShips(modifier, timeNow) {
    for (var i = 0; i < enemyShipList.length; i++) {
        var type = enemyShipList[i].type;
        //check if start time is valid
        if (enemyShipList[i].startTimeIsValid(timeNow)) {
            //check if image has been loaded
            if (isShipLoaded(enemyShipList[i].type)) {
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
function drawRebelShip(canvasContext) {
    //check if context is valid
    //check if object has been loaded & if so, render
    if (canvasContext && isShipLoaded(rebelShip.type)) {
        canvasContext.drawImage(rebelShip.objImage, rebelShip.getLocationX(), rebelShip.getLocationY());
    }
}
/**
 * Render enemy ships
 */
function drawEnemyShips(canvasContext, timeNow) {
    //check if context is valid
    //and that there are enemies to render
    if (canvasContext && enemyShipList.length > 0) {
        for (var i = 0; i < enemyShipList.length; i++) {
            //check if image has been loaded
            //and if timing is valid
            if (isShipLoaded(enemyShipList[i].type) && enemyShipList[i].startTimeIsValid(timeNow)) {
                //render object
                canvasContext.drawImage(enemyShipList[i].objImage, enemyShipList[i].getLocationX(), enemyShipList[i].getLocationY());
                //check for collision
                //and check if no health left
                if (hasBeenHit(enemyShipList[i]) && enemyShipList[i].health < 1) {
                    //update score
                    currentUserScore.updateScore(enemyShipList[i].type, enemyShipList[i].startDate, enemyShipList[i].maxHealth, currentLevel);
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
function drawInfoPanel(canvasContext) {
    if (canvasContext) {
        var level = "Level: " + currentLevel;
        var remainingEnemies = "Empire: " + getRemainingEnemies().toString();
        var health = "Health: " + rebelShip.health.toString();
        var missiles = "Missiles: " + getProjectilesByStatus(missileList, true).length.toString();
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
function drawProjectiles(canvasContext) {
    //check if context is valid
    if (canvasContext) {
        //handle missiles
        renderProjectileList(canvasContext, missileList);
        //handle shots
        renderProjectileList(canvasContext, cannonShotList);
    }
}
/**
 * Render a list of projectile objects
 */
function renderProjectileList(canvasContext, list) {
    //check if context is valid
    //check if any exist
    if (canvasContext && list.length > 0) {
        list.forEach(function (proj) {
            //check if active
            if (proj.isAlive) {
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
    var canvasContext = gameCanvas.getContext("2d");
    //clear canvas
    canvasContext.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    //get current time & compare to past time to get delta
    var timeNow = Date.now();
    var delta = (timeNow - timePrevious) / 1000;
    //check if ready to render
    if (isGameReady) {
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
    if (enemyShipList.length == 0) {
        //game flag to inactive
        isGameReady = false;
        //notify user level is complete
        loadLevelCompleteModal();
    }
    //re-animate
    requestAnimationFrame(main);
}
;
/*** START THE GAME ***/
/**
 * Start the game
 */
function startGame() {
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
function loadLevelCompleteModal() {
    //get page items
    var userNameLabel = window.document.getElementById('lvlCompleteUserName');
    var levelLabel = window.document.getElementById('lvlCompleteLevel');
    var scoreLabel = window.document.getElementById('lvlCompleteScore');
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
function UserIsReady() {
    //get user input
    var welcomeUserNameTextbox = window.document.getElementById('welcomeUserName');
    var name = welcomeUserNameTextbox.value;
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
function startDebugGame() {
    var name = "Kylo Ren";
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
function UserContinue() {
    //close window
    closeLevelCompleteWindow();
    //exit current level
    continueGame();
}
/**
 * Get string value from cookie of a specific name
 */
function getCookieValue(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ')
            c = c.substring(1);
        if (c.indexOf(name) == 0)
            return c.substring(name.length, c.length);
    }
    return "";
}
/**
 * Get stored high score data
 */
function getHighScoreCookieData() {
    return JSON.parse(getCookieValue(CONSTANTS.DEFAULT_HIGH_SCORE_COOKIE_NAME));
}
/**
 * Get stored high score for specific user
 */
function getCurrentUserScoreCookieData(name) {
    return getCookieValue(CONSTANTS.DEFAULT_HIGH_SCORE_COOKIE_NAME + name);
}
/**
 * Set High Score Cookie
 */
function setHighScoreCookie(value) {
    document.cookie = CONSTANTS.DEFAULT_HIGH_SCORE_COOKIE_NAME + "=" + JSON.stringify(value);
}
/**
 * Create a default High Score Cookie w/ dummy data
 */
function setDefaultHighScoreCookie() {
    //create new object
    var defaultHighScoreList = new Array();
    defaultHighScoreList.push(new HighScore('Player 1', 5));
    defaultHighScoreList.push(new HighScore('Player 2', 20));
    defaultHighScoreList.push(new HighScore('Player 3', 15));
    //store
    setHighScoreCookie(defaultHighScoreList);
}
/**
 * Open Welcome Window
 */
function openWelcomeWindow() {
    initializeHighScores();
    displayHighScoreData();
    var link = window.document.getElementById('welcomeLink');
    link.click();
}
/**
 * Dynamically add table to Welcome Window containing high scores
 */
function displayHighScoreData() {
    var table = document.createElement("table");
    table.classList.add("centerTable");
    if (highScoreList.length > 0) {
        //create row
        var titleRow = document.createElement("tr");
        //create cells
        var titleCell = document.createElement("td");
        titleCell.colSpan = 2;
        titleCell.align = "center";
        //create text
        var titleText = document.createTextNode("HIGH SCORES");
        //add to table
        titleCell.appendChild(titleText);
        titleRow.appendChild(titleCell);
        table.appendChild(titleRow);
        //create row
        var headerRow = document.createElement("tr");
        //create cells
        var headerCellName = document.createElement("td");
        headerCellName.align = "left";
        var headerCellScore = document.createElement("td");
        headerCellScore.align = "left";
        //create text
        var headerNameText = document.createTextNode("NAME");
        var headerScoreText = document.createTextNode("SCORE");
        //add to table
        headerCellName.appendChild(headerNameText);
        headerCellScore.appendChild(headerScoreText);
        headerRow.appendChild(headerCellName);
        headerRow.appendChild(headerCellScore);
        table.appendChild(headerRow);
        for (var i = 0; i < highScoreList.length; i++) {
            //create row
            var newRow = document.createElement("tr");
            //create cells
            var nameCell = document.createElement("td");
            nameCell.align = "left";
            var scoreCell = document.createElement("td");
            scoreCell.align = "center";
            //create text
            var nameText = document.createTextNode(highScoreList[i].name);
            var scoreText = document.createTextNode(highScoreList[i].score.toString());
            nameCell.appendChild(nameText);
            scoreCell.appendChild(scoreText);
            newRow.appendChild(nameCell);
            newRow.appendChild(scoreCell);
            table.appendChild(newRow);
        }
    }
    var div = document.getElementById("highScoreDiv");
    div.appendChild(table);
}
/**
 * Retrieve previous high scores among all users
 */
function initializeHighScores() {
    //wipe list
    highScoreList.splice(0);
    //get high score data
    var values = getHighScoreCookieData();
    //ensure not null
    if (values != null) {
        //sort from highest to lowest, returns list of keys
        var keysSorted = Object.keys(values).sort(function (a, b) { return values[a].score - values[b].score; }).reverse();
        //limit to 5 scores
        var max = keysSorted.length;
        if (max > 5) {
            max = 5;
        }
        var name;
        var score;
        //use keys to populate global object
        for (var i = 0; i < max; i++) {
            highScoreList.push(new HighScore(values[keysSorted[i]].name, values[keysSorted[i]].score));
        }
    }
    else {
        setDefaultHighScoreCookie();
    }
}
/**
 * Retrieve highest score for current user
 */
function getCurrentUserHighScore(name) {
    var score = 0;
    score = Number(getCurrentUserScoreCookieData(name));
    return score;
}
function closeWelcomeWindow() {
    var link = window.document.getElementById('closeWelcomeLink');
    link.click();
}
function openLevelCompleteWindow() {
    var link = window.document.getElementById('levelCompleteLink');
    link.click();
    var continueButton = window.document.getElementById('buttonContinue');
    continueButton.focus();
}
function closeLevelCompleteWindow() {
    var link = window.document.getElementById('closeLevelCompleteLink');
    link.click();
}
//# sourceMappingURL=Main.js.map