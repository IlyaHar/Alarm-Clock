let selectAlarm = document.querySelectorAll("select");
let time = document.querySelector("h2");
let alarmBtn = document.querySelector("button");
let ringtoneSelect = document.getElementById("ringtoneSelect");
let selectedRingtone = ringtoneSelect.value;
let alarmTime,
ringtone = new Audio(), 
alarmSet = false;

for(let i = 12; i > 0; i--) {
    i = i < 10 ? "0" + i : i;
    let options = `<option value="${i}" >${i}</option>`;
    selectAlarm[0].firstElementChild.insertAdjacentHTML("afterend", options);
}

for(let i = 59; i >= 0; i--) {
    i = i < 10 ? "0" + i : i;
    let options = `<option value="${i}" >${i}</option>`;
    selectAlarm[1].firstElementChild.insertAdjacentHTML("afterend", options);
}

for(let i = 2; i > 0; i--) {
    let day = i == 1 ? "AM" : "PM";
    let options = `<option value="${day}" >${day}</option>`;
    selectAlarm[2].firstElementChild.insertAdjacentHTML("afterend", options);
}

setInterval(() => {
    let timeClock = new Date(),
    h = timeClock.getHours(),
    m = timeClock.getMinutes(),
    s = timeClock.getSeconds(),
    day = "AM";
    if (h > 12) {
        h = h - 12;
        day = "PM";
    }

    h = h === 0 ? h = 12 : h;
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    time.innerHTML = `${h}:${m}:${s} ${day}`;

    if(alarmTime == `${h}:${m} ${day}`) {
        ringtone.play();
        ringtone.loop = true;

    }

}, 1000)

function setAlarm() {
    if (alarmSet) {
        alarmTime = '';
        ringtone.pause();
        selectAlarm.forEach(select => select.classList.remove("disable"));
        alarmBtn.innerText = 'Увімкнути Будильник';
        return alarmSet = false;
     }

     let selectedRingtone = ringtoneSelect.value;
     ringtone.src = `./audio/${selectedRingtone}`; 
 
  
    let time = `${selectAlarm[0].value}:${selectAlarm[1].value} ${selectAlarm[2].value}`;
   if (time.includes("hour") || time.includes("minute") || time.includes("AM/PM") ) {
      return alert('Перевірте введені дані для увімкнення будильника!');
   }

   alarmTime = time;
   selectAlarm.forEach(select => select.classList.add("disable"));
   alarmBtn.innerText = "Вимкнути Будильник";
   alarmSet = true;
}

alarmBtn.addEventListener("click", setAlarm);

function changeColor(select) {
    select.style.backgroundColor = 'silver';
}