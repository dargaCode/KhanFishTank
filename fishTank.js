//click to generate bubbles
//restart to clear bubbles and re-randomize fish/pebbles

background(89, 216, 255);

//hue within a range
var hueRange = function(minHue,maxHue){
    return random(minHue,maxHue);
};

//only use color numbers at the top and bottom of the range
var brightHue = function(topRange,bottomRange){
    var fMinHueAdd = 255-topRange;
    var fMaxHueAdd = 255+bottomRange;

    return random(fMinHueAdd,fMaxHueAdd) % 255;
};

//slightly different colors for different fins
var hueVariance = function(hue,range){
    return random(hue-range,hue+range);
};

//build a variant color from base color
var rgbVariance = function(rHue,gHue,bHue,range){
    var r = hueVariance(rHue,range);
    var g = hueVariance(gHue,range);
    var b = hueVariance(bHue,range);
    
    return color(r,g,b);
};


var drawFish = function(fishX,fishY,bodyW,bodyH,bRGB,fRGB,tRGB,dRGB){
    //tail
    fill(tRGB);
    var tailW = bodyW/random(2.5,5);
    var tailH = bodyH/random(2,4);
    triangle(fishX-bodyW/random(3,5), (fishY-bodyH/3)+bodyH/random(1.5,6),
             fishX-bodyW/2-tailW*random(0.5,1.2), fishY-tailH*random(0.5,1.5),
             fishX-bodyW/2-tailW*random(0.5,1.2), fishY+tailH*random(0.5,1.5));
    //body
    fill(bRGB);
    ellipse(fishX, fishY, bodyW, bodyH);
    //dorsal
    var dorsH = bodyH/2;
    fill(dRGB);
    triangle(fishX+bodyW/random(4,5), fishY-bodyH/random(2,2.5),
             fishX-bodyW/random(3,3), fishY-bodyH/random(3,4),
             fishX-bodyW/random(2,3), fishY-dorsH*random(1,1.3));
    //fin
    fill(fRGB);
    triangle(fishX-bodyW/random(6,10), fishY+bodyH/random(3,6),
             fishX-bodyW/random(1.2,2.5), fishY-bodyH/random(10,10),
             fishX-bodyW/random(1.2,2.5), fishY+bodyH/random(2,4));
    //mouth
    fill(random(200,255),random(0,30),random(0,30));
    ellipse(fishX+bodyW/random(3,5),fishY+bodyH/random(3,5),bodyW/random(3,3),bodyH/random(6,10));
    //eye
    var eyeX = fishX+bodyW/random(4,5);
    var eyeY = fishY-bodyH/4+bodyH/random(3,8);
    var eyeW = ((bodyW+bodyH)/2)/random(4,6);
    var pupilW = eyeW*random(0.5,0.75);
    fill(fRGB);
    ellipse(eyeX,eyeY,eyeW,eyeW);
    //pupil
    fill(37, 56, 107);    
    ellipse(eyeX,eyeY,pupilW,pupilW);
};


//lots of pebbles
for(var i=0;i<5500;i++){
    var pebbleX = random(-25,425);
    var pebbleY = random(225,425);
    var pebbleW = random(8,16);
    var pebbleH = pebbleW*random(0.7,1.3);
    
    var pMinHue = 80;
    var pMaxHue = 180;
    var pHueRange = 25;
    var pBaseHue = hueRange(pMinHue,pMaxHue);
    var pebbleRGB = rgbVariance(pBaseHue,pBaseHue,pBaseHue,pHueRange);

    fill(pebbleRGB);
    ellipse(pebbleX,pebbleY,pebbleW,pebbleH);
}


//smaller fish in the distance
var fishSizeMod = 0.3;

//lots of random fish
for(var i=0;i<15;i++){
    
    var fishX = random(-25,425);
    var fishY = random(-25,275);
    var fishW = random(25,100);
    var fishH = fishW*random(0.2,1.2);

    //colors comprised of only the top and bottom rgb vallues
    var hiRange = 50;
    var lowRange = 20;
    var accentR = brightHue(hiRange,lowRange);
    var accentG = brightHue(hiRange,lowRange);
    var accentB = brightHue(hiRange,lowRange);
    
    var bodMin = 0;
    var bodMax = 255;
    var bodyRGB = color(hueRange(bodMin,bodMax),hueRange(bodMin,bodMax),hueRange(bodMin,bodMax));
    var finRGB = color(accentR,accentG,accentB);
    var accentVariance = 50;
    var tailRGB = rgbVariance(accentR,accentG,accentB,accentVariance);
    var dorsalRGB = rgbVariance(accentR,accentG,accentB,accentVariance);
    
    drawFish(fishX,fishY,fishW*fishSizeMod,fishH*fishSizeMod,bodyRGB,finRGB,tailRGB,dorsalRGB);
    fishSizeMod *= 1.12;
}


var mousePressed = function(){
    var numBubbles = random(3,8);
    for(var i = 0; i<numBubbles; i++){
        var randomX = random(-14,14);
        var randomY = random(-50,20);
        var randomW = random(8,16);

        var accentVariance = 10;
        var bubbleRGB = rgbVariance(180,230,240,accentVariance);
        
        fill(bubbleRGB);
        ellipse(mouseX+randomX,mouseY+randomY,randomW,randomW);
    }
    
};

