var Constants;
(function (Constants_1) {
    /**
     * Global Constants
     */
    var Constants = (function () {
        function Constants() {
            //game mgmt settings
            this.DEFAULT_START_LEVEL = 1;
            this.DEFAULT_HIGH_SCORE_COOKIE_NAME = 'RebelWarsHighScores';
            this.INFO_TEXT_SPACING = 18;
            this.MAX_HIGH_SCORES = 5;
            //key values
            this.KEY_LEFT = 37;
            this.KEY_UP = 38;
            this.KEY_RIGHT = 39;
            this.KEY_DOWN = 40;
            this.KEY_SPACEBAR = 32;
            this.KEY_ENTER = 13;
            this.KEY_S = 83;
            //dimensions
            this.CLIENT_WINDOW_MARGIN = 10;
            this.CANNON_SHOT_RADIUS = 4;
            this.CANNON_SHOT_OFFSET_Y = -2;
            this.MISSILE_RADIUS = 6;
            this.MISSILE_OFFSET_Y = -2;
            this.IMPERIAL_SHOT_RADIUS = 4;
            this.IMPERIAL_MISSILE_RADIUS = 8;
            this.TURRET_SPRAY_RADIUS = 4;
            this.DEATH_STAR_PROJECTILE_OFFSET_X = 93;
            this.DEATH_STAR_PROJECTILE_OFFSET_Y = 82;
            this.BOUNTY_HUNTER_PROJECTILE_OFFSET_X = 50;
            this.BOUNTY_HUNTER_PROJECTILE_OFFSET_Y = 100;
            this.DESTROYER_HEIGHT_HIT_FACTOR = 2;
            this.REBEL_SHIP_HEIGHT_HIT_FACTOR = 2;
            this.TIE_FIGHTER_HEIGHT_HIT_FACTOR = 2;
            this.COMMANDER_HEIGHT_HIT_FACTOR = 2;
            this.DEATH_STAR_HEIGHT_HIT_FACTOR = 2;
            this.BOUNTY_HUNTER_HEIGHT_HIT_FACTOR = 2;
            this.MESSAGE_RISE_FACTOR_Y = 1;
            this.MESSAGE_EXPIRE_COUNT = 175;
            this.MESSAGE_THROTTLE_COUNT = 50;
            //limits
            this.MISSILE_LIMIT = 1;
            this.CANNON_SHOT_LIMIT = 10;
            this.COMMANDER_IMPERIAL_SHOT_LIMIT = 10;
            this.COMMANDER_IMPERIAL_SHOT_FIRE_RATE = 0.5;
            this.DEATH_STAR_IMPERIAL_SHOT_LIMIT = 10;
            this.DEATH_STAR_IMPERIAL_SHOT_FIRE_RATE = 1;
            this.DEATH_STAR_IMPERIAL_MISSILE_LIMIT = 2;
            this.DEATH_STAR_IMPERIAL_MISSILE_FIRE_RATE = 1;
            this.DEATH_STAR_NUM_MULTI_SHOT = 1;
            this.BOUNTY_HUNTER_TURRET_SPRAY_LIMIT = 12;
            this.BOUNTY_HUNTER_TURRET_SPRAY_FIRE_RATE = 1;
            this.BOUNTY_HUNTER_NUM_MULTI_SHOT = 2;
            this.NUM_FIGHTERS_PER_LEVEL = 3;
            this.NUM_DESTROYERS_PER_LEVEL = 1;
            this.MAX_SECONDS_MULTIPLIER_PER_LEVEL = 10;
            this.LEVEL_LOAD_BUFFER_SECONDS = 2;
            this.COMMANDER_LEVEL_FACTOR = 3;
            this.DEATH_STAR_LEVEL_FACTOR = 5;
            this.BOUNTY_HUNTER_LEVEL_FACTOR = 7;
            this.ADD_MISSILE_LEVEL = 3;
            this.ADD_HEALTH_LEVEL = 5;
            this.ENEMY_STAT_INCREASE_LEVEL = 10;
            //speeds
            this.BASE_SPEED = 256;
            this.REBEL_SHIP_SPEED = this.BASE_SPEED;
            this.TIE_FIGHTER_SPEED = (this.BASE_SPEED / 4);
            this.DESTROYER_SPEED = (this.BASE_SPEED / 6);
            this.CANNON_SHOT_SPEED = this.BASE_SPEED;
            this.MISSILE_SPEED = (this.BASE_SPEED / 2);
            this.COMMANDER_SPEED = (this.BASE_SPEED / 4);
            this.DEATH_STAR_SPEED = (this.BASE_SPEED / 6);
            this.BOUNTY_HUNTER_SPEED = (this.BASE_SPEED / 1);
            this.TURRET_SPRAY_SPEED = this.BASE_SPEED;
            this.IMPERIAL_SHOT_SPEED = this.BASE_SPEED;
            this.IMPERIAL_MISSILE_SPEED = (this.BASE_SPEED / 2);
            //colors
            this.CANNON_SHOT_BLUE = 'CANNON_SHOT_BLUE';
            this.MISSLE_PINK = 'MISSLE_PINK';
            this.IMPERIAL_RED = 'IMPERIAL_RED';
            this.IMPERIAL_ORANGE = 'IMPERIAL_ORANGE';
            this.TURRET_GREEN = 'TURRET_GREEN';
            this.WHITE = 'WHITE';
            this.FILL_WHITE = 'rgb(250, 250, 250)';
            this.FILL_YELLOW = 'rgb(239, 255, 0)';
            this.FILL_RED = 'rgb(255, 0, 0)';
            this.FILL_GREEN = 'rgb(0, 255, 0)';
            this.FILL_BLUE = 'rgb(0, 0, 255)';
            this.FILL_LIGHT_BLUE = 'rgb(0, 230, 255)';
            this.FILL_ORANGE = 'rgb(255, 160, 0)';
            //health & damage
            this.CANNON_SHOT_DAMAGE = 1;
            this.IMPERIAL_SHOT_DAMAGE = 1;
            this.IMPERIAL_MISSILE_DAMAGE = 3;
            this.TURRET_SPRAY_DAMAGE = 1;
            this.MISSILE_DAMAGE = 5;
            this.TIE_FIGHTER_HEALTH = 1;
            this.DESTROYER_HEALTH = 5;
            this.COMMANDER_HEALTH = 20;
            this.DEATH_STAR_HEALTH = 50;
            this.BOUNTY_HUNTER_HEALTH = 30;
            this.REBEL_SHIP_HEALTH = 3;
            //directions
            this.DEFAULT_DIRECTION_CHANGE_SECONDS = 5;
        }
        /**
         * Retrieve hex color values
         */
        Constants.prototype.getColor = function (key) {
            switch (key) {
                case this.CANNON_SHOT_BLUE:
                    return '#00ffdf';
                case this.MISSLE_PINK:
                    return '#f000ff';
                case this.IMPERIAL_RED:
                    return '#FF0000';
                case this.IMPERIAL_ORANGE:
                    return '#ffbf00';
                case this.TURRET_GREEN:
                    return '#00ff00';
                case this.WHITE:
                default:
                    {
                        return '#FFF';
                    }
            }
        };
        return Constants;
    })();
    Constants_1.Constants = Constants;
    function getShipName(type) {
        switch (type) {
            case ShipType.EMPIRE_COMMANDER:
                return "Commander";
            case ShipType.EMPIRE_DEATH_STAR:
                return "Death Star";
            case ShipType.EMPIRE_DESTROYER:
                return "Destroyer";
            case ShipType.EMPIRE_TIE_FIGHTER:
                return "Tie Fighter";
            case ShipType.REBEL_MILLENIUM_FALCON:
                return "Millenium Falcon";
            case ShipType.BOUNTY_HUNTER:
                return "Boba Fett";
            default:
                {
                    return type.toString();
                }
        }
    }
    (function (ProjectileType) {
        ProjectileType[ProjectileType["CANNON_SHOT"] = 0] = "CANNON_SHOT";
        ProjectileType[ProjectileType["MISSILE"] = 1] = "MISSILE";
        ProjectileType[ProjectileType["IMPERIAL_SHOT"] = 2] = "IMPERIAL_SHOT";
        ProjectileType[ProjectileType["IMPERIAL_MISSILE"] = 3] = "IMPERIAL_MISSILE";
        ProjectileType[ProjectileType["TURRET_SPRAY"] = 4] = "TURRET_SPRAY";
    })(Constants_1.ProjectileType || (Constants_1.ProjectileType = {}));
    var ProjectileType = Constants_1.ProjectileType;
    (function (ShipType) {
        ShipType[ShipType["REBEL_MILLENIUM_FALCON"] = 0] = "REBEL_MILLENIUM_FALCON";
        ShipType[ShipType["EMPIRE_TIE_FIGHTER"] = 1] = "EMPIRE_TIE_FIGHTER";
        ShipType[ShipType["EMPIRE_DESTROYER"] = 2] = "EMPIRE_DESTROYER";
        ShipType[ShipType["EMPIRE_COMMANDER"] = 3] = "EMPIRE_COMMANDER";
        ShipType[ShipType["EMPIRE_DEATH_STAR"] = 4] = "EMPIRE_DEATH_STAR";
        ShipType[ShipType["BOUNTY_HUNTER"] = 5] = "BOUNTY_HUNTER";
    })(Constants_1.ShipType || (Constants_1.ShipType = {}));
    var ShipType = Constants_1.ShipType;
    (function (SpriteType) {
        SpriteType[SpriteType["EXPLOSION_SMALL"] = 0] = "EXPLOSION_SMALL";
        SpriteType[SpriteType["EXPLOSION_LARGE"] = 1] = "EXPLOSION_LARGE";
        SpriteType[SpriteType["INSTRUCTION_PANEL"] = 2] = "INSTRUCTION_PANEL";
    })(Constants_1.SpriteType || (Constants_1.SpriteType = {}));
    var SpriteType = Constants_1.SpriteType;
    (function (Direction) {
        Direction[Direction["RIGHT"] = 0] = "RIGHT";
        Direction[Direction["LEFT"] = 1] = "LEFT";
        Direction[Direction["UP"] = 2] = "UP";
        Direction[Direction["DOWN"] = 3] = "DOWN";
    })(Constants_1.Direction || (Constants_1.Direction = {}));
    var Direction = Constants_1.Direction;
    (function (MessageType) {
        MessageType[MessageType["GENERIC"] = 0] = "GENERIC";
        MessageType[MessageType["ADD_MISSILE"] = 1] = "ADD_MISSILE";
        MessageType[MessageType["ADD_HEALTH"] = 2] = "ADD_HEALTH";
        MessageType[MessageType["NEW_BOSS"] = 3] = "NEW_BOSS";
        MessageType[MessageType["HIGH_SCORE"] = 4] = "HIGH_SCORE";
        MessageType[MessageType["QUOTE"] = 5] = "QUOTE";
    })(Constants_1.MessageType || (Constants_1.MessageType = {}));
    var MessageType = Constants_1.MessageType;
})(Constants || (Constants = {}));
//# sourceMappingURL=Constants.js.map/**SPACING**/

