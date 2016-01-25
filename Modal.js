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
        userNameLabel.textContent = currentUserScore.name;
        levelLabel.textContent = currentLevel.toString();
        scoreLabel.textContent = currentUserScore.currentScore.toString();
        //open window
        openLevelCompleteWindow();
    }
    Modal.loadLevelCompleteModal = loadLevelCompleteModal;
    /**
     * Get string value from cookie of a specific name
     */
    function getCookieValue(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ')
                c = c.substring(1);
            if (c.indexOf(name) == 0)
                return c.substring(name.length, c.length);
        }
        return "";
    }
    /**
     * Get stored high score data
     */
    function getHighScoreCookieData() {
        var data = getCookieValue(CONSTANTS.DEFAULT_HIGH_SCORE_COOKIE_NAME);
        if (data == null || data == "") {
            return null;
        }
        else {
            return JSON.parse(data);
        }
    }
    /**
     * Get stored high score for specific user
     */
    function getCurrentUserScoreCookieData(name) {
        var data = getCookieValue(CONSTANTS.DEFAULT_HIGH_SCORE_COOKIE_NAME + name);
        if (data == null || data == "") {
            return "0";
        }
        else {
            return JSON.parse(data);
        }
    }
    /**
     * Set High Score Cookie
     */
    function setHighScoreCookie(value) {
        document.cookie = CONSTANTS.DEFAULT_HIGH_SCORE_COOKIE_NAME + "=" + JSON.stringify(value);
    }
    /**
     * Create a default High Score Cookie w/ dummy data
     */
    function setDefaultHighScoreCookie() {
        //create new object
        var defaultHighScoreList = new Array();
        defaultHighScoreList.push(new GameObjects.HighScore('Player 1', 5));
        defaultHighScoreList.push(new GameObjects.HighScore('Player 2', 20));
        defaultHighScoreList.push(new GameObjects.HighScore('Player 3', 15));
        //store
        setHighScoreCookie(defaultHighScoreList);
    }
    /**
     * Open Welcome Window
     */
    function openWelcomeWindow(highScoreList) {
        initializeHighScores(highScoreList);
        displayHighScoreData(highScoreList);
        var link = window.document.getElementById('welcomeLink');
        link.click();
        var welcomeUserNameTextbox = window.document.getElementById('welcomeUserName');
        welcomeUserNameTextbox.focus();
    }
    Modal.openWelcomeWindow = openWelcomeWindow;
    /**
     * Dynamically add table to Welcome Window containing high scores
     */
    function displayHighScoreData(highScoreList) {
        var table = document.createElement("table");
        table.classList.add("centerTable");
        if (highScoreList.length > 0) {
            //create row
            var titleRow = document.createElement("tr");
            //create cells
            var titleCell = document.createElement("td");
            titleCell.colSpan = 2;
            titleCell.align = "center";
            //create text
            var titleText = document.createTextNode("HIGH SCORES");
            //add to table
            titleCell.appendChild(titleText);
            titleRow.appendChild(titleCell);
            table.appendChild(titleRow);
            //create row
            var headerRow = document.createElement("tr");
            //create cells
            var headerCellName = document.createElement("td");
            headerCellName.align = "left";
            var headerCellScore = document.createElement("td");
            headerCellScore.align = "left";
            //create text
            var headerNameText = document.createTextNode("NAME");
            var headerScoreText = document.createTextNode("SCORE");
            //add to table
            headerCellName.appendChild(headerNameText);
            headerCellScore.appendChild(headerScoreText);
            headerRow.appendChild(headerCellName);
            headerRow.appendChild(headerCellScore);
            table.appendChild(headerRow);
            for (var i = 0; i < highScoreList.length; i++) {
                //create row
                var newRow = document.createElement("tr");
                //create cells
                var nameCell = document.createElement("td");
                nameCell.align = "left";
                var scoreCell = document.createElement("td");
                scoreCell.align = "center";
                //create text
                var nameText = document.createTextNode(highScoreList[i].name);
                var scoreText = document.createTextNode(highScoreList[i].score.toString());
                nameCell.appendChild(nameText);
                scoreCell.appendChild(scoreText);
                newRow.appendChild(nameCell);
                newRow.appendChild(scoreCell);
                table.appendChild(newRow);
            }
        }
        var div = document.getElementById("highScoreDiv");
        div.appendChild(table);
    }
    /**
     * Retrieve previous high scores among all users
     */
    function initializeHighScores(highScoreList) {
        //wipe list
        highScoreList.splice(0);
        //get high score data
        var values = getHighScoreCookieData();
        //ensure not null
        if (values != null) {
            //sort from highest to lowest, returns list of keys
            var keysSorted = Object.keys(values).sort(function (a, b) { return values[a].score - values[b].score; }).reverse();
            //limit to 5 scores
            var max = keysSorted.length;
            if (max > 5) {
                max = 5;
            }
            var name;
            var score;
            //use keys to populate global object
            for (var i = 0; i < max; i++) {
                highScoreList.push(new GameObjects.HighScore(values[keysSorted[i]].name, values[keysSorted[i]].score));
            }
        }
        else {
            setDefaultHighScoreCookie();
        }
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
        userNameLabel.textContent = currentUserScore.name;
        levelLabel.textContent = currentLevel.toString();
        scoreLabel.textContent = currentUserScore.currentScore.toString();
        //open window
        openGameOverWindow();
    }
    Modal.loadGameOverModal = loadGameOverModal;
    /**
     * Retrieve highest score for current user
     */
    function getCurrentUserHighScore(name) {
        var score = 0;
        score = Number(getCurrentUserScoreCookieData(name));
        return score;
    }
    Modal.getCurrentUserHighScore = getCurrentUserHighScore;
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
})(Modal || (Modal = {}));
//# sourceMappingURL=Modal.js.map