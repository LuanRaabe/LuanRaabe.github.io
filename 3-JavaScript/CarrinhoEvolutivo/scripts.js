const cars = {
  popular: {
    maxVelVar: [180, 200],
    minVelVar: [110, 130],
    skidVar: [0.03, 0.04]
  },
  sport: {
    maxVelVar: [195, 215],
    minVelVar: [125, 145],
    skidVar: [0.02, 0.03]
  },
  superSport: {
    maxVelVar: [210, 230],
    minVelVar: [140, 160],
    skidVar: [0.01, 0.0175]
  }
}

function alCar() {
  let chance = Math.random() * 100;
  if (chance >= 0 && chance <= 60) {
    return cars.popular;
  } else if (chance > 60 && chance <= 95) {
    return cars.sport;
  } else {
    return cars.superSport;
  }
}

function definitions() {
  let obj = alCar();
  let max = (Math.random() * (obj.maxVelVar[1] - obj.maxVelVar[0]) + obj.maxVelVar[0]);
  let min = (Math.random() * (obj.minVelVar[1] - obj.minVelVar[0]) + obj.minVelVar[0]);
  let skid = (Math.random() * (obj.skidVar[1] - obj.skidVar[0]) + obj.skidVar[0]);
  return {
    min,
    max,
    skid
  };
}

var runners = [
  {
    name: 'pedro',
    car: {
      min: '',
      max: '',
      skid: ''
    },
    exp: 0,
    level: 0
  }, {
    name: 'juca',
    car: {
      min: '',
      max: '',
      skid: ''
    },
    exp: 0,
    level: 0
  }, {
    name: 'edna',
    car: {
      min: '',
      max: '',
      skid: ''
    },
    exp: 0,
    level: 0
  }
];

function printRunner(item, index) {
  let carsProperties = document.getElementById("carsProperties");
  let div = document.createElement('div');
  div.innerHTML = `${runners[index].name} -> VelMin: ${runners[index].car.min.toFixed(2)} | VelMax: ${runners[index].car.max.toFixed(2)} | derrp: ${runners[index].car.skid.toFixed(5)} | Nivel: ${runners[index].level} | Exp: ${runners[index].exp}`;
  div.setAttribute('class', 'runner');
  carsProperties.appendChild(div);
}

function testLevel(item, index) {
  if ((runners[index].exp >= 450) && (runners[index].level < 10)) {
    if (runners[index].level != 10) {
      runners[index].level += 1;
      runners[index].exp -= 450;
    } else {
      runners[index].level += 1;
    }
  }
}

function defCars() {
  let carsProperties = document.getElementById("carsProperties");
  carsProperties.innerText = '';
  for (let i = 0; i < 3; i++) {
    runners[i].car = definitions();
  }
  runners.forEach(printRunner);
  runners.forEach(testLevel);
}

function randomSpeed(n) {
  return ((Math.random() * (runners[n].car.max - runners[n].car.min) + runners[n].car.min) * (1 - runners[n].car.skid) * (1 + (0.01 * runners[n].level)));
}

function lapWinner(laps) {
  let lapsInRun = document.getElementById("lapsInRun");
  let lapWinner = document.getElementById("lapWinner");
  let pedroPoints = 0;
  let jucaPoints = 0;
  let ednaPoints = 0;
  for (let i = 0; i < laps; i++) {
    let div = document.createElement('div');
    div.innerHTML = String(i + 1);
    div.setAttribute('id', 'lap');
    lapsInRun.appendChild(div);
    let div2 = document.createElement('div');
    let pedroSp = randomSpeed(0);
    let jucaSp = randomSpeed(1);
    let ednaSp = randomSpeed(2);

    if (pedroSp > jucaSp) {
      if (pedroSp > ednaSp) {
        div2.innerHTML = 'Pedro';
        div2.setAttribute('id', 'firstPlace');
        lapWinner.appendChild(div2);
        pedroPoints++;
      } else {
        div2.innerHTML = 'Edna';
        div2.setAttribute('id', 'firstPlace');
        lapWinner.appendChild(div2);
        ednaPoints++;
      }
    } else {
      if (jucaSp > ednaSp) {
        div2.innerHTML = 'Juca';
        div2.setAttribute('id', 'firstPlace');
        lapWinner.appendChild(div2);
        jucaPoints++;
      } else {
        div2.innerHTML = 'Edna';
        div2.setAttribute('id', 'firstPlace');
        lapWinner.appendChild(div2);
        ednaPoints++;
      }
    }
  }

  return {
    pedroPoints,
    jucaPoints,
    ednaPoints
  }
}

