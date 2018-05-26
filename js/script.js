var isCupUp = false;
var scorePlayer1 = 0;
var scorePlayer2 = 0;
var currentItemIndex = "";
var currentRound = 0;
var timeRaised = "";
var playerSpeed = "";
var rShake = "";
var itemAvailable = true;
var isDizzy1 = false;
var isDizzy2 = false;
var solo = false;
var pcSpeed = "";



// Item Array of Objects
var items = [{
    name: "Melon",
    url: "./images/Melon.png",
    points: 1000
  },
  {
    name: "Banana",
    url: "./images/Banana.png",
    points: 600
  },
  {
    name: "Grapes",
    url: "./images/Grapes.png",
    points: 400
  },
  {
    name: "Bomb",
    url: "./images/Bomb.png",
    points: -500
  },
];


//-----------------------------Sounds-------------------------------------//

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function () {
    this.sound.play();
  };
  this.stop = function () {
    this.sound.pause();
  };
  this.onended = function () {
    this.currentTime = 0;
  };
}

var hit;
hit = new sound("./sounds/hit14.mp3.flac");

var swish;
swish = new sound("./sounds/swish.wav");

var eat;
eat = new sound("./sounds/eat.wav");

var boom;
boom = new sound("./sounds/boom.wav");

var music;
music = new sound("./sounds/HappyLevel.wav");

music.sound.volume = 0.5;

music.sound.loop = true;

music.play();

//------------------------------Movements----------------------------------------------//
function raiseCup() {
  music.stop();
  $("#cup").css("margin-top", "0px");
  $("#cup").css("transition-duration", "100ms");
  $("#cup").css("transition-timing", "linear");
  isCupUp = true;
  timeRaised = Date.now();
  itemAvailable = true;
  console.log("going up");
  console.log(isCupUp);
  if (solo === true) {
    pcSpeed = randomTime(400, 300);
    setTimeout(antSoloMove2, pcSpeed);
  }
  setTimeout(PcBehavior, pcSpeed);
}

function dropCup() {
  music.play();
  $("#cup").css("margin-top", "250px");
  $("#cup").css("transition-duration", "200ms");
  $("#cup").css("transition-timing", "linear");
  isCupUp = false;
  itemAvailable = false;
  console.log("going down");
  console.log(isCupUp);
}

function antCatch1() {
  $("#ant1").css("margin-left", "400px");
  $("#ant1").css("transition-duration", "100ms");
  $("#ant1").css("transition-timing", "linear");
  swish.play();
}

function antCatch2() {
  $("#ant2").css("margin-left", "500px");
  $("#ant2").css("transition-duration", "100ms");
  $("#ant2").css("transition-timing", "linear");
  swish.play();
}

function antReturn1() {
  $("#ant1").css("margin-left", "0px");
  $("#ant1").css("transition-duration", "500ms");
  $("#ant1").css("transition-timing", "linear");
}

function antReturn2() {
  $("#ant2").css("margin-left", "800px");
  $("#ant2").css("transition-duration", "500ms");
  $("#ant2").css("transition-timing", "linear");
}

function antSoloMove2() {
  antCatch2();
  antReturn2();
}

function soloMovebomb() {
  $("#speed2").html(pcSpeed + " ms!");
  toggleSpeed2();
  setTimeout(toggleSpeed2, 2000);
  scorePlayer2 += items[currentItemIndex].points;
  $("#p2Score").html(scorePlayer2);
  itemAvailable = false;
  antCatch2();
  $("#item").attr("src", "./images/explosion.png");
  setTimeout(explotion2, 200)
  setTimeout(antReturn2, 100);
}

function soloMoveIfItem() {
  $("#speed2").html(pcSpeed + " ms!");
  toggleSpeed2();
  setTimeout(toggleSpeed2, 2000);
  scorePlayer2 += items[currentItemIndex].points;
  $("#p2Score").html(scorePlayer2);
  itemAvailable = false;
  antCatch2();
  setTimeout(antReturn2, 100);
  pullItemRight();
}

function toggleSpeedPc() {
  toggleSpeed2();
  setTimeout(toggleSpeed2, 2000);
}

