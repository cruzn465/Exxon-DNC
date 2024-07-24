//IIFE TO EXTRACT DIMENSION DATA
var dimensions = (function(){
        var str = document.querySelectorAll("[name='ad.size']")[0].getAttributeNode("content").value;
        var widthMatch = /width\=(\d+)/.exec(str);
        var heightMatch = /height\=(\d+)/.exec(str);
        return {
            width: parseInt(widthMatch[1]),
            height: parseInt(heightMatch[1])
        }
})();

var tl;
var stopWatch;

//INITIALIZE
function init(){

    // Helper function for FOUC
    let domReady = (cb) => {
        document.readyState === 'interactive' || document.readyState === 'complete'
        ? cb()
        : document.addEventListener('DOMContentLoaded', cb);
    };
    
    domReady(() => {
        // Display body when DOM is loaded
        document.body.style.visibility = 'visible';
    });

    IDsToVars();

    container.style.width = dimensions.width + 'px';
    container.style.height = dimensions.height + 'px';
    
    //set timeline
    tl = new TimelineLite();

    addListeners();
    
    animate();
}

function addListeners(){
    //replay functionality
    /*
    replay_button.addEventListener('mouseover',function(){
        TweenLite.fromTo(replay_button, .5, {rotation:'-360'}, {overwrite:false, rotation:'0'});
    })
    replay_button.addEventListener('click',function(){
            tl.restart();
    })
    */
    container.addEventListener('mouseover',function(){
        TweenLite
            .fromTo(ctaArr_2x, .5, {x:0,ease:Power2.easeInOut}, {x:6,ease:Power2.easeInOut})
    })  

    container.addEventListener('mouseover',function(){
        TweenLite
            .to(ctaArr_2x,.3,{x:0,ease:Power2.easeInOut,delay:0.5})
    })
}

//ANIMATE
function animate(){
    stopWatch=new Date().getTime(); 
    const cta = [cta1_2x,cta2_2x,cta3_2x,cta4_2x,cta5_2x,cta6_2x,cta7_2x,cta8_2x,cta9_2x,cta10_2x,ctaArr_2x]
    //timeline animation here
    tl
    .from(container,1,{opacity:0,ease:Power1.easeOut},0)
    .staggerFrom([c1_2x,c2_2x,c3_2x],.5,{opacity:0,y:30,ease:Power1.easeOut},.15,.6)
    .from(c4_2x,.5,{opacity:0,y:-20,ease:Power1.easeOut},1.85)
    .from(ctaBub_2x,.5,{scaleX:0,scaleY:0,ease:Power1.easeOut},2.75)


    // not working? this repeats a bunch of times idk why
    // .staggerFrom(cta,.3,{opacity:0,x:30,ease:Power1.easeOut,onComplete: function bounce () {
    //     TweenLite.fromTo(ctaArr_2x, .5, {x:0}, {x:20})
    //     TweenLite.to(ctaArr_2x,.5,{x:0,delay:1})
        
    // }},.05,3)
    .staggerFrom(cta,.3,{opacity:0,x:30,ease:Power1.easeOut},.05,3)
    .fromTo(ctaArr_2x, .5, {x:0,ease:Power2.easeInOut}, {x:6,ease:Power2.easeInOut})
    .to(ctaArr_2x,.3,{x:0,ease:Power2.easeInOut})

    

    //.call(returnTimer)
}

function returnTimer(){
    stopWatch=((new Date().getTime())-stopWatch)*.001;
    console.log(stopWatch+" seconds");
}

function clickThrough(){
    window.open(clicktag);
}

//SET IDs IN DOM TO GLOBAL VARIABLES
function IDsToVars(){
    var allElements = document.getElementsByTagName("*");
    
    for (var q = 0; q<allElements.length; q++){
         var el = allElements[q];
         if (el.id){
            window[el.id]=document.getElementById(el.id);
        }
    }
};