/**SPACING**/var Service;
(function (Service) {
    var baseUrl = "http://jovansharpe.com/rebelwarswebservice/Score.asmx";
    function getChampion() {
        var champion = "N/A";
        var http = new XMLHttpRequest();
        var url = baseUrl + "/GetChampion";
        http.open("POST", url, false);
        //set header
        http.setRequestHeader("Content-type", "application/json; charset=utf-8");
        http.onreadystatechange = function () {
            // 
            if (http.readyState == 4 && http.status == 200) {
                var data = JSON.parse(this.responseText);
                champion = data.d;
            }
        };
        http.send(null);
        return champion;
    }
    Service.getChampion = getChampion;
    function getHighScore(name) {
        var score = 0;
        var http = new XMLHttpRequest();
        var url = baseUrl + "/GetScore";
        var params = "{'name':'" + name + "'}";
        http.open("POST", url, false);
        //set header
        http.setRequestHeader("Content-type", "application/json; charset=utf-8");
        http.onreadystatechange = function () {
            // 
            if (http.readyState == 4 && http.status == 200) {
                var data = JSON.parse(this.responseText);
                score = Number(data.d);
            }
        };
        http.send(params);
        return score;
    }
    Service.getHighScore = getHighScore;
    function getHighScoreList(rows) {
        var list = new Array();
        var http = new XMLHttpRequest();
        var url = baseUrl + "/GetScores";
        var params = "{'numRows':'" + rows.toString() + "'}";
        http.open("POST", url, false);
        //set header
        http.setRequestHeader("Content-type", "application/json; charset=utf-8");
        http.onreadystatechange = function () {
            //ensure process complete
            if (http.readyState == 4 && http.status == 200) {
                var data = JSON.parse(this.responseText);
                list = convertToHighScoreList(data.d);
            }
        };
        http.send(params);
        return list;
    }
    Service.getHighScoreList = getHighScoreList;
    function setHighScore(score) {
        var http = new XMLHttpRequest();
        var url = baseUrl + "/InsertScore";
        var jsonString = JSON.stringify(score);
        var position = getCurrentPosition();
        var params = "{'position':'" + position + "','input':'" + jsonString + "'}";
        http.open("POST", url, false);
        //set header
        http.setRequestHeader("Content-type", "application/json; charset=utf-8");
        http.onreadystatechange = function () {
            // 
            if (http.readyState == 4 && http.status == 200) {
                var data = "success";
            }
        };
        http.send(params);
    }
    Service.setHighScore = setHighScore;
    function convertToHighScoreList(dataString) {
        var list = new Array();
        var objList = JSON.parse(dataString);
        var highScoreObj;
        var name;
        var score;
        var displayName;
        objList.forEach(function (obj) {
            //get values
            name = obj["name"];
            score = Number(obj["highScore"]);
            displayName = obj["displayName"];
            //init new obj
            highScoreObj = new GameObjects.HighScore(displayName, name, score);
            //add to list
            list.push(highScoreObj);
        });
        return list;
    }
    function getCurrentPosition() {
        var date = new Date(Date.now());
        var hourString = date.getHours().toString();
        var text = hourString + "MayTheForceBeWithYou" + hourString;
        return btoa(text);
    }
})(Service || (Service = {}));
//# sourceMappingURL=Service.js.map/**SPACING**/

