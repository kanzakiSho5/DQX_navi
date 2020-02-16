$(function(){
    
    const $posList = $("#posList");
    const $startPosName = $("#startPosName");
    const $endPosName = $("#endPosName");
    const $retAns = $("#retAns");
    const $ansWindow = $("#ansWindow");
    
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
    
    var startPos,endPos,startPosCont,endPosCont;

    function Node(id){
        this.edgeNode = [];
        this.edgeCost = [];
        this.done = false;
        this.cost = -1;
        this.id = id;
        this.previousNode = null;
    }
    
    Node.prototype.addNode = function(node, cost){
        this.edgeNode.push(node);
        this.edgeCost.push(cost);
    };
    
    function init(){
        createList();
    }
    
    function createList(){
        for(let key in locationNodes){
            $posList.append("<option value='"+ locationNodes[key].id +"'></option>");
        }
    }
    
    
    function FindRoute(){
        
        if(!startPos || !endPos)
            return;
        
        var nodes = locationNodes;
        for(let key in locationNodes)
        {
            if(locationNodes[key].id == startPos)
                locationNodes[key].cost = 0;
        }
        
        while(true){
            let processNode = null;
            
            for(let i = 0; i < nodes.length; i++){
                let node = nodes[i];
                if(node.done || node.cost < 0){
                    continue;
                }
                
                if(!processNode){
                    processNode = node;
                    continue;
                }
                
                if(node.cost < processNode.cost){
                    processNode = node;
                }
            }
            //console.log(processNode);
            if(!processNode){
                break;
            }
            
            processNode.done = true;
            
            for(let i = 0; i < processNode.edgeNode.length; i++){
                
                let node = processNode.edgeNode[i];
                let cost = processNode.cost + 1;
                
                let needsUpdate = (node.cost < 0) || (node.cost > cost);
                console.log("" + i + ", node.cost= "+ node.cost + ", cost= "+ cost + ", needsUpdate= "+ needsUpdate);
                if(needsUpdate){
                    node.cost = cost;
                    node.previousNode = processNode;
                }
            }
        }

        let goalNode;

        for(let key in locationNodes)
        {
            
            if(locationNodes[key].id == endPos) {
                //console.log("endPos= "+ endPos);
                goalNode = locationNodes[key];
            }
        }

        console.log('=====================');
        let path = endPos;
        let currentNode = goalNode;
        while(true) {
            const nextNode = currentNode.previousNode;
            console.log(nextNode);
            if (!nextNode) {
                //path = ' Start' + path;
                break;
            }
            path = nextNode.id + ' -> '+ path;
            currentNode = nextNode;
        }

        console.log(path);
        console.log('=====================');
        
        $ansWindow.text(path);
    }
    
    $startPosName.on("keyup", function(e){
        console.log("On change Value("+ $startPosName.val() +")");
        startPos = $startPosName.val();
        for(var key in locationNodes){
            if(locationNodes[key][startPos]) {
                console.log(key);
                startPosCont = key;
                break;
            }
        }
        
    });
    
    $endPosName.on("keyup", function(e){
        console.log("On change Value("+ $endPosName.val() +")");
        endPos = $endPosName.val();
        for(var key in locationNodes){
            if(locationNodes[key][startPos]) {
                console.log(key);
                endPosCont = key;
                break;
            }
        }
    });
    
    $retAns.on("click", function (e) {
        console.log(FindRoute());
    })
});