function PcBehavior() {
  if (currentItemIndex === 3 && itemAvailable === true && solo === true) {
    soloMovebomb()
  } else if (itemAvailable === true && solo === true) {
    soloMoveIfItem()
  }
}

  function pullItemLeft() {
    $("#item").css("margin-left", "140px");
    $("#item").css("transition-duration", "100ms");
    $("#item").css("transition-timing", "linear");
  }

  function pullItemRight() {
    $("#item").css("margin-left", "760px");
    $("#item").css("transition-duration", "100ms");
    $("#item").css("transition-timing", "linear");
  }

  function falseShake() {
    $("#cup").css("margin-top", "200px");
    $("#cup").css("transition-duration", "100ms");
    $("#cup").css("transition-timing", "linear");
  }

  function toggleSpeed1() {
    $("#speed1").toggle();
  }

  function toggleSpeed2() {
    $("#speed2").toggle();
  }

  function dizzyFalse1() {
    console.log("dizzyFalse1()");
    isDizzy1 = false;
    $("#ant1").attr("src", "../images/Ant.png")
  }

  function dizzyFalse2() {
    console.log("dizzyFalse2()");
    isDizzy2 = false;
    $("#ant2").attr("src", "./images/Ant.png")
  }

  function dizzyAnt1() {
    isDizzy1 = true;
    console.log("dizzyAnt1()");
    setTimeout(dizzyFalse1, 3000);
  }

  function dizzyAnt2() {
    isDizzy2 = true;
    console.log("dizzyAnt1()");
    setTimeout(dizzyFalse2, 3000);
  }

  function ant1dizzy() {
    antCatch1();
    hit.play();
    setTimeout(antReturn1, 100);
    dizzyAnt1();
    $("#ant1").attr("src", "./images/dizzy ant png.png")
  }

  function ant2dizzy() {
    antCatch2();
    hit.play();
    setTimeout(antReturn2, 100);
    dizzyAnt2();
    $("#ant2").attr("src", "./images/dizzy ant png.png")
  }

  $("#vs").click(function () {
    isCupUp = false;
    scorePlayer1 = 0;
    scorePlayer2 = 0;
    currentItemIndex = "";
    currentRound = 0;
    timeRaised = "";
    playerSpeed = "";
    rShake = "";
    itemAvailable = true;
    isDizzy1 = false;
    isDizzy2 = false;
    solo = false;
    pcSpeed = ""
    $("#p1Score").html(scorePlayer1)
    $("#p2Score").html(scorePlayer2)
    $('#round').html('ROUND <span id="roundNum"></span>');
    $('#menu').fadeToggle(1000);
    round();
    changeItem();
    nextRound();
  })

  $("#solo").click(function () {
    isCupUp = false;
    scorePlayer1 = 0;
    scorePlayer2 = 0;
    currentItemIndex = "";
    currentRound = 0;
    timeRaised = "";
    playerSpeed = "";
    rShake = "";
    itemAvailable = true;
    isDizzy1 = false;
    isDizzy2 = false;
    solo = true;
    pcSpeed = ""
    $("#p1Score").html(scorePlayer1)
    $("#p2Score").html(scorePlayer2)
    $('#round').html('ROUND <span id="roundNum"></span>');
    $('#menu').fadeToggle(1000);
    round();
    changeItem();
    nextRound();
  })

  $("#main-menu").click(function () {
    $("#reset-menu").fadeToggle(1000);
    $('#menu').fadeToggle(1000);
  });




  // Function to generate random index
  function randomItem(itemArray) {
    currentItemIndex = Math.floor(Math.random() * itemArray.length);
    return currentItemIndex;
  }

  //Function to generate random time
  function randomTime(max, min) {
    var randTime = Math.floor(Math.random() * max) + min;
    return randTime;
  }


  function toggleRound() {
    $("#round").fadeToggle(1000);
  }

  function nextRound() {
    currentRound++;
    if (currentRound < 5) {
      $("#round").css("margin-left", "400px");
      $("#roundNum").html(currentRound);
      $("#round").fadeIn(1000);
      music.play();
    } else {
      if (scorePlayer1 > scorePlayer2) {
        $("#round").css("margin-left", "320px");
        $("#round").html("PLAYER 1 WINS!");
        // $("#reset-menu").fadeIn(1000);
      } else {
        $("#round").css("margin-left", "320px")
        $("#round").html("PLAYER 2 WINS!");
        // $("#reset-menu").fadeIn(1000);
      }
    }
  }


  function resetMenu() {
    $("#reset-menu").fadeIn(1000);
  }


  function round() {
    if (currentRound < 5) {
      roundTime = randomTime(10000, 5000);
      pauseTime = roundTime + 5000;
      setTimeout(toggleRound, 3500)
      setTimeout(raiseCup, roundTime);
      setTimeout(dropCup, pauseTime);
      setTimeout(changeItem, pauseTime);
      setTimeout(nextRound, pauseTime);
      setTimeout(round, pauseTime);
    } else if (scorePlayer1 > scorePlayer2) {
      $("#round").html("PLAYER 1 WINS!");
      $("#round").fadeToggle(1000)
      setTimeout(resetMenu, 3000);
    } else {
      $("#round").html("PLAYER 2 WINS!");
      $("#round").fadeToggle(1000)
      setTimeout(resetMenu, 3000);
    }
  }


  $("#play-again").click(function () {
    pcSpeed = ""
    isCupUp = false;
    scorePlayer1 = 0;
    scorePlayer2 = 0;
    currentItemIndex = "";
    currentRound = 0;
    timeRaised = "";
    playerSpeed = "";
    rShake = "";
    itemAvailable = true;
    isDizzy1 = false;
    isDizzy2 = false;
    $("#p1Score").html(scorePlayer1)
    $("#p2Score").html(scorePlayer2)
    $('#round').html('ROUND <span id="roundNum"></span>');
    round();
    changeItem();
    nextRound();
    music.play();
    $("#reset-menu").fadeOut(1000);
  })

  function changeItem() {
    function displayItem() {
      $("#item").css("display", "inline-block");
    }

    $("#item").css("display", "none");
    $("#item").css("margin-left", "450px");
    currentItemIndex = randomItem(items);
    $("#item").attr("src", items[currentItemIndex].url);
    setTimeout(displayItem, 1000);
  }


  function antRecover1() {
    $("#ant1").attr("src", "./images/Ant.png")
  }

  function antRecover2() {
    $("#ant2").attr("src", "./images/Ant.png")
  }

  function explotion1() {
    $("#item").hide();
    boom.play();
    $("#ant1").attr("src", "./images/Ant smoke png.png");
    setTimeout(antRecover1, 5000);
  }

  function explotion2() {
    $("#item").hide();
    boom.play();
    $("#ant2").attr("src", "./images/Ant smoke png.png");
    setTimeout(antRecover2, 5000);
  }



  //-------------------------------------------------------------- Key Functions-----------------------------------------------------------------------//

  $(document).on("keyup", function (e) {
    console.log(e.which);
    //--------------------Player 1------------------------//
    if (e.which === 68 && isCupUp === true && itemAvailable === true && isDizzy1 === false && currentItemIndex === 3) {
      playerSpeed = Date.now() - timeRaised;
      $("#speed1").html(playerSpeed + " ms!");
      toggleSpeed1();
      setTimeout(toggleSpeed1, 2000);
      scorePlayer1 += items[currentItemIndex].points;
      $("#p1Score").html(scorePlayer1);
      itemAvailable = false;
      antCatch1();
      $("#item").attr("src", "./images/explosion.png");
      setTimeout(explotion1, 200)
      setTimeout(antReturn1, 100);

    } else if (e.which === 68 && isCupUp === true && itemAvailable === true && isDizzy1 === false) {
      playerSpeed = Date.now() - timeRaised;
      $("#speed1").html(playerSpeed + " ms!");
      toggleSpeed1();
      setTimeout(toggleSpeed1, 2000);
      scorePlayer1 += items[currentItemIndex].points;
      $("#p1Score").html(scorePlayer1);
      itemAvailable = false;
      antCatch1();
      setTimeout(antReturn1, 100);
      pullItemLeft();

    } else if (e.which === 68 && isCupUp === true && itemAvailable === false && isDizzy1 === false) {
      playerSpeed = Date.now() - timeRaised;
      $("#speed1").html(playerSpeed + " ms!");
      toggleSpeed1();
      setTimeout(toggleSpeed1, 2000);
      antCatch1();
      setTimeout(antReturn1, 100);

    } else if (e.which === 68 && isCupUp === false && isDizzy1 === false) {
      ant1dizzy();
      console.log(isDizzy1);

    } else if (e.which === 68 && isDizzy1 === false) {
      antCatch1();
      console.log(isDizzy1);
      setTimeout(antReturn1, 100);


      //-----------------------Player 2-----------------------------//
    } else if (e.which === 37 && isCupUp === true && itemAvailable === true && isDizzy2 === false && currentItemIndex === 3 && solo === false) {
      playerSpeed = Date.now() - timeRaised;
      $("#speed2").html(playerSpeed + " ms!");
      toggleSpeed2();
      setTimeout(toggleSpeed2, 2000);
      scorePlayer2 += items[currentItemIndex].points;
      $("#p2Score").html(scorePlayer2);
      itemAvailable = false;
      antCatch2();
      $("#item").attr("src", "../images/explosion.png");
      setTimeout(explotion2, 200)
      setTimeout(antReturn2, 100);

    } else if (e.which === 37 && isCupUp === true && itemAvailable === true && isDizzy2 === false && solo === false) {
      playerSpeed = Date.now() - timeRaised;
      $("#speed2").html(playerSpeed + " ms!");
      toggleSpeed2();
      setTimeout(toggleSpeed2, 2000);
      scorePlayer2 += items[currentItemIndex].points;
      $("#p2Score").html(scorePlayer2);
      itemAvailable = false;
      antCatch2();
      setTimeout(antReturn2, 100);
      pullItemRight();

    } else if (e.which === 37 && isCupUp === true && itemAvailable === false && isDizzy2 === false && solo === false) {
      playerSpeed = Date.now() - timeRaised;
      $("#speed2").html(playerSpeed + " ms!");
      toggleSpeed2();
      setTimeout(toggleSpeed2, 2000);
      antCatch2();
      setTimeout(antReturn2, 100);

    } else if (e.which === 37 && isCupUp === false && isDizzy2 === false && solo === false) {
      ant2dizzy();
      console.log(isDizzy2);

    } else if (e.which === 37 && isDizzy2 === false && solo === false) {
      antCatch2();
      setTimeout(antReturn2, 100);
    }
  });