/**SPACING**/var Vector;
(function (Vector) {
    /**
     * Class containing a target location. Has functions to help navigate toward target.
     */
    var Waypoint = (function () {
        function Waypoint(targetX, targetY) {
            this.targetX = targetX;
            this.targetY = targetY;
        }
        /**
         * Returns new waypoint that leads to parent waypoint based on speed
         */
        Waypoint.prototype.getNextLocation = function (currentX, currentY, step) {
            var newX = 0;
            var newY = 0;
            //find the distance to target
            var distance = getDistance(currentX, currentY, this.targetX, this.targetY);
            //check if current step is greater than distance to target
            if (distance <= step) {
                //arrived at target
                newX = this.targetX;
                newY = this.targetY;
            }
            else {
                //get normalized values
                var coords = getNormalizedPoint((this.targetX - currentX), (this.targetY - currentY));
                //find the movement vector for this frame
                newX = coords.targetX * step;
                newY = coords.targetY * step;
                //add normalized step to next location
                newX = currentX + newX;
                newY = currentY + newY;
            }
            return new Waypoint(newX, newY);
        };
        return Waypoint;
    })();
    Vector.Waypoint = Waypoint;
    /**
     * Change length of vector to 1 while retaining its angle
     */
    function getNormalizedPoint(x, y) {
        var length = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        return new Waypoint((x / length), (y / length));
    }
    /**
     * Get distance between two points
     */
    function getDistance(startX, startY, endX, endY) {
        return getQuadratic((startX - endX), (startY - endY));
    }
    /**
     * Solve for quadratic equation
     */
    function getQuadratic(a, b) {
        return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
    }
    /**
     * Get point to intercept a specific target
     */
    function getTargetedWaypoint(startX, startY, targetX, targetY, targetVelocityX, targetVelocityY, projectileSpeed) {
        var aimX = 0;
        var aimY = 0;
        //get difference
        var diffX = startX - targetX;
        var diffY = startY - targetY;
        // Solve for quadratic equation
        var a = Math.pow(targetVelocityX, 2) + Math.pow(targetVelocityY, 2) - Math.pow(projectileSpeed, 2);
        var b = 2 * ((targetVelocityX * diffX) + (targetVelocityY * diffY));
        var c = Math.pow(diffX, 2) + Math.pow(diffY, 2);
        // Solve quadratic
        var ts = solveQuadratic(a, b, c);
        //check if null
        if (ts == null) {
            ts = new Waypoint(targetX, targetY);
        }
        // Find smallest positive solution
        var t0 = ts.targetX;
        var t1 = ts.targetY;
        var t = Math.min(t0, t1);
        if (t < 0)
            t = Math.max(t0, t1);
        if (t > 0) {
            aimX = targetX + targetVelocityX * t;
            aimY = targetY + targetVelocityY * t;
        }
        return new Waypoint(aimX, aimY);
    }
    Vector.getTargetedWaypoint = getTargetedWaypoint;
    /**
     *
     */
    function solveQuadratic(a, b, c) {
        var point = null;
        if (Math.abs(a) < 1e-6) {
            if (Math.abs(b) < 1e-6) {
                point = Math.abs(c) < 1e-6 ? new Waypoint(0, 0) : null;
            }
            else {
                point = new Waypoint(-c / b, -c / b);
            }
        }
        else {
            var disc = b * b - 4 * a * c;
            if (disc >= 0) {
                disc = Math.sqrt(disc);
                a = 2 * a;
                point = new Waypoint((-b - disc) / a, (-b + disc) / a);
            }
        }
        return point;
    }
    /**
     * Create a random waypoint within the passed in params
     */
    function getRandomWaypoint(minLocationX, maxLocationX, minLocationY, maxLocationY) {
        var randomX = GameLogic.getRandomInteger(minLocationX, maxLocationX);
        var randomY = GameLogic.getRandomInteger(minLocationY, maxLocationY);
        return new Waypoint(randomX, randomY);
    }
    Vector.getRandomWaypoint = getRandomWaypoint;
})(Vector || (Vector = {}));
//# sourceMappingURL=Vector.js.map/**SPACING**/

