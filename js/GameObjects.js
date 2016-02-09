var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameObjects;
(function (GameObjects) {
    var CONSTANTS = new Constants.Constants();
    var isRebelShipLoaded = false;
    var isTieFighterLoaded = false;
    var isDestroyerLoaded = false;
    var isCommanderLoaded = false;
    var isDeathStarLoaded = false;
    var isBountyHunterLoaded = false;
    var isExplosionSmallLoaded = false;
    var isExplosionLargeLoaded = false;
    var isInstructionPanelLoaded = false;
    /**
     * Check if a specific ship types image has been loaded already
     */
    function isShipLoaded(type) {
        var loaded = false;
        switch (type) {
            case Constants.ShipType.EMPIRE_DESTROYER:
                loaded = isDestroyerLoaded;
                break;
            case Constants.ShipType.EMPIRE_TIE_FIGHTER:
                loaded = isTieFighterLoaded;
                break;
            case Constants.ShipType.REBEL_MILLENIUM_FALCON:
                loaded = isRebelShipLoaded;
                break;
            case Constants.ShipType.EMPIRE_COMMANDER:
                loaded = isCommanderLoaded;
                break;
            case Constants.ShipType.EMPIRE_DEATH_STAR:
                loaded = isDeathStarLoaded;
                break;
            case Constants.ShipType.BOUNTY_HUNTER:
                loaded = isBountyHunterLoaded;
                break;
        }
        return loaded;
    }
    GameObjects.isShipLoaded = isShipLoaded;
    /**
     * Check if a specific sprite image has been loaded already
     */
    function isSpriteLoaded(type) {
        var loaded = false;
        switch (type) {
            case Constants.SpriteType.EXPLOSION_SMALL:
                loaded = isExplosionSmallLoaded;
                break;
            case Constants.SpriteType.EXPLOSION_LARGE:
                loaded = isExplosionLargeLoaded;
                break;
            case Constants.SpriteType.INSTRUCTION_PANEL:
                loaded = isInstructionPanelLoaded;
                break;
        }
        return loaded;
    }
    GameObjects.isSpriteLoaded = isSpriteLoaded;
    /**
     * Base class for on screen objects
     */
    var BaseGameObject = (function () {
        function BaseGameObject(currentX, currentY, canvasWidth, canvasHeight, speed, level) {
            this.speed = speed;
            this.maxHeight = canvasHeight;
            this.maxWidth = canvasWidth;
            this.locationX = currentX;
            this.locationY = currentY;
            //adjust object speed
            this.setSpeedBasedOnLevel(level);
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
        /**
         * Adjust object speed based on level
         */
        BaseGameObject.prototype.setSpeedBasedOnLevel = function (level) {
            //get difficulty factor
            var factor = GameLogic.getDifficultyFactor(level);
            //add to speed of ship    
            this.speed += (this.speed * (1 / 4) * factor);
        };
        return BaseGameObject;
    })();
    GameObjects.BaseGameObject = BaseGameObject;
    /**
     * Base ship object
     */
    var ShipObject = (function (_super) {
        __extends(ShipObject, _super);
        function ShipObject(currentX, currentY, canvasWidth, canvasHeight, speed, type, createDate, health, heightHitFactor, level) {
            //base constructor
            _super.call(this, currentX, currentY, canvasWidth, canvasHeight, speed, level);
            //assign
            this.type = type;
            this.health = health;
            this.maxHealth = health;
            this.startDate = createDate;
            this.heightHitFactor = heightHitFactor;
            //default
            this.onScreen = false;
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
         * Retrieve X coordinate for initiating explosion animation
         */
        ShipObject.prototype.getExplosionX = function () {
            return this.getLocationX() + (this.objImage.naturalWidth / 2);
        };
        /**
         * Retrieve Y coordinate for initiating explosion animation
         */
        ShipObject.prototype.getExplosionY = function () {
            return this.getLocationY() + (this.objImage.naturalHeight / 2);
        };
        /**
         * Check if object has reached the bottom limit of the screen
         */
        ShipObject.prototype.isAtBottomOfScreen = function () {
            var atBottom = false;
            if ((this.locationY + this.objImage.naturalHeight) > this.maxHeight) {
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
            var step = (pixels * this.speed);
            //check if object is a destroyer & is near top of screen
            if (this.type == Constants.ShipType.EMPIRE_DESTROYER &&
                this.locationY < (this.objImage.naturalHeight / 2)) {
                //check if current position change is smaller than image size
                if (step < this.objImage.naturalHeight) {
                    //larger images appear to not move if the pixel
                    //change is too low so we amplify their initial movement
                    step = (pixels * this.speed) * 1.5;
                }
            }
            this.locationY = this.locationY + step;
        };
        ShipObject.prototype.showEntryMessage = function () {
            var showMessage = false;
            if (!this.onScreen) {
                this.onScreen = true;
                switch (this.type) {
                    case Constants.ShipType.BOUNTY_HUNTER:
                    case Constants.ShipType.EMPIRE_COMMANDER:
                    case Constants.ShipType.EMPIRE_DESTROYER:
                        showMessage = true;
                        break;
                }
            }
            return showMessage;
        };
        return ShipObject;
    })(BaseGameObject);
    GameObjects.ShipObject = ShipObject;
    /**
     * User controlled Rebel Ship
     */
    var RebelShipObject = (function (_super) {
        __extends(RebelShipObject, _super);
        function RebelShipObject(canvasWidth, canvasHeight, level) {
            //create & assign image
            var image = new Image();
            image.src = 'images/falcon2.png';
            image.onload = function () { isRebelShipLoaded = true; };
            this.objImage = image;
            var currentX = canvasWidth / 2;
            var currentY = canvasHeight;
            //default
            this.direction = Constants.Direction.RIGHT;
            //base constructor
            _super.call(this, currentX, currentY, canvasWidth, canvasHeight, CONSTANTS.REBEL_SHIP_SPEED, Constants.ShipType.REBEL_MILLENIUM_FALCON, new Date(Date.now()), CONSTANTS.REBEL_SHIP_HEALTH, CONSTANTS.REBEL_SHIP_HEIGHT_HIT_FACTOR, level);
        }
        /**
         * Place object back to start position. Middle of screen at the bottom.
         */
        RebelShipObject.prototype.reset = function () {
            this.locationX = this.maxWidth / 2;
            this.locationY = this.maxHeight;
        };
        /**
         * Return the direction this object is moving
         */
        RebelShipObject.prototype.getVelocityX = function (modifier) {
            var v = (modifier * this.speed);
            if (this.direction == Constants.Direction.RIGHT) {
                return v;
            }
            else {
                return -v;
            }
        };
        /**
         * Return the vertical direction. Hard-coded to zero as this object
         * moves side to side only
         */
        RebelShipObject.prototype.getVelocityY = function () {
            return 0;
        };
        return RebelShipObject;
    })(ShipObject);
    GameObjects.RebelShipObject = RebelShipObject;
    /**
     * Fighter class enemy ship
     */
    var TieFighterObject = (function (_super) {
        __extends(TieFighterObject, _super);
        function TieFighterObject(currentX, currentY, canvasWidth, canvasHeight, startTime, level) {
            //base constructor
            _super.call(this, currentX, currentY, canvasWidth, canvasHeight, CONSTANTS.TIE_FIGHTER_SPEED, Constants.ShipType.EMPIRE_TIE_FIGHTER, startTime, CONSTANTS.TIE_FIGHTER_HEALTH, CONSTANTS.TIE_FIGHTER_HEIGHT_HIT_FACTOR, level);
            //create & assign image
            var image = new Image();
            image.src = 'images/TieFighter3.png';
            image.onload = function () { isTieFighterLoaded = true; };
            this.objImage = image;
            this.setStatsBasedOnDifficulty(level);
        }
        /**
         * Adjust ship properties based on current level.
         */
        TieFighterObject.prototype.setStatsBasedOnDifficulty = function (level) {
            //get difficulty factor
            var factor = GameLogic.getDifficultyFactor(level);
            //add to health of ship
            this.health = this.maxHealth = (this.maxHealth + factor);
        };
        return TieFighterObject;
    })(ShipObject);
    GameObjects.TieFighterObject = TieFighterObject;
    /**
     * Destroyer class enemy ship
     */
    var DestroyerObject = (function (_super) {
        __extends(DestroyerObject, _super);
        function DestroyerObject(currentX, currentY, canvasWidth, canvasHeight, startTime, level) {
            //base constructor
            _super.call(this, currentX, currentY, canvasWidth, canvasHeight, CONSTANTS.DESTROYER_SPEED, Constants.ShipType.EMPIRE_DESTROYER, startTime, CONSTANTS.DESTROYER_HEALTH, CONSTANTS.DESTROYER_HEIGHT_HIT_FACTOR, level);
            //create & assign image
            var image = new Image();
            image.src = 'images/Destroyer3.png';
            image.onload = function () { isDestroyerLoaded = true; };
            this.objImage = image;
        }
        /**
         * Adjust ship properties based on current level.
         */
        DestroyerObject.prototype.setStatsBasedOnDifficulty = function (level) {
            //get difficulty factor
            var factor = GameLogic.getDifficultyFactor(level);
            //add to health of ship
            this.health = this.maxHealth = (this.maxHealth + (factor * 2));
        };
        return DestroyerObject;
    })(ShipObject);
    GameObjects.DestroyerObject = DestroyerObject;
    /**
     * Base class for boss ship objects. Their movement differs from that of regular enemy ships.
     */
    var BossShipObject = (function (_super) {
        __extends(BossShipObject, _super);
        function BossShipObject(currentX, currentY, canvasWidth, canvasHeight, speed, type, startTime, health, heightHitFactor, cannonShotType, cannonShotSpeed, cannonShotFireRate, cannonShotLimit, numberOfExtraShots, missileType, missileSpeed, missileFireRate, missileLimit, level) {
            //base constructor
            //cut height in half
            _super.call(this, currentX, currentY, canvasWidth, canvasHeight, speed, type, startTime, health, heightHitFactor, level);
            //set cannon specs
            this.cannonShotType = cannonShotType;
            this.cannonShotSpeed = cannonShotSpeed;
            this.cannonShotFireRate = cannonShotFireRate;
            this.cannonShotLimit = cannonShotLimit;
            this.numberOfExtraShots = numberOfExtraShots;
            this.nextFireTimeShot = this.getNextFireDate(Date.now(), Constants.ProjectileType.IMPERIAL_SHOT);
            //set missile specs
            this.missileType = missileType;
            this.missileSpeed = missileSpeed;
            this.missileFireRate = missileFireRate;
            this.missileLimit = missileLimit;
            this.nextFireTimeMissile = this.getNextFireDate(Date.now(), Constants.ProjectileType.IMPERIAL_MISSILE);
            //set difficultyLevel
            this.setStatsBasedOnDifficulty(level);
        }
        /**
         * Override default ship movement. Bosses use vector movement.
         */
        BossShipObject.prototype.moveEnemyShip = function (pixels) {
            //calculate speed
            var step = (pixels * this.speed);
            //get next point in path based on speed
            var point = this.nextWaypoint.getNextLocation(this.getLocationX(), this.getLocationY(), step);
            //assign location to object
            this.locationX = point.targetX;
            this.locationY = point.targetY;
            //check if object has reached its target point
            if (this.isAtTarget(point)) {
                //if so, generate new random target point
                this.nextWaypoint = this.getNewRandomWaypoint();
            }
        };
        BossShipObject.prototype.getNewRandomWaypoint = function () {
            return Vector.getRandomWaypoint(this.getPathMinLimitX(), this.getPathMaxLimitX(), this.getPathMinLimitY(), this.getPathMaxLimitY());
        };
        BossShipObject.prototype.getNewSpecificTarget = function (targetX, targetY, targetVelocityX, targetVelocityY, projectileSpeed) {
            return Vector.getTargetedWaypoint(this.getLocationX(), this.getLocationY(), targetX, targetY, targetVelocityX, targetVelocityY, projectileSpeed);
        };
        BossShipObject.prototype.getPathMinLimitX = function () {
            //return this.objImage.naturalWidth;
            return 0;
        };
        BossShipObject.prototype.getPathMinLimitY = function () {
            //return this.objImage.naturalHeight;
            return 0;
        };
        BossShipObject.prototype.getPathMaxLimitX = function () {
            return (this.maxWidth - this.objImage.naturalWidth);
        };
        BossShipObject.prototype.getPathMaxLimitY = function () {
            return (this.maxHeight / 2);
        };
        /**
         * Retrieve number of additional projectiles to create per round
         */
        BossShipObject.prototype.getNumberOfExtraShots = function () {
            if (this.numberOfExtraShots != null) {
                return this.numberOfExtraShots;
            }
            else {
                return 0;
            }
        };
        /**
         * Check if a specific type of projectile is targeting player
         */
        BossShipObject.prototype.isTargeting = function (type) {
            switch (type) {
                case Constants.ProjectileType.IMPERIAL_MISSILE:
                    return this.isTargetingMissiles;
                    break;
                default:
                    return this.isTargetingShots;
                    break;
            }
        };
        /**
         * Check if a point matches the current target
         */
        BossShipObject.prototype.isAtTarget = function (currentPoint) {
            var atTargetX = false;
            var atTargetY = false;
            if (currentPoint.targetX + this.objImage.naturalWidth > browserWidth) {
                atTargetX = true;
            }
            else if (Math.ceil(currentPoint.targetX) == this.nextWaypoint.targetX
                || Math.floor(currentPoint.targetX) == this.nextWaypoint.targetX) {
                atTargetX = true;
            }
            if (Math.ceil(currentPoint.targetY) == this.nextWaypoint.targetY
                || Math.floor(currentPoint.targetY) == this.nextWaypoint.targetY) {
                atTargetY = true;
            }
            return (atTargetX && atTargetY);
        };
        /**
         * Get next time available to fire
         */
        BossShipObject.prototype.getNextFireDate = function (time, type) {
            var seconds = 0;
            switch (type) {
                case Constants.ProjectileType.IMPERIAL_MISSILE:
                    seconds = this.missileFireRate;
                    break;
                default:
                    seconds = this.cannonShotFireRate;
                    break;
            }
            return GameLogic.addSecondsToDate(time, seconds);
        };
        /**
         * Set next time to fire based on projectile type
         */
        BossShipObject.prototype.setNewFireTime = function (time, type) {
            switch (type) {
                case Constants.ProjectileType.IMPERIAL_MISSILE:
                    this.nextFireTimeMissile = this.getNextFireDate(Date.now(), Constants.ProjectileType.IMPERIAL_MISSILE);
                    break;
                default:
                    this.nextFireTimeShot = this.getNextFireDate(Date.now(), Constants.ProjectileType.IMPERIAL_SHOT);
                    break;
            }
        };
        /**
         * Check if it is time to fire
         */
        BossShipObject.prototype.isTimeToFire = function (time, type) {
            var fireTime = 0;
            switch (type) {
                case Constants.ProjectileType.IMPERIAL_MISSILE:
                    fireTime = this.nextFireTimeMissile.getTime();
                    break;
                default:
                    fireTime = this.nextFireTimeShot.getTime();
                    break;
            }
            if (time > fireTime) {
                return true;
            }
            else {
                return false;
            }
        };
        /**
         * Check if projectile type shoots multiple times per round
         */
        BossShipObject.prototype.isMultiShot = function (type) {
            switch (type) {
                case Constants.ProjectileType.TURRET_SPRAY:
                case Constants.ProjectileType.IMPERIAL_SHOT:
                    return true;
                    break;
                default:
                    return false;
                    break;
            }
        };
        /**
         * Adjust ship properties based on current level.
         */
        BossShipObject.prototype.setStatsBasedOnDifficulty = function (level) {
            //get difficulty factor
            var factor = GameLogic.getDifficultyFactor(level);
            //add to health of ship
            this.health = this.maxHealth = (this.maxHealth + (this.maxHealth * (1 / 5) * factor));
            //add to speed of cannon
            this.cannonShotSpeed += (this.cannonShotSpeed * (1 / 4) * factor);
            //increase cannon fire rate
            this.cannonShotFireRate += (this.cannonShotFireRate * (1 / 4) * factor);
            //add to speed of missile
            this.missileSpeed += (this.missileSpeed * (1 / 4) * factor);
            //increase missile fire rate
            this.missileFireRate += (this.missileFireRate * (1 / 4) * factor);
        };
        return BossShipObject;
    })(ShipObject);
    GameObjects.BossShipObject = BossShipObject;
    /**
     * Command class enemy ship
     */
    var CommanderObject = (function (_super) {
        __extends(CommanderObject, _super);
        function CommanderObject(currentX, currentY, canvasWidth, canvasHeight, startTime, level) {
            //base constructor
            _super.call(this, currentX, currentY, canvasWidth, canvasHeight, CONSTANTS.COMMANDER_SPEED, Constants.ShipType.EMPIRE_COMMANDER, startTime, CONSTANTS.COMMANDER_HEALTH, CONSTANTS.COMMANDER_HEIGHT_HIT_FACTOR, Constants.ProjectileType.IMPERIAL_SHOT, CONSTANTS.IMPERIAL_SHOT_SPEED, CONSTANTS.COMMANDER_IMPERIAL_SHOT_FIRE_RATE, CONSTANTS.COMMANDER_IMPERIAL_SHOT_LIMIT, 0, null, 0, 0, 0, level);
            //create & assign image
            var image = new Image();
            image.src = 'images/Commander2.png';
            image.onload = function () { isCommanderLoaded = true; };
            this.objImage = image;
            //populate projectile list
            this.cannonShotList = GameLogic.getPopulatedProjectileList(this.cannonShotType, this.cannonShotSpeed, this.cannonShotLimit, canvasWidth, canvasHeight, level);
            //populate missile list
            this.missileList = new Array();
            //create initial target
            this.nextWaypoint = this.getNewRandomWaypoint();
            //set targeting
            this.isTargetingShots = true;
            this.isTargetingMissiles = false;
        }
        /**
         * Override starting X coordinate for a projectile
         */
        CommanderObject.prototype.getProjectileLocationStartX = function () {
            return this.getLocationX() + (this.objImage.naturalWidth);
        };
        /**
         * Override starting Y coordinate for a projectile
         */
        CommanderObject.prototype.getProjectileLocationStartY = function (offset) {
            return this.getLocationY() + (this.objImage.naturalHeight / 2);
        };
        return CommanderObject;
    })(BossShipObject);
    GameObjects.CommanderObject = CommanderObject;
    /**
     * Death Star enemy ship
     */
    var DeathStarObject = (function (_super) {
        __extends(DeathStarObject, _super);
        function DeathStarObject(currentX, currentY, canvasWidth, canvasHeight, startTime, level) {
            //base constructor
            _super.call(this, currentX, currentY, canvasWidth, canvasHeight, CONSTANTS.DEATH_STAR_SPEED, Constants.ShipType.EMPIRE_DEATH_STAR, startTime, CONSTANTS.DEATH_STAR_HEALTH, CONSTANTS.DEATH_STAR_HEIGHT_HIT_FACTOR, Constants.ProjectileType.IMPERIAL_SHOT, CONSTANTS.IMPERIAL_SHOT_SPEED, CONSTANTS.DEATH_STAR_IMPERIAL_SHOT_FIRE_RATE, CONSTANTS.DEATH_STAR_IMPERIAL_SHOT_LIMIT, CONSTANTS.DEATH_STAR_NUM_MULTI_SHOT, Constants.ProjectileType.IMPERIAL_MISSILE, CONSTANTS.IMPERIAL_MISSILE_SPEED, CONSTANTS.DEATH_STAR_IMPERIAL_MISSILE_FIRE_RATE, CONSTANTS.DEATH_STAR_IMPERIAL_MISSILE_LIMIT, level);
            //create & assign image
            var image = new Image();
            image.src = 'images/DeathStar2.png';
            image.onload = function () { isDeathStarLoaded = true; };
            this.objImage = image;
            //populate projectile list
            this.cannonShotList = GameLogic.getPopulatedProjectileList(this.cannonShotType, this.cannonShotSpeed, this.cannonShotLimit, canvasWidth, canvasHeight, level);
            //populate missile list
            this.missileList = GameLogic.getPopulatedProjectileList(this.missileType, this.missileSpeed, this.missileLimit, canvasWidth, canvasHeight, level);
            //create initial target
            this.nextWaypoint = this.getNewRandomWaypoint();
            //set targeting
            this.isTargetingShots = true;
            this.isTargetingMissiles = true;
        }
        /**
         * Override starting X coordinate for a projectile
         */
        DeathStarObject.prototype.getProjectileLocationStartX = function () {
            return this.getLocationX() + CONSTANTS.DEATH_STAR_PROJECTILE_OFFSET_X;
        };
        /**
         * Override starting Y coordinate for a projectile
         */
        DeathStarObject.prototype.getProjectileLocationStartY = function (offset) {
            return this.getLocationY() + CONSTANTS.DEATH_STAR_PROJECTILE_OFFSET_Y;
        };
        /**
         * Override default waypoint height limit
         */
        DeathStarObject.prototype.getPathMaxLimitY = function () {
            return (this.maxHeight / 4);
        };
        return DeathStarObject;
    })(BossShipObject);
    GameObjects.DeathStarObject = DeathStarObject;
    /**
     * Boba Fett - Bounty Hunter enemy ship
     */
    var BountyHunterObject = (function (_super) {
        __extends(BountyHunterObject, _super);
        function BountyHunterObject(currentX, currentY, canvasWidth, canvasHeight, startTime, level) {
            //base constructor
            _super.call(this, currentX, currentY, canvasWidth, canvasHeight, CONSTANTS.BOUNTY_HUNTER_SPEED, Constants.ShipType.BOUNTY_HUNTER, startTime, CONSTANTS.BOUNTY_HUNTER_HEALTH, CONSTANTS.BOUNTY_HUNTER_HEIGHT_HIT_FACTOR, Constants.ProjectileType.TURRET_SPRAY, CONSTANTS.TURRET_SPRAY_SPEED, CONSTANTS.BOUNTY_HUNTER_TURRET_SPRAY_FIRE_RATE, CONSTANTS.BOUNTY_HUNTER_TURRET_SPRAY_LIMIT, CONSTANTS.BOUNTY_HUNTER_NUM_MULTI_SHOT, null, 0, 0, 0, level);
            //create & assign image
            var image = new Image();
            image.src = 'images/Slave3.png';
            image.onload = function () { isBountyHunterLoaded = true; };
            this.objImage = image;
            //populate projectile list
            this.cannonShotList = GameLogic.getPopulatedProjectileList(this.cannonShotType, this.cannonShotSpeed, this.cannonShotLimit, canvasWidth, canvasHeight, level);
            //populate missile list
            this.missileList = new Array();
            //create initial target
            this.nextWaypoint = this.getNewRandomWaypoint();
            //set targeting
            this.isTargetingShots = true;
            this.isTargetingMissiles = false;
        }
        /**
         * Override starting X coordinate for a projectile
         */
        BountyHunterObject.prototype.getProjectileLocationStartX = function () {
            return this.getLocationX() + CONSTANTS.BOUNTY_HUNTER_PROJECTILE_OFFSET_X;
        };
        /**
         * Override starting Y coordinate for a projectile
         */
        BountyHunterObject.prototype.getProjectileLocationStartY = function (offset) {
            return this.getLocationY() + CONSTANTS.BOUNTY_HUNTER_PROJECTILE_OFFSET_Y;
        };
        /**
         * Override default waypoint height limit
         */
        BountyHunterObject.prototype.getPathMaxLimitY = function () {
            return (this.maxHeight / 3);
        };
        return BountyHunterObject;
    })(BossShipObject);
    GameObjects.BountyHunterObject = BountyHunterObject;
    /**
     * Base sprite object
     */
    var SpriteSheetObject = (function (_super) {
        __extends(SpriteSheetObject, _super);
        function SpriteSheetObject(x, y, canvasWidth, canvasHeight, sheetHeight, sheetWidth, numberOfFrames, ticksPerFrame, type, maxLoop, scaleRatio) {
            //base constructor
            _super.call(this, x, y, canvasWidth, canvasHeight, 0, 1);
            //assign
            this.sheetHeight = sheetHeight;
            this.sheetWidth = sheetWidth;
            this.numberOfFrames = numberOfFrames;
            this.ticksPerFrame = ticksPerFrame;
            this.type = type;
            this.maxLoop = maxLoop;
            this.scaleRatio = scaleRatio;
            //default
            this.tickCount = 0;
            this.isFinished = false;
            this.loopCount = 0;
        }
        /**
         * Update state of animation
         */
        SpriteSheetObject.prototype.update = function () {
            this.tickCount += 1;
            if (this.tickCount > this.ticksPerFrame) {
                this.tickCount = 0;
                // If the current frame index is in range
                if (this.frameIndex < this.numberOfFrames - 1) {
                    // Go to the next frame
                    this.frameIndex += 1;
                }
                else {
                    //reset frame index
                    this.frameIndex = 0;
                    //increment loop count
                    this.loopCount += 1;
                }
            }
            if (this.loopCount > this.maxLoop) {
                this.isFinished = true;
            }
        };
        /**
         * Add object to canvas
         */
        SpriteSheetObject.prototype.render = function (canvasContext) {
            //draw
            canvasContext.drawImage(this.objImage, this.frameIndex * this.sheetWidth / this.numberOfFrames, 0, this.sheetWidth / this.numberOfFrames, this.sheetHeight, this.getLocationX(), this.getLocationY(), this.sheetWidth / this.numberOfFrames * this.scaleRatio, this.sheetHeight * this.scaleRatio);
        };
        SpriteSheetObject.prototype.getLocationX = function () {
            return this.locationX - ((this.sheetWidth / this.numberOfFrames) / 2);
        };
        SpriteSheetObject.prototype.getLocationY = function () {
            return this.locationY - (this.objImage.naturalHeight / 2);
        };
        return SpriteSheetObject;
    })(BaseGameObject);
    GameObjects.SpriteSheetObject = SpriteSheetObject;
    /**
     * Small explosion animation
     */
    var ExplosionSmall = (function (_super) {
        __extends(ExplosionSmall, _super);
        function ExplosionSmall(currentX, currentY, canvasWidth, canvasHeight) {
            //base constructor
            _super.call(this, currentX, currentY, canvasWidth, canvasHeight, 128, 1280, 10, 5, Constants.SpriteType.EXPLOSION_SMALL, 1, 1);
            //create & assign image
            var image = new Image();
            image.src = 'images/SmallExplosion.png';
            image.onload = function () { isExplosionSmallLoaded = true; };
            this.objImage = image;
        }
        return ExplosionSmall;
    })(SpriteSheetObject);
    GameObjects.ExplosionSmall = ExplosionSmall;
    /**
     * Large explosion animation
     */
    var ExplosionLarge = (function (_super) {
        __extends(ExplosionLarge, _super);
        function ExplosionLarge(currentX, currentY, canvasWidth, canvasHeight) {
            //base constructor
            _super.call(this, currentX, currentY, canvasWidth, canvasHeight, 240, 1500, 6, 5, Constants.SpriteType.EXPLOSION_LARGE, 1, 1);
            //create & assign image
            var image = new Image();
            image.src = 'images/LargeExplosion.png';
            image.onload = function () { isExplosionLargeLoaded = true; };
            this.objImage = image;
        }
        return ExplosionLarge;
    })(SpriteSheetObject);
    GameObjects.ExplosionLarge = ExplosionLarge;
    /**
     * Base projectile class
     */
    var Projectile = (function (_super) {
        __extends(Projectile, _super);
        function Projectile(currentX, currentY, speed, canvasWidth, canvasHeight, type, id, now, radius, color, damage, level) {
            this.isAlive = false;
            this.isFirst = true;
            this.type = type;
            this.id = id;
            this.createTime = now;
            this.radius = radius;
            this.color = color;
            this.damage = damage;
            this.isTargeted = false;
            //base constructor
            _super.call(this, currentX, currentY, canvasWidth, canvasHeight, speed, level);
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
        /**
         * Create target point object
         */
        Projectile.prototype.setTarget = function (targetX, targetY) {
            this.isTargeted = true;
            this.targetWaypoint = new Vector.Waypoint(targetX, targetY);
        };
        /**
         * Move projectile toward target
         */
        Projectile.prototype.moveTowardTarget = function (pixels) {
            //calculate step
            var step = (pixels * this.speed);
            //get next point in path based on speed
            var point = this.targetWaypoint.getNextLocation(this.locationX, this.locationY, step);
            //assign location to object
            this.locationX = point.targetX;
            this.locationY = point.targetY;
            //check if out of bounds
            if ((this.locationY >= this.maxHeight || this.locationY < 1)
                || (this.locationX >= this.maxWidth || this.locationX < 1)) {
                this.isAlive = false;
            }
        };
        return Projectile;
    })(BaseGameObject);
    GameObjects.Projectile = Projectile;
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
    GameObjects.EnemyKill = EnemyKill;
    /**
     * Class to store user score data
     */
    var Score = (function () {
        function Score(displayName, level) {
            //assign
            this.displayName = displayName;
            this.name = displayName.replace(' ', '');
            this.levelStart = level;
            //defaults
            this.killList = new Array();
            this.gameDate = new Date(Date.now());
            this.currentScore = 0;
            this.highScore = 0;
            this.directHits = 0;
            this.shotsFired = 0;
            this.grandMasterScore = 0;
            this.personalRecordDisplayed = false;
            this.grandMasterDisplayed = false;
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
        /**
         * Check if current score is greater than previous high score
         */
        Score.prototype.isHighScore = function () {
            return (this.currentScore > this.highScore);
        };
        /**
         * Calculate efficiency of shots
         */
        Score.prototype.getAccuracy = function () {
            if (this.shotsFired > 0) {
                return (this.directHits / this.shotsFired) * 100;
            }
            else {
                return 0;
            }
        };
        return Score;
    })();
    GameObjects.Score = Score;
    /**
     * Class to store historical score data
     */
    var HighScore = (function () {
        function HighScore(displayName, name, score) {
            this.displayName = displayName;
            this.name = name;
            this.score = score;
        }
        return HighScore;
    })();
    GameObjects.HighScore = HighScore;
    var Message = (function () {
        function Message(type, text, font, colorRgb1, colorRgb2, x, y, expireCount) {
            this.type = type;
            this.text = text;
            this.font = font;
            this.colorRgb1 = colorRgb1;
            this.colorRgb2 = colorRgb2;
            this.x = x;
            this.y = y;
            this.expireCount = expireCount;
            //default
            this.isMainColor = false;
            this.renderCount = 0;
        }
        /**
         * Update increment count
         */
        Message.prototype.incrementCount = function () {
            this.renderCount += 1;
            if (this.renderCount % 5 == 0) {
                //reverse flag to alternate color each call
                this.isMainColor = !this.isMainColor;
            }
        };
        /**
         * Get color of message to use
         */
        Message.prototype.getCurrentColor = function () {
            if (this.isMainColor) {
                return this.colorRgb1;
            }
            else {
                return this.colorRgb2;
            }
        };
        Message.prototype.getCurrentX = function () {
            return this.x;
        };
        Message.prototype.getCurrentY = function () {
            var currentY = this.y;
            this.y -= CONSTANTS.MESSAGE_RISE_FACTOR_Y;
            return currentY;
        };
        /**
         * Check if message render count has exceeded limit.
         * If so, the message should stop appearing.
         */
        Message.prototype.isExpired = function () {
            //check if expiration limit set
            if (this.expireCount > 0) {
                //see if render count exceeds limit
                if (this.renderCount > this.expireCount) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                //no limit set, stop rendering when off screen
                if (this.y < 1) {
                    return true;
                }
                else {
                    return false;
                }
            }
        };
        return Message;
    })();
    GameObjects.Message = Message;
    var ImageObject = (function (_super) {
        __extends(ImageObject, _super);
        function ImageObject(positionX, positionY, canvasWidth, canvasHeight) {
            this.type = Constants.SpriteType.INSTRUCTION_PANEL;
            //create & assign image
            var image = new Image();
            image.src = 'images/InstructionPanel3.png';
            image.onload = function () { isInstructionPanelLoaded = true; };
            this.objImage = image;
            _super.call(this, positionX, positionY, canvasWidth, canvasHeight, 0, 0);
        }
        return ImageObject;
    })(BaseGameObject);
    GameObjects.ImageObject = ImageObject;
})(GameObjects || (GameObjects = {}));
//# sourceMappingURL=GameObjects.js.map