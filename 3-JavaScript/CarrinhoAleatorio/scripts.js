class Car {
  constructor(minSp, maxSp, skd) {
    this._minimumSpeed = minSp;
    this._maximumSpeed = maxSp;
    this._skid = skd;
  }

  set minimumSpeed(string) {
    this._minimumSpeed = string;
  }
  set maximumSpeed(string) {
    this._maximumSpeed = string;
  }
  set skid(string) {
    this._skid = string;
  }

  get minimumSpeed() {
    return this._minimumSpeed;
  }
  get maximumSpeed() {
    return this._maximumSpeed;
  }
  get skid() {
    return this._skid;
  }
}

var popular = {
  maxVelVar: [180, 200],
  minVelVar: [110, 130],
  skidVar: [0.03, 0.04],
  definitions: function () {
    let max = (Math.random() * (this.maxVelVar[1] - this.maxVelVar[0]) + this.maxVelVar[0]);
    let min = (Math.random() * (this.minVelVar[1] - this.minVelVar[0]) + this.minVelVar[0]);
    let skid = (Math.random() * (this.skidVar[1] - this.skidVar[0]) + this.skidVar[0]);
    return {
      min,
      max,
      skid
    };
  }
}

var sport = {
  maxVelVar: [195, 215],
  minVelVar: [125, 145],
  skidVar: [0.02, 0.03],
  definitions: function () {
    let max = (Math.random() * (this.maxVelVar[1] - this.maxVelVar[0]) + this.maxVelVar[0]);
    let min = (Math.random() * (this.minVelVar[1] - this.minVelVar[0]) + this.minVelVar[0]);
    let skid = (Math.random() * (this.skidVar[1] - this.skidVar[0]) + this.skidVar[0]);
    return {
      min,
      max,
      skid
    };
  }
}

var superSport = {
  maxVelVar: [210, 230],
  minVelVar: [140, 160],
  skidVar: [0.01, 0.0175],
  definitions: function () {
    let max = (Math.random() * (this.maxVelVar[1] - this.maxVelVar[0]) + this.maxVelVar[0]);
    let min = (Math.random() * (this.minVelVar[1] - this.minVelVar[0]) + this.minVelVar[0]);
    let skid = (Math.random() * (this.skidVar[1] - this.skidVar[0]) + this.skidVar[0]);
    return {
      min,
      max,
      skid
    };
  }
}

function alCar() {
  let chance = Math.random() * 100;
  if (chance >= 0 && chance <= 60) {
    return popular.definitions();
  } else if (chance > 60 && chance <= 95) {
    return sport.definitions();
  } else {
    return superSport.definitions();
  }
}

let def = alCar();
let pedro = new Car(def.min, def.max, def.skid);
def = alCar();
let juca = new Car(def.min, def.max, def.skid);
def = alCar();
let edna = new Car(def.min, def.max, def.skid);

let divPedro =document.getElementById("pedro");
divPedro.textContent = `Pedro -> VelMin: ${pedro.minimumSpeed} | VelMax: ${pedro.maximumSpeed} | derrp: ${pedro.skid}`;
let divJuca =document.getElementById("juca");
divJuca.textContent = `Juca -> VelMin: ${juca.minimumSpeed} | VelMax: ${juca.maximumSpeed} | derrp: ${juca.skid}`;
let divEdna =document.getElementById("edna");
divEdna.textContent = `Edna -> VelMin: ${edna.minimumSpeed} | VelMax: ${edna.maximumSpeed} | derrp: ${edna.skid}`;
function randomPedro() {
  return (Math.random() * (pedro._maximumSpeed - pedro._minimumSpeed) + pedro.minimumSpeed) * (1 - pedro.skid);
}

function randomJuca() {
  return (Math.random() * (juca._maximumSpeed - juca._minimumSpeed) + juca.minimumSpeed) * (1 - juca.skid);
}

function randomEdna() {
  return (Math.random() * (edna._maximumSpeed - edna._minimumSpeed) + edna.minimumSpeed) * (1 - edna.skid);
}

function lapWinner(laps) {
  let lapsInRun = document.getElementById("lapsInRun");
  let lapWinner = document.getElementById("lapWinner");
  let pedroWin = 0;
  let jucaWin = 0;
  let ednaWin = 0;
  for (let i = 0; i < laps; i++) {
    let div = document.createElement('div');
    div.innerHTML = String(i + 1);
    div.setAttribute('id', 'lap');
    lapsInRun.appendChild(div);
    let div2 = document.createElement('div');
    let pedroSp = randomPedro();
    let jucaSp = randomJuca();
    let ednaSp = randomEdna();

    if (pedroSp > jucaSp) {
      if (pedroSp > ednaSp) {
        div2.innerHTML = 'Pedro';
        div2.setAttribute('id', 'firstPlace');
        lapWinner.appendChild(div2);
        pedroWin++;
      } else {
        div2.innerHTML = 'Edna';
        div2.setAttribute('id', 'firstPlace');
        lapWinner.appendChild(div2);
        ednaWin++;
      }
    } else {
      if (jucaSp > ednaSp) {
        div2.innerHTML = 'Juca';
        div2.setAttribute('id', 'firstPlace');
        lapWinner.appendChild(div2);
        jucaWin++;
      } else {
        div2.innerHTML = 'Edna';
        div2.setAttribute('id', 'firstPlace');
        lapWinner.appendChild(div2);
        ednaWin++;
      }
    }
  }
  if (pedroWin > jucaWin) {
    if (pedroWin > ednaWin) {
      return 'Pedro';
    } else {
      return 'Edna';
    }
  } else {
    if (jucaWin > ednaWin) {
      return 'Juca';
    } else {
      return 'Edna';
    }
  }
}

function fastRun() {
  let erase1 = document.getElementById("lapsInRun");
  let erase2 = document.getElementById("lapWinner");
  erase1.innerText = "";
  erase2.innerText = "";
  let win = lapWinner(10);
  let name = document.getElementById('name');
  name.textContent = 'O vencedor da corrida foi: ' + win;
  let operator = document.getElementById("trophel");
  operator.className = '';
  operator.classList.add('fas', 'fa-trophy');
}

function granPri() {
  let erase1 = document.getElementById("lapsInRun");
  let erase2 = document.getElementById("lapWinner");
  erase1.innerText = "";
  erase2.innerText = "";
  let win = lapWinner(70);
  let name = document.getElementById('name');
  name.textContent = 'O vencedor da corrida foi: ' + win;
  let operator = document.getElementById("trophel");
  operator.className = '';
  operator.classList.add('fas', 'fa-trophy');
}

function enduro() {
  let erase1 = document.getElementById("lapsInRun");
  let erase2 = document.getElementById("lapWinner");
  erase1.innerText = "";
  erase2.innerText = "";
  let win = lapWinner(160);
  let name = document.getElementById('name');
  name.textContent = 'O vencedor da corrida foi: ' + win;
  let operator = document.getElementById("trophel");
  operator.className = '';
  operator.classList.add('fas', 'fa-trophy');
}