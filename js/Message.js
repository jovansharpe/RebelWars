var Message;
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
    Message.AddQuoteMessage = AddQuoteMessage;
    function AddDifficultyIncreaseMessage() {
        //add message
        GameLogic.addNewMessage(messageList, Constants.MessageType.GENERIC, "!!! DIFFICULTY INCREASED !!!", GetMessageLocationX(), GetMessageLocationY(), 32);
    }
    Message.AddDifficultyIncreaseMessage = AddDifficultyIncreaseMessage;
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
//# sourceMappingURL=Message.js.map