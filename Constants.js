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
            //key values
            this.KEY_LEFT = 37;
            this.KEY_UP = 38;
            this.KEY_RIGHT = 39;
            this.KEY_DOWN = 40;
            this.KEY_SPACEBAR = 32;
            //dimensions
            this.CLIENT_WINDOW_MARGIN = 10;
            this.CANNON_SHOT_RADIUS = 4;
            this.CANNON_SHOT_OFFSET_Y = -2;
            this.MISSILE_RADIUS = 6;
            this.MISSILE_OFFSET_Y = -2;
            this.IMPERIAL_SHOT_RADIUS = 4;
            this.IMPERIAL_MISSILE_RADIUS = 10;
            this.DEATH_STAR_PROJECTILE_OFFSET_X = 93;
            this.DEATH_STAR_PROJECTILE_OFFSET_Y = 82;
            this.DESTROYER_HEIGHT_HIT_FACTOR = 2;
            this.REBEL_SHIP_HEIGHT_HIT_FACTOR = 2;
            this.TIE_FIGHTER_HEIGHT_HIT_FACTOR = 2;
            this.COMMANDER_HEIGHT_HIT_FACTOR = 2;
            this.DEATH_STAR_HEIGHT_HIT_FACTOR = 2;
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
            this.DEATH_STAR_IMPERIAL_MISSILE_LIMIT = 1;
            this.DEATH_STAR_IMPERIAL_MISSILE_FIRE_RATE = 3;
            this.NUM_FIGHTERS_PER_LEVEL = 3;
            this.NUM_DESTROYERS_PER_LEVEL = 1;
            this.MAX_SECONDS_MULTIPLIER_PER_LEVEL = 10;
            this.LEVEL_LOAD_BUFFER_SECONDS = 2;
            this.COMMANDER_LEVEL_FACTOR = 3;
            this.DEATH_STAR_LEVEL_FACTOR = 5;
            this.ADD_MISSILE_LEVEL = 3;
            this.ADD_HEALTH_LEVEL = 5;
            //speeds
            this.BASE_SPEED = 256;
            this.REBEL_SHIP_SPEED = this.BASE_SPEED;
            this.TIE_FIGHTER_SPEED = (this.BASE_SPEED / 4);
            this.DESTROYER_SPEED = (this.BASE_SPEED / 6);
            this.CANNON_SHOT_SPEED = this.BASE_SPEED;
            this.MISSILE_SPEED = (this.BASE_SPEED / 2);
            this.COMMANDER_SPEED = (this.BASE_SPEED / 6);
            this.DEATH_STAR_SPEED = (this.BASE_SPEED / 10);
            this.IMPERIAL_SHOT_SPEED = this.BASE_SPEED;
            this.IMPERIAL_MISSILE_SPEED = (this.BASE_SPEED / 2);
            //colors
            this.CANNON_SHOT_BLUE = 'CANNON_BLUE';
            this.MISSLE_PINK = 'MISSLE_PINK';
            this.IMPERIAL_RED = 'IMPERIAL_RED';
            this.IMPERIAL_ORANGE = 'IMPERIAL_ORANGE';
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
            this.MISSILE_DAMAGE = 5;
            this.TIE_FIGHTER_HEALTH = 1;
            this.DESTROYER_HEALTH = 5;
            this.COMMANDER_HEALTH = 20;
            this.DEATH_STAR_HEALTH = 50;
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
    })(Constants_1.ProjectileType || (Constants_1.ProjectileType = {}));
    var ProjectileType = Constants_1.ProjectileType;
    (function (ShipType) {
        ShipType[ShipType["REBEL_MILLENIUM_FALCON"] = 0] = "REBEL_MILLENIUM_FALCON";
        ShipType[ShipType["EMPIRE_TIE_FIGHTER"] = 1] = "EMPIRE_TIE_FIGHTER";
        ShipType[ShipType["EMPIRE_DESTROYER"] = 2] = "EMPIRE_DESTROYER";
        ShipType[ShipType["EMPIRE_COMMANDER"] = 3] = "EMPIRE_COMMANDER";
        ShipType[ShipType["EMPIRE_DEATH_STAR"] = 4] = "EMPIRE_DEATH_STAR";
    })(Constants_1.ShipType || (Constants_1.ShipType = {}));
    var ShipType = Constants_1.ShipType;
    (function (SpriteType) {
        SpriteType[SpriteType["EXPLOSION_SMALL"] = 0] = "EXPLOSION_SMALL";
        SpriteType[SpriteType["EXPLOSION_LARGE"] = 1] = "EXPLOSION_LARGE";
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
    })(Constants_1.MessageType || (Constants_1.MessageType = {}));
    var MessageType = Constants_1.MessageType;
})(Constants || (Constants = {}));
//# sourceMappingURL=Constants.js.map