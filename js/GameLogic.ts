module GameLogic {

    var CONSTANTS:Constants.Constants = new Constants.Constants();

    /**
     * Create list of enemy ship objects based on level
     */
    export function buildEnemyListByLevel(currentLevel:number, browserWidth:number, 
        browserHeight:number) : Array<GameObjects.ShipObject>
    {
        //start new list
        var enemyShipList:Array<GameObjects.ShipObject> = new Array<GameObjects.ShipObject>();
        
        //get # of enemies
        var totalNumFighters = CONSTANTS.NUM_FIGHTERS_PER_LEVEL * currentLevel;
        var totalNumDestroyers = CONSTANTS.NUM_DESTROYERS_PER_LEVEL * currentLevel;
        
        //populate fighters
        addEnemyShips(enemyShipList, totalNumFighters, Constants.ShipType.EMPIRE_TIE_FIGHTER, 
            browserWidth, browserHeight, currentLevel);
        
        //populate destroyers
        addEnemyShips(enemyShipList, totalNumDestroyers, Constants.ShipType.EMPIRE_DESTROYER, 
            browserWidth, browserHeight, currentLevel);
            
        return enemyShipList;
    }

    /**
     * Create list of boss objects based on level
     */
    export function getBossListByLevel(currentLevel:number, browserWidth:number, 
        browserHeight:number) : Array<GameObjects.BossShipObject>
    {
        //start new list
        var bossList:Array<GameObjects.BossShipObject> = new Array<GameObjects.BossShipObject>();
        
        //check for bosses
        if( currentLevel % CONSTANTS.DEATH_STAR_LEVEL_FACTOR == 0 )
        {
            addEnemyShips(bossList, 1, Constants.ShipType.EMPIRE_DEATH_STAR, 
                browserWidth, browserHeight, currentLevel);
        }
        else if( currentLevel % CONSTANTS.COMMANDER_LEVEL_FACTOR == 0 )
        {
            addEnemyShips(bossList, 1, Constants.ShipType.EMPIRE_COMMANDER, 
                browserWidth, browserHeight, currentLevel);
        }
        
        //check if boss added
        if(bossList.length > 0)
        {
            AddBossMessage(); //notify user
        }
        
        return bossList;
    }

    /**
     * Populate enemy ship list with new objects
     */
    function addEnemyShips(enemyShipList:Array<GameObjects.ShipObject>, numberOfShips:number, 
        type:Constants.ShipType, browserWidth:number, browserHeight:number, currentLevel:number)
    {
        //loop until limit reached
        for(var i = 0; i < numberOfShips; i++)
        {
            var enemyShip:GameObjects.ShipObject = null;
            
            switch(type)
            {
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
    function getNewEnemyShip(type:Constants.ShipType, browserWidth:number, browserHeight:number, currentLevel:number) : GameObjects.ShipObject
    {
        var ship:GameObjects.ShipObject = null;
        var randomX:number = getRandomInteger(0,browserWidth);
        var randomSeconds:number = getRandomInteger(0, (currentLevel * CONSTANTS.MAX_SECONDS_MULTIPLIER_PER_LEVEL));
        var randomTime:Date = addSecondsToDate(Date.now(), (randomSeconds + CONSTANTS.LEVEL_LOAD_BUFFER_SECONDS));
        
        switch(type)
        {
            case Constants.ShipType.EMPIRE_DESTROYER:
                ship = new GameObjects.DestroyerObject(randomX,0,browserWidth, browserHeight, randomTime);
            break;
            case Constants.ShipType.EMPIRE_TIE_FIGHTER:
            default:
                ship = new GameObjects.TieFighterObject(randomX,0,browserWidth, browserHeight, randomTime);
            break; 
        }
        
        return ship;
    }

    /**
     * Initialize new boss object based on type requested
     */
    function getNewBoss(type:Constants.ShipType, browserWidth:number, browserHeight:number, currentLevel:number) : GameObjects.ShipObject
    {
        var ship:GameObjects.ShipObject = null;
        var randomX:number = getRandomInteger( (browserWidth/4), (browserWidth - (browserWidth/4)));
        var randomY:number = getRandomInteger(0, (browserHeight/2));
        //have boss start near end of level
        var maxSeconds:number = (currentLevel * CONSTANTS.MAX_SECONDS_MULTIPLIER_PER_LEVEL);
        var maxTime:Date = addSecondsToDate(Date.now(), (maxSeconds + CONSTANTS.LEVEL_LOAD_BUFFER_SECONDS));
        
        switch(type)
        {
            case Constants.ShipType.EMPIRE_COMMANDER:
                ship = new GameObjects.CommanderObject(randomX,randomY,browserWidth, browserHeight, maxTime);
            break;
            case Constants.ShipType.EMPIRE_DEATH_STAR:
            default:
                ship = new GameObjects.DeathStarObject(randomX,randomY,browserWidth, browserHeight, maxTime);
            break; 
        }
        
        return ship;
    }
    
    /**
     * Returns random integer
     */
    export function getRandomInteger(min:number, max:number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Add a user provided amount of seconds to the passed in date
     */
    export function addSecondsToDate(dateNumber:number, seconds:number) {
        return new Date(dateNumber + seconds*1000);
    }

    /**
     * Reset missiles and their availability based on current level
     */
    export function equipMissiles(currentLevel:number, missileList:Array<GameObjects.Projectile>,
        browserWidth:number, browserHeight:number) : void
    {
        //check if current level is multiple
        if( currentLevel % CONSTANTS.ADD_MISSILE_LEVEL == 0 )
        {
            //init missile
            var id:number = missileList.length;
            var radius:number = CONSTANTS.MISSILE_RADIUS;
            var color:string = CONSTANTS.MISSLE_PINK;
            var damage:number = CONSTANTS.MISSILE_DAMAGE;
            var missile:GameObjects.Projectile = new GameObjects.Projectile(0,0,CONSTANTS.MISSILE_SPEED,
                browserWidth,browserHeight,Constants.ProjectileType.MISSILE,
                id,0,radius, color, damage);
                
            //add missile
            missileList.push(missile);
            
            //notify user
            AddMissileMessage();
        }
    }
    
    /**
     * Check if user has advanced far enough to earn extra health
     */
    export function checkRebelShipHealth(ship:GameObjects.RebelShipObject, currentLevel:number) : void
    {
        //check if current level is multiple
        if( currentLevel % CONSTANTS.ADD_HEALTH_LEVEL == 0 )
        {
            //add health
            ship.maxHealth += 1;
            ship.health += 1;
            
            //notify user
            AddHealthMessage(1);
        }
    }

    /**
     * Create list populated with Projectile projects
     */
    export function getPopulatedProjectileList(type:Constants.ProjectileType, speed:number, 
        limit:number, canvasWidth:number, canvasHeight:number) : Array<GameObjects.Projectile>
    {
        var list:Array<GameObjects.Projectile> = new Array<GameObjects.Projectile>();
        var radius:number = 0;
        var color:string = '';
        var damage:number = 0;
        
        switch(type)
        {
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
            default:
                radius = CONSTANTS.CANNON_SHOT_RADIUS;
                color = CONSTANTS.CANNON_SHOT_BLUE;
                damage = CONSTANTS.CANNON_SHOT_DAMAGE;
            break;
        }
        
        for (var i = 0; i < limit; i++) {
            list.push(new GameObjects.Projectile(0,0,speed,canvasWidth,canvasHeight,type,i,0,radius, color, damage));
        }
        
        return list;
    }

    /**
     * Get id of the first unused projectile object
     */
    function getUnusedProjectileId(list:Array<GameObjects.Projectile>) : number
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
    export function getProjectilesByStatus(list:Array<GameObjects.Projectile>, isActive:boolean) : Array<GameObjects.Projectile>
    {
        return list.filter(function (proj) { 
            //check for a specific type
            if(proj.type === Constants.ProjectileType.MISSILE && !isActive)
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
    export function fireProjectile(list:Array<GameObjects.Projectile>, offset:number, ship:GameObjects.ShipObject,
        isTargeted:boolean, targetX:number, targetY:number)
    {
        //get id of next available unused projectile
        var id: number = getUnusedProjectileId(list);

        //check if id is valid
        if (id >= 0) {
            //get current location of ship
            var x: number = ship.getProjectileLocationStartX();
            var y: number = ship.getProjectileLocationStartY(offset);
            
            //activate projectile
            activateProjectile(id, list, x, y, isTargeted, targetX, targetY);
        }
    }

    /**
     * Activate projectile object for a specific id
     */
    function activateProjectile(id:number, list:Array<GameObjects.Projectile>, currentX:number, currentY:number,
        isTargeted:boolean, targetX:number, targetY:number)
    {
        //get index of id
        var index:number = list.map(function (proj) { return proj.id; }).indexOf(id);
        
        //update projectile properties
        list[index].createTime = Date.now();
        list[index].isAlive = true; //now active object to render
        list[index].isFirst = false; //not the first use
        list[index].locationX = currentX;
        list[index].locationY = currentY;
        list[index].isTargeted = isTargeted;
        
        if(isTargeted)
        {
            list[index].setTarget(targetX, targetY);
        }
    }

    /**
     * deactivate all projectiles within a list
     */
    export function resetProjectiles(list:Array<GameObjects.Projectile>)
    {
        list.forEach(proj => {
            proj.isAlive = false;
            proj.isFirst = true;
        });
    }

    /**
     * Loop through list and update the Y position of all active objects
     */
    export function incrementProjectilePosition(list:Array<GameObjects.Projectile>, modifier:number)
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
     * Create appropriate animation based on ship type and health remaining
     */
    export function addHitAnimation(ship:GameObjects.ShipObject, list:Array<GameObjects.SpriteSheetObject>, 
        browserWidth:number, browserHeight:number) : void
    {
        var isDestroyed:boolean = ship.health > 0 ? false : true;
        var x:number = ship.getExplosionX();
        var y:number = ship.getExplosionY();
        var type:Constants.SpriteType;
        
        //check if destroyed
        if(isDestroyed)
        {
            switch(ship.type)
            {
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
        else
        {
            switch(ship.type)
            {
                default:
                    type = Constants.SpriteType.EXPLOSION_SMALL;
                break;
            }
        }
        
        //add explosion
        addNewExplosion(explosionList, x, y, type, browserWidth, browserHeight);
    }
    
    /**
     * Add new explosion animation to list
     */
    function addNewExplosion(list:Array<GameObjects.SpriteSheetObject>, x:number, y:number,
        type:Constants.SpriteType, browserWidth:number, browserHeight:number) : void
    {
        switch(type)
        {
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
    export function addNewMessage(list:Array<GameObjects.Message>, type:Constants.MessageType,
        text:string, startX:number, startY:number, fontSize:number)
    {
        var font:string = fontSize.toString() + "px 'Orbitron'";
        var colorRgb1:string;
        var colorRgb2:string = CONSTANTS.FILL_YELLOW;
        
        switch(type)
        {
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
            default:
                colorRgb1 = CONSTANTS.FILL_WHITE;
            break;
        }
        
        //add message
        list.push(new GameObjects.Message(type, text, font, colorRgb1, colorRgb2, 
            startX, startY));
    }
    
    /**
     * Check if browser is compliant
     */
    export function isCompliantBrowser() : boolean
    {
        var isCompliant:boolean = false;
        
        var ua:string = navigator.userAgent;
        var browserName:string  = navigator.appName;
        var nVer:string = navigator.appVersion;
        var fullVersion:string  = ''+parseFloat(navigator.appVersion); 
        var majorVer:number = parseInt(navigator.appVersion,10);
        var nameOffset,verOffset,ix;
        
        //Google Chrome 
        if ((verOffset = ua.indexOf("Chrome")) != -1) 
        {
            browserName = "Chrome";
            fullVersion = ua.substring(verOffset+7);
            isCompliant = true;
        }
        // Opera 15+, 
        else if ((verOffset=ua.indexOf("OPR/"))!=-1) {
            browserName = "Opera";
            fullVersion = ua.substring(verOffset+4);
        }
        // older Opera,
        else if ((verOffset=ua.indexOf("Opera"))!=-1) {
            browserName = "Opera";
            fullVersion = ua.substring(verOffset+6);
            if ((verOffset=ua.indexOf("Version"))!=-1) 
            fullVersion = ua.substring(verOffset+8);
        }
        // Microsoft IE
        else if ((verOffset=ua.indexOf("MSIE"))!=-1) {
            browserName = "Microsoft Internet Explorer";
            fullVersion = ua.substring(verOffset+5);
        }
        //Apple Safari 
        else if ((verOffset=ua.indexOf("Safari"))!=-1) {
            browserName = "Safari";
            fullVersion = ua.substring(verOffset+7);
            if ((verOffset=ua.indexOf("Version"))!=-1) 
            fullVersion = ua.substring(verOffset+8);
        }
        //Firefox 
        else if ((verOffset=ua.indexOf("Firefox"))!=-1) {
            browserName = "Firefox";
            fullVersion = ua.substring(verOffset+8);
        }
        //other browsers 
        else if ( (nameOffset=ua.lastIndexOf(' ')+1) < 
                (verOffset=ua.lastIndexOf('/')) ) 
        {
            browserName = ua.substring(nameOffset,verOffset);
            fullVersion = ua.substring(verOffset+1);
            if (browserName.toLowerCase()==browserName.toUpperCase()) {
                browserName = navigator.appName;
            }
        }

        return isCompliant;
    }
}