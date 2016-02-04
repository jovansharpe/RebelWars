var Service;
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
//# sourceMappingURL=Service.js.map