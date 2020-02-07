$(function(){
    
    const $posList = $("#posList");
    const $startPosName = $("#startPosName");
    const $endPosName = $("#endPosName");
    
    const locationName = {
        オーグリード:[
            "ランガーオ山地",
            "グレン領東",
            "グレン領西",
            "ベコン渓谷",
            "ゲルト海峡",
            "ランドンフット",
            "ランドン山脈",
            "ランドン山脈山頂",
            "ザマ岬",
            "ガートラント領",
            "ギルザッド地方",
            "オルセコ高地",
            "ラギ雪原",
            "バドリー岩石地帯",
            "ゴズ渓谷",
            "ロンダの氷穴",
            "海賊のアジト跡",
            "古代オルセコ闘技場",
            "ナグアの洞くつ",
            "ダズの岩穴",
            "トガス岩道",
            "狩人のほら穴",
            "ランガーオ村",
            "グレン城下町",
            "グレン城",
            "ガートラント城下町・城",
            "獅子門",
            "橋上の宿",
            "ザマの烽火台",
            "入り江の集落"
        ],
        プクランド:[
            "プクレット地方",
            "ポーポラ地方",
            "オルフェア地方東",
            "オルフェア地方西",
            "リンクル地方",
            "風車の丘",
            "メギストリス領",
            "ポポリアきのこ山",
            "エピステーサ丘陵",
            "チョッピ荒野",
            "オルファの丘",
            "賢者の隠れ家",
            "けがれの谷",
            "ミュルエルの森",
            "ポポラパの洞くつ",
            "ペシュヤ地下空洞",
            "オルッパ地下洞くつ",
            "プペラトンネル",
            "メギラザの洞くつ",
            "魔瘴調査区画",
            "プクレットの村",
            "オルフェアの町",
            "メギストリスの都・城",
            "妖精図書館",
            "キラキラ大風車塔",
            "ピィピのお宿",
            "荒野の休憩所",
        ]
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