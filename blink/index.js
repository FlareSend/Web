 window.onload = function(){
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var transmission = "0100100101100110001000000111010001101000011010010111001100100000011101110110111101110010011010110111001100100000001011100010111000101110";
    var index = 0;
    var bounds = [[30,90,150,210],[30,90,150,210],[30,90,150,210]];
    var threshhold = 30 ;
    var lastColors; 
    var toggle = 1;
    var map = genMap(bounds);
    setInterval(function(){
        var colors = [];
        for (var i=0;i<3;i++){
                colors.push(map[transmission.slice((index)+(i*2),(index)+(i+1)*2)]);
        }
        if(transmission.slice((index)+(i*2),(index)+(i*2)+6)==lastColors && toggle == 1){
                ctx.fillStyle = "rgb("+255+","+255+","+255+")";
                toggle=0;
        }
        else{
                ctx.fillStyle = "rgb("+colors[0]+","+colors[1]+","+colors[2]+")";
                toggle=1;
        }
        ctx.fillRect(0,0,25,25);
        index = (index+6)%transmission.length;
        lastColors=transmission.slice((index)+(i*2),(index)+(i*2)+6);
    },500)
}
function genMap(bounds){
        var map = {};
        var combos = ["10","11","01","00"];
        for (var bound=0;bound<3;bound++){
            for (var i= 0; i<combos.length;i++){
                   map[combos[i]] = bounds[bound][i]  
            }
        }
        return map;
}
