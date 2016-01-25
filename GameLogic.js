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
        if (currentLevel % CONSTANTS.DEATH_STAR_LEVEL_FACTOR == 0) {
            addEnemyShips(bossList, 1, Constants.ShipType.EMPIRE_DEATH_STAR, browserWidth, browserHeight, currentLevel);
        }
        else if (currentLevel % CONSTANTS.COMMANDER_LEVEL_FACTOR == 0) {
            addEnemyShips(bossList, 1, Constants.ShipType.EMPIRE_COMMANDER, browserWidth, browserHeight, currentLevel);
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
                ship = new GameObjects.DestroyerObject(randomX, 0, browserWidth, browserHeight, randomTime);
                break;
            case Constants.ShipType.EMPIRE_TIE_FIGHTER:
            default:
                ship = new GameObjects.TieFighterObject(randomX, 0, browserWidth, browserHeight, randomTime);
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
                ship = new GameObjects.CommanderObject(randomX, randomY, browserWidth, browserHeight, maxTime);
                break;
            case Constants.ShipType.EMPIRE_DEATH_STAR:
            default:
                ship = new GameObjects.DeathStarObject(randomX, randomY, browserWidth, browserHeight, maxTime);
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
            var missile = new GameObjects.Projectile(0, 0, CONSTANTS.MISSILE_SPEED, browserWidth, browserHeight, Constants.ProjectileType.MISSILE, id, 0, radius, color, damage);
            //add missile
            missileList.push(missile);
        }
    }
    GameLogic.equipMissiles = equipMissiles;
    /**
     * Create list populated with Projectile projects
     */
    function getPopulatedProjectileList(type, speed, limit, canvasWidth, canvasHeight) {
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
            case Constants.ProjectileType.CANNON_SHOT:
            default:
                radius = CONSTANTS.CANNON_SHOT_RADIUS;
                color = CONSTANTS.CANNON_SHOT_BLUE;
                damage = CONSTANTS.CANNON_SHOT_DAMAGE;
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
        }
        for (var i = 0; i < limit; i++) {
            list.push(new GameObjects.Projectile(0, 0, speed, canvasWidth, canvasHeight, type, i, 0, radius, color, damage));
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
     * Create new projectile object
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
    function addNewExplosion(list, x, y, type, browserWidth, browserHeight) {
        switch (type) {
            case Constants.SpriteType.EXPLOSION_SMALL:
            default:
                list.push(new GameObjects.ExplosionSmall(x, y, browserWidth, browserHeight));
                break;
        }
    }
    GameLogic.addNewExplosion = addNewExplosion;
})(GameLogic || (GameLogic = {}));
//# sourceMappingURL=GameLogic.js.map