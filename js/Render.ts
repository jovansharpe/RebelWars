module Render {
    
    /**
     * Verify if a ShipObject collided with a projectile 
     * and apply damage dealt if so.
     */
    function hasBeenHit(enemy:GameObjects.ShipObject, cannonShotList:Array<GameObjects.Projectile>,
        missileList:Array<GameObjects.Projectile>) : boolean
    {
        var isHit:boolean = false;
        var damage:number = 0;
        
        //check for shot damage
        damage += doesListContainCollision(enemy.getLocationX(),
            enemy.getMaximumX(), enemy.getLocationY(), enemy.getMaximumY(),
            GameLogic.getProjectilesByStatus(cannonShotList, true));
        //check for missile damage
        damage += doesListContainCollision(enemy.getLocationX(),
            enemy.getMaximumX(), enemy.getLocationY(), enemy.getMaximumY(),
            GameLogic.getProjectilesByStatus(missileList, true));
        
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
     * Retrieve the amount of damage done to rebel ship by enemy projectiles.
     * Also handles adding hit animation for any hits.
     */
    export function GetEnemyProjectileDamage(list:Array<GameObjects.BossShipObject>,
        rebelShip:GameObjects.RebelShipObject): number
    {
        var damage:number = 0;
        
        //loop through enemy ships & check projectiles
        //for collision
        list.forEach(enemyShip => {
            damage += doesListContainCollision(rebelShip.getLocationX(),
                rebelShip.getMaximumX(), rebelShip.getLocationY(), rebelShip.getMaximumY(),
                GameLogic.getProjectilesByStatus(enemyShip.cannonShotList, true));
            damage += doesListContainCollision(rebelShip.getLocationX(),
                rebelShip.getMaximumX(), rebelShip.getLocationY(), rebelShip.getMaximumY(),
                GameLogic.getProjectilesByStatus(enemyShip.missileList, true));
        });
        
        //check if damage found
        if(damage > 0)
        {
            //add hit animation
            GameLogic.addHitAnimation(rebelShip, explosionList, browserWidth, browserHeight);
        }
        
        return damage;
    }
    
    /**
     * Return the damage done by a projectile colliding with a specific 
     * coordinate range
     */
    function doesListContainCollision(minX:number, maxX:number, minY:number, 
        maxY:number, list:Array<GameObjects.Projectile>) : number
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
     * Handles moving all enemy projectiles to their next position
     */
    export function moveEnemyProjectiles(modifier:number, list:Array<GameObjects.BossShipObject>)
    {
        list.forEach(ship => {
                //move projectiles
                incrementProjectilePosition(ship.cannonShotList, modifier);
                //move projectiles
                incrementProjectilePosition(ship.missileList, modifier);
            });
    }
    
    /**
     * Handles moving all rebel projectiles to their next position
     */
    export function moveRebelProjectiles(modifier:number, list:Array<GameObjects.Projectile>)
    {
        //move projectiles
        incrementProjectilePosition(list, modifier);
    }

    /**
     * Loop through list and update the Y position of all active objects
     */
    function incrementProjectilePosition(list:Array<GameObjects.Projectile>, modifier:number)
    {
        //loop through list
        list.forEach(proj => {
            //check if active
            if(proj.isAlive)
            {
                //check if targeted
                if(!proj.isTargeted)
                {
                    //decrease Y position (zero is top of screen so using negative value)
                    proj.moveLocationY(-modifier);
                    
                    //check if position exceeds screen
                    if(proj.locationY < 1)
                    {
                        proj.isAlive = false; //deactivate projectile
                    }
                }
                else
                {
                    //targeted, special movement
                    proj.moveTowardTarget(modifier);
                }
                
            }
        });
    }

    /**
     * Handles moving all enemy ships to their next position.
     * Return the amount of damage done by ships that escaped screen.
     */
    export function moveEnemyShips(modifier:number, timeNow:number, enemyShipList:Array<GameObjects.ShipObject>): number
    {
        var damage:number = 0;
        
        for(var i = 0; i < enemyShipList.length; i++)
        {
            var type:Constants.ShipType = enemyShipList[i].type;
            
            //check if start time is valid
            if (enemyShipList[i].startTimeIsValid(timeNow)) 
            {    
                //check if image has been loaded
                if(GameObjects.isShipLoaded(enemyShipList[i].type))
                {
                    enemyShipList[i].moveEnemyShip(modifier); //move
                }
                        
                //check if position exceeds screen edge
                if (enemyShipList[i].isAtBottomOfScreen()) {
                    //add enemy health to damage
                    damage += enemyShipList[i].health;
                    //remove from list
                    enemyShipList.splice(i, 1); 
                }
            }
        }
        
        return damage;
    }

    /**
     * Moves boss ships to their next position.
     */
    export function moveBosses(modifier:number, timeNow:number, bossList:Array<GameObjects.BossShipObject>): void
    {
        for(var i = 0; i < bossList.length; i++)
        {
            var type:Constants.ShipType = bossList[i].type;
            
            //check if start time is valid
            if (bossList[i].startTimeIsValid(timeNow)) 
            {    
                //check if image has been loaded
                if(GameObjects.isShipLoaded(bossList[i].type))
                {
                    //move
                    bossList[i].moveEnemyShip(modifier); 
                    
                    //fire
                    fireEnemyProjectile(bossList[i], modifier, timeNow, bossList[i].cannonShotList); 
                    fireEnemyProjectile(bossList[i], modifier, timeNow, bossList[i].missileList); 
                }
            }
        }
    }

    /**
     * Fire projectiles from boss ship
     */
    function fireEnemyProjectile(boss:GameObjects.BossShipObject, modifier:number, timeNow:number,
        list:Array<GameObjects.Projectile>)
    {
        //check if time to fire
        if(list.length > 0 && boss.isTimeToFire(timeNow, list[0].type))
        {
            var targetX:number = 0;
            var targetY:number = 0;
            
            //check if targeting rebel ship
            if(boss.isTargeting(list[0].type))
            {
                //specific fire
                var targetPoint:Vector.Waypoint = boss.getNewSpecificTarget(rebelShip.getLocationX(),
                    browserHeight, rebelShip.getVelocityX(modifier), rebelShip.getVelocityY(),
                    list[0].speed);
                //set target points
                targetX = targetPoint.targetX;
                targetY = targetPoint.targetY;
            }
            else
            {
                //random fire
                targetX = GameLogic.getRandomInteger(0, browserWidth);
                targetY = browserHeight;
            }
            
            //fire projectile
            GameLogic.fireProjectile(list, 0, boss, true, targetX, targetY);
            
            //check if multi-shot projectile
            if(boss.isMultiShot(list[0].type))
            {
                for(var i = 0; i < boss.getNumberOfExtraShots(); i++)
                {
                    //fire random projectile
                    GameLogic.fireProjectile(list, 0, boss, true, GameLogic.getRandomInteger(0, browserWidth), browserHeight);
                }
            }
                
            //set new fire date
            boss.setNewFireTime(timeNow, list[0].type);
        }
    }

    /**
     * Render the rebel ship object
     */
    export function drawRebelShip(canvasContext:CanvasRenderingContext2D, rebelShip:GameObjects.RebelShipObject)
    {   
        //check if context is valid
        //check if object has been loaded & if so, render
        if (canvasContext && GameObjects.isShipLoaded(rebelShip.type)) 
        {
            canvasContext.drawImage(rebelShip.objImage, rebelShip.getLocationX(), rebelShip.getLocationY());
        }
    }

    /**
     * Render enemy ships
     */
    export function drawEnemyShips(canvasContext:CanvasRenderingContext2D, timeNow:number,
        enemyShipList:Array<GameObjects.ShipObject>, cannonShotList:Array<GameObjects.Projectile>,
        missileList:Array<GameObjects.Projectile>, currentUserScore:GameObjects.Score, currentLevel:number)
    {   
        //check if context is valid
        //and that there are enemies to render
        if (canvasContext && enemyShipList.length > 0) 
        {        
            for(var i = 0; i < enemyShipList.length; i++)
            {
                //check if image has been loaded
                //and if timing is valid
                if (GameObjects.isShipLoaded(enemyShipList[i].type) && enemyShipList[i].startTimeIsValid(timeNow)) 
                {
                    //check for entry message
                    if(enemyShipList[i].showEntryMessage())
                    {
                        Message.AddEntryMessage(enemyShipList[i].type);
                    }
                    
                    //render object
                    canvasContext.drawImage(enemyShipList[i].objImage, enemyShipList[i].getLocationX(), 
                        enemyShipList[i].getLocationY());
                    
                    //check for collision
                    if(hasBeenHit(enemyShipList[i], cannonShotList, missileList))
                    {
                        //add hit animation
                        GameLogic.addHitAnimation(enemyShipList[i], explosionList, browserWidth, browserHeight);
                        //update score
                        currentUserScore.directHits += 1;
                        
                        //check if no health left
                        if(enemyShipList[i].health < 1)
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
    }

    /**
     * Render list of enemy ships but do not process collision detection
     */
    export function drawDummyShips(canvasContext:CanvasRenderingContext2D, timeNow:number,
        enemyShipList:Array<GameObjects.ShipObject>)
    {  
        //check if context is valid
        //and that there are enemies to render
        if (canvasContext && enemyShipList.length > 0) 
        {        
            for(var i = 0; i < enemyShipList.length; i++)
            {
                //check if image has been loaded
                //and if timing is valid
                if (GameObjects.isShipLoaded(enemyShipList[i].type) && enemyShipList[i].startTimeIsValid(timeNow)) 
                {
                    //render object
                    canvasContext.drawImage(enemyShipList[i].objImage, enemyShipList[i].getLocationX(), 
                        enemyShipList[i].getLocationY());
                }
            }
        }
    }

    /**
     * Render current Score and Health
     */
    export function drawInfoPanel(canvasContext:CanvasRenderingContext2D, currentLevel:number,
        enemies:number, rebelShipHealth:number, rebelShipMaxHealth:number, missileList:Array<GameObjects.Projectile>,
        userScore:number)
    {
        if(canvasContext)
        {
            var level:string = "Level: " + currentLevel;
            var remainingEnemies:string = "Empire: " + enemies.toString();
            var health:string = "Health: " + rebelShipHealth.toString();
            var missiles:string = "Missiles: " + GameLogic.getProjectilesByStatus(missileList, false).length.toString();
            missiles += " / " + missileList.length;
            var score:string = "Score: " + userScore.toString();
            
            //Init font/location
            canvasContext.font = "16px 'Press Start 2P'";
            canvasContext.textAlign = "left";
            canvasContext.textBaseline = "top";
            
            //color & fill current level
            canvasContext.fillStyle = CONSTANTS.FILL_WHITE;
            canvasContext.fillText(level, CONSTANTS.INFO_TEXT_SPACING, CONSTANTS.INFO_TEXT_SPACING);
            
            //color & fill enemies & missiles
            canvasContext.fillStyle = CONSTANTS.FILL_YELLOW;
            canvasContext.fillText(remainingEnemies, CONSTANTS.INFO_TEXT_SPACING, CONSTANTS.INFO_TEXT_SPACING * 2);
            canvasContext.fillText(missiles, CONSTANTS.INFO_TEXT_SPACING, CONSTANTS.INFO_TEXT_SPACING * 3);
            
            //Ship Health
            var precent:number = (rebelShipHealth * 100) / rebelShipMaxHealth;
            if(precent >= 90)
            {
                canvasContext.fillStyle = CONSTANTS.FILL_GREEN; //health is good
            }
            else if(precent >= 50)
            {
                canvasContext.fillStyle = CONSTANTS.FILL_LIGHT_BLUE; //injured
            }
            else
            {
                canvasContext.fillStyle = CONSTANTS.FILL_RED; //about to die
            }
            //draw health
            canvasContext.fillText(health, CONSTANTS.INFO_TEXT_SPACING, CONSTANTS.INFO_TEXT_SPACING * 4);
            
            //draw score
            canvasContext.fillStyle = CONSTANTS.FILL_WHITE;
            canvasContext.fillText(score, CONSTANTS.INFO_TEXT_SPACING, CONSTANTS.INFO_TEXT_SPACING * 5);
            
            //check for a boss
            if(bossList.length > 0)
            {
                //color & fill boss health
                canvasContext.fillStyle = CONSTANTS.FILL_ORANGE;
                canvasContext.fillText("Boss: " + bossList[0].health.toString(), 
                    CONSTANTS.INFO_TEXT_SPACING, CONSTANTS.INFO_TEXT_SPACING * 6);
            }
            
        }
    }

    /**
     * Render list of messages
     */
    export function drawMessageList(canvasContext:CanvasRenderingContext2D, messageList:Array<GameObjects.Message>)
    {
        //check if canvas valid & messages present
        if(canvasContext && messageList.length > 0)
        {
            var prevCount:number = 0;
            
            //loop through messages
            for(var i = 0; i < messageList.length; i++)
            {
                if(prevCount == 0 || prevCount > CONSTANTS.MESSAGE_THROTTLE_COUNT)
                {
                    //draw message
                    drawMessage(canvasContext, messageList[i]);
                    //check for expiration
                    if(messageList[i].isExpired())
                    {
                        messageList.splice(i,1);
                        prevCount = 0;
                    }
                    else
                    {
                        prevCount = messageList[i].renderCount;
                    }
                }
            }
        }
    }
    
    /**
     * Render individual message
     */
    function drawMessage(canvasContext:CanvasRenderingContext2D, msg:GameObjects.Message)
    {
        canvasContext.textAlign = "center";
        canvasContext.textBaseline = "top";
        canvasContext.font = msg.font;
        canvasContext.fillStyle = msg.getCurrentColor();
        canvasContext.fillText(msg.text, msg.getCurrentX(), msg.getCurrentY());
        //increment render count
        msg.incrementCount();
    }

    /**
     * Draw all hero projectiles to canvas
     */
    export function drawRebelProjectiles(canvasContext:CanvasRenderingContext2D, list:Array<GameObjects.Projectile>) 
    {
        //check if context is valid
        if (canvasContext)
        {
            renderProjectileList(canvasContext, list);
        }
    }
    
    /**
     * Draw all enemy projectiles to canvas
     */
    export function drawEnemyProjectiles(canvasContext:CanvasRenderingContext2D, list:Array<GameObjects.BossShipObject>) 
    {
        //check if context is valid
        if (canvasContext)
        {
            list.forEach(ship => {
                renderProjectileList(canvasContext, ship.cannonShotList);
                renderProjectileList(canvasContext, ship.missileList);
            });
        }
    }

    /**
     * Render a list of projectile objects
     */
    function renderProjectileList(canvasContext:CanvasRenderingContext2D, list:Array<GameObjects.Projectile>) 
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
                    canvasContext.fillStyle = CONSTANTS.getColor(proj.color);
                    canvasContext.fill();
                    canvasContext.closePath();
                }
            });
        }
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
     * Render active explosion animation
     */
    export function drawExplosions(canvasContext:CanvasRenderingContext2D, list:Array<GameObjects.SpriteSheetObject>)
    {  
        if (canvasContext) 
        {
            for (var i = 0; i < list.length; i++) 
            {
                if(GameObjects.isSpriteLoaded(list[i].type))
                {
                    //update frame
                    list[i].update();
                    //draw
                    list[i].render(canvasContext);
                    //check if finished
                    if(list[i].isFinished)
                    {
                        list.splice(i,1); //remove
                    }
                }
            }
        }
    }
    
    export function drawTitle(canvasContext:CanvasRenderingContext2D)
    {
        canvasContext.textAlign = "center";
        canvasContext.textBaseline = "top";
        canvasContext.font = "80px 'Orbitron'";
        canvasContext.fillStyle = CONSTANTS.FILL_WHITE;
        canvasContext.fillText("REBEL WARS", browserWidth / 2, browserHeight / 4);
    }
    
    export function drawChampion(canvasContext:CanvasRenderingContext2D, text:string)
    {
        canvasContext.textAlign = "center";
        canvasContext.textBaseline = "top";
        canvasContext.font = "16px 'Press Start 2P'";
        canvasContext.fillStyle = CONSTANTS.FILL_LIGHT_BLUE;
        canvasContext.fillText("Grand Master Jedi: " + text, browserWidth / 2, browserHeight / 12);
    }
    
    export function drawInstructionPanel(canvasContext:CanvasRenderingContext2D, panel:GameObjects.ImageObject)
    {
        if (canvasContext) 
        {
            if(GameObjects.isSpriteLoaded(panel.type))
            {
                //render object
                canvasContext.drawImage(panel.objImage, panel.locationX, panel.locationY);
            }
        }
    }
}