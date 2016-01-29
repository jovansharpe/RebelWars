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
        userNameLabel.textContent = currentUserScore.displayName;
        levelLabel.textContent = currentLevel.toString();
        scoreLabel.textContent = currentUserScore.currentScore.toString();
        
        //check for high score
        if(currentUserScore.isHighScore() && !currentUserScore.highScoreDisplayed)
        {
            //notify user
            AddHighScoreMessage();
            
            //flag that user has been notified
            currentUserScore.highScoreDisplayed = true;
        }
        
        //open window
        openLevelCompleteWindow(); 
    }

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
    function getHighScoreData()
    {
        //var data:string = getCookieValue(CONSTANTS.DEFAULT_HIGH_SCORE_COOKIE_NAME);
        
        var data:string = localStorage.getItem(CONSTANTS.DEFAULT_HIGH_SCORE_COOKIE_NAME);
        
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
     * Set High Score Cookie
     */
    function setHighScoreData(value:any)
    {
        //document.cookie = CONSTANTS.DEFAULT_HIGH_SCORE_COOKIE_NAME + "=" + JSON.stringify(value);
        
        localStorage.setItem(CONSTANTS.DEFAULT_HIGH_SCORE_COOKIE_NAME, JSON.stringify(value));
    }

    /**
     * Create a default High Score Cookie w/ dummy data
     */
    function setDefaultHighScoreData()
    {
        //create new object
        var defaultHighScoreList:Array<GameObjects.HighScore> = new Array<GameObjects.HighScore>();
        defaultHighScoreList.push(new GameObjects.HighScore('Player 1',5));
        defaultHighScoreList.push(new GameObjects.HighScore('Player 2',20));
        defaultHighScoreList.push(new GameObjects.HighScore('Player 3',15));
        //store
        setHighScoreData(defaultHighScoreList);
    }

    /**
     * Get stored high score for specific user
     */
    function getCurrentUserHighScoreData(name:string)
    {
        //var data:string = getCookieValue(CONSTANTS.DEFAULT_HIGH_SCORE_COOKIE_NAME + name);
        
        var data:string = localStorage.getItem(CONSTANTS.DEFAULT_HIGH_SCORE_COOKIE_NAME + name);
        
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
     * Save high score for specific user
     */
    function saveCurrentUserData(name:string, score:number)
    {
        localStorage.setItem(CONSTANTS.DEFAULT_HIGH_SCORE_COOKIE_NAME + name, score.toString());
        
        //document.cookie = CONSTANTS.DEFAULT_HIGH_SCORE_COOKIE_NAME + name + "=" + score.toString();
    }

    /**
     * Open Welcome Window
     */
    export function openWelcomeWindow(list:Array<GameObjects.HighScore>)
    {
        populateHighScoreListObject(list);
        
        displayHighScoreData(list, "welcomeHighScoreDiv");
        
        var link:HTMLLinkElement = <HTMLLinkElement>window.document.getElementById('welcomeLink');
        link.click();
        
        var welcomeUserNameTextbox:HTMLTextAreaElement = <HTMLTextAreaElement>window.document.getElementById('welcomeUserName');
        welcomeUserNameTextbox.focus();
    }

    /**
     * Dynamically add table to Welcome Window containing high scores
     */
    function displayHighScoreData(list:Array<GameObjects.HighScore>, divName:string)
    {
        var table:HTMLTableElement = <HTMLTableElement>document.createElement("table");
        table.classList.add("centerTable");
        
        if(list.length > 0)
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
            
            for(var i = 0; i < list.length; i++)
            {
                //create row
                var newRow:HTMLTableRowElement = <HTMLTableRowElement>document.createElement("tr");
                //create cells
                var nameCell:HTMLTableCellElement = <HTMLTableCellElement>document.createElement("td");
                nameCell.align = "left";
                var scoreCell:HTMLTableCellElement = <HTMLTableCellElement>document.createElement("td");
                scoreCell.align = "center";
                //create text
                var nameText:Text = <Text>document.createTextNode(list[i].name);
                var scoreText:Text = <Text>document.createTextNode(list[i].score.toString());
                
                nameCell.appendChild(nameText);
                scoreCell.appendChild(scoreText);
                newRow.appendChild(nameCell);
                newRow.appendChild(scoreCell);

                table.appendChild(newRow);
            }
        }
        
        //get div
        var div:HTMLDivElement = <HTMLDivElement>document.getElementById(divName);
        //clear div
        div.innerHTML = "";
        //add table
        div.appendChild(table);
    }
    
    /**
     * Retrieve previous high scores among all users
     */
    function populateHighScoreListObject(list:Array<GameObjects.HighScore>)
    {
        var maxItems:number = 3;
        
        //wipe list
        list.splice(0);
        
        //get high score data
        var values = getHighScoreData();
        
        //ensure not null
        if(values != null)
        {
            //sort from highest to lowest, returns list of keys
            var keysSorted = Object.keys(values).sort(function(a,b){return values[a].score-values[b].score}).reverse();
            //limit scores
            var max:number = keysSorted.length;
            if(max > maxItems) { max = maxItems; }
            var name:string;
            var score:number;
            //use keys to populate global object
            for(var i = 0; i < max; i++)
            {
                name = values[keysSorted[i]].name;
                score = values[keysSorted[i]].score;
                
                if(name != null && score != null)
                {
                    list.push(new GameObjects.HighScore(name,score));
                }
            }
            
            if(list.length > maxItems)
            {
                list.splice((maxItems));
            }
        }
        else
        {
            setDefaultHighScoreData();
        }
    }
    
    /**
     * Compare current user score against high score list to see if it needs to be added
     */
    function compareScoreAgainstOtherUsers(userName:string, userScore:number, list:Array<GameObjects.HighScore>)
    {
        var hasChanged:boolean = false;
        
        //check if list is small / non-existent
        if(list.length < 3)
        {
            //just add
            list.push(new GameObjects.HighScore(userName, userScore));
            //flag change
            hasChanged = true;
        }
        else
        {
            //loop through list
            //should be sorted from highest to lowest
            for(var i = 0; i < list.length; i++)
            {
                //check if user exceeded this score
                if(!hasChanged && userScore > list[i].score)
                {
                    //insert
                    list.splice(i, 0, new GameObjects.HighScore(userName, userScore));
                    //flag change
                    hasChanged = true;
                    break;
                }
            }
        }
        
        //check if list has changed
        if(hasChanged)
        {
            //store
            setHighScoreData(list);
            
            //populate again to sort
            populateHighScoreListObject(list);
        }
    }

    /**
     * Load Modal that notifies user that the level is complete
     */
    export function loadGameOverModal(currentUserScore:GameObjects.Score, currentLevel:number, list:Array<GameObjects.HighScore>)
    {
        //get page items
        var userNameLabel:HTMLLabelElement = <HTMLLabelElement>window.document.getElementById('gameOverUserName');
        var levelLabel:HTMLLabelElement = <HTMLLabelElement>window.document.getElementById('gameOverLevel');
        var scoreLabel:HTMLLabelElement = <HTMLLabelElement>window.document.getElementById('gameOverScore');
        
        //assign values
        userNameLabel.textContent = currentUserScore.displayName;
        levelLabel.textContent = currentLevel.toString();
        scoreLabel.textContent = currentUserScore.currentScore.toString();
        
        //store final stats
        currentUserScore.levelFinish = currentLevel;
        
        processUserScore(currentUserScore, list);
        
        //show updated high score list
        displayHighScoreData(list, "gameOverHighScoreDiv");
        
        //open window
        openGameOverWindow(); 
    }

    export function processUserScore(score:GameObjects.Score, list:Array<GameObjects.HighScore>)
    {
        //check score
        if(score.isHighScore())
        {
            //store if personal record
            saveCurrentUserHighScore(score.name, score.currentScore);
        }
        
        //compare score against other high scores
        compareScoreAgainstOtherUsers(score.name, score.currentScore, list);
    }

    /**
     * Retrieve highest score for specific user
     */
    export function getCurrentUserHighScore(name:string) : number
    {
        var score:number = 0;
        
        score = Number(getCurrentUserHighScoreData(name));
        
        return score;
    }

    /**
     * Save high score for a specific user
     */
    export function saveCurrentUserHighScore(name:string, score:number) : void
    {
        //save
        saveCurrentUserData(name, score);
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
    
    function localStorageSupported() {
        try {
            return "localStorage" in window && window["localStorage"] !== null; 
        } catch (e) {
            return false;
        }
    }
}