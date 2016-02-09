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
var browserWidth:number = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) - CONSTANTS.CLIENT_WINDOW_MARGIN;
var browserHeight:number = (window.innerHeight || document.documentElement.clientHeight  || document.body.clientHeight) - CONSTANTS.CLIENT_WINDOW_MARGIN;

//create canvas
var gameCanvas:HTMLCanvasElement = <HTMLCanvasElement>document.createElement("canvas");
gameCanvas.width = browserWidth;
gameCanvas.height = browserHeight;

//add canvas to page
document.body.appendChild(gameCanvas);

/*** INITIALIZE GAME MGMT VARS ***/
var intervalHolder:number = null;
var atStartScreen:boolean = true;
var isGameReady:boolean = false;
var currentLevel:number = CONSTANTS.DEFAULT_START_LEVEL;
var timePrevious:number = Date.now();
var titleTimePrevious:number = 0;

/*** INITIALIZE GAME OBJECTS ***/

//user controlled ship
var rebelShip:GameObjects.RebelShipObject = new GameObjects.RebelShipObject(browserWidth, browserHeight, currentLevel);

//list of explosion sprites
var explosionList:Array<GameObjects.SpriteSheetObject> = new Array<GameObjects.SpriteSheetObject>();

//list to store message to user
var messageList:Array<GameObjects.Message> = new Array<GameObjects.Message>();

//list of enemy ships
var enemyShipList:Array<GameObjects.ShipObject> = new Array<GameObjects.ShipObject>();
var bossList:Array<GameObjects.BossShipObject> = new Array<GameObjects.BossShipObject>();

//list of cannon shots
var cannonShotList:Array<GameObjects.Projectile> = GameLogic.getPopulatedProjectileList(Constants.ProjectileType.CANNON_SHOT, 
CONSTANTS.CANNON_SHOT_SPEED,
CONSTANTS.CANNON_SHOT_LIMIT,
gameCanvas.width,
gameCanvas.height,
currentLevel);

//list of missiles
var missileList:Array<GameObjects.Projectile> = GameLogic.getPopulatedProjectileList(Constants.ProjectileType.MISSILE, 
CONSTANTS.MISSILE_SPEED,
CONSTANTS.MISSILE_LIMIT,
gameCanvas.width,
gameCanvas.height,
currentLevel);

//manage user input controls
var rightArrowKeyed = false;
var leftArrowKeyed = false;

//bind keyboard event handlers
document.addEventListener("keydown",keyDownHandler,false);
document.addEventListener("keyup",keyUpHandler,false);

//init user stats
var currentUserScore:GameObjects.Score = new GameObjects.Score("Anonymous",CONSTANTS.DEFAULT_START_LEVEL);
//var highScoreList:Array<GameObjects.HighScore> = new Array<GameObjects.HighScore>();
var champion:string = Service.getChampion();

//init theme song
var titleThemeSong:HTMLAudioElement = new Audio("sounds/MainThemeWhistle.mp3");
titleThemeSong.loop = true;
//init instruction panel
var instructionPanel:GameObjects.ImageObject = new GameObjects.ImageObject(0,0,browserWidth,browserHeight);

//check browser
if(GameLogic.isCompliantBrowser())
{
    //check if start screen showing
    if(atStartScreen)
    {
        //reset time
        titleTimePrevious = Date.now();
        
        //start song
        titleThemeSong.play();
        
        //run title screen
        showStartScreen();
    }
    else
    {
        //get user input
        Modal.openWelcomeWindow(); 
    }
}
else
{
    //open warning
    Modal.openWarningWindow(); 
}

/*** GAME FUNCTIONS ***/

/**
 * Reset game state and advance to next level
 */
