module Service {
    
    var baseUrl:string = "http://jovansharpe.com/rebelwarswebservice/Score.asmx";
    
    export function getChampion() : string
    {
        var champion:string = "N/A";
        
        var http:XMLHttpRequest = new XMLHttpRequest(); 
        var url = baseUrl + "/GetChampion";
        
        http.open("POST", url, false);
        
        //set header
        http.setRequestHeader("Content-type", "application/json; charset=utf-8");
        
        http.onreadystatechange = function () {
            // 
            if(http.readyState == 4 && http.status == 200)
            {
               var data = JSON.parse(this.responseText);
               champion = data.d;
            }            
        };
        
        http.send(null);
        
        return champion;
    }
    
    export function getHighScore(name:string) : number
    {
        var score:number = 0;
        
        var http:XMLHttpRequest = new XMLHttpRequest(); 
        var url = baseUrl + "/GetScore";
        var params:string = "{'name':'" + name + "'}";
        
        http.open("POST", url, false);
        
        //set header
        http.setRequestHeader("Content-type", "application/json; charset=utf-8");
        
        http.onreadystatechange = function () {
            // 
            if(http.readyState == 4 && http.status == 200)
            {
               var data = JSON.parse(this.responseText);
               score = Number(data.d);
            }            
        };
        
        http.send(params);
        
        return score;
    }
    
    export function getHighScoreList(rows:number) : Array<GameObjects.HighScore>
    {
        var list:Array<GameObjects.HighScore> = new Array<GameObjects.HighScore>();        
        var http:XMLHttpRequest = new XMLHttpRequest(); 
        var url = baseUrl + "/GetScores";
        var params:string = "{'numRows':'" + rows.toString() + "'}";
        
        http.open("POST", url, false);
        
        //set header
        http.setRequestHeader("Content-type", "application/json; charset=utf-8");
        
        http.onreadystatechange = function () {
            //ensure process complete
            if(http.readyState == 4 && http.status == 200)
            {
               var data = JSON.parse(this.responseText);
               list = convertToHighScoreList(data.d);
            }            
        };
        
        http.send(params);
        
        return list;
    }
    
    export function setHighScore(score:GameObjects.Score) : void
    {        
        var http:XMLHttpRequest = new XMLHttpRequest(); 
        var url = baseUrl + "/InsertScore";
        var jsonString:string = JSON.stringify(score);
        var position:string = getCurrentPosition();
        var params:string = "{'position':'" + position + "','input':'" + jsonString + "'}";
        
        http.open("POST", url, false);
        
        //set header
        http.setRequestHeader("Content-type", "application/json; charset=utf-8");
        
        http.onreadystatechange = function () {
            // 
            if(http.readyState == 4 && http.status == 200)
            {
               var data = "success";
            }            
        };
        
        http.send(params);
    }
    
    function convertToHighScoreList(dataString:string) : Array<GameObjects.HighScore>
    {
        var list:Array<GameObjects.HighScore> = new Array<GameObjects.HighScore>();  
        var objList:Array<Object> = JSON.parse(dataString);
        var highScoreObj:GameObjects.HighScore;
        var name:string;
        var score:number;
        var displayName:string;
        
        objList.forEach(obj => {
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
    
    function getCurrentPosition() : string
    {
        var date:Date = new Date(Date.now());
        var hourString:string = date.getHours().toString();
        
        var text:string = hourString + "MayTheForceBeWithYou" + hourString;
        
        return btoa(text);
    }
}
