module Modal {

    var CONSTANTS:Constants.Constants = new Constants.Constants();

    /**
     * Load Modal that notifies user that the level is complete
     */
    export function loadLevelCompleteModal(currentUserScore:GameObjects.Score, currentLevel:number)
    {
        //get page items
        var userNameLabel:HTMLLabelElement = <HTMLLabelElement>window.document.getElementById('lvlCompleteUserName');
        var levelLabel:HTMLLabelElement = <HTMLLabelElement>window.document.getElementById('lvlCompleteLevel');
        var scoreLabel:HTMLLabelElement = <HTMLLabelElement>window.document.getElementById('lvlCompleteScore');
        
        //assign values
        userNameLabel.textContent = currentUserScore.name;
        levelLabel.textContent = currentLevel.toString();
        scoreLabel.textContent = currentUserScore.currentScore.toString();
        
        //open window
        openLevelCompleteWindow(); 
    }

    /**
     * Get string value from cookie of a specific name
     */
    function getCookieValue(cname:string) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
        }
        return "";
    }

    /**
     * Get stored high score data
     */
    function getHighScoreCookieData()
    {
        var data:string = getCookieValue(CONSTANTS.DEFAULT_HIGH_SCORE_COOKIE_NAME);
        
        if(data == null || data == "")
        {
            return null;
        }
        else
        {
            return JSON.parse(data);
        }
    }

    /**
     * Get stored high score for specific user
     */
    function getCurrentUserScoreCookieData(name:string)
    {
        var data:string = getCookieValue(CONSTANTS.DEFAULT_HIGH_SCORE_COOKIE_NAME + name);
        
        if(data == null || data == "")
        {
            return "0";
        }
        else
        {
            return JSON.parse(data);
        }
    }

    /**
     * Set High Score Cookie
     */
    function setHighScoreCookie(value:any)
    {
        document.cookie = CONSTANTS.DEFAULT_HIGH_SCORE_COOKIE_NAME + "=" + JSON.stringify(value);
    }

    /**
     * Create a default High Score Cookie w/ dummy data
     */
    function setDefaultHighScoreCookie()
    {
        //create new object
        var defaultHighScoreList:Array<GameObjects.HighScore> = new Array<GameObjects.HighScore>();
        defaultHighScoreList.push(new GameObjects.HighScore('Player 1',5));
        defaultHighScoreList.push(new GameObjects.HighScore('Player 2',20));
        defaultHighScoreList.push(new GameObjects.HighScore('Player 3',15));
        //store
        setHighScoreCookie(defaultHighScoreList);
    }

    /**
     * Open Welcome Window
     */
    export function openWelcomeWindow(highScoreList:Array<GameObjects.HighScore>)
    {
        initializeHighScores(highScoreList);
        
        displayHighScoreData(highScoreList);
        
        var link:HTMLLinkElement = <HTMLLinkElement>window.document.getElementById('welcomeLink');
        link.click();
        
        var welcomeUserNameTextbox:HTMLTextAreaElement = <HTMLTextAreaElement>window.document.getElementById('welcomeUserName');
        welcomeUserNameTextbox.focus();
    }

    /**
     * Dynamically add table to Welcome Window containing high scores
     */
    function displayHighScoreData(highScoreList:Array<GameObjects.HighScore>)
    {
        var table:HTMLTableElement = <HTMLTableElement>document.createElement("table");
        table.classList.add("centerTable");
        
        if(highScoreList.length > 0)
        {
            //create row
            var titleRow:HTMLTableRowElement = <HTMLTableRowElement>document.createElement("tr");
            //create cells
            var titleCell:HTMLTableCellElement = <HTMLTableCellElement>document.createElement("td");
            titleCell.colSpan = 2;
            titleCell.align = "center";
            //create text
            var titleText:Text = <Text>document.createTextNode("HIGH SCORES");
            //add to table
            titleCell.appendChild(titleText);
            titleRow.appendChild(titleCell);
            table.appendChild(titleRow);
            
            //create row
            var headerRow:HTMLTableRowElement = <HTMLTableRowElement>document.createElement("tr");
            //create cells
            var headerCellName:HTMLTableCellElement = <HTMLTableCellElement>document.createElement("td");
            headerCellName.align = "left";
            var headerCellScore:HTMLTableCellElement = <HTMLTableCellElement>document.createElement("td");
            headerCellScore.align = "left";
            //create text
            var headerNameText:Text = <Text>document.createTextNode("NAME");
            var headerScoreText:Text = <Text>document.createTextNode("SCORE");
            
            //add to table
            headerCellName.appendChild(headerNameText);
            headerCellScore.appendChild(headerScoreText);
            headerRow.appendChild(headerCellName);
            headerRow.appendChild(headerCellScore);
            table.appendChild(headerRow);
            
            for(var i = 0; i < highScoreList.length; i++)
            {
                //create row
                var newRow:HTMLTableRowElement = <HTMLTableRowElement>document.createElement("tr");
                //create cells
                var nameCell:HTMLTableCellElement = <HTMLTableCellElement>document.createElement("td");
                nameCell.align = "left";
                var scoreCell:HTMLTableCellElement = <HTMLTableCellElement>document.createElement("td");
                scoreCell.align = "center";
                //create text
                var nameText:Text = <Text>document.createTextNode(highScoreList[i].name);
                var scoreText:Text = <Text>document.createTextNode(highScoreList[i].score.toString());
                
                nameCell.appendChild(nameText);
                scoreCell.appendChild(scoreText);
                newRow.appendChild(nameCell);
                newRow.appendChild(scoreCell);

                table.appendChild(newRow);
            }
        }
        
        var div:HTMLDivElement = <HTMLDivElement>document.getElementById("highScoreDiv");
        div.appendChild(table);
    }

    /**
     * Retrieve previous high scores among all users
     */
    function initializeHighScores(highScoreList:Array<GameObjects.HighScore>)
    {
        //wipe list
        highScoreList.splice(0);
        
        //get high score data
        var values = getHighScoreCookieData();
        
        //ensure not null
        if(values != null)
        {
            //sort from highest to lowest, returns list of keys
            var keysSorted = Object.keys(values).sort(function(a,b){return values[a].score-values[b].score}).reverse();
            //limit to 5 scores
            var max:number = keysSorted.length;
            if(max > 5) { max = 5; }
            var name:string;
            var score:number;
            //use keys to populate global object
            for(var i = 0; i < max; i++)
            {
                highScoreList.push(new GameObjects.HighScore(values[keysSorted[i]].name, values[keysSorted[i]].score));
            }
        }
        else
        {
            setDefaultHighScoreCookie();
        }
    }

    /**
     * Load Modal that notifies user that the level is complete
     */
    export function loadGameOverModal(currentUserScore:GameObjects.Score, currentLevel:number)
    {
        //get page items
        var userNameLabel:HTMLLabelElement = <HTMLLabelElement>window.document.getElementById('gameOverUserName');
        var levelLabel:HTMLLabelElement = <HTMLLabelElement>window.document.getElementById('gameOverLevel');
        var scoreLabel:HTMLLabelElement = <HTMLLabelElement>window.document.getElementById('gameOverScore');
        
        //assign values
        userNameLabel.textContent = currentUserScore.name;
        levelLabel.textContent = currentLevel.toString();
        scoreLabel.textContent = currentUserScore.currentScore.toString();
        
        //open window
        openGameOverWindow(); 
    }

    /**
     * Retrieve highest score for current user
     */
    export function getCurrentUserHighScore(name:string) : number
    {
        var score:number = 0;
        
        score = Number(getCurrentUserScoreCookieData(name));
        
        return score;
    }

    export function closeWelcomeWindow()
    {
        var link:HTMLLinkElement = <HTMLLinkElement>window.document.getElementById('closeWelcomeLink');
        link.click();
    }

    function openLevelCompleteWindow()
    {
        var link:HTMLLinkElement = <HTMLLinkElement>window.document.getElementById('levelCompleteLink');
        link.click();
        var continueButton:HTMLButtonElement = <HTMLButtonElement>window.document.getElementById('buttonContinue');
        continueButton.focus();
    }

    export function closeLevelCompleteWindow()
    {
        var link:HTMLLinkElement = <HTMLLinkElement>window.document.getElementById('closeLevelCompleteLink');
        link.click();
    }
    
    function openGameOverWindow()
    {
        var link:HTMLLinkElement = <HTMLLinkElement>window.document.getElementById('gameOverLink');
        link.click();
        var playAgainButton:HTMLButtonElement = <HTMLButtonElement>window.document.getElementById('buttonPlayAgain');
        playAgainButton.focus();
    }
    
    export function closeGameOverWindow()
    {
        var link:HTMLLinkElement = <HTMLLinkElement>window.document.getElementById('closeGameOverLink');
        link.click();
    }
    
}