/**SPACING**/var __extends = (this && this.__extends) || function (d, b) {
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
//# sourceMappingURL=GameObjects.js.map/**SPACING**/

/**SPACING**/var GameLogic;
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
//# sourceMappingURL=GameLogic.js.map/**SPACING**/

/**SPACING**/var Render;
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
            //check if multi-shot projectile
            if (boss.isMultiShot(list[0].type)) {
                for (var i = 0; i < boss.getNumberOfExtraShots(); i++) {
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
                    //check for entry message
                    if (enemyShipList[i].showEntryMessage()) {
                        Message.AddEntryMessage(enemyShipList[i].type);
                    }
                    //render object
                    canvasContext.drawImage(enemyShipList[i].objImage, enemyShipList[i].getLocationX(), enemyShipList[i].getLocationY());
                    //check for collision
                    if (hasBeenHit(enemyShipList[i], cannonShotList, missileList)) {
                        //add hit animation
                        GameLogic.addHitAnimation(enemyShipList[i], explosionList, browserWidth, browserHeight);
                        //update score
                        currentUserScore.directHits += 1;
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
    function drawInfoPanel(canvasContext, currentLevel, enemies, rebelShipHealth, rebelShipMaxHealth, missileList, userScore) {
        if (canvasContext) {
            var level = "Level: " + currentLevel;
            var remainingEnemies = "Empire: " + enemies.toString();
            var health = "Health: " + rebelShipHealth.toString();
            var missiles = "Missiles: " + GameLogic.getProjectilesByStatus(missileList, false).length.toString();
            missiles += " / " + missileList.length;
            var score = "Score: " + userScore.toString();
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
            //draw score
            canvasContext.fillStyle = CONSTANTS.FILL_WHITE;
            canvasContext.fillText(score, CONSTANTS.INFO_TEXT_SPACING, CONSTANTS.INFO_TEXT_SPACING * 5);
            //check for a boss
            if (bossList.length > 0) {
                //color & fill boss health
                canvasContext.fillStyle = CONSTANTS.FILL_ORANGE;
                canvasContext.fillText("Boss: " + bossList[0].health.toString(), CONSTANTS.INFO_TEXT_SPACING, CONSTANTS.INFO_TEXT_SPACING * 6);
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
    function drawChampion(canvasContext, text) {
        canvasContext.textAlign = "center";
        canvasContext.textBaseline = "top";
        canvasContext.font = "16px 'Press Start 2P'";
        canvasContext.fillStyle = CONSTANTS.FILL_LIGHT_BLUE;
        canvasContext.fillText("Grand Master Jedi: " + text, browserWidth / 2, browserHeight / 12);
    }
    Render.drawChampion = drawChampion;
    function drawInstructionPanel(canvasContext, panel) {
        if (canvasContext) {
            if (GameObjects.isSpriteLoaded(panel.type)) {
                //render object
                canvasContext.drawImage(panel.objImage, panel.locationX, panel.locationY);
            }
        }
    }
    Render.drawInstructionPanel = drawInstructionPanel;
})(Render || (Render = {}));
//# sourceMappingURL=Render.js.map/**SPACING**/

/**SPACING**/var Modal;
(function (Modal) {
    var CONSTANTS = new Constants.Constants();
    /**
     * Load Modal that notifies user that the level is complete
     */
    function loadLevelCompleteModal(currentUserScore, currentLevel) {
        //get page items
        var userNameLabel = window.document.getElementById('lvlCompleteUserName');
        var levelLabel = window.document.getElementById('lvlCompleteLevel');
        var scoreLabel = window.document.getElementById('lvlCompleteScore');
        //assign values
        userNameLabel.textContent = currentUserScore.displayName;
        levelLabel.textContent = currentLevel.toString();
        scoreLabel.textContent = currentUserScore.currentScore.toString();
        //check for high score
        if (currentUserScore.isHighScore() && !currentUserScore.personalRecordDisplayed) {
            //notify user
            Message.AddPersonalRecordMessage();
            //flag that user has been notified
            currentUserScore.personalRecordDisplayed = true;
        }
        //process score
        checkUserScore(currentUserScore, "levelCompleteHighScoreDiv");
        //open window
        openLevelCompleteWindow();
    }
    Modal.loadLevelCompleteModal = loadLevelCompleteModal;
    /**
     * Get stored high score data
     */
    function getHighScoreData() {
        //var data:string = getCookieValue(CONSTANTS.DEFAULT_HIGH_SCORE_COOKIE_NAME);
        var data = localStorage.getItem(CONSTANTS.DEFAULT_HIGH_SCORE_COOKIE_NAME);
        if (data == null || data == "") {
            return null;
        }
        else {
            return JSON.parse(data);
        }
    }
    /**
     * Set High Score Cookie
     */
    function setHighScoreData(value) {
        //document.cookie = CONSTANTS.DEFAULT_HIGH_SCORE_COOKIE_NAME + "=" + JSON.stringify(value);
        localStorage.setItem(CONSTANTS.DEFAULT_HIGH_SCORE_COOKIE_NAME, JSON.stringify(value));
    }
    /**
     * Create a default High Score Cookie w/ dummy data
     */
    function setDefaultHighScoreData() {
        //create new object
        var defaultHighScoreList = new Array();
        defaultHighScoreList.push(new GameObjects.HighScore('Player 1', 'Player1', 5));
        defaultHighScoreList.push(new GameObjects.HighScore('Player 2', 'Player1', 20));
        defaultHighScoreList.push(new GameObjects.HighScore('Player 3', 'Player1', 15));
        //store
        setHighScoreData(defaultHighScoreList);
    }
    /**
     * Get stored high score for specific user
     */
    function getCurrentUserHighScoreData(name) {
        //var data:string = getCookieValue(CONSTANTS.DEFAULT_HIGH_SCORE_COOKIE_NAME + name);
        var data = localStorage.getItem(CONSTANTS.DEFAULT_HIGH_SCORE_COOKIE_NAME + name);
        if (data == null || data == "") {
            return "0";
        }
        else {
            return JSON.parse(data);
        }
    }
    /**
     * Save high score for specific user
     */
    function saveCurrentUserData(name, score) {
        localStorage.setItem(CONSTANTS.DEFAULT_HIGH_SCORE_COOKIE_NAME + name, score.toString());
    }
    /**
     * Open Warning Window
     */
    function openWarningWindow() {
        var link = window.document.getElementById('warningLink');
        link.click();
    }
    Modal.openWarningWindow = openWarningWindow;
    /**
     * Open Welcome Window
     */
    function openWelcomeWindow() {
        var list = populateHighScoreListObject();
        displayHighScoreData(list, "welcomeHighScoreDiv");
        var link = window.document.getElementById('welcomeLink');
        link.click();
        var welcomeUserNameTextbox = window.document.getElementById('welcomeUserName');
        welcomeUserNameTextbox.focus();
    }
    Modal.openWelcomeWindow = openWelcomeWindow;
    /**
     * Dynamically add table to Welcome Window containing high scores
     */
    function displayHighScoreData(list, divName) {
        var table = document.createElement("table");
        table.classList.add("centerTable");
        if (list.length > 0) {
            //create row
            var titleRow = document.createElement("tr");
            titleRow.classList.add("highScoreTableHeaderRow");
            //create cells
            var titleCell = document.createElement("td");
            titleCell.colSpan = 3;
            //titleCell.align = "center";
            titleCell.classList.add("highScoreTableHeader");
            //create text
            var titleText = document.createTextNode("HIGH SCORES");
            //add to table
            titleCell.appendChild(titleText);
            titleRow.appendChild(titleCell);
            table.appendChild(titleRow);
            //create row
            var headerRow = document.createElement("tr");
            headerRow.classList.add("highScoreHeaderRow");
            //create cells
            var headerCellRank = document.createElement("td");
            //headerCellRank.align = "left";
            headerCellRank.classList.add("highScoreHeaderRank");
            var headerCellName = document.createElement("td");
            //headerCellName.align = "left";
            headerCellName.classList.add("highScoreHeaderName");
            var headerCellScore = document.createElement("td");
            //headerCellScore.align = "left";
            headerCellScore.classList.add("highScoreHeaderScore");
            //create text
            var headerRankText = document.createTextNode("RANK");
            var headerNameText = document.createTextNode("NAME");
            var headerScoreText = document.createTextNode("SCORE");
            //add to table
            headerCellRank.appendChild(headerRankText);
            headerCellName.appendChild(headerNameText);
            headerCellScore.appendChild(headerScoreText);
            headerRow.appendChild(headerCellRank);
            headerRow.appendChild(headerCellName);
            headerRow.appendChild(headerCellScore);
            table.appendChild(headerRow);
            for (var i = 0; i < list.length; i++) {
                //create row
                var newRow = document.createElement("tr");
                //create cells
                var rankCell = document.createElement("td");
                //rankCell.align = "left";
                rankCell.classList.add("highScoreDataRank");
                var nameCell = document.createElement("td");
                //nameCell.align = "left";
                nameCell.classList.add("highScoreDataName");
                var scoreCell = document.createElement("td");
                //scoreCell.align = "center";
                scoreCell.classList.add("highScoreDataScore");
                //create text
                var rankText = document.createTextNode(getRank(i));
                var nameText = document.createTextNode(list[i].displayName);
                var scoreText = document.createTextNode(list[i].score.toString());
                rankCell.appendChild(rankText);
                nameCell.appendChild(nameText);
                scoreCell.appendChild(scoreText);
                newRow.appendChild(rankCell);
                newRow.appendChild(nameCell);
                newRow.appendChild(scoreCell);
                table.appendChild(newRow);
            }
        }
        //get div
        var div = document.getElementById(divName);
        //clear div
        div.innerHTML = "";
        //add table
        div.appendChild(table);
    }
    /**
     * Return named Jedi rank based on position number
     */
    function getRank(position) {
        switch (position) {
            case 0:
                return "Grand Master";
                break;
            case 1:
                return "Master";
                break;
            case 2:
                return "Knight";
                break;
            case 3:
                return "Apprentice";
                break;
            case 4:
                return "Padawan";
                break;
            default:
                return "Youngling";
        }
    }
    /**
     * Retrieve previous high scores among all users
     */
    function populateHighScoreListObject() {
        var maxItems = CONSTANTS.MAX_HIGH_SCORES;
        //get high score list
        return Service.getHighScoreList(maxItems);
    }
    /**
     * Load Modal that notifies user that the level is complete
     */
    function loadGameOverModal(currentUserScore, currentLevel) {
        //get page items
        var userNameLabel = window.document.getElementById('gameOverUserName');
        var levelLabel = window.document.getElementById('gameOverLevel');
        var scoreLabel = window.document.getElementById('gameOverScore');
        //assign values
        userNameLabel.textContent = currentUserScore.displayName;
        levelLabel.textContent = currentLevel.toString();
        scoreLabel.textContent = currentUserScore.currentScore.toString();
        //store final stats
        currentUserScore.levelFinish = currentLevel;
        //process score
        checkUserScore(currentUserScore, "gameOverHighScoreDiv");
        //open window
        openGameOverWindow();
    }
    Modal.loadGameOverModal = loadGameOverModal;
    /**
     * Check if user has a high score
     */
    function checkUserScoreOnQuit(score) {
        checkUserScore(score, null);
    }
    Modal.checkUserScoreOnQuit = checkUserScoreOnQuit;
    /**
     * Check if user has a high score
     */
    function checkUserScore(score, divName) {
        //check score
        if (score.isHighScore()) {
            //store if personal record
            saveCurrentUserHighScore(score);
        }
        //check if needing to populate div
        if (divName != null) {
            //get high score list
            var list = populateHighScoreListObject();
            //show updated high score list
            displayHighScoreData(list, divName);
        }
    }
    Modal.checkUserScore = checkUserScore;
    /**
     * Retrieve highest score for specific user
     */
    function getCurrentUserHighScore(name) {
        var score = 0;
        //score = Number(getCurrentUserHighScoreData(name));
        score = Number(Service.getHighScore(name));
        return score;
    }
    Modal.getCurrentUserHighScore = getCurrentUserHighScore;
    /**
     * Save high score for a specific user
     */
    function saveCurrentUserHighScore(score) {
        //save
        Service.setHighScore(score);
        //saveCurrentUserData(name, score);
    }
    Modal.saveCurrentUserHighScore = saveCurrentUserHighScore;
    function closeWelcomeWindow() {
        var link = window.document.getElementById('closeWelcomeLink');
        link.click();
    }
    Modal.closeWelcomeWindow = closeWelcomeWindow;
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
    Modal.closeLevelCompleteWindow = closeLevelCompleteWindow;
    function openGameOverWindow() {
        var link = window.document.getElementById('gameOverLink');
        link.click();
        var playAgainButton = window.document.getElementById('buttonPlayAgain');
        playAgainButton.focus();
    }
    function closeGameOverWindow() {
        var link = window.document.getElementById('closeGameOverLink');
        link.click();
    }
    Modal.closeGameOverWindow = closeGameOverWindow;
    function localStorageSupported() {
        try {
            return "localStorage" in window && window["localStorage"] !== null;
        }
        catch (e) {
            return false;
        }
    }
})(Modal || (Modal = {}));
//# sourceMappingURL=Modal.js.map/**SPACING**/

/**SPACING**/var Message;
(function (Message) {
    var DeathStarMessageList = ["You underestimate the power of the dark side!",
        "You underestimate my power!",
        "Give yourself to the Dark Side!",
        "You can not disguise yourself from me, Jedi!"];
    var CommanderMessageList = ["If you will not be turned, you will be destroyed!",
        "Your feeble skills are no match for the power of the Dark Side!",
        "Now you will pay the price for your lack of vision!",
        "Your faith in your friends is your weakness!"];
    var BountyHunterMessageList = ["Always a pleasure to meet a Jedi",
        "All is proceeding as you wished, Lord Vader",
        "Now let me show you the true power of a Mandalorian!",
        "Your arrogance is the cause of your destruction, not me"];
    function GetMessageLocationX() {
        return (browserWidth / 2);
    }
    function GetMessageLocationY() {
        return (browserHeight - (rebelShip.objImage.naturalHeight * 2));
    }
    function GetQuoteLocationX() {
        return (browserWidth / 2);
    }
    function GetQuoteLocationY() {
        return (browserHeight / 2);
    }
    /**
     * Create catchphrase message for boss to render
     */
    function AddEntryMessage(type) {
        //only 4 message entries per list, grab random index
        var index = Math.floor(Math.random() * 4);
        switch (type) {
            case Constants.ShipType.EMPIRE_DEATH_STAR:
                AddQuoteMessage(DeathStarMessageList[index]);
                break;
            case Constants.ShipType.EMPIRE_COMMANDER:
                AddQuoteMessage(CommanderMessageList[index]);
                break;
            case Constants.ShipType.BOUNTY_HUNTER:
                AddQuoteMessage(BountyHunterMessageList[index]);
                break;
        }
    }
    Message.AddEntryMessage = AddEntryMessage;
    function AddQuoteMessage(text) {
        //add message
        GameLogic.addNewMessage(messageList, Constants.MessageType.QUOTE, text, GetQuoteLocationX(), GetQuoteLocationY(), 24);
    }
    function AddGameStartMessage() {
        //add message
        GameLogic.addNewMessage(messageList, Constants.MessageType.GENERIC, "*** START GAME ***", GetMessageLocationX(), GetMessageLocationY(), 32);
    }
    Message.AddGameStartMessage = AddGameStartMessage;
    function AddHealthMessage(amount) {
        //add message
        GameLogic.addNewMessage(messageList, Constants.MessageType.ADD_HEALTH, "+" + amount.toString() + " Health", GetMessageLocationX(), GetMessageLocationY(), 24);
    }
    Message.AddHealthMessage = AddHealthMessage;
    function AddMissileMessage() {
        //add message
        GameLogic.addNewMessage(messageList, Constants.MessageType.ADD_MISSILE, "+1 Missile", GetMessageLocationX(), GetMessageLocationY(), 24);
    }
    Message.AddMissileMessage = AddMissileMessage;
    function AddBossMessage() {
        //add message
        GameLogic.addNewMessage(messageList, Constants.MessageType.NEW_BOSS, "^^^ BOSS DETECTED ^^^", GetMessageLocationX(), GetMessageLocationY(), 32);
    }
    Message.AddBossMessage = AddBossMessage;
    function AddPersonalRecordMessage() {
        //add message
        GameLogic.addNewMessage(messageList, Constants.MessageType.GENERIC, "*** PERSONAL RECORD ***", GetMessageLocationX(), GetMessageLocationY(), 32);
    }
    Message.AddPersonalRecordMessage = AddPersonalRecordMessage;
    function AddPressSpacebarMessage() {
        //add message
        GameLogic.addNewMessage(messageList, Constants.MessageType.GENERIC, "*** PRESS SPACEBAR TO START ***", GetMessageLocationX(), GetMessageLocationY(), 32);
    }
    Message.AddPressSpacebarMessage = AddPressSpacebarMessage;
    function AddNewHighScoreMessage() {
        //add message
        GameLogic.addNewMessage(messageList, Constants.MessageType.HIGH_SCORE, "!!! NEW HIGH SCORE !!!", GetMessageLocationX(), GetMessageLocationY(), 40);
        //add message
        GameLogic.addNewMessage(messageList, Constants.MessageType.HIGH_SCORE, "### JEDI GRAND MASTER ###", GetMessageLocationX(), GetMessageLocationY(), 40);
    }
    Message.AddNewHighScoreMessage = AddNewHighScoreMessage;
})(Message || (Message = {}));
//# sourceMappingURL=Message.js.map/**SPACING**/

/**SPACING**//*
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
/*** INITIALIZE GAME MGMT VARS ***/
var intervalHolder = null;
var atStartScreen = true;
var isGameReady = false;
var currentLevel = CONSTANTS.DEFAULT_START_LEVEL;
var timePrevious = Date.now();
var titleTimePrevious = 0;
/*** INITIALIZE GAME OBJECTS ***/
//user controlled ship
var rebelShip = new GameObjects.RebelShipObject(browserWidth, browserHeight, currentLevel);
//list of explosion sprites
var explosionList = new Array();
//list to store message to user
var messageList = new Array();
//list of enemy ships
var enemyShipList = new Array();
var bossList = new Array();
//list of cannon shots
var cannonShotList = GameLogic.getPopulatedProjectileList(Constants.ProjectileType.CANNON_SHOT, CONSTANTS.CANNON_SHOT_SPEED, CONSTANTS.CANNON_SHOT_LIMIT, gameCanvas.width, gameCanvas.height, currentLevel);
//list of missiles
var missileList = GameLogic.getPopulatedProjectileList(Constants.ProjectileType.MISSILE, CONSTANTS.MISSILE_SPEED, CONSTANTS.MISSILE_LIMIT, gameCanvas.width, gameCanvas.height, currentLevel);
//manage user input controls
var rightArrowKeyed = false;
var leftArrowKeyed = false;
//bind keyboard event handlers
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
//init user stats
var currentUserScore = new GameObjects.Score("Anonymous", CONSTANTS.DEFAULT_START_LEVEL);
//var highScoreList:Array<GameObjects.HighScore> = new Array<GameObjects.HighScore>();
var champion = Service.getChampion();
//init theme song
var titleThemeSong = new Audio("sounds/MainThemeWhistle.mp3");
titleThemeSong.loop = true;
//init instruction panel
var instructionPanel = new GameObjects.ImageObject(0, 0, browserWidth, browserHeight);
//check browser
if (GameLogic.isCompliantBrowser()) {
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
        Modal.openWelcomeWindow();
    }
}
else {
    //open warning
    Modal.openWarningWindow();
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
    missileList = GameLogic.getPopulatedProjectileList(Constants.ProjectileType.MISSILE, CONSTANTS.MISSILE_SPEED, CONSTANTS.MISSILE_LIMIT, gameCanvas.width, gameCanvas.height, currentLevel);
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
    keyHandler(true, event);
}
/**
 * User lets up on key
 */
function keyUpHandler(event) {
    keyHandler(false, event);
}
/**
 * Generic key handler
 */
function keyHandler(isDown, event) {
    var keyCode = event.keyCode || event.which;
    switch (keyCode) {
        case CONSTANTS.KEY_UP:
            {
                //check if key up
                if (!isDown) {
                    currentUserScore.shotsFired += GameLogic.fireProjectile(cannonShotList, CONSTANTS.CANNON_SHOT_OFFSET_Y, rebelShip, false, 0, 0); //add new shot
                }
                break;
            }
        case CONSTANTS.KEY_DOWN:
            {
                //check if key up
                if (!isDown) {
                    currentUserScore.shotsFired += GameLogic.fireProjectile(missileList, CONSTANTS.MISSILE_OFFSET_Y, rebelShip, false, 0, 0); //add new missile
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
                if (isGameReady) {
                    //ensure these keys do not reset screen
                    event.cancelBubble = true;
                    event.returnValue = false;
                }
                else if (atStartScreen) {
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
function startGame() {
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
        Render.drawInfoPanel(canvasContext, currentLevel, getRemainingEnemies(), rebelShip.health, rebelShip.maxHealth, missileList, currentUserScore.currentScore);
        //render any messages
        Render.drawMessageList(canvasContext, messageList);
        //check if rebel ship has no health
        //then check if enemies left
        if (rebelShip.health < 1) {
            //game flag to inactive
            isGameReady = false;
            //notify user game over
            Modal.loadGameOverModal(currentUserScore, currentLevel);
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
        Message.AddPressSpacebarMessage(); //add new
    }
    //check if no enemies left
    if (enemyShipList.length == 0) {
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
    if (!atStartScreen) {
        //get user input
        Modal.openWelcomeWindow();
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
        Modal.saveCurrentUserHighScore(currentUserScore);
        //adjust current high score
        currentUserScore.highScore = currentUserScore.currentScore;
    }
    //close window
    Modal.closeGameOverWindow();
    //start over
    startOver();
}
function UserQuitWelcome() {
    //close window
    Modal.closeWelcomeWindow();
    //erase score
    currentUserScore = null;
    //exit
    UserQuit();
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
//# sourceMappingURL=Main.js.map/**SPACING**/

/**SPACING**/