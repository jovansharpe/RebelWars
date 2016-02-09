var GameLogic;
(function (GameLogic) {
    var CONSTANTS = new Constants.Constants();
    /**
     * Create list of enemy ship objects based on level
     */
    function buildEnemyListByLevel(currentLevel, browserWidth, browserHeight) {
        //start new list
        var enemyShipList = new Array();
        //get # of enemies
        var totalNumFighters = CONSTANTS.NUM_FIGHTERS_PER_LEVEL * currentLevel;
        var totalNumDestroyers = CONSTANTS.NUM_DESTROYERS_PER_LEVEL * currentLevel;
        //populate fighters
        addEnemyShips(enemyShipList, totalNumFighters, Constants.ShipType.EMPIRE_TIE_FIGHTER, browserWidth, browserHeight, currentLevel);
        //populate destroyers
        addEnemyShips(enemyShipList, totalNumDestroyers, Constants.ShipType.EMPIRE_DESTROYER, browserWidth, browserHeight, currentLevel);
        return enemyShipList;
    }
    GameLogic.buildEnemyListByLevel = buildEnemyListByLevel;
    /**
     * Create list of boss objects based on level
     */
    function getBossListByLevel(currentLevel, browserWidth, browserHeight) {
        //start new list
        var bossList = new Array();
        //check for bosses
        if (currentLevel % CONSTANTS.BOUNTY_HUNTER_LEVEL_FACTOR == 0) {
            addEnemyShips(bossList, 1, Constants.ShipType.BOUNTY_HUNTER, browserWidth, browserHeight, currentLevel);
        }
        else if (currentLevel % CONSTANTS.DEATH_STAR_LEVEL_FACTOR == 0) {
            addEnemyShips(bossList, 1, Constants.ShipType.EMPIRE_DEATH_STAR, browserWidth, browserHeight, currentLevel);
        }
        else if (currentLevel % CONSTANTS.COMMANDER_LEVEL_FACTOR == 0) {
            addEnemyShips(bossList, 1, Constants.ShipType.EMPIRE_COMMANDER, browserWidth, browserHeight, currentLevel);
        }
        //check if boss added
        if (bossList.length > 0) {
            Message.AddBossMessage(); //notify user
        }
        return bossList;
    }
    GameLogic.getBossListByLevel = getBossListByLevel;
    /**
     * Populate enemy ship list with new objects
     */
    function addEnemyShips(enemyShipList, numberOfShips, type, browserWidth, browserHeight, currentLevel) {
        //loop until limit reached
        for (var i = 0; i < numberOfShips; i++) {
            var enemyShip = null;
            switch (type) {
                case Constants.ShipType.EMPIRE_DEATH_STAR:
                case Constants.ShipType.EMPIRE_COMMANDER:
                case Constants.ShipType.BOUNTY_HUNTER:
                    enemyShip = getNewBoss(type, browserWidth, browserHeight, currentLevel);
                    break;
                default:
                    enemyShip = getNewEnemyShip(type, browserWidth, browserHeight, currentLevel);
                    break;
            }
            //add new object
            enemyShipList.push(enemyShip);
        }
    }
    /**
     * Initialize new enemy ship object based on type requested
     */
    function getNewEnemyShip(type, browserWidth, browserHeight, currentLevel) {
        var ship = null;
        var randomX = getRandomInteger(0, browserWidth);
        var randomSeconds = getRandomInteger(0, (currentLevel * CONSTANTS.MAX_SECONDS_MULTIPLIER_PER_LEVEL));
        var randomTime = addSecondsToDate(Date.now(), (randomSeconds + CONSTANTS.LEVEL_LOAD_BUFFER_SECONDS));
        switch (type) {
            case Constants.ShipType.EMPIRE_DESTROYER:
                ship = new GameObjects.DestroyerObject(randomX, 0, browserWidth, browserHeight, randomTime, currentLevel);
                break;
            case Constants.ShipType.EMPIRE_TIE_FIGHTER:
            default:
                ship = new GameObjects.TieFighterObject(randomX, 0, browserWidth, browserHeight, randomTime, currentLevel);
                break;
        }
        return ship;
    }
    /**
     * Initialize new boss object based on type requested
     */
    function getNewBoss(type, browserWidth, browserHeight, currentLevel) {
        var ship = null;
        var randomX = getRandomInteger((browserWidth / 4), (browserWidth - (browserWidth / 4)));
        var randomY = getRandomInteger(0, (browserHeight / 2));
        //have boss start near end of level
        var maxSeconds = (currentLevel * CONSTANTS.MAX_SECONDS_MULTIPLIER_PER_LEVEL);
        var maxTime = addSecondsToDate(Date.now(), (maxSeconds + CONSTANTS.LEVEL_LOAD_BUFFER_SECONDS));
        switch (type) {
            case Constants.ShipType.EMPIRE_COMMANDER:
                ship = new GameObjects.CommanderObject(randomX, randomY, browserWidth, browserHeight, maxTime, currentLevel);
                break;
            case Constants.ShipType.BOUNTY_HUNTER:
                ship = new GameObjects.BountyHunterObject(randomX, randomY, browserWidth, browserHeight, maxTime, currentLevel);
                break;
            case Constants.ShipType.EMPIRE_DEATH_STAR:
            default:
                ship = new GameObjects.DeathStarObject(randomX, randomY, browserWidth, browserHeight, maxTime, currentLevel);
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
    GameLogic.getRandomInteger = getRandomInteger;
    /**
     * Add a user provided amount of seconds to the passed in date
     */
    function addSecondsToDate(dateNumber, seconds) {
        return new Date(dateNumber + seconds * 1000);
    }
    GameLogic.addSecondsToDate = addSecondsToDate;
    /**
     * Reset missiles and their availability based on current level
     */
    function equipMissiles(currentLevel, missileList, browserWidth, browserHeight) {
        //check if current level is multiple
        if (currentLevel % CONSTANTS.ADD_MISSILE_LEVEL == 0) {
            //init missile
            var id = missileList.length;
            var radius = CONSTANTS.MISSILE_RADIUS;
            var color = CONSTANTS.MISSLE_PINK;
            var damage = CONSTANTS.MISSILE_DAMAGE;
            var missile = new GameObjects.Projectile(0, 0, CONSTANTS.MISSILE_SPEED, browserWidth, browserHeight, Constants.ProjectileType.MISSILE, id, 0, radius, color, damage, currentLevel);
            //add missile
            missileList.push(missile);
            //notify user
            Message.AddMissileMessage();
        }
    }
    GameLogic.equipMissiles = equipMissiles;
    /**
     * Check if user has advanced far enough to earn extra health
     */
    function checkRebelShipHealth(ship, currentLevel) {
        //check if current level is multiple
        if (currentLevel % CONSTANTS.ADD_HEALTH_LEVEL == 0) {
            //add health
            ship.maxHealth += 1;
            ship.health += 1;
            //notify user
            Message.AddHealthMessage(1);
        }
    }
    GameLogic.checkRebelShipHealth = checkRebelShipHealth;
    /**
     * Create list populated with Projectile projects
     */
    function getPopulatedProjectileList(type, speed, limit, canvasWidth, canvasHeight, currentLevel) {
        var list = new Array();
        var radius = 0;
        var color = '';
        var damage = 0;
        switch (type) {
            case Constants.ProjectileType.MISSILE:
                radius = CONSTANTS.MISSILE_RADIUS;
                color = CONSTANTS.MISSLE_PINK;
                damage = CONSTANTS.MISSILE_DAMAGE;
                break;
            case Constants.ProjectileType.IMPERIAL_SHOT:
                radius = CONSTANTS.IMPERIAL_SHOT_RADIUS;
                color = CONSTANTS.IMPERIAL_RED;
                damage = CONSTANTS.IMPERIAL_SHOT_DAMAGE;
                break;
            case Constants.ProjectileType.IMPERIAL_MISSILE:
                radius = CONSTANTS.IMPERIAL_MISSILE_RADIUS;
                color = CONSTANTS.IMPERIAL_ORANGE;
                damage = CONSTANTS.IMPERIAL_MISSILE_DAMAGE;
                break;
            case Constants.ProjectileType.TURRET_SPRAY:
                radius = CONSTANTS.TURRET_SPRAY_RADIUS;
                color = CONSTANTS.TURRET_GREEN;
                damage = CONSTANTS.TURRET_SPRAY_DAMAGE;
                break;
            default:
                radius = CONSTANTS.CANNON_SHOT_RADIUS;
                color = CONSTANTS.CANNON_SHOT_BLUE;
                damage = CONSTANTS.CANNON_SHOT_DAMAGE;
                break;
        }
        for (var i = 0; i < limit; i++) {
            list.push(new GameObjects.Projectile(0, 0, speed, canvasWidth, canvasHeight, type, i, 0, radius, color, damage, currentLevel));
        }
        return list;
    }
    GameLogic.getPopulatedProjectileList = getPopulatedProjectileList;
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
            if (proj.type === Constants.ProjectileType.MISSILE && !isActive) {
                //if needing an inactive missile, only return first shot
                return (proj.isAlive === isActive && proj.isFirst === true);
            }
            else {
                return proj.isAlive === isActive;
            }
        });
    }
    GameLogic.getProjectilesByStatus = getProjectilesByStatus;
    /**
     * Create new projectile object. Returns number of projectiles activated.
     */
    function fireProjectile(list, offset, ship, isTargeted, targetX, targetY) {
        //get id of next available unused projectile
        var id = getUnusedProjectileId(list);
        //check if id is valid
        if (id >= 0) {
            //get current location of ship
            var x = ship.getProjectileLocationStartX();
            var y = ship.getProjectileLocationStartY(offset);
            //activate projectile
            activateProjectile(id, list, x, y, isTargeted, targetX, targetY);
            return 1;
        }
        else {
            return 0;
        }
    }
    GameLogic.fireProjectile = fireProjectile;
    /**
     * Activate projectile object for a specific id
     */
    function activateProjectile(id, list, currentX, currentY, isTargeted, targetX, targetY) {
        //get index of id
        var index = list.map(function (proj) { return proj.id; }).indexOf(id);
        //update projectile properties
        list[index].createTime = Date.now();
        list[index].isAlive = true; //now active object to render
        list[index].isFirst = false; //not the first use
        list[index].locationX = currentX;
        list[index].locationY = currentY;
        list[index].isTargeted = isTargeted;
        if (isTargeted) {
            list[index].setTarget(targetX, targetY);
        }
    }
    /**
     * deactivate all projectiles within a list
     */
    function resetProjectiles(list) {
        list.forEach(function (proj) {
            proj.isAlive = false;
            proj.isFirst = true;
        });
    }
    GameLogic.resetProjectiles = resetProjectiles;
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
    GameLogic.incrementProjectilePosition = incrementProjectilePosition;
    /**
     * Create appropriate animation based on ship type and health remaining
     */
    function addHitAnimation(ship, list, browserWidth, browserHeight) {
        var isDestroyed = ship.health > 0 ? false : true;
        var x = ship.getExplosionX();
        var y = ship.getExplosionY();
        var type;
        //check if destroyed
        if (isDestroyed) {
            switch (ship.type) {
                case Constants.ShipType.EMPIRE_DESTROYER:
                case Constants.ShipType.EMPIRE_COMMANDER:
                case Constants.ShipType.EMPIRE_DEATH_STAR:
                case Constants.ShipType.REBEL_MILLENIUM_FALCON:
                    type = Constants.SpriteType.EXPLOSION_LARGE;
                    break;
                default:
                    type = Constants.SpriteType.EXPLOSION_SMALL;
                    break;
            }
        }
        else {
            switch (ship.type) {
                default:
                    type = Constants.SpriteType.EXPLOSION_SMALL;
                    break;
            }
        }
        //add explosion
        addNewExplosion(explosionList, x, y, type, browserWidth, browserHeight);
    }
    GameLogic.addHitAnimation = addHitAnimation;
    /**
     * Add new explosion animation to list
     */
    function addNewExplosion(list, x, y, type, browserWidth, browserHeight) {
        switch (type) {
            case Constants.SpriteType.EXPLOSION_LARGE:
                list.push(new GameObjects.ExplosionLarge(x, y, browserWidth, browserHeight));
            case Constants.SpriteType.EXPLOSION_SMALL:
            default:
                list.push(new GameObjects.ExplosionSmall(x, y, browserWidth, browserHeight));
                break;
        }
    }
    /**
     * Add new message with properties based on type
     */
    function addNewMessage(list, type, text, startX, startY, fontSize) {
        var font = fontSize.toString() + "px 'Orbitron'";
        var colorRgb1;
        var colorRgb2 = CONSTANTS.FILL_YELLOW;
        var expireCount = CONSTANTS.MESSAGE_EXPIRE_COUNT;
        switch (type) {
            case Constants.MessageType.ADD_HEALTH:
            case Constants.MessageType.ADD_MISSILE:
                colorRgb1 = CONSTANTS.FILL_GREEN;
                colorRgb2 = CONSTANTS.FILL_RED;
                break;
            case Constants.MessageType.HIGH_SCORE:
                colorRgb1 = CONSTANTS.FILL_RED;
                break;
            case Constants.MessageType.NEW_BOSS:
                colorRgb1 = CONSTANTS.FILL_ORANGE;
                colorRgb2 = CONSTANTS.FILL_WHITE;
                break;
            case Constants.MessageType.QUOTE:
                colorRgb1 = CONSTANTS.FILL_YELLOW;
                colorRgb2 = CONSTANTS.FILL_WHITE;
                expireCount = 0; //show entire screen
                break;
            default:
                colorRgb1 = CONSTANTS.FILL_WHITE;
                break;
        }
        //add message
        list.push(new GameObjects.Message(type, text, font, colorRgb1, colorRgb2, startX, startY, expireCount));
    }
    GameLogic.addNewMessage = addNewMessage;
    /**
     * Get current factor of difficulty
     */
    function getDifficultyFactor(level) {
        var factor = 0;
        var factorLevel = CONSTANTS.ENEMY_STAT_INCREASE_LEVEL;
        if (level > factorLevel) {
            factor = Math.floor(factorLevel / level);
        }
        return factor;
    }
    GameLogic.getDifficultyFactor = getDifficultyFactor;
    /**
     * Check if browser is compliant
     */
    function isCompliantBrowser() {
        var isCompliant = false;
        var ua = navigator.userAgent;
        var browserName = navigator.appName;
        var nVer = navigator.appVersion;
        var fullVersion = '' + parseFloat(navigator.appVersion);
        var majorVer = parseInt(navigator.appVersion, 10);
        var nameOffset, verOffset, ix;
        //Google Chrome 
        if ((verOffset = ua.indexOf("Chrome")) != -1) {
            browserName = "Chrome";
            fullVersion = ua.substring(verOffset + 7);
            isCompliant = true;
        }
        else if ((verOffset = ua.indexOf("OPR/")) != -1) {
            browserName = "Opera";
            fullVersion = ua.substring(verOffset + 4);
        }
        else if ((verOffset = ua.indexOf("Opera")) != -1) {
            browserName = "Opera";
            fullVersion = ua.substring(verOffset + 6);
            if ((verOffset = ua.indexOf("Version")) != -1)
                fullVersion = ua.substring(verOffset + 8);
        }
        else if ((verOffset = ua.indexOf("MSIE")) != -1) {
            browserName = "Microsoft Internet Explorer";
            fullVersion = ua.substring(verOffset + 5);
        }
        else if ((verOffset = ua.indexOf("Safari")) != -1) {
            browserName = "Safari";
            fullVersion = ua.substring(verOffset + 7);
            if ((verOffset = ua.indexOf("Version")) != -1)
                fullVersion = ua.substring(verOffset + 8);
        }
        else if ((verOffset = ua.indexOf("Firefox")) != -1) {
            browserName = "Firefox";
            fullVersion = ua.substring(verOffset + 8);
        }
        else if ((nameOffset = ua.lastIndexOf(' ') + 1) <
            (verOffset = ua.lastIndexOf('/'))) {
            browserName = ua.substring(nameOffset, verOffset);
            fullVersion = ua.substring(verOffset + 1);
            if (browserName.toLowerCase() == browserName.toUpperCase()) {
                browserName = navigator.appName;
            }
        }
        return isCompliant;
    }
    GameLogic.isCompliantBrowser = isCompliantBrowser;
})(GameLogic || (GameLogic = {}));
//# sourceMappingURL=GameLogic.js.map