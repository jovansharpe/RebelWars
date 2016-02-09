module GameObjects {
    
    var CONSTANTS:Constants.Constants = new Constants.Constants();

    var isRebelShipLoaded:boolean = false;
    var isTieFighterLoaded:boolean = false;
    var isDestroyerLoaded:boolean = false;
    var isCommanderLoaded:boolean = false;
    var isDeathStarLoaded:boolean = false;
    var isBountyHunterLoaded:boolean = false;
    var isExplosionSmallLoaded:boolean = false;
    var isExplosionLargeLoaded:boolean = false;
    var isInstructionPanelLoaded:boolean = false;

    /**
     * Check if a specific ship types image has been loaded already
     */
    export function isShipLoaded(type:Constants.ShipType) : boolean
    {
        var loaded:boolean = false;
        
        switch(type)
        {
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

    /**
     * Check if a specific sprite image has been loaded already
     */
    export function isSpriteLoaded(type:Constants.SpriteType) : boolean
    {
        var loaded:boolean = false;
        
        switch(type)
        {
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

    /**
     * Base class for on screen objects
     */
    export class BaseGameObject {
        speed:number;
        locationX:number;
        maxWidth:number;
        locationY:number;
        maxHeight:number;
        
        constructor(currentX:number, currentY:number, canvasWidth: number, canvasHeight: number, speed: number,
            level:number)
        {
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
        
        /**
         * Adjust object speed based on level
         */
        setSpeedBasedOnLevel(level:number)
        {
            //get difficulty factor
            var factor:number = GameLogic.getDifficultyFactor(level);
            //add to speed of ship    
            this.speed += (this.speed * (1/4) * factor);
        }
    }

    /**
     * Base ship object
     */
    export class ShipObject extends BaseGameObject {
        objImage:HTMLImageElement;
        maxHealth:number;
        health:number;
        startDate:Date;
        type:Constants.ShipType;
        heightHitFactor:number;
        direction:Constants.Direction;
        onScreen:boolean;
        
        constructor(currentX:number, currentY:number, canvasWidth: number, 
            canvasHeight: number, speed:number, type:Constants.ShipType, 
            createDate:Date, health:number, heightHitFactor:number, level:number)
        {
            //base constructor
            super(currentX, currentY, canvasWidth, canvasHeight, speed, level);
            
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
         * Retrieve X coordinate for initiating explosion animation
         */
        getExplosionX(): number
        {
            return this.getLocationX() + (this.objImage.naturalWidth / 2);
        }
        
        /**
         * Retrieve Y coordinate for initiating explosion animation
         */
        getExplosionY(): number
        {
            return this.getLocationY() + (this.objImage.naturalHeight / 2);
        }
        
        /**
         * Check if object has reached the bottom limit of the screen
         */
        isAtBottomOfScreen(): boolean
        {
            var atBottom:boolean = false;
            
            if((this.locationY + this.objImage.naturalHeight) > this.maxHeight)
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
            var step:number = (pixels * this.speed);
            
            //check if object is a destroyer & is near top of screen
            if ( this.type == Constants.ShipType.EMPIRE_DESTROYER && 
                this.locationY < (this.objImage.naturalHeight / 2) )
            {
                //check if current position change is smaller than image size
                if(step < this.objImage.naturalHeight)
                {
                    //larger images appear to not move if the pixel
                    //change is too low so we amplify their initial movement
                    step = (pixels * this.speed) * 1.5; 
                }
            }
            
            this.locationY = this.locationY + step;
        }
        
        showEntryMessage() : boolean
        {
            var showMessage:boolean = false;
            
            if(!this.onScreen)
            {
                this.onScreen = true;
                
                switch(this.type)
                {
                    case Constants.ShipType.BOUNTY_HUNTER:
                    case Constants.ShipType.EMPIRE_COMMANDER:
                    case Constants.ShipType.EMPIRE_DESTROYER:
                        showMessage = true;
                    break;
                }
            }
            
            return showMessage;
        }
    }

    /**
     * User controlled Rebel Ship
     */
    export class RebelShipObject extends ShipObject {
        constructor(canvasWidth: number, canvasHeight: number, level:number)
        {
            //create & assign image
            var image:HTMLImageElement = new Image();
            image.src = 'images/falcon2.png';
            image.onload = function(){ isRebelShipLoaded = true; }
            this.objImage = image;
            
            var currentX:number = canvasWidth / 2;
            var currentY:number = canvasHeight;
            
            //default
            this.direction = Constants.Direction.RIGHT;
            
            //base constructor
            super(currentX, currentY, canvasWidth, canvasHeight, 
                CONSTANTS.REBEL_SHIP_SPEED, Constants.ShipType.REBEL_MILLENIUM_FALCON,
                new Date(Date.now()), CONSTANTS.REBEL_SHIP_HEALTH, CONSTANTS.REBEL_SHIP_HEIGHT_HIT_FACTOR,
                level);
        }
        
        /**
         * Place object back to start position. Middle of screen at the bottom.
         */
        reset()
        {
            this.locationX =  this.maxWidth / 2;
            this.locationY = this.maxHeight;
        }
        
        /**
         * Return the direction this object is moving
         */
        getVelocityX(modifier:number) : number
        {
            var v:number = (modifier * this.speed);
            
            if(this.direction == Constants.Direction.RIGHT)
            {
                return v;
            }
            else
            {
                return -v;
            }
            
        }
        
        /**
         * Return the vertical direction. Hard-coded to zero as this object 
         * moves side to side only
         */
        getVelocityY() : number
        {
            return 0;
        }
    }

    /**
     * Fighter class enemy ship
     */
    export class TieFighterObject extends ShipObject {
        constructor(currentX:number, currentY:number, canvasWidth: number, canvasHeight: number, startTime:Date,
            level:number)
        {
            //base constructor
            super(currentX, currentY, canvasWidth, canvasHeight, 
                CONSTANTS.TIE_FIGHTER_SPEED, Constants.ShipType.EMPIRE_TIE_FIGHTER, 
                startTime, CONSTANTS.TIE_FIGHTER_HEALTH, CONSTANTS.TIE_FIGHTER_HEIGHT_HIT_FACTOR,
                level);
            //create & assign image
            var image:HTMLImageElement = new Image();
            image.src = 'images/TieFighter3.png';
            image.onload = function(){ isTieFighterLoaded = true; }
            this.objImage = image;
            
            this.setStatsBasedOnDifficulty(level);
        }
        
        /**
         * Adjust ship properties based on current level. 
         */
        setStatsBasedOnDifficulty(level:number)
        {
            //get difficulty factor
            var factor:number = GameLogic.getDifficultyFactor(level);
            //add to health of ship
            this.health = this.maxHealth = (this.maxHealth + factor);
        }
    }

    /**
     * Destroyer class enemy ship
     */
    export class DestroyerObject extends ShipObject {
        constructor(currentX:number, currentY:number, canvasWidth: number, canvasHeight: number, startTime:Date,
            level:number)
        {
            //base constructor
            super(currentX, currentY, canvasWidth, canvasHeight, 
                CONSTANTS.DESTROYER_SPEED, Constants.ShipType.EMPIRE_DESTROYER, 
                startTime, CONSTANTS.DESTROYER_HEALTH, CONSTANTS.DESTROYER_HEIGHT_HIT_FACTOR,
                level);
            //create & assign image
            var image:HTMLImageElement = new Image();
            image.src = 'images/Destroyer3.png';
            image.onload = function(){ isDestroyerLoaded = true; }
            this.objImage = image;
        }
        
        /**
         * Adjust ship properties based on current level. 
         */
        setStatsBasedOnDifficulty(level:number)
        {
            //get difficulty factor
            var factor:number = GameLogic.getDifficultyFactor(level);
            //add to health of ship
            this.health = this.maxHealth = (this.maxHealth + (factor * 2));
        }
    }

    /**
     * Base class for boss ship objects. Their movement differs from that of regular enemy ships.
     */
    export class BossShipObject extends ShipObject {
        nextWaypoint:Vector.Waypoint;
        cannonShotList:Array<Projectile>;
        cannonShotType:Constants.ProjectileType;
        cannonShotSpeed:number;
        cannonShotFireRate:number;
        cannonShotLimit:number;
        numberOfExtraShots:number;
        missileList:Array<Projectile>;
        missileType:Constants.ProjectileType;
        missileSpeed:number;
        missileFireRate:number;
        missileLimit:number;
        nextFireTimeShot:Date;
        nextFireTimeMissile:Date;
        isTargetingShots:boolean;
        isTargetingMissiles:boolean;
        
        
        constructor(currentX:number, currentY:number, canvasWidth: number, canvasHeight: number, 
            speed:number, type:Constants.ShipType, startTime:Date, health:number, heightHitFactor:number,
            cannonShotType:Constants.ProjectileType, cannonShotSpeed:number, cannonShotFireRate:number, cannonShotLimit:number, 
            numberOfExtraShots:number, missileType:Constants.ProjectileType, missileSpeed:number, missileFireRate:number, missileLimit:number,
            level:number)
        {
            //base constructor
            //cut height in half
            super(currentX, currentY, canvasWidth, canvasHeight, 
                speed, type, startTime, health, heightHitFactor, level);
            
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
        moveEnemyShip(pixels:number) : void
        {
            //calculate speed
            var step:number = (pixels * this.speed);
            
            //get next point in path based on speed
            var point:Vector.Waypoint = this.nextWaypoint.getNextLocation(this.getLocationX(),
                this.getLocationY(), step);
            
            //assign location to object
            this.locationX = point.targetX;
            this.locationY = point.targetY;
            
            //check if object has reached its target point
            if(this.isAtTarget(point))
            {
                //if so, generate new random target point
                this.nextWaypoint = this.getNewRandomWaypoint();
            }
        }

        getNewRandomWaypoint() : Vector.Waypoint
        {
            return Vector.getRandomWaypoint(this.getPathMinLimitX(),
                    this.getPathMaxLimitX(), this.getPathMinLimitY(), this.getPathMaxLimitY());
        }

        getNewSpecificTarget(targetX:number, targetY:number,
            targetVelocityX:number, targetVelocityY:number, projectileSpeed:number) : Vector.Waypoint
        {
            return Vector.getTargetedWaypoint(this.getLocationX(), this.getLocationY(),
                targetX, targetY, targetVelocityX, targetVelocityY, projectileSpeed);
        }

        getPathMinLimitX() : number
        {
            //return this.objImage.naturalWidth;
            return 0;
        }
        
        getPathMinLimitY() : number
        {
            //return this.objImage.naturalHeight;
            return 0;
        }
        
        getPathMaxLimitX() : number
        {
            return (this.maxWidth - this.objImage.naturalWidth);
        }
        
        getPathMaxLimitY() : number
        {
            return (this.maxHeight / 2);
        }
        
        /**
         * Retrieve number of additional projectiles to create per round
         */
        getNumberOfExtraShots()
        {
            if(this.numberOfExtraShots != null)
            {
                return this.numberOfExtraShots;
            }
            else
            {
                return 0;
            }
        }
        
        /**
         * Check if a specific type of projectile is targeting player
         */
        isTargeting(type:Constants.ProjectileType) : boolean
        {
            switch(type)
            {
                case Constants.ProjectileType.IMPERIAL_MISSILE:
                    return this.isTargetingMissiles;
                break;
                default:
                    return this.isTargetingShots;
                break;
            }
        }
        
        /**
         * Check if a point matches the current target
         */
        isAtTarget(currentPoint:Vector.Waypoint) : boolean
        {
            var atTargetX:boolean = false;
            var atTargetY:boolean = false;
            
            if( currentPoint.targetX + this.objImage.naturalWidth > browserWidth )
            {
                atTargetX = true;
            }
            else if ( Math.ceil(currentPoint.targetX) == this.nextWaypoint.targetX
                || Math.floor(currentPoint.targetX) == this.nextWaypoint.targetX )
            {
                atTargetX = true;
            }
            
            if ( Math.ceil(currentPoint.targetY) == this.nextWaypoint.targetY
                || Math.floor(currentPoint.targetY) == this.nextWaypoint.targetY )
            {
                atTargetY = true;
            }
            
            return (atTargetX && atTargetY);
        }
        
        /**
         * Get next time available to fire
         */
        getNextFireDate(time:number, type:Constants.ProjectileType) : Date
        {
            var seconds:number = 0;
            
            switch(type)
            {
                case Constants.ProjectileType.IMPERIAL_MISSILE:
                    seconds = this.missileFireRate;
                break;
                default:
                    seconds = this.cannonShotFireRate;
                break;
            }
            
            return GameLogic.addSecondsToDate(time, seconds);
        }
        
        /**
         * Set next time to fire based on projectile type
         */
        setNewFireTime(time:number, type:Constants.ProjectileType)
        {
            switch(type)
            {
                case Constants.ProjectileType.IMPERIAL_MISSILE:
                    this.nextFireTimeMissile = this.getNextFireDate(Date.now(), Constants.ProjectileType.IMPERIAL_MISSILE);
                break;
                default:
                    this.nextFireTimeShot = this.getNextFireDate(Date.now(), Constants.ProjectileType.IMPERIAL_SHOT);
                break;
            }
        }
        /**
         * Check if it is time to fire
         */
        isTimeToFire(time:number, type:Constants.ProjectileType): boolean
        {
            var fireTime:number = 0;
            
            switch(type)
            {
                case Constants.ProjectileType.IMPERIAL_MISSILE:
                    fireTime = this.nextFireTimeMissile.getTime();
                break;
                default:
                    fireTime = this.nextFireTimeShot.getTime();
                break;
            }
            
            if(time > fireTime)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        
        /**
         * Check if projectile type shoots multiple times per round
         */
        isMultiShot(type:Constants.ProjectileType): boolean
        {
            switch(type)
            {
                case Constants.ProjectileType.TURRET_SPRAY:
                case Constants.ProjectileType.IMPERIAL_SHOT:
                    return true;
                break;
                default:
                    return false;
                break;
            }
        }
        
        /**
         * Adjust ship properties based on current level. 
         */
        setStatsBasedOnDifficulty(level:number)
        {
            //get difficulty factor
            var factor:number = GameLogic.getDifficultyFactor(level);
            //add to health of ship
            this.health = this.maxHealth = (this.maxHealth + (this.maxHealth * (1/5) * factor));
            //add to speed of cannon
            this.cannonShotSpeed += (this.cannonShotSpeed * (1/4) * factor);
            //increase cannon fire rate
            this.cannonShotFireRate += (this.cannonShotFireRate * (1/4) * factor);
            //add to speed of missile
            this.missileSpeed += (this.missileSpeed * (1/4) * factor);
            //increase missile fire rate
            this.missileFireRate += (this.missileFireRate * (1/4) * factor);
        }
    }

    /**
     * Command class enemy ship
     */
    export class CommanderObject extends BossShipObject {
        constructor(currentX:number, currentY:number, canvasWidth: number, canvasHeight: number, startTime:Date,
            level:number)
        {
            //base constructor
            super(currentX, currentY, canvasWidth, canvasHeight, 
                CONSTANTS.COMMANDER_SPEED, Constants.ShipType.EMPIRE_COMMANDER, 
                startTime, CONSTANTS.COMMANDER_HEALTH, CONSTANTS.COMMANDER_HEIGHT_HIT_FACTOR,
                Constants.ProjectileType.IMPERIAL_SHOT, CONSTANTS.IMPERIAL_SHOT_SPEED, 
                CONSTANTS.COMMANDER_IMPERIAL_SHOT_FIRE_RATE, CONSTANTS.COMMANDER_IMPERIAL_SHOT_LIMIT,
                0, null, 0, 0, 0, level);
            //create & assign image
            var image:HTMLImageElement = new Image();
            image.src = 'images/Commander2.png';
            image.onload = function(){ isCommanderLoaded = true; }
            this.objImage = image;
            //populate projectile list
            this.cannonShotList = GameLogic.getPopulatedProjectileList(this.cannonShotType,
                this.cannonShotSpeed, this.cannonShotLimit, canvasWidth, canvasHeight, level);
            //populate missile list
            this.missileList = new Array<Projectile>();
            //create initial target
            this.nextWaypoint = this.getNewRandomWaypoint();
            //set targeting
            this.isTargetingShots = true;
            this.isTargetingMissiles = false;
        }
        
        /**
         * Override starting X coordinate for a projectile
         */
        getProjectileLocationStartX(): number
        {
            return this.getLocationX() + (this.objImage.naturalWidth);
        }
        
        /**
         * Override starting Y coordinate for a projectile
         */
        getProjectileLocationStartY(offset:number): number
        {
            return this.getLocationY() + (this.objImage.naturalHeight / 2);
        }
    }
    
    /**
     * Death Star enemy ship
     */
    export class DeathStarObject extends BossShipObject {
        constructor(currentX:number, currentY:number, canvasWidth: number, canvasHeight: number, startTime:Date,
            level:number)
        {
            //base constructor
            super(currentX, currentY, canvasWidth, canvasHeight, 
                CONSTANTS.DEATH_STAR_SPEED, Constants.ShipType.EMPIRE_DEATH_STAR, 
                startTime, CONSTANTS.DEATH_STAR_HEALTH, CONSTANTS.DEATH_STAR_HEIGHT_HIT_FACTOR,
                Constants.ProjectileType.IMPERIAL_SHOT, CONSTANTS.IMPERIAL_SHOT_SPEED,
                CONSTANTS.DEATH_STAR_IMPERIAL_SHOT_FIRE_RATE, CONSTANTS.DEATH_STAR_IMPERIAL_SHOT_LIMIT, 
                CONSTANTS.DEATH_STAR_NUM_MULTI_SHOT, Constants.ProjectileType.IMPERIAL_MISSILE, 
                CONSTANTS.IMPERIAL_MISSILE_SPEED, CONSTANTS.DEATH_STAR_IMPERIAL_MISSILE_FIRE_RATE, 
                CONSTANTS.DEATH_STAR_IMPERIAL_MISSILE_LIMIT, level);
            //create & assign image
            var image:HTMLImageElement = new Image();
            image.src = 'images/DeathStar2.png';
            image.onload = function(){ isDeathStarLoaded = true; }
            this.objImage = image;
            //populate projectile list
            this.cannonShotList = GameLogic.getPopulatedProjectileList(this.cannonShotType,
                this.cannonShotSpeed, this.cannonShotLimit, canvasWidth, canvasHeight, level);
            //populate missile list
            this.missileList = GameLogic.getPopulatedProjectileList(this.missileType,
                this.missileSpeed, this.missileLimit, canvasWidth, canvasHeight, level);
            //create initial target
            this.nextWaypoint = this.getNewRandomWaypoint();
            //set targeting
            this.isTargetingShots = true;
            this.isTargetingMissiles = true;
        }
        
        /**
         * Override starting X coordinate for a projectile
         */
        getProjectileLocationStartX(): number
        {
            return this.getLocationX() + CONSTANTS.DEATH_STAR_PROJECTILE_OFFSET_X;
        }
        
        /**
         * Override starting Y coordinate for a projectile
         */
        getProjectileLocationStartY(offset:number): number
        {
            return this.getLocationY() + CONSTANTS.DEATH_STAR_PROJECTILE_OFFSET_Y;
        }
        
        /**
         * Override default waypoint height limit
         */
        getPathMaxLimitY() : number
        {
            return (this.maxHeight / 4);
        }
    }

    /**
     * Boba Fett - Bounty Hunter enemy ship
     */
    export class BountyHunterObject extends BossShipObject {
        constructor(currentX:number, currentY:number, canvasWidth: number, canvasHeight: number, startTime:Date,
            level:number)
        {
            //base constructor
            super(currentX, currentY, canvasWidth, canvasHeight, 
                CONSTANTS.BOUNTY_HUNTER_SPEED, Constants.ShipType.BOUNTY_HUNTER, 
                startTime, CONSTANTS.BOUNTY_HUNTER_HEALTH, CONSTANTS.BOUNTY_HUNTER_HEIGHT_HIT_FACTOR,
                Constants.ProjectileType.TURRET_SPRAY, CONSTANTS.TURRET_SPRAY_SPEED,
                CONSTANTS.BOUNTY_HUNTER_TURRET_SPRAY_FIRE_RATE, CONSTANTS.BOUNTY_HUNTER_TURRET_SPRAY_LIMIT,
                CONSTANTS.BOUNTY_HUNTER_NUM_MULTI_SHOT, null, 0, 0, 0, level);
            //create & assign image
            var image:HTMLImageElement = new Image();
            image.src = 'images/Slave3.png';
            image.onload = function(){ isBountyHunterLoaded = true; }
            this.objImage = image;
            //populate projectile list
            this.cannonShotList = GameLogic.getPopulatedProjectileList(this.cannonShotType,
                this.cannonShotSpeed, this.cannonShotLimit, canvasWidth, canvasHeight, level);
            //populate missile list
            this.missileList = new Array<Projectile>();
            //create initial target
            this.nextWaypoint = this.getNewRandomWaypoint();
            //set targeting
            this.isTargetingShots = true;
            this.isTargetingMissiles = false;
        }
        
        /**
         * Override starting X coordinate for a projectile
         */
        getProjectileLocationStartX(): number
        {
            return this.getLocationX() + CONSTANTS.BOUNTY_HUNTER_PROJECTILE_OFFSET_X;
        }
        
        /**
         * Override starting Y coordinate for a projectile
         */
        getProjectileLocationStartY(offset:number): number
        {
            return this.getLocationY() + CONSTANTS.BOUNTY_HUNTER_PROJECTILE_OFFSET_Y;
        }
        
        /**
         * Override default waypoint height limit
         */
        getPathMaxLimitY() : number
        {
            return (this.maxHeight / 3);
        }
    }

    /**
     * Base sprite object
     */
    export class SpriteSheetObject extends BaseGameObject {
        objImage:HTMLImageElement;
        sheetHeight:number;
        sheetWidth:number;
        numberOfFrames:number;
        frameIndex:number;
        tickCount:number;
        ticksPerFrame:number;
        scaleRatio:number;
        isFinished:boolean;        
        type:Constants.SpriteType;
        loopCount:number;
        maxLoop:number;
        
        constructor(x:number, y:number, canvasWidth: number, canvasHeight: number, sheetHeight:number,
            sheetWidth:number, numberOfFrames:number, ticksPerFrame:number, type:Constants.SpriteType,
            maxLoop:number, scaleRatio:number)
        {          
            //base constructor
            super(x, y, canvasWidth, canvasHeight, 0, 1);
            
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
        update() : void
        {
            this.tickCount += 1;

            if (this.tickCount > this.ticksPerFrame) {

				this.tickCount = 0;
				
                // If the current frame index is in range
                if (this.frameIndex < this.numberOfFrames - 1) {	
                    // Go to the next frame
                    this.frameIndex += 1;
                } 
                else 
                {
                    //reset frame index
                    this.frameIndex = 0;
                    //increment loop count
                    this.loopCount += 1;
                }
            }
            
            if(this.loopCount > this.maxLoop)
            {
                this.isFinished = true;
            }
        }
        
        /**
         * Add object to canvas
         */
        render(canvasContext:CanvasRenderingContext2D) : void
        {
            //draw
            canvasContext.drawImage(
                this.objImage,
                this.frameIndex * this.sheetWidth / this.numberOfFrames,
                0,
                this.sheetWidth / this.numberOfFrames,
                this.sheetHeight,
                this.getLocationX(),
                this.getLocationY(),
                this.sheetWidth / this.numberOfFrames * this.scaleRatio,
                this.sheetHeight * this.scaleRatio);
        }
        
        getLocationX() : number
        {
            return this.locationX - ((this.sheetWidth / this.numberOfFrames) / 2);
        }
        
        getLocationY() : number
        {
            return this.locationY - (this.objImage.naturalHeight / 2);
        }
    }

    /**
     * Small explosion animation
     */
    export class ExplosionSmall extends SpriteSheetObject {
        constructor(currentX:number, currentY:number, canvasWidth: number, canvasHeight: number)
        {
            //base constructor
            super(currentX, currentY, canvasWidth, canvasHeight, 128, 1280, 10, 5, 
                Constants.SpriteType.EXPLOSION_SMALL, 1, 1);
            
            //create & assign image
            var image:HTMLImageElement = new Image();
            image.src = 'images/SmallExplosion.png';
            image.onload = function(){ isExplosionSmallLoaded = true; }
            this.objImage = image;
        }
    }
    
    /**
     * Large explosion animation
     */
    export class ExplosionLarge extends SpriteSheetObject {
        constructor(currentX:number, currentY:number, canvasWidth: number, canvasHeight: number)
        {
            //base constructor
            super(currentX, currentY, canvasWidth, canvasHeight, 240, 1500, 6, 5, 
                Constants.SpriteType.EXPLOSION_LARGE, 1, 1);
            
            //create & assign image
            var image:HTMLImageElement = new Image();
            image.src = 'images/LargeExplosion.png';
            image.onload = function(){ isExplosionLargeLoaded = true; }
            this.objImage = image;
        }
    }

    /**
     * Base projectile class
     */
    export class Projectile extends BaseGameObject {
        id:number;
        isAlive:boolean;
        isFirst:boolean;
        type:Constants.ProjectileType;
        createTime:number;
        radius:number;
        color:string;
        damage:number;
        isTargeted:boolean;
        targetWaypoint:Vector.Waypoint;
        
        constructor(currentX:number, currentY:number, 
        speed:number, canvasWidth: number, 
        canvasHeight: number, type:Constants.ProjectileType,
        id:number, now:number, radius:number, color:string,
        damage:number, level:number)
        {
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
            super(currentX, currentY, canvasWidth, canvasHeight, speed, level);
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
        
        /**
         * Create target point object
         */
        setTarget(targetX:number, targetY:number) : void
        {
            this.isTargeted = true;
            this.targetWaypoint = new Vector.Waypoint(targetX, targetY);
        }
        
        /**
         * Move projectile toward target
         */
        moveTowardTarget(pixels:number) : void
        {
            //calculate step
            var step:number = (pixels * this.speed);
            
            //get next point in path based on speed
            var point:Vector.Waypoint = this.targetWaypoint.getNextLocation(this.locationX,
                this.locationY, step);
            
            //assign location to object
            this.locationX = point.targetX;
            this.locationY = point.targetY;
            
            //check if out of bounds
            if((this.locationY >= this.maxHeight || this.locationY < 1)
                || (this.locationX >= this.maxWidth || this.locationX < 1))
            {
                this.isAlive = false;
            }
            
        }
    }

    /**
     * Class to store enemy kill data
     */
    export class EnemyKill {
        enemyType:Constants.ShipType;
        enemyStartTime:Date;
        enemyMaxHealth:number;
        killTime:Date;
        level:number;
        
        constructor(enemy:Constants.ShipType, enemyStart:Date, enemyMaxHealth:number, level:number)
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
    export class Score {
        displayName:string;
        name:string;
        gameDate:Date;
        killList:Array<EnemyKill>;
        levelStart:number;
        levelFinish:number;
        currentScore:number;
        highScore:number;
        directHits:number;
        shotsFired:number;
        grandMasterScore:number;
        personalRecordDisplayed:boolean;
        grandMasterDisplayed:boolean;
        
        constructor(displayName:string, level:number)
        {
            //assign
            this.displayName = displayName;
            this.name = displayName.replace(' ','');
            this.levelStart = level;
            //defaults
            this.killList = new Array<EnemyKill>();
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
        updateScore(enemy:Constants.ShipType, enemyStart:Date, enemyMaxHealth:number, level:number)
        {
            //create & push new kill object
            this.killList.push(new EnemyKill(enemy,enemyStart,enemyMaxHealth,level));
            //update numeric score
            this.currentScore += enemyMaxHealth;
        }
        
        /**
         * Check if current score is greater than previous high score
         */
        isHighScore()
        {
            return (this.currentScore > this.highScore);
        }
        
        /**
         * Calculate efficiency of shots
         */
        getAccuracy()
        {
            if(this.shotsFired > 0)
            {
                return (this.directHits / this.shotsFired) * 100;
            }
            else
            {
                return 0;
            }
        }
    }

    /**
     * Class to store historical score data
     */
    export class HighScore {
        displayName:string;
        name:string;
        score:number;

        constructor(displayName?:string, name?:string, score?:number)
        {
            this.displayName = displayName;
            this.name = name;
            this.score = score;
        }
    }

    export class Message {
        type:Constants.MessageType;
        text:string;
        font:string;
        colorRgb1:string;
        colorRgb2:string;
        x:number;
        y:number;
        isMainColor:boolean;
        renderCount:number;
        expireCount:number;
        
        constructor(type:Constants.MessageType, text:string, font:string, colorRgb1:string, 
            colorRgb2:string, x:number, y:number, expireCount:number)
        {
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
        incrementCount() : void
        {
            this.renderCount += 1;
            
            if(this.renderCount % 5 == 0)
            {
                //reverse flag to alternate color each call
                this.isMainColor = !this.isMainColor;
            }
        }
        
        /**
         * Get color of message to use
         */
        getCurrentColor() : string
        {            
            if(this.isMainColor)
            {
                return this.colorRgb1;
            }
            else
            {
                return this.colorRgb2;
            }
        }
        
        getCurrentX() : number
        {
            return this.x;
        }
        
        getCurrentY() : number
        {
            var currentY = this.y;
            
            this.y -= CONSTANTS.MESSAGE_RISE_FACTOR_Y;
            
            return currentY;
        }
        
        /**
         * Check if message render count has exceeded limit.
         * If so, the message should stop appearing.
         */
        isExpired()
        {
            //check if expiration limit set
            if(this.expireCount > 0)
            {
                //see if render count exceeds limit
                if(this.renderCount > this.expireCount)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else
            {
                //no limit set, stop rendering when off screen
                if(this.y < 1)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }
    }

    export class ImageObject extends BaseGameObject {
        objImage:HTMLImageElement;
        type:Constants.SpriteType;
        
        constructor(positionX:number, positionY:number, canvasWidth:number,
            canvasHeight:number)
        {
            this.type = Constants.SpriteType.INSTRUCTION_PANEL;
            
            //create & assign image
            var image:HTMLImageElement = new Image();
            image.src = 'images/InstructionPanel3.png';
            image.onload = function(){ isInstructionPanelLoaded = true; }
            this.objImage = image;
            
            super(positionX, positionY, canvasWidth, canvasHeight, 0, 0);
        }
    }
}

