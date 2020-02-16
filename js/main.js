$(function(){
    
    const $posList = $("#posList");
    const $startPosName = $("#startPosName");
    const $endPosName = $("#endPosName");
    
    const request = new XMLHttpRequest();
    request.open("GET", "./json/map.json");
    request.responseType = "json";
    request.send();

    var locationNodes = [];
    
    request.onload = function () {
        var temp = request.response;
        for(let cont in temp){
            for(let mapName in temp[cont]){
                console.log(temp[cont][mapName]);
                locationNodes.push(new Node(mapName));
            }
        }
        //console.log(temp);
        let count = 0;
        // 大陸別ループ
        for(let cont in temp){
            // マップ名ループ
            for(let mapName in temp[cont]){
                // 隣のマップループ
                for(let connectNode in temp[cont][mapName]){
                    for(let i = 0; i < locationNodes.length; i++){
                        if(temp[cont][mapName][connectNode] == locationNodes[i].id){
                            console.log("name= "+ temp[cont][mapName][connectNode] + ", count= "+ count +", i= "+ i);
                            locationNodes[count].edgeNode.push(locationNodes[i]);
                        }
                    }
                }
                count++;
                //locationNode.push(new Node(mapName));
            }
        }
        
        init();
    };
    
    var startPos = "";
    var endPos = "";
    
    function init(){
        createList();
    }
    
    function createList(){
        for(let key in locationName){
            for(let value in locationName[key]){
                $posList.append("<option value='"+ locationName[key][value] +"'></option>");
            }
        }
    }
    
    $startPosName.on("keyup", function(e){
        console.log("On change Value("+ $startPosName.val() +")");
        startPos = $startPosName.val();
    });
    
    $endPosName.on("keyup", function(e){
        console.log("On chenge Value("+ $endPosName.val() +")");
        endPos = $endPosName.val();
    });
    
    init();
});