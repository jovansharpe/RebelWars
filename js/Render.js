var Render;
(function (Render) {
    /**
     * Verify if a ShipObject collided with a projectile
     * and apply damage dealt if so.
     */
    function hasBeenHit(enemy, cannonShotList, missileList) {
        var isHit = false;
        var damage = 0;
        //check for shot damage
        damage += doesListContainCollision(enemy.getLocationX(), enemy.getMaximumX(), enemy.getLocationY(), enemy.getMaximumY(), GameLogic.getProjectilesByStatus(cannonShotList, true));
        //check for missile damage
        damage += doesListContainCollision(enemy.getLocationX(), enemy.getMaximumX(), enemy.getLocationY(), enemy.getMaximumY(), GameLogic.getProjectilesByStatus(missileList, true));
        //check if damage found
        if (damage > 0) {
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
    function GetEnemyProjectileDamage(list, rebelShip) {
        var damage = 0;
        //loop through enemy ships & check projectiles
        //for collision
        list.forEach(function (enemyShip) {
            damage += doesListContainCollision(rebelShip.getLocationX(), rebelShip.getMaximumX(), rebelShip.getLocationY(), rebelShip.getMaximumY(), GameLogic.getProjectilesByStatus(enemyShip.cannonShotList, true));
            damage += doesListContainCollision(rebelShip.getLocationX(), rebelShip.getMaximumX(), rebelShip.getLocationY(), rebelShip.getMaximumY(), GameLogic.getProjectilesByStatus(enemyShip.missileList, true));
        });
        //check if damage found
        if (damage > 0) {
            //add hit animation
            GameLogic.addHitAnimation(rebelShip, explosionList, browserWidth, browserHeight);
        }
        return damage;
    }
    Render.GetEnemyProjectileDamage = GetEnemyProjectileDamage;
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
     * Handles moving all enemy projectiles to their next position
     */
    function moveEnemyProjectiles(modifier, list) {
        list.forEach(function (ship) {
            //move projectiles
            incrementProjectilePosition(ship.cannonShotList, modifier);
            //move projectiles
            incrementProjectilePosition(ship.missileList, modifier);
        });
    }
    Render.moveEnemyProjectiles = moveEnemyProjectiles;
    /**
     * Handles moving all rebel projectiles to their next position
     */
    function moveRebelProjectiles(modifier, list) {
        //move projectiles
        incrementProjectilePosition(list, modifier);
    }
    Render.moveRebelProjectiles = moveRebelProjectiles;
    /**
     * Loop through list and update the Y position of all active objects
     */
    function incrementProjectilePosition(list, modifier) {
        //loop through list
        list.forEach(function (proj) {
            //check if active
            if (proj.isAlive) {
                //check if targeted
                if (!proj.isTargeted) {
                    //decrease Y position (zero is top of screen so using negative value)
                    proj.moveLocationY(-modifier);
                    //check if position exceeds screen
                    if (proj.locationY < 1) {
                        proj.isAlive = false; //deactivate projectile
                    }
                }
                else {
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
    function moveEnemyShips(modifier, timeNow, enemyShipList) {
        var damage = 0;
        for (var i = 0; i < enemyShipList.length; i++) {
            var type = enemyShipList[i].type;
            //check if start time is valid
            if (enemyShipList[i].startTimeIsValid(timeNow)) {
                //check if image has been loaded
                if (GameObjects.isShipLoaded(enemyShipList[i].type)) {
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
    Render.moveEnemyShips = moveEnemyShips;
    /**
     * Moves boss ships to their next position.
     */
    function moveBosses(modifier, timeNow, bossList) {
        for (var i = 0; i < bossList.length; i++) {
            var type = bossList[i].type;
            //check if start time is valid
            if (bossList[i].startTimeIsValid(timeNow)) {
                //check if image has been loaded
                if (GameObjects.isShipLoaded(bossList[i].type)) {
                    //move
                    bossList[i].moveEnemyShip(modifier);
                    //fire
                    fireEnemyProjectile(bossList[i], modifier, timeNow, bossList[i].cannonShotList);
                    fireEnemyProjectile(bossList[i], modifier, timeNow, bossList[i].missileList);
                }
            }
        }
    }
    Render.moveBosses = moveBosses;
    /**
     * Fire projectiles from boss ship
     */
    function fireEnemyProjectile(boss, modifier, timeNow, list) {
        //check if time to fire
        if (list.length > 0 && boss.isTimeToFire(timeNow, list[0].type)) {
            var targetX = 0;
            var targetY = 0;
            //check if targeting rebel ship
            if (boss.isTargeting(list[0].type)) {
                //specific fire
                var targetPoint = boss.getNewSpecificTarget(rebelShip.getLocationX(), browserHeight, rebelShip.getVelocityX(modifier), rebelShip.getVelocityY(), list[0].speed);
                //set target points
                targetX = targetPoint.targetX;
                targetY = targetPoint.targetY;
            }
            else {
                //random fire
                targetX = GameLogic.getRandomInteger(0, browserWidth);
                targetY = browserHeight;
            }
            //fire projectile
            GameLogic.fireProjectile(list, 0, boss, true, targetX, targetY);
            //set new fire date
            boss.setNewFireTime(timeNow, list[0].type);
        }
    }
    /**
     * Render the rebel ship object
     */
    function drawRebelShip(canvasContext, rebelShip) {
        //check if context is valid
        //check if object has been loaded & if so, render
        if (canvasContext && GameObjects.isShipLoaded(rebelShip.type)) {
            canvasContext.drawImage(rebelShip.objImage, rebelShip.getLocationX(), rebelShip.getLocationY());
        }
    }
    Render.drawRebelShip = drawRebelShip;
    /**
     * Render enemy ships
     */
    function drawEnemyShips(canvasContext, timeNow, enemyShipList, cannonShotList, missileList, currentUserScore, currentLevel) {
        //check if context is valid
        //and that there are enemies to render
        if (canvasContext && enemyShipList.length > 0) {
            for (var i = 0; i < enemyShipList.length; i++) {
                //check if image has been loaded
                //and if timing is valid
                if (GameObjects.isShipLoaded(enemyShipList[i].type) && enemyShipList[i].startTimeIsValid(timeNow)) {
                    //render object
                    canvasContext.drawImage(enemyShipList[i].objImage, enemyShipList[i].getLocationX(), enemyShipList[i].getLocationY());
                    //check for collision
                    if (hasBeenHit(enemyShipList[i], cannonShotList, missileList)) {
                        //add hit animation
                        GameLogic.addHitAnimation(enemyShipList[i], explosionList, browserWidth, browserHeight);
                        //check if no health left
                        if (enemyShipList[i].health < 1) {
                            //update score
                            currentUserScore.updateScore(enemyShipList[i].type, enemyShipList[i].startDate, enemyShipList[i].maxHealth, currentLevel);
                            //remove from list
                            enemyShipList.splice(i, 1);
                        }
                    }
                }
            }
        }
    }
    Render.drawEnemyShips = drawEnemyShips;
    /**
     * Render list of enemy ships but do not process collision detection
     */
    function drawDummyShips(canvasContext, timeNow, enemyShipList) {
        //check if context is valid
        //and that there are enemies to render
        if (canvasContext && enemyShipList.length > 0) {
            for (var i = 0; i < enemyShipList.length; i++) {
                //check if image has been loaded
                //and if timing is valid
                if (GameObjects.isShipLoaded(enemyShipList[i].type) && enemyShipList[i].startTimeIsValid(timeNow)) {
                    //render object
                    canvasContext.drawImage(enemyShipList[i].objImage, enemyShipList[i].getLocationX(), enemyShipList[i].getLocationY());
                }
            }
        }
    }
    Render.drawDummyShips = drawDummyShips;
    /**
     * Render current Score and Health
     */
    function drawInfoPanel(canvasContext, currentLevel, enemies, rebelShipHealth, rebelShipMaxHealth, missileList) {
        if (canvasContext) {
            var level = "Level: " + currentLevel;
            var remainingEnemies = "Empire: " + enemies.toString();
            var health = "Health: " + rebelShipHealth.toString();
            var missiles = "Missiles: " + GameLogic.getProjectilesByStatus(missileList, false).length.toString();
            missiles += " / " + missileList.length;
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
            var precent = (rebelShipHealth * 100) / rebelShipMaxHealth;
            if (precent >= 90) {
                canvasContext.fillStyle = CONSTANTS.FILL_GREEN; //health is good
            }
            else if (precent >= 50) {
                canvasContext.fillStyle = CONSTANTS.FILL_LIGHT_BLUE; //injured
            }
            else {
                canvasContext.fillStyle = CONSTANTS.FILL_RED; //about to die
            }
            //draw health
            canvasContext.fillText(health, CONSTANTS.INFO_TEXT_SPACING, CONSTANTS.INFO_TEXT_SPACING * 4);
            //check for a boss
            if (bossList.length > 0) {
                //color & fill boss health
                canvasContext.fillStyle = CONSTANTS.FILL_ORANGE;
                canvasContext.fillText("Boss: " + bossList[0].health.toString(), CONSTANTS.INFO_TEXT_SPACING, CONSTANTS.INFO_TEXT_SPACING * 5);
            }
        }
    }
    Render.drawInfoPanel = drawInfoPanel;
    /**
     * Render list of messages
     */
    function drawMessageList(canvasContext, messageList) {
        //check if canvas valid & messages present
        if (canvasContext && messageList.length > 0) {
            var prevCount = 0;
            //loop through messages
            for (var i = 0; i < messageList.length; i++) {
                if (prevCount == 0 || prevCount > CONSTANTS.MESSAGE_THROTTLE_COUNT) {
                    //draw message
                    drawMessage(canvasContext, messageList[i]);
                    //check for expiration
                    if (messageList[i].isExpired()) {
                        messageList.splice(i, 1);
                        prevCount = 0;
                    }
                    else {
                        prevCount = messageList[i].renderCount;
                    }
                }
            }
        }
    }
    Render.drawMessageList = drawMessageList;
    /**
     * Render individual message
     */
    function drawMessage(canvasContext, msg) {
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
    function drawRebelProjectiles(canvasContext, list) {
        //check if context is valid
        if (canvasContext) {
            renderProjectileList(canvasContext, list);
        }
    }
    Render.drawRebelProjectiles = drawRebelProjectiles;
    /**
     * Draw all enemy projectiles to canvas
     */
    function drawEnemyProjectiles(canvasContext, list) {
        //check if context is valid
        if (canvasContext) {
            list.forEach(function (ship) {
                renderProjectileList(canvasContext, ship.cannonShotList);
                renderProjectileList(canvasContext, ship.missileList);
            });
        }
    }
    Render.drawEnemyProjectiles = drawEnemyProjectiles;
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
    function isOverlapPresent(firstObjectFloor, firstObjectCeiling, secondObjectFloor, secondObjectCeiling) {
        return (firstObjectFloor <= secondObjectCeiling && secondObjectFloor <= firstObjectCeiling);
    }
    /**
     * Render active explosion animation
     */
    function drawExplosions(canvasContext, list) {
        if (canvasContext) {
            for (var i = 0; i < list.length; i++) {
                if (GameObjects.isSpriteLoaded(list[i].type)) {
                    //update frame
                    list[i].update();
                    //draw
                    list[i].render(canvasContext);
                    //check if finished
                    if (list[i].isFinished) {
                        list.splice(i, 1); //remove
                    }
                }
            }
        }
    }
    Render.drawExplosions = drawExplosions;
    function drawTitle(canvasContext) {
        canvasContext.textAlign = "center";
        canvasContext.textBaseline = "top";
        canvasContext.font = "80px 'Orbitron'";
        canvasContext.fillStyle = CONSTANTS.FILL_WHITE;
        canvasContext.fillText("REBEL WARS", browserWidth / 2, browserHeight / 4);
    }
    Render.drawTitle = drawTitle;
})(Render || (Render = {}));
//# sourceMappingURL=Render.js.map