function runWinner(number) {
  let n = number;
  let points = lapWinner(n);
  while ((points.pedroPoints == points.jucaPoints) || (points.jucaPoints == points.ednaPoints) || (points.ednaPoints == points.pedroPoints)) {
    let points2 = lapWinner(1);
    points.pedroPoints += points2.pedroPoints;
    points.jucaPoints += points2.jucaPoints;
    points.ednaPoints += points2.ednaPoints;
  }
  console.log(points);

  if (points.pedroPoints > points.jucaPoints) {
    if (points.pedroPoints > points.ednaPoints) {
      runners[0].exp += 200;
      if (points.jucaPoints > points.ednaPoints) {
        runners[1].exp += 120;
        runners[2].exp += 50;
      } else {
        runners[2].exp += 120;
        runners[1].exp += 50;
      }
      return 'Pedro';
    } else {
      runners[2].exp += 200;
      if (points.pedroPoints > points.jucaPoints) {
        runners[0].exp += 120;
        runners[1].exp += 50;
      } else {
        runners[1].exp += 120;
        runners[0].exp += 50;
      }
      return 'Edna';
    }
  } else {
    if (points.jucaPoints > points.ednaPoints) {
      runners[1].exp += 200;
      if (points.pedroPoints > points.ednaPoints) {
        runners[0].exp += 120;
        runners[2].exp += 50;
      } else {
        runners[2].exp += 120;
        runners[0].exp += 50;
      }
      return 'Juca';
    } else {
      runners[2].exp += 200;
      if (points.pedroPoints > points.jucaPoints) {
        runners[0].exp += 120;
        runners[1].exp += 50;
      } else {
        runners[1].exp += 120;
        runners[0].exp += 50;
      }
      return 'Edna';
    }
  }
}

function erase() {
  let erase1 = document.getElementById("lapsInRun");
  let erase2 = document.getElementById("lapWinner");
  erase1.innerText = "";
  erase2.innerText = "";
}

function fastRun() {
  defCars();
  erase();
  let win = runWinner(10);
  let name = document.getElementById('name');
  name.textContent = 'O vencedor da corrida foi: ' + win;
  let operator = document.getElementById("trophel");
  operator.className = '';
  operator.classList.add('fas', 'fa-trophy');
}

function granPri() {
  defCars();
  erase();
  let win = runWinner(70);
  let name = document.getElementById('name');
  name.textContent = 'O vencedor da corrida foi: ' + win;
  let operator = document.getElementById("trophel");
  operator.className = '';
  operator.classList.add('fas', 'fa-trophy');
}

function enduro() {
  defCars();
  erase();
  let win = runWinner(160);
  let name = document.getElementById('name');
  name.textContent = 'O vencedor da corrida foi: ' + win;
  let operator = document.getElementById("trophel");
  operator.className = '';
  operator.classList.add('fas', 'fa-trophy');
}

function rand() {
  defCars();
  erase();
  laps = document.getElementById('rand').value;
  let win = runWinner(laps);
  let name = document.getElementById('name');
  name.textContent = 'O vencedor da corrida foi: ' + win;
  let operator = document.getElementById("trophel");
  operator.className = '';
  operator.classList.add('fas', 'fa-trophy');
}