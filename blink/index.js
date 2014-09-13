 window.onload = function(){
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    toggle = 0;
    setInterval(function(){
            if(toggle==0){
                ctx.fillStyle="#fff";
                ctx.fillRect(0,0,100,100);
                toggle=1;
            }
            else{
                ctx.fillStyle="#000";
                ctx.fillRect(0,0,100,100);
                toggle=0;
            }
    },32)
}


