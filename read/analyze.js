document.addEventListener('DOMContentLoaded', function(){
    var v = document.getElementById('video');
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var back = document.getElementById('canvas2');
    var backcontext = back.getContext('2d');

    var cw,ch;

    v.addEventListener('play', function(){
        cw = v.clientWidth;
        ch = v.clientHeight;
        canvas.width = cw;
        canvas.height = ch;
        back.width = cw;
        back.height = ch;
        draw(v,context,backcontext,cw,ch);
    },false);

},false);
var lastColor = 0;
var count=0;
var bin="";
setInterval(function(){
        document.getElementById("count").innerHTML=count;
        document.getElementById("bin").innerHTML=bin;
        count=0;
        data="";
},1000)
function draw(v,c,bc,w,h) {
    if(v.paused || v.ended) return false;
    // First, draw it into the backing canvas
    bc.drawImage(v,0,0,w,h);
    // Grab the pixel data from the backing canvas
    var idata = bc.getImageData(0,0,w,h);
    var data = idata.data;
    // Loop through the pixels, turning them grayscale
    var totalR = 0 ;
    var totalG = 0 ;
    var totalB = 0 ;
    var pixels = data.length / 4;
    for(var i = 0; i < data.length; i+=4) {
        var r = data[i];
        var g = data[i+1];
        var b = data[i+2];
        totalR+=(r /pixels);
        totalG+=(g /pixels);
        totalB+=(b /pixels);
    }
    if(totalG>128){
        totalG=255;
    }
    else{
        totalG=0;
    }
    if(lastColor != totalG){
        count++;
        if(totalR>128){
            bin+="1"
        }
        else{
            bin+="0"
        }

        if(totalB>128){
            bin+="1"
        }
        else{
            bin+="0"
        }
        lastColor=totalG;
    }
    for(var i=0; i<data.length; i+=4){
        data[i] = totalR;
        data[i+1] = totalG;
        data[i+2] = totalB;
    }
    idata.data = data;
    // Draw the pixels onto the visible canvas
    c.putImageData(idata,0,0);
    // Start over!
    setTimeout(function(){ draw(v,c,bc,w,h); }, 0);
}
