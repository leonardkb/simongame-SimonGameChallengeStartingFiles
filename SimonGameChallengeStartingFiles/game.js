


var buttoncolours=["red","blue","green","yellow"];

var gamepattern=[];
var userclickpattern=[];

var started=false;
var  level=0;

$(document).keypress(function()
{
      if(!started){
        $("#level-title").text("level "+ level);
        nextsequence();
        started=true;
      }
});

$(".btn").click(function()
{
   var userchosencolour= $(this).attr("id");
   userclickpattern.push(userchosencolour);

   playsound(userchosencolour);
   animatepress(userchosencolour);

   checkAnswer(userclickpattern.length-1);
});

function checkAnswer(currentLevel) {

  if (gamepattern[currentLevel] === userclickpattern[currentLevel]) {

    console.log("success");

    if (userclickpattern.length === gamepattern.length){
      setTimeout(function () {
        nextsequence();
      }, 1000);
    }

  } else {

    console.log("wrong");

    //1. In the sounds folder, there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong.
    playsound("wrong");

    //2. In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

   

    //3. Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startover();
  }

}


function nextsequence()
{
  userclickpattern= [];
  level++;
  $("#level-title").text("level "+ level);


  var randomnumber= Math.floor(Math.random()*4);
  var chosencolour=buttoncolours[randomnumber];
  gamepattern.push(chosencolour);

  $("#"+chosencolour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playsound(chosencolour);

  
}
function playsound(name)
{
  var audio= new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatepress(currentcolour)
{
    $("#"+currentcolour).addClass("pressed");
    setTimeout(function()
    {
      $("#"+currentcolour).removeClass("pressed");
    },100);
}

function startover()
{
  level=0;
  gamepattern= [];
  started=false;
}