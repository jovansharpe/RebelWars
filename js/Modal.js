var Modal;
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
            AddPersonalRecordMessage();
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
     * Get string value from cookie of a specific name
     */
    // function getCookieValue(cname:string) {
    //     var name = cname + "=";
    //     var ca = document.cookie.split(';');
    //     for(var i=0; i<ca.length; i++) {
    //         var c = ca[i];
    //         while (c.charAt(0)==' ') c = c.substring(1);
    //         if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    //     }
    //     return "";
    // }
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
        //document.cookie = CONSTANTS.DEFAULT_HIGH_SCORE_COOKIE_NAME + name + "=" + score.toString();
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
            //create cells
            var headerCellRank = document.createElement("td");
            //headerCellRank.align = "left";
            headerCellRank.classList.add("highScoreHeaderRank");
            var headerCellName = document.createElement("td");
            //headerCellName.align = "left";
            headerCellName.classList.add("highScoreHeaderName");
            var headerCellScore = document.createElement("td");
            //headerCellScore.align = "left";
            headerCellName.classList.add("highScoreHeaderScore");
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
     * Retrieve previous high scores among all users
     */
    // function populateHighScoreListObject(list:Array<GameObjects.HighScore>)
    // {
    //     var maxItems:number = CONSTANTS.MAX_HIGH_SCORES;
    //     
    //     //wipe list
    //     list.splice(0);
    //     
    //     //get high score data
    //     var values = getHighScoreData();
    //     
    //     //ensure not null
    //     if(values != null)
    //     {
    //         //sort from highest to lowest, returns list of keys
    //         var keysSorted = Object.keys(values).sort(function(a,b){return values[a].score-values[b].score}).reverse();
    //         //limit scores
    //         var max:number = keysSorted.length;
    //         if(max > maxItems) { max = maxItems; }
    //         var name:string;
    //         var score:number;
    //         //use keys to populate global object
    //         for(var i = 0; i < max; i++)
    //         {
    //             name = values[keysSorted[i]].name;
    //             score = values[keysSorted[i]].score;
    //             
    //             if(name != null && score != null)
    //             {
    //                 list.push(new GameObjects.HighScore(name,score));
    //             }
    //         }
    //         
    //         if(list.length > maxItems)
    //         {
    //             list.splice((maxItems));
    //         }
    //     }
    //     else
    //     {
    //         setDefaultHighScoreData();
    //     }
    // }
    /**
     * Compare current user score against high score list to see if it needs to be added
     */
    // function compareScoreAgainstOtherUsers(userName:string, userScore:number, list:Array<GameObjects.HighScore>)
    // {
    //     var hasChanged:boolean = false;
    //     
    //     //check if list is small / non-existent
    //     if(list.length < 3)
    //     {
    //         //just add
    //         list.push(new GameObjects.HighScore(userName, userName.replace(' ',''), userScore));
    //         //flag change
    //         hasChanged = true;
    //     }
    //     else
    //     {
    //         //loop through list
    //         //should be sorted from highest to lowest
    //         for(var i = 0; i < list.length; i++)
    //         {
    //             //check if user exceeded this score
    //             if(!hasChanged && userScore > list[i].score)
    //             {
    //                 //insert
    //                 list.splice(i, 0, new GameObjects.HighScore(userName, userName.replace(' ',''), userScore));
    //                 //flag change
    //                 hasChanged = true;
    //                 break;
    //             }
    //         }
    //     }
    //     
    //     //check if list has changed
    //     if(hasChanged)
    //     {
    //         //store
    //         setHighScoreData(list);
    //         
    //         //populate again to sort
    //         list = populateHighScoreListObject();
    //     }
    // }
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
        //compare score against other high scores
        //compareScoreAgainstOtherUsers(score.name, score.currentScore, list);
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
//# sourceMappingURL=Modal.js.map