function continueGame()
{   
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
function startOver()
{   
    //increment new level
    currentLevel = CONSTANTS.DEFAULT_START_LEVEL;
    
    //reset ship
    rebelShip = new GameObjects.RebelShipObject(browserWidth, browserHeight, currentLevel);
    
    //game active
    isGameReady = true;
    
    //reset objects
    resetObjects();
    
    //reset score
    currentUserScore.levelStart = currentLevel;
    currentUserScore.currentScore = 0;
    
    //reset missile limit
    missileList = GameLogic.getPopulatedProjectileList(Constants.ProjectileType.MISSILE, 
        CONSTANTS.MISSILE_SPEED,
        CONSTANTS.MISSILE_LIMIT,
        gameCanvas.width,
        gameCanvas.height,
        currentLevel);
    
    //create enemies for this level
    loadEnemies();
    
    //notify user
    Message.AddGameStartMessage();
    
    //reset time var
    timePrevious = Date.now();
}

/**
 * Load enemy object lists
 */
function loadEnemies()
{
    //create enemies
    enemyShipList = GameLogic.buildEnemyListByLevel(currentLevel, browserWidth, browserHeight);    
    
    //create bosses
    bossList = GameLogic.getBossListByLevel(currentLevel, browserWidth, browserHeight);
}

function loadDummyEnemies()
{
    //create enemies
    enemyShipList = GameLogic.buildEnemyListByLevel(10, browserWidth, browserHeight);    
}

/**
 * Reset game objects
 */
function resetObjects()
{
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



/**
 * Get amount of enemy ships remaining
 */
function getRemainingEnemies() : number
{
    return enemyShipList.length + bossList.length;
}

/**
 * Check if explosions have all been rendered
 */
function isExplosionsDone() : boolean
{
    return (explosionList.length == 0);
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
        rebelShip.direction = Constants.Direction.RIGHT;
    }
    else if (leftArrowKeyed)
    {
        rebelShip.moveLocationX(-modifier);
        rebelShip.direction = Constants.Direction.LEFT;
    }
}

/**
 * User presses key down
 */
function keyDownHandler(event:KeyboardEvent)
{
    keyHandler(true, event);
}

/**
 * User lets up on key
 */
function keyUpHandler(event:KeyboardEvent) 
{    
    keyHandler(false, event);
}

/**
 * Generic key handler
 */
function keyHandler(isDown:boolean, event:KeyboardEvent)
{
    var keyCode:number = event.keyCode || event.which;
    
    switch(keyCode)
    {
        case CONSTANTS.KEY_UP:
        {
            //check if key up
            if(!isDown)
            {
                currentUserScore.shotsFired += GameLogic.fireProjectile(cannonShotList, CONSTANTS.CANNON_SHOT_OFFSET_Y, rebelShip,
                    false, 0, 0); //add new shot
            }
            break;
        }
        case CONSTANTS.KEY_DOWN:
        {
            //check if key up
            if(!isDown)
            {
                currentUserScore.shotsFired += GameLogic.fireProjectile(missileList, CONSTANTS.MISSILE_OFFSET_Y, rebelShip,
                    false, 0, 0); //add new missile
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
        case CONSTANTS.KEY_ENTER:
        case CONSTANTS.KEY_SPACEBAR:
        {
            //check if in game
            if(isGameReady)
            {
                //ensure these keys do not reset screen
                event.cancelBubble = true;
                event.returnValue = false;
            }
            else if(atStartScreen)
            {
                //if at start screen, disable
                atStartScreen = false;
                titleThemeSong.currentTime = 0;
                titleThemeSong.pause();
            }
        }
    }
}

/**
 * Start the game
 */
function startGame()
{
    //set game active
    isGameReady = true;
    
    //reset objects
    resetObjects();

    //create enemies for this level
    loadEnemies();

    //notify user
    Message.AddGameStartMessage();

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
    var canvasContext:CanvasRenderingContext2D =  gameCanvas.getContext("2d"); 
    
    //clear canvas
    canvasContext.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    
    //get current time & compare to past time to get delta
    var timeNow:number = Date.now();
	var delta:number = (timeNow - timePrevious) / 1000;
    var damage:number = 0;
    
    //check if ready to render
    if(isGameReady)
    {
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
        Render.drawEnemyShips(canvasContext, timeNow, enemyShipList, cannonShotList,
            missileList, currentUserScore, currentLevel);
        Render.drawEnemyShips(canvasContext, timeNow, bossList, cannonShotList,
            missileList, currentUserScore, currentLevel);
        Render.drawExplosions(canvasContext, explosionList);
        
        //render rebel projectiles
        Render.drawRebelProjectiles(canvasContext, missileList);
        Render.drawRebelProjectiles(canvasContext, cannonShotList);
        //render enemy projectiles
        Render.drawEnemyProjectiles(canvasContext, bossList);
        
        //render score
        Render.drawInfoPanel(canvasContext, currentLevel, getRemainingEnemies(), rebelShip.health,
            rebelShip.maxHealth, missileList, currentUserScore.currentScore);
        
        //render any messages
        Render.drawMessageList(canvasContext, messageList);
        
        //check if rebel ship has no health
        //then check if enemies left
        if (rebelShip.health < 1)
        {
            //game flag to inactive
            isGameReady = false;
            
            //notify user game over
            Modal.loadGameOverModal(currentUserScore, currentLevel);
        }
        else if(getRemainingEnemies() == 0 && isExplosionsDone())
        {
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
};

/**
 * TITLE SCREEN LOOP
 */
function showStartScreen() {
    //get the current canvas
    var canvasContext:CanvasRenderingContext2D =  gameCanvas.getContext("2d"); 
    
    //clear canvas
    canvasContext.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    
    //get current time & compare to past time to get delta
    var titleTimeNow:number = Date.now();
	var titleDelta:number = (titleTimeNow - titleTimePrevious) / 1000;
    
    //move enemy ships
    Render.moveEnemyShips(titleDelta, titleTimeNow, enemyShipList);
    
    //check if no messages
    if(messageList.length == 0)
    {
        Message.AddPressSpacebarMessage(); //add new
    }
    
    //check if no enemies left
    if(enemyShipList.length == 0)
    {
        loadDummyEnemies();
    }
    
    //render title
    Render.drawTitle(canvasContext);
    
    //render title
    Render.drawInstructionPanel(canvasContext, instructionPanel);
    
    //render high score
    Render.drawChampion(canvasContext, champion);
    
    //render any messages
    Render.drawMessageList(canvasContext, messageList);
    
    //render dummy enemies
    Render.drawDummyShips(canvasContext, titleTimeNow, enemyShipList);
    
    //store current time as previous
    titleTimePrevious = titleTimeNow;
    
    //check start screen flag
    if(!atStartScreen)
    {
        //get user input
        Modal.openWelcomeWindow(); 
    }
    else
    {
        //re-animate
        requestAnimationFrame(showStartScreen);
    }
}

/*** WINDOW MANAGEMENT ***/
/**
 * Initialize start of game. Stores current user name
 */
function UserIsReady()
{
    //get user input
    var welcomeUserNameTextbox:HTMLInputElement = <HTMLInputElement>window.document.getElementById('welcomeUserName');
    var name:string = welcomeUserNameTextbox.value; //no whitespaces
    
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
function UserContinue()
{
    //close window
    Modal.closeLevelCompleteWindow();
    
    //exit current level
    continueGame();
}

/**
 * Start game again 
 */
function UserPlayAgain()
{    
    //check if high score
    if(currentUserScore.isHighScore())
    {
        //store score
        Modal.saveCurrentUserHighScore(currentUserScore);
        
        //adjust current high score
        currentUserScore.highScore = currentUserScore.currentScore;
    }
    
    //close window
    Modal.closeGameOverWindow();
    
    //start over
    startOver();  
}

function UserQuitWelcome()
{
    //close window
    Modal.closeWelcomeWindow();
    
    //erase score
    currentUserScore = null;
    
    //exit
    UserQuit();
}

function UserQuitLevelComplete()
{
    //close window
    Modal.closeLevelCompleteWindow();
    
    //exit
    UserQuit();
}

function UserQuitGameOver()
{
    //close window
    Modal.closeGameOverWindow();
    
    //exit
    UserQuit();
}

/**
 * Exit to start screen
 */
function UserQuit()
{
    //check if score is present
    if(currentUserScore != null)
    {
        Modal.checkUserScoreOnQuit(currentUserScore);
    }
    
    //reset champion
    champion = Service.getChampion();
    
    //flag start screen
    atStartScreen = true;
    
    //reset time var
    titleTimePrevious = Date.now();
    
    //start song
    titleThemeSong.play();
    
    //go to title loop
    showStartScreen();
}