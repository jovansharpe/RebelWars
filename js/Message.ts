module Message {
    
    var DeathStarMessageList:Array<string> = ["You underestimate the power of the dark side!",
    "You underestimate my power!",
    "Give yourself to the Dark Side!",
    "You can not disguise yourself from me, Jedi!"];
    
    var CommanderMessageList:Array<string> = ["If you will not be turned, you will be destroyed!",
    "Your feeble skills are no match for the power of the Dark Side!",
    "Now you will pay the price for your lack of vision!",
    "Your faith in your friends is your weakness!"];
    
    var BountyHunterMessageList:Array<string> = ["Always a pleasure to meet a Jedi",
    "All is proceeding as you wished, Lord Vader",
    "Now let me show you the true power of a Mandalorian!",
    "Your arrogance is the cause of your destruction, not me"];
    
    function GetMessageLocationX() : number
    {
        return (browserWidth / 2); 
    }

    function GetMessageLocationY() : number
    {
        return (browserHeight - (rebelShip.objImage.naturalHeight * 2));
    }
    
    function GetQuoteLocationX() : number
    {
        return (browserWidth / 2);
    }
    
    function GetQuoteLocationY() : number
    {
        return (browserHeight / 2);
    }

    /**
     * Create catchphrase message for boss to render
     */
    export function AddEntryMessage(type:Constants.ShipType) : void
    {
        //only 4 message entries per list, grab random index
        var index:number = Math.floor(Math.random() * 4);
        
        switch(type)
        {
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
    
    function AddQuoteMessage(text:string): void
    {
        //add message
        GameLogic.addNewMessage(messageList, Constants.MessageType.QUOTE, text, 
            GetQuoteLocationX(), GetQuoteLocationY(), 24);
    }

    export function AddGameStartMessage() : void
    {
        //add message
        GameLogic.addNewMessage(messageList, Constants.MessageType.GENERIC, "*** START GAME ***", 
            GetMessageLocationX(), GetMessageLocationY(), 32);
    }

    export function AddHealthMessage(amount:number) : void
    {
        //add message
        GameLogic.addNewMessage(messageList, Constants.MessageType.ADD_HEALTH, "+" + amount.toString() + " Health", 
            GetMessageLocationX(), GetMessageLocationY(), 24);
    }

    export function AddMissileMessage() : void
    {
        //add message
        GameLogic.addNewMessage(messageList, Constants.MessageType.ADD_MISSILE, "+1 Missile", 
            GetMessageLocationX(), GetMessageLocationY(), 24);
    }

    export function AddBossMessage() : void
    {
        //add message
        GameLogic.addNewMessage(messageList, Constants.MessageType.NEW_BOSS, "^^^ BOSS DETECTED ^^^", 
            GetMessageLocationX(), GetMessageLocationY(), 32);
    }

    export function AddPersonalRecordMessage() : void
    {
        //add message
        GameLogic.addNewMessage(messageList, Constants.MessageType.GENERIC, "*** PERSONAL RECORD ***", 
            GetMessageLocationX(), GetMessageLocationY(), 32);
    }

    export function AddPressSpacebarMessage() : void
    {
        //add message
        GameLogic.addNewMessage(messageList, Constants.MessageType.GENERIC, "*** PRESS SPACEBAR TO START ***", 
            GetMessageLocationX(), GetMessageLocationY(), 32);
    }

    export function AddNewHighScoreMessage() : void
    {
        //add message
        GameLogic.addNewMessage(messageList, Constants.MessageType.HIGH_SCORE, "!!! NEW HIGH SCORE !!!", 
            GetMessageLocationX(), GetMessageLocationY(), 40);
            
        //add message
        GameLogic.addNewMessage(messageList, Constants.MessageType.HIGH_SCORE, "### JEDI GRAND MASTER ###", 
            GetMessageLocationX(), GetMessageLocationY(), 40);
    }
}