/*
Sources:
https://developer.mozilla.org/en-US/docs/Games/Workflows/2D_Breakout_game_pure_JavaScript
http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
http://codeincomplete.com/posts/2013/5/18/javascript_gauntlet_collision_detection/
https://www.freelancer.com/community/articles/game-development-using-js-and-canvas
https://github.com/technogeek00/css-galaga

SPRITES
http://www.williammalone.com/articles/create-html5-canvas-javascript-sprite-animation/

COLLISION
http://stackoverflow.com/questions/18040846/best-approach-for-collision-detection-with-html5-and-javascript

RESEARCH (NOT USED):
http://superpowers-html5.com/index.en.html

GOOGLE - L spiro game loop

*/
/*** INITIALIZE PAGE ***/
var CONSTANTS = new Constants.Constants();
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
var rebelShip = new GameObjects.RebelShipObject(browserWidth, browserHeight);
//list of explosion sprites
var explosionList = new Array();
//list to store message to user
var messageList = new Array();
//list of enemy ships
var enemyShipList = new Array();
var bossList = new Array();
//list of cannon shots
var cannonShotList = GameLogic.getPopulatedProjectileList(Constants.ProjectileType.CANNON_SHOT, CONSTANTS.CANNON_SHOT_SPEED, CONSTANTS.CANNON_SHOT_LIMIT, gameCanvas.width, gameCanvas.height);
//list of missiles
var missileList = GameLogic.getPopulatedProjectileList(Constants.ProjectileType.MISSILE, CONSTANTS.MISSILE_SPEED, CONSTANTS.MISSILE_LIMIT, gameCanvas.width, gameCanvas.height);
//manage user input controls
var rightArrowKeyed = false;
var leftArrowKeyed = false;
//bind keyboard event handlers
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
//init game mgmt vars
var intervalHolder = null;
var atStartScreen = true;
var isGameReady = false;
var currentLevel = CONSTANTS.DEFAULT_START_LEVEL;
var timePrevious = Date.now();
var titleTimePrevious = 0;
//init user stats
var currentUserScore = new GameObjects.Score("Anonymous", CONSTANTS.DEFAULT_START_LEVEL);
var highScoreList = new Array();
//init theme song
var titleThemeSong = new Audio("sounds/MainThemeWhistle.mp3");
titleThemeSong.loop = true;
//check if start screen showing
if (atStartScreen) {
    //reset time
    titleTimePrevious = Date.now();
    //start song
    titleThemeSong.play();
    //run title screen
    showStartScreen();
}
else {
    //get user input
    Modal.openWelcomeWindow(highScoreList);
}
/*** GAME FUNCTIONS ***/
/**
 * Reset game state and advance to next level
 */
function continueGame() {
    //game active
    isGameReady = true;
    //increment new level
    currentLevel += 1;
    //reset objects
    resetObjects();
    //check missiles
    GameLogic.equipMissiles(currentLevel, missileList, browserWidth, browserHeight);
    //check ship health
    GameLogic.checkRebelShipHealth(rebelShip, currentLevel);
    //create enemies
    loadEnemies();
    //reset time var
    timePrevious = Date.now();
}
/**
 * Reset game state and advance to next level
 */
function startOver() {
    //reset ship
    rebelShip = new GameObjects.RebelShipObject(browserWidth, browserHeight);
    //game active
    isGameReady = true;
    //increment new level
    currentLevel = CONSTANTS.DEFAULT_START_LEVEL;
    //reset objects
    resetObjects();
    //reset score
    currentUserScore.levelStart = currentLevel;
    currentUserScore.currentScore = 0;
    //reset missile limit
    missileList = GameLogic.getPopulatedProjectileList(Constants.ProjectileType.MISSILE, CONSTANTS.MISSILE_SPEED, CONSTANTS.MISSILE_LIMIT, gameCanvas.width, gameCanvas.height);
    //create enemies for this level
    loadEnemies();
    //notify user
    AddGameStartMessage();
    //reset time var
    timePrevious = Date.now();
}
/**
 * Load enemy object lists
 */
function loadEnemies() {
    //create enemies
    enemyShipList = GameLogic.buildEnemyListByLevel(currentLevel, browserWidth, browserHeight);
    //create bosses
    bossList = GameLogic.getBossListByLevel(currentLevel, browserWidth, browserHeight);
}
function loadDummyEnemies() {
    //create enemies
    enemyShipList = GameLogic.buildEnemyListByLevel(10, browserWidth, browserHeight);
}
/**
 * Reset game objects
 */
