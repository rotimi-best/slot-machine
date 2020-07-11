var doing = false;
var numberOfSymbols = 5
var spin = Array.from({ length: numberOfSymbols })
  .map(() => new Audio("sounds/spin.mp3"));
var coin =  Array.from({ length: 3 })
  .map(() => new Audio("sounds/coin.mp3"));
var win = new Audio("sounds/win.mp3");
var lose = new Audio("sounds/lose.mp3");
var audio = false;
let status = document.getElementById("status")
var info = true;

function spinReels(){
  if (doing){return null;}
  doing = true;
  var numChanges = randomInt(1,4)*5
  console.log('numChanges', numChanges)
  var numeberSlot1 = numChanges+randomInt(1,5)
  console.log('numeberSlot1', numeberSlot1)
  var numeberSlot2 = numChanges+2*5+randomInt(1,5)
  console.log('numeberSlot2', numeberSlot2)
  var numeberSlot3 = numChanges+4*5+randomInt(1,5)
  console.log('numeberSlot3', numeberSlot3)

  var i1 = 0;
  var i2 = 0;
  var i3 = 0;
  var sound = 0
  status.innerHTML = "SPINNING"
  slot1 = setInterval(spin1, 100);
  slot2 = setInterval(spin2, 100);
  slot3 = setInterval(spin3, 100);
  function spin1(){
    i1++;
    console.log('i1', i1)
    if (i1>=numeberSlot1){
      coin[0].play()
      clearInterval(slot1);
      return null;
    }
    slotTile = document.getElementById("slot1");
    if (slotTile.className=="a5"){
      slotTile.className = "a0";
    }
    console.log('slotTile.className.substring(1)', slotTile.className.substring(1))
    slotTile.className = "a"+(parseInt(slotTile.className.substring(1))+1)
  }
  function spin2(){
    i2++;
    if (i2>=numeberSlot2){
      coin[1].play()
      clearInterval(slot2);
      return null;
    }
    slotTile = document.getElementById("slot2");
    if (slotTile.className=="a5"){
      slotTile.className = "a0";
    }
    slotTile.className = "a"+(parseInt(slotTile.className.substring(1))+1)
  }
  function spin3(){
    i3++;
    if (i3>=numeberSlot3){
      coin[2].play()
      clearInterval(slot3);
      testWin();
      return null;
    }
    slotTile = document.getElementById("slot3");
    if (slotTile.className=="a5"){
      slotTile.className = "a0";
    }
    sound++;
    if (sound==spin.length){
      sound=0;
    }
    spin[sound].play();
    slotTile.className = "a"+(parseInt(slotTile.className.substring(1))+1)
  }
}

function testWin(){
  var slot1 = document.getElementById("slot1").className
  var slot2 = document.getElementById("slot2").className
  var slot3 = document.getElementById("slot3").className

  if (((slot1 == slot2 && slot2 == slot3) ||
    (slot1 == slot2 && slot3 == "a5") ||
    (slot1 == slot3 && slot2 == "a5") ||
    (slot2 == slot3 && slot1 == "a5") ||
    (slot1 == slot2 && slot1 == "a5") ||
    (slot1 == slot3 && slot1 == "a5") ||
    (slot2 == slot3 && slot2 == "a5") ) && !(slot1 == slot2 && slot2 == slot3 && slot1=="a5")){
    status.innerHTML = "YOU WIN!";
    win.play();
  }else{
    status.innerHTML = "YOU LOSE!"
    lose.play();
  }
  doing = false;
}

function toggleAudio(){
  if (!audio){
    audio = !audio;
    for (var x of spin){
      x.volume = 0.5;
    }
    for (var x of coin){
      x.volume = 0.5;
    }
    win.volume = 1.0;
    lose.volume = 1.0;
  }else{
    audio = !audio;
    for (var x of spin){
      x.volume = 0;
    }
    for (var x of coin){
      x.volume = 0;
    }
    win.volume = 0;
    lose.volume = 0;
  }
  document.getElementById("audio").src = "icons/audio"+(audio?"On":"Off")+".png";
}


