module Constants {
    /**
     * Global Constants
     */
    export class Constants {
        //game mgmt settings
        DEFAULT_START_LEVEL:number = 1;
        DEFAULT_HIGH_SCORE_COOKIE_NAME:string = 'RebelWarsHighScores';
        INFO_TEXT_SPACING:number = 18;
        MAX_HIGH_SCORES:number = 5;
        //key values
        KEY_LEFT:number = 37;
        KEY_UP:number = 38;
        KEY_RIGHT:number = 39;
        KEY_DOWN:number = 40;
        KEY_SPACEBAR:number = 32;
        KEY_ENTER:number = 13;
        KEY_S:number = 83;
        //dimensions
        CLIENT_WINDOW_MARGIN:number = 10;
        CANNON_SHOT_RADIUS:number = 4;
        CANNON_SHOT_OFFSET_Y:number = -2;
        MISSILE_RADIUS:number = 6;
        MISSILE_OFFSET_Y = -2;
        IMPERIAL_SHOT_RADIUS:number = 4;
        IMPERIAL_MISSILE_RADIUS:number = 10;
        DEATH_STAR_PROJECTILE_OFFSET_X:number = 93;
        DEATH_STAR_PROJECTILE_OFFSET_Y:number = 82;
        DESTROYER_HEIGHT_HIT_FACTOR = 2;
        REBEL_SHIP_HEIGHT_HIT_FACTOR = 2;
        TIE_FIGHTER_HEIGHT_HIT_FACTOR = 2;
        COMMANDER_HEIGHT_HIT_FACTOR = 2;
        DEATH_STAR_HEIGHT_HIT_FACTOR = 2;
        MESSAGE_RISE_FACTOR_Y = 1;
        MESSAGE_EXPIRE_COUNT = 175;
        MESSAGE_THROTTLE_COUNT = 50; 
        //limits
        MISSILE_LIMIT = 1;
        CANNON_SHOT_LIMIT = 10;
        COMMANDER_IMPERIAL_SHOT_LIMIT = 10;
        COMMANDER_IMPERIAL_SHOT_FIRE_RATE = 0.5;
        DEATH_STAR_IMPERIAL_SHOT_LIMIT = 10;
        DEATH_STAR_IMPERIAL_SHOT_FIRE_RATE = 1;
        DEATH_STAR_IMPERIAL_MISSILE_LIMIT = 1;
        DEATH_STAR_IMPERIAL_MISSILE_FIRE_RATE = 3;
        NUM_FIGHTERS_PER_LEVEL = 3;
        NUM_DESTROYERS_PER_LEVEL = 1;
        MAX_SECONDS_MULTIPLIER_PER_LEVEL = 10;
        LEVEL_LOAD_BUFFER_SECONDS = 2;
        COMMANDER_LEVEL_FACTOR = 3;
        DEATH_STAR_LEVEL_FACTOR = 5;
        ADD_MISSILE_LEVEL = 3;
        ADD_HEALTH_LEVEL = 5;
        //speeds
        BASE_SPEED:number = 256;
        REBEL_SHIP_SPEED:number = this.BASE_SPEED;
        TIE_FIGHTER_SPEED:number = (this.BASE_SPEED / 4);
        DESTROYER_SPEED:number = (this.BASE_SPEED / 6);
        CANNON_SHOT_SPEED:number = this.BASE_SPEED;
        MISSILE_SPEED:number = (this.BASE_SPEED / 2);
        COMMANDER_SPEED:number = (this.BASE_SPEED / 6);
        DEATH_STAR_SPEED:number = (this.BASE_SPEED / 10);
        IMPERIAL_SHOT_SPEED:number = this.BASE_SPEED;
        IMPERIAL_MISSILE_SPEED:number = (this.BASE_SPEED / 2);
        //colors
        CANNON_SHOT_BLUE:string = 'CANNON_BLUE';
        MISSLE_PINK:string = 'MISSLE_PINK';
        IMPERIAL_RED:string = 'IMPERIAL_RED';
        IMPERIAL_ORANGE:string = 'IMPERIAL_ORANGE';
        WHITE:string = 'WHITE';
        FILL_WHITE:string = 'rgb(250, 250, 250)';
        FILL_YELLOW:string = 'rgb(239, 255, 0)';
        FILL_RED:string = 'rgb(255, 0, 0)';
        FILL_GREEN:string = 'rgb(0, 255, 0)';
        FILL_BLUE:string = 'rgb(0, 0, 255)';
        FILL_LIGHT_BLUE:string = 'rgb(0, 230, 255)';
        FILL_ORANGE:string = 'rgb(255, 160, 0)';
        //health & damage
        CANNON_SHOT_DAMAGE:number = 1;
        IMPERIAL_SHOT_DAMAGE:number = 1;
        IMPERIAL_MISSILE_DAMAGE:number = 3;
        MISSILE_DAMAGE:number = 5;
        TIE_FIGHTER_HEALTH:number = 1;
        DESTROYER_HEALTH:number = 5;
        COMMANDER_HEALTH:number = 20;
        DEATH_STAR_HEALTH:number = 50;
        REBEL_SHIP_HEALTH:number = 3;
        //directions
        DEFAULT_DIRECTION_CHANGE_SECONDS = 5;
        /**
         * Retrieve hex color values
         */
        getColor(key:string): string {
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
        }
    }

    function getShipName(type:ShipType) : string
    {
        switch (type) 
        {
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

    export enum ProjectileType  {
        CANNON_SHOT,
        MISSILE,
        IMPERIAL_SHOT,
        IMPERIAL_MISSILE
    }

    export enum ShipType  {
        REBEL_MILLENIUM_FALCON,
        EMPIRE_TIE_FIGHTER,
        EMPIRE_DESTROYER,
        EMPIRE_COMMANDER,
        EMPIRE_DEATH_STAR
    }
    
    export enum SpriteType {
        EXPLOSION_SMALL,
        EXPLOSION_LARGE
    }
    
    export enum Direction {
        RIGHT,
        LEFT,
        UP,
        DOWN
    }
    
    export enum MessageType {
        GENERIC,
        ADD_MISSILE,
        ADD_HEALTH,
        NEW_BOSS,
        HIGH_SCORE
    }
}