function resetObjects() {
    //reset rebel ship
    rebelShip.reset();
    //reset projectiles
    GameLogic.resetProjectiles(cannonShotList);
    GameLogic.resetProjectiles(missileList);
    //reset user input
    rightArrowKeyed = false;
    leftArrowKeyed = false;
    //reset messages
    messageList.splice(0);
}
function GetMessageLocationX() {
    return (browserWidth / 2);
}
function GetMessageLocationY() {
    return (browserHeight - (rebelShip.objImage.naturalHeight * 2));
}
function AddGameStartMessage() {
    //add message
    GameLogic.addNewMessage(messageList, Constants.MessageType.GENERIC, "*** START GAME ***", GetMessageLocationX(), GetMessageLocationY(), 32);
}
function AddHealthMessage(amount) {
    //add message
    GameLogic.addNewMessage(messageList, Constants.MessageType.ADD_HEALTH, "+" + amount.toString() + " Health", GetMessageLocationX(), GetMessageLocationY(), 24);
}
function AddMissileMessage() {
    //add message
    GameLogic.addNewMessage(messageList, Constants.MessageType.ADD_MISSILE, "+1 Missile", GetMessageLocationX(), GetMessageLocationY(), 24);
}
function AddBossMessage() {
    //add message
    GameLogic.addNewMessage(messageList, Constants.MessageType.NEW_BOSS, "^^^ BOSS DETECTED ^^^", GetMessageLocationX(), GetMessageLocationY(), 32);
}
function AddHighScoreMessage() {
    //add message
    GameLogic.addNewMessage(messageList, Constants.MessageType.NEW_BOSS, "*** HIGH SCORE ***", GetMessageLocationX(), GetMessageLocationY(), 32);
}
function AddPressSpacebarMessage() {
    //add message
    GameLogic.addNewMessage(messageList, Constants.MessageType.GENERIC, "*** PRESS SPACEBAR TO START ***", GetMessageLocationX(), GetMessageLocationY(), 32);
}
/**
 * Get amount of enemy ships remaining
 */
function getRemainingEnemies() {
    return enemyShipList.length + bossList.length;
}
/**
 * Check if explosions have all been rendered
 */
function isExplosionsDone() {
    return (explosionList.length == 0);
}
/**
 * Check for user input
 */
function rebelShipUserInput(modifier) {
    //check if arrow pressed and if so, move object
    if (rightArrowKeyed) {
        rebelShip.moveLocationX(modifier);
        rebelShip.direction = Constants.Direction.RIGHT;
    }
    else if (leftArrowKeyed) {
        rebelShip.moveLocationX(-modifier);
        rebelShip.direction = Constants.Direction.LEFT;
    }
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
                    GameLogic.fireProjectile(cannonShotList, CONSTANTS.CANNON_SHOT_OFFSET_Y, rebelShip, false, 0, 0); //add new shot
                }
                break;
            }
        case CONSTANTS.KEY_DOWN:
            {
                //check if key up
                if (!isDown) {
                    GameLogic.fireProjectile(missileList, CONSTANTS.MISSILE_OFFSET_Y, rebelShip, false, 0, 0); //add new missile
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
        case CONSTANTS.KEY_SPACEBAR:
            {
                atStartScreen = false;
                titleThemeSong.currentTime = 0;
                titleThemeSong.pause();
                break;
            }
    }
}
/**
 * Start the game
 */
function startGame() {
    //set game active
    isGameReady = true;
    //reset objects
    resetObjects();
    //create enemies for this level
    loadEnemies();
    //notify user
    AddGameStartMessage();
    //init game state vars
    timePrevious = Date.now();
    //start main loop
    main();
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
    var damage = 0;
    //check if ready to render
    if (isGameReady) {
        //check for user input
        rebelShipUserInput(delta);
        //move rebel projectiles
        Render.moveRebelProjectiles(delta, missileList);
        Render.moveRebelProjectiles(delta, cannonShotList);
        //move enemy projectiles
        Render.moveEnemyProjectiles(delta, bossList);
        //check for enemy hit
        damage += Render.GetEnemyProjectileDamage(bossList, rebelShip);
        //move enemy ships
        damage += Render.moveEnemyShips(delta, timeNow, enemyShipList);
        Render.moveBosses(delta, timeNow, bossList);
        //assign damage
        rebelShip.health -= damage;
        //render objects
        Render.drawRebelShip(canvasContext, rebelShip);
        Render.drawEnemyShips(canvasContext, timeNow, enemyShipList, cannonShotList, missileList, currentUserScore, currentLevel);
        Render.drawEnemyShips(canvasContext, timeNow, bossList, cannonShotList, missileList, currentUserScore, currentLevel);
        Render.drawExplosions(canvasContext, explosionList);
        //render rebel projectiles
        Render.drawRebelProjectiles(canvasContext, missileList);
        Render.drawRebelProjectiles(canvasContext, cannonShotList);
        //render enemy projectiles
        Render.drawEnemyProjectiles(canvasContext, bossList);
        //render score
        Render.drawInfoPanel(canvasContext, currentLevel, getRemainingEnemies(), rebelShip.health, rebelShip.maxHealth, missileList);
        //render any messages
        Render.drawMessageList(canvasContext, messageList);
        //check if rebel ship has no health
        //then check if enemies left
        if (rebelShip.health < 1) {
            //game flag to inactive
            isGameReady = false;
            //notify user game over
            Modal.loadGameOverModal(currentUserScore, currentLevel, highScoreList);
        }
        else if (getRemainingEnemies() == 0 && isExplosionsDone()) {
            //game flag to inactive
            isGameReady = false;
            //notify user level is complete
            Modal.loadLevelCompleteModal(currentUserScore, currentLevel);
        }
    }
    //store current time as previous
    timePrevious = timeNow;
    //re-animate
    requestAnimationFrame(main);
}
;
/**
 * TITLE SCREEN LOOP
 */
function showStartScreen() {
    //get the current canvas
    var canvasContext = gameCanvas.getContext("2d");
    //clear canvas
    canvasContext.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    //get current time & compare to past time to get delta
    var titleTimeNow = Date.now();
    var titleDelta = (titleTimeNow - titleTimePrevious) / 1000;
    //move enemy ships
    Render.moveEnemyShips(titleDelta, titleTimeNow, enemyShipList);
    //check if no messages
    if (messageList.length == 0) {
        AddPressSpacebarMessage(); //add new
    }
    //check if no enemies left
    if (enemyShipList.length == 0) {
        loadDummyEnemies();
    }
    //render title
    Render.drawTitle(canvasContext);
    //render any messages
    Render.drawMessageList(canvasContext, messageList);
    //render dummy enemies
    Render.drawDummyShips(canvasContext, titleTimeNow, enemyShipList);
    //store current time as previous
    titleTimePrevious = titleTimeNow;
    //check start screen flag
    if (!atStartScreen) {
        //get user input
        Modal.openWelcomeWindow(highScoreList);
    }
    else {
        //re-animate
        requestAnimationFrame(showStartScreen);
    }
}
/*** WINDOW MANAGEMENT ***/
/**
 * Initialize start of game. Stores current user name
 */
function UserIsReady() {
    //get user input
    var welcomeUserNameTextbox = window.document.getElementById('welcomeUserName');
    var name = welcomeUserNameTextbox.value; //no whitespaces
    //init user data obj
    currentLevel = CONSTANTS.DEFAULT_START_LEVEL;
    currentUserScore = new GameObjects.Score(name, currentLevel);
    currentUserScore.highScore = Modal.getCurrentUserHighScore(name);
    //close window
    Modal.closeWelcomeWindow();
    //start game
    startGame();
}
/**
 * Initialize next level of game
 */
function UserContinue() {
    //close window
    Modal.closeLevelCompleteWindow();
    //exit current level
    continueGame();
}
/**
 * Start game again
 */
function UserPlayAgain() {
    //check if high score
    if (currentUserScore.isHighScore()) {
        //store score
        Modal.saveCurrentUserHighScore(currentUserScore.name, currentUserScore.currentScore);
        //adjust current high score
        currentUserScore.highScore = currentUserScore.currentScore;
    }
    //close window
    Modal.closeGameOverWindow();
    //start over
    startOver();
}
function UserQuitLevelComplete() {
    //close window
    Modal.closeLevelCompleteWindow();
    //exit
    UserQuit();
}
function UserQuitGameOver() {
    //close window
    Modal.closeGameOverWindow();
    //exit
    UserQuit();
}
/**
 * Exit to start screen
 */
function UserQuit() {
    //check if score is present
    if (currentUserScore != null) {
        Modal.processUserScore(currentUserScore, highScoreList);
    }
    //flag start screen
    atStartScreen = true;
    //reset time var
    titleTimePrevious = Date.now();
    //start song
    titleThemeSong.play();
    //go to title loop
    showStartScreen();
}
//# sourceMappingURL=Main.js.map