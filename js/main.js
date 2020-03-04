$(function(){
    
    const $posList = $("#posList");
    const $startPosName = $("#startPosName");
    const $endPosName = $("#endPosName");
    const $retAns = $("#retAns");
    const $ansWindow = $("#ansWindow");
    const $isUseMega = $("#isUseMega");
    const $isUseBasi = $("#isUseBasi");
    
    const request = new XMLHttpRequest();
    request.open("GET", "./json/map.json");
    request.responseType = "json";
    request.send();

    var locationNodes = [];
    
    request.onload = function () {
        initNodes();
        
        init();
    };
    
    var isUseMega = true,isUseBasi = true;
    
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
    
    function initNodes(){
        var temp = request.response;
        locationNodes = [];
        for(let cont in temp){
            for(let mapName in temp[cont]){
                if(!isUseBasi && mapName === "バシッ子")
                    continue;
                if(!isUseMega && mapName === "メガルーラ")
                    continue;

                //console.log(temp[cont][mapName]);
                locationNodes.push(new Node(mapName));
            }
        }
        //console.log(temp);
        let count = 0;
        // 大陸別ループ
        for(let cont in temp){
            // マップ名ループ
            for(let mapName in temp[cont]){
                if(!isUseBasi && mapName === "バシッ子")
                    continue;
                else if(isUseBasi && mapName !== "その他"){
                    for(let i = 0; i < locationNodes.length; i++){
                        if("バシッ子" === locationNodes[i].id){
                            //console.log("name= "+ temp[cont][mapName][connectNode] + ", count= "+ count +", i= "+ i);
                            locationNodes[count].addNode(locationNodes[i], 2);
                        }
                    }
                }
                if(!isUseMega && mapName === "メガルーラ")
                    continue;
                else if(isUseMega && mapName !== "その他"){
                    for(let i = 0; i < locationNodes.length; i++){
                        if("メガルーラ" === locationNodes[i].id){
                            //console.log("name= "+ temp[cont][mapName][connectNode] + ", count= "+ count +", i= "+ i);
                            locationNodes[count].addNode(locationNodes[i], 1);
                        }
                    }
                }
                
                // 隣のマップループ
                for(let connectNode in temp[cont][mapName]){
                    for(let i = 0; i < locationNodes.length; i++){
                        if(temp[cont][mapName][connectNode] === locationNodes[i].id){
                            //console.log("name= "+ temp[cont][mapName][connectNode] + ", count= "+ count +", i= "+ i);
                            locationNodes[count].addNode(locationNodes[i], 1);
                        }
                    }
                }
                count++;
            }
        }
        
        console.log(locationNodes);
    }
    
    function init(){
        createList();
    }
    
    function createList(){
        $posList.text("");
        for(let key in locationNodes){
            $posList.append("<option value='"+ locationNodes[key].id +"'></option>");
        }
    }
    
    function FindRoute(){
        
        if(!startPos || !endPos){
            console.log("ERROR!!!!");
            return;
        }
            
        let nodes = locationNodes;
        for(let key in nodes)
        {
            nodes[key].cost = -1;
            if(nodes[key].id === startPos) {
                //console.log("------------------startPos= "+ startPos);
                nodes[key].cost = 0;
            }
            //console.log(nodes[key].id + "  "+ nodes[key].cost);
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
            if(!processNode){
                break;
            }
            
            processNode.done = true;
            
            for(let i = 0; i < processNode.edgeNode.length; i++){
                
                let node = processNode.edgeNode[i];
                let cost = processNode.cost + 1;
                
                let needsUpdate = (node.cost < 0) || (node.cost > cost);
                //console.log("" + i + ", node.cost= "+ node.cost + ", cost= "+ cost + ", needsUpdate= "+ needsUpdate);
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
            path = nextNode.id + ' <br> ↓ <br>'+ path;
            currentNode = nextNode;
        }

        console.log(path);
        console.log('=====================');
        
        $ansWindow.html(path);
    }
    
    $startPosName.on("change", function(e){
        console.log("On change Value("+ $startPosName.val() +")");
        startPos = $startPosName.val();
    });
    
    $endPosName.on("change", function(e){
        console.log("On change Value("+ $endPosName.val() +")");
        endPos = $endPosName.val();
    });
    
    $isUseBasi.on("click",function(e){
        isUseBasi = $isUseBasi.prop("checked");
        initNodes();
        createList();
    });
    
    $isUseMega.on("click", function (e) {
        isUseMega = $isUseMega.prop("checked");
        initNodes();
        createList();
    });
    
    $retAns.on("click", function (e) {
        console.log("isUseMega= "+ isUseMega +", \nisUseBasi= "+ isUseBasi);
        initNodes();
        FindRoute();
    })
});