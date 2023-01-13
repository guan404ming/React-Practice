// random pick user
let guestList = ["CloneX_3",
                 "CloneX_7", 
                 "CloneX_4",
                 "CloneX_1029",
                 "CloneX_5", 
                 "CloneX_17361",
                 "CloneX_6",
                 "CloneX_12719",
                 "CloneX_15127",
                 "CloneX_1713",
                 "CloneX_3151",
                 "CloneX_14155",
                 "CloneX_14649",
                 "CloneX_5233"]
let photoList = ["images/CloneX_3.png",
                 "images/CloneX_7.png",
                 "images/CloneX_4.png",
                 "images/Clonex_1029.png",
                 "images/Clonex_5.png",
                 "images/Clonex_17361.png",
                 "images/Clonex_6.png",
                 "images/Clonex_12719.png",
                 "images/Clonex_15127.png",
                 "images/Clonex_1713.png",
                 "images/Clonex_3151.png",
                 "images/Clonex_14155.png",
                 "images/Clonex_14649.png",
                 "images/Clonex_5233.png",]

let host = ["Takashipom"]
let hostPhoto ="images/CLoneX_1.png"
function getRandom(min,max){
    return Math.floor(Math.random()*(max-min+1))+min;
};
const randStart = getRandom(0,7)
const randEnd = getRandom(8,14)
guestList = guestList.slice(randStart,randEnd)
photoList = photoList.slice(randStart,randEnd)

function initGuests() {
  var peopleCount = guestList.length + host.length;
  if (guestList.length > 0) {
    var guest = document.getElementsByClassName('guest');
  }
  document.getElementById('number').innerHTML = peopleCount;
  
  // init the hosts and the guests
  if (host.length != 0) {
    document.getElementById('host').innerHTML = `<div id="is-mute">
      <svg width="24" height="24" viewBox="0 0 48 48" fill="white"><path d="m35.65 30.25-2.7-2.65q.95-1.2 1.375-2.7.425-1.5.425-3.2h3.65q0 2.3-.725 4.525-.725 2.225-2.025 4.025ZM28.9 23.6 17.65 12.35V8.3q.25-1.95 1.875-3.375T23.3 3.5q2.45 0 4.175 1.7Q29.2 6.9 29.2 9.35V21.7q0 .35-.075.975t-.225.925Zm-7.4 19.7v-6.9q-5.7-.6-9.5-4.775Q8.2 27.45 8.2 21.7h3.65q0 4.75 3.35 7.975 3.35 3.225 8.1 3.225 2.15 0 4.025-.725Q29.2 31.45 30.8 30.2l2.6 2.6q-1.7 1.55-3.775 2.45-2.075.9-4.525 1.15v6.9Zm19.95 1.8L1.7 5.35 3.8 3.2l39.75 39.75Z"/></svg></div><img src="${hostPhoto}" alt="holder"><div id="tools" onclick="unpinHost()"><button><svg height="24" viewBox="0 0 24 24" width="24" fill="white"><path d="M2,5.27L3.28,4L20,20.72L18.73,22L12.8,16.07V22H11.2V16H6V14L8,12V11.27L2,5.27M16,12L18,14V16H17.82L8,6.18V4H7V2H17V4H16V12Z"</svg><span class="hint">在主畫面取消固定你自己</span></button><button><svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path fill-rule="evenodd" clip-rule="evenodd" d="M11 7.74967V4.33333C11 3.59695 10.403 3 9.66667 3H6.25033L8.25033 5H9V5.74967L11 7.74967ZM5.44466 5H5V9H9V8.55534L10.8054 10.3607C10.5712 10.7441 10.1488 11 9.66667 11H4.33333C3.59695 11 3 10.403 3 9.66667V4.33333C3 3.85119 3.25591 3.42882 3.63931 3.19464L5.44466 5Z"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M3.00098 14C3.00098 13.4477 3.44869 13 4.00098 13H10.001C10.5533 13 11.001 13.4477 11.001 14V20C11.001 20.5523 10.5533 21 10.001 21H4.00098C3.44869 21 3.00098 20.5523 3.00098 20V14ZM5.00098 19H9.00098V15H5.00098V19Z"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M13.001 4C13.001 3.44772 13.4487 3 14.001 3H20.001C20.5533 3 21.001 3.44772 21.001 4V10C21.001 10.5523 20.5533 11 20.001 11H14.001C13.4487 11 13.001 10.5523 13.001 10V4ZM15.001 9H19.001V5H15.001V9Z"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M21.001 17.751V14C21.001 13.4477 20.5533 13 20.001 13H16.25L21.001 17.751ZM13.551 13.1067C13.2247 13.2714 13.001 13.6096 13.001 14V20C13.001 20.5523 13.4487 21 14.001 21H20.001C20.3914 21 20.7296 20.7762 20.8943 20.4499L13.551 13.1067Z"></path><rect x="20.7998" y="23.2129" width="28" height="2" transform="rotate(-135 20.7998 23.2129)"</rect></svg><span class="hint">無法在這個版面配置中移除你的圖塊</span></button><button><svg width="24" height="24" viewBox="0 0 24 24" fill="white" id="minimize"><path d="M3.4 22 2 20.6 8.6 14H4v-2h8v8h-2v-4.6ZM12 12V4h2v4.6L20.6 2 22 3.4 15.4 10H20v2Z"></path></svg><span class="hint">固定時無法最小化</span></button></div><div id="host-name"><svg height="24" viewBox="0 0 24 24" width="24" fill="white"><path d="M0 0h24v24H0z" fill="none" stroke="#000" stroke-opacity=".008" stroke-width="0"></path><path d="M17 4c0-1.1-.89-2-2-2H9c-1.1 0-2 .9-2 2v7l-2 3v2h6v5l1 1 1-1v-5h6v-2l-2-3V4z"></path></svg><p>${host[0]}</p></div>`;
  }
  else {
    document.getElementById('host').innerHTML = ''
  } 
  document.getElementById('guests').innerHTML = '';
  for(i = 0; i < guestList.length; i++) {
    document.getElementById('guests').innerHTML += `<div class="guest"><img src="${photoList[i]}" alt="holder"><span class="cancel-icon" id="${guestList[i]}" onclick="removeGuest(${guestList[i]})"><svg width="24" height="24" viewBox="0 0 48 48" fill="white"><path d="m12.45 38.35-2.8-2.8L21.2 24 9.65 12.45l2.8-2.8L24 21.2 35.55 9.65l2.8 2.8L26.8 24l11.55 11.55-2.8 2.8L24 26.8Z"/></svg></span><span class="mute-icon"><svg width="24" height="24" viewBox="0 0 48 48" fill="white"><path d="m35.65 30.25-2.7-2.65q.95-1.2 1.375-2.7.425-1.5.425-3.2h3.65q0 2.3-.725 4.525-.725 2.225-2.025 4.025ZM28.9 23.6 17.65 12.35V8.3q.25-1.95 1.875-3.375T23.3 3.5q2.45 0 4.175 1.7Q29.2 6.9 29.2 9.35V21.7q0 .35-.075.975t-.225.925Zm-7.4 19.7v-6.9q-5.7-.6-9.5-4.775Q8.2 27.45 8.2 21.7h3.65q0 4.75 3.35 7.975 3.35 3.225 8.1 3.225 2.15 0 4.025-.725Q29.2 31.45 30.8 30.2l2.6 2.6q-1.7 1.55-3.775 2.45-2.075.9-4.525 1.15v6.9Zm19.95 1.8L1.7 5.35 3.8 3.2l39.75 39.75Z"/></svg></span><span class="name">${guestList[i]}</span><div id="tools" onclick="pinUser(${guestList[i]})"><button><svg height="24" viewBox="0 0 24 24" width="24" fill="white"><path d="M16,12V4H17V2H7V4H8V12L6,14V16H11.2V22H12.8V16H18V14L16,12Z" /></svg><span class="hint">將${guestList[i]}固定在主畫面</span></button><button><svg width="24" height="24" viewBox="0 0 24 24" fill="white" id="minimize"> <path d="M19,11C19,12.19 18.66,13.3 18.1,14.28L16.87,13.05C17.14,12.43 17.3,11.74 17.3,11H19M15,11.16L9,5.18V5A3,3 0 0,1 12,2A3,3 0 0,1 15,5V11L15,11.16M4.27,3L21,19.73L19.73,21L15.54,16.81C14.77,17.27 13.91,17.58 13,17.72V21H11V17.72C7.72,17.23 5,14.41 5,11H6.7C6.7,14 9.24,16.1 12,16.1C12.81,16.1 13.6,15.91 14.31,15.58L12.65,13.92L12,14A3,3 0 0,1 9,11V10.28L3,4.27L4.27,3Z" /></svg><span class="hint">你無法為他人取消靜音</span></button><button><svg width="24" height="24" viewBox="0 0 24 24" fill="white" ><path d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7,13H17V11H7" /></svg><span class="hint">將${guestList[i]}從通話中移除</span></button></div></div>`;
  if (guestList[i] == "Takashipom") {
    document.getElementById(guestList[i]).style.display = 'none';
    }
  } 
  
  // pinned / unpinned the layout
  if (document.getElementById('host-name') && peopleCount != 1) {
    document.getElementById('host-name').classList.add("multiple");
    document.getElementById('guests').classList.remove("one");
    document.getElementById('host').classList.remove("one");
    document.getElementById('guests').classList.remove("unpin");
    document.getElementById('host').style.display = "flex"; 
  }
  else if (host.length == 0){
    document.getElementById('host').style.display = "none";
    document.getElementById('guests').classList.add("unpin");
  }
  
  // one people layout
  if (peopleCount == 1 && host.length == 1) {
    document.getElementById('guests').classList.add("one")
    document.getElementById('host').classList.add("one")
  }
  else {
    document.getElementById('guests').classList.remove("one")
    document.getElementById('host').classList.remove("one")
  }
  
  // the odd / even layout
  if (guestList.length % 2 != 0 && guest) {
    guest[guest.length - 1].classList.add("odd");
  }
  else if (guest) {
    guest[guest.length - 1].classList.remove("odd");
  }
  
  // big screen less people
  if (guestList.length <= 5 && host.length != 0) {
    document.getElementById('guests').classList.add("num-5");
  }
  else {
    document.getElementById('guests').classList.remove("num-5");
  }
  if (guestList.length <= 2 && host.length != 0) {
    
    document.getElementById('guests').classList.add("num-2");
  }
  else {
    document.getElementById('guests').classList.remove("num-2");
  }
  
  // RWD 2^2, 3^2, 4^2
  var remainder = guestList.length % 2;
  if (remainder != 0 && host.length == 0){
    guest[guest.length - 1].classList.remove("odd");
    for (var i = guest.length - 1; i > guest.length - 1 - (remainder); i--) {
         guest[i].classList.add("longer") 
    }
  }
  
  var remainder = guestList.length % 3;
  if (remainder == 2 && host.length == 0){
    guest[guest.length - 1].classList.remove("odd");
    for (var i = guest.length - 1; i > guest.length - 1 - remainder; i--) {
      guest[i].classList.add("longer-3-2")
      if (guest.length - 1  == i) {
        guest[i].classList.add("last-3-2")
      }
    }
  }
  if (remainder == 1 && host.length == 0 && guest.length != 1){
    for (var i = guest.length - 1; i > guest.length - 1 - (remainder); i--) {
         guest[i].classList.add("longer-3-1") 
    }
  }
  
  var remainder = guestList.length % 4;
  if (remainder == 3 && host.length == 0){
    guest[guest.length - 1].classList.remove("odd");
    for (var i = guest.length - 1; i > guest.length - 1 - (remainder); i--) {
        guest[i].classList.add("longer-4-3")
      if (i == guest.length - 1) {
        guest[i].classList.add("last-4-3")
      }
      if (i == guest.length - 2) {
        guest[i].classList.add("last-second-4-3")
      }
    }
  }
  if (remainder == 2 && host.length == 0){
    for (var i = guest.length - 1; i > guest.length - 1 - (remainder); i--) {
         guest[i].classList.add("longer-4-2") 
    }
  }
  if (remainder == 1 && host.length == 0) {
    guest[guest.length - 1].classList.remove("odd");
    for (var i = guest.length - 1; i > guest.length - 1 - (remainder); i--) {
         guest[i].classList.add("longer-4-1") 
    }
  }
  
  if (guestList.length == 1 && host.length == 0 && guest) {
    guest[0].classList.remove("longer-4-1");
    guest[0].classList.remove("longer-3-1");
    guest[0].classList.remove("longer-2-1");
    guest[0].classList.remove("longer");
    guest[0].classList.add("unpin-1");
    document.getElementById('guests').classList.add("unpin-1-1");
  }
  else {
    document.getElementById('guests').classList.remove("unpin-1-1")
  }
} 
function removeGuest(name) {
  const index = guestList.indexOf(name.id);
  if (index > -1) {
    guestList.splice(index, 1);
    photoList.splice(index, 1);
  }
  initGuests()
}

// pin the participant
function pinUser(name) {
  const index = guestList.indexOf(name.id);
  var newHostPhoto = photoList[index];
  var newAddPhoto = hostPhoto;
  removeGuest(name);
  if (host.length != 0) {
    guestList.push(host[0])
    photoList.push(newAddPhoto) 
  }
  hostPhoto = newHostPhoto;
  host = [name.id];
  
  initGuests()
  if (guestList.length == 0) {
    document.getElementById("host").style.display = "flex"
  }
}
function unpinHost() { 
  guestList.push(host[0])
  host = []
  photoList.push(hostPhoto)
  hostPhoto = ""
  initGuests() 
}

// set up new user
let avatar = ["https://bit.ly/3BMFCdz",
              "https://bit.ly/3ULanIw",
              "https://bit.ly/3CdA3WV",
              "https://bit.ly/3CdDddh",
              "https://bit.ly/3r9BeRd",
              "https://bit.ly/3DYkCTO",
              "https://bit.ly/3Cg6gNi",
              "https://bit.ly/3BOVY5x",
              "https://bit.ly/3SBunLR",
              "https://bit.ly/3r9Cx2z",
              "https://bit.ly/3RbK63e",
              "https://bit.ly/3Shyqx3",
              "https://bit.ly/3xSRw4n",
              "https://bit.ly/3LNdls0",
              "https://bit.ly/3xWR1GA",
              "https://bit.ly/3BOZ2yC",
              "https://bit.ly/3DYquwj",
              "https://bit.ly/3Sk41OC",
              "https://bit.ly/3retayk",
              "https://bit.ly/3xS64S3",
              "https://bit.ly/3SkiSsn",
              "https://bit.ly/3DVI1p9",
              "https://bit.ly/3SBwTlf",
              "https://bit.ly/3DWHwLk",
              "https://bit.ly/3SbpPMt",
              "https://bit.ly/3LOtnBN"]
function initUser() {
  var username = prompt('請輸入你的暱稱\n (姓名至少需兩字母，僅能包含英數，且不能以數字開頭)');
  function isAlpha(username){
    return /^[A-Za-z][A-Za-z0-9]*[A-Za-z0-9]$/.test(username);
  }
  
  // used
  if (guestList.indexOf(username) != -1) {
    alert("此用戶名稱已被使用");
  }
  
  // full
  else if (guestList.length + host.length == 15) {
    alert("會議已達上限人數15人");
  }
  
  // empty
  else if (username == null || username == "") {
    alert("請輸入名稱")
  }
  
  // numbers and punctuations
  else if (!isAlpha(username)) {
    alert("輸入格式錯誤\n(姓名至少需兩字母，僅能包含英數，且不能以數字開頭)")
  }
  
  else {
    var photoIdx = prompt('請輸入a-z中任意一個字母，以設定照片\n(若輸入格式錯誤或是未輸入則根據姓名首字自動分配照片)')
    photoIdx = photoIdx.toLowerCase()
    function isCorrect(photoIdx){
      return /[a-zA-Z]/.test(photoIdx);
    }
    if (photoIdx == "" || !isCorrect(photoIdx)) {
      photoIdx = username.toLowerCase().split("")[0]
    }
    guestList.push(username)
    photoIdx = photoIdx.charCodeAt(0) - 97
    photoList.push(avatar[photoIdx])
    initGuests()
    alert(`你好 ${username} !  歡迎加入會議`);
  }
} 

// current time
function getCurrentTime() {
  var current = new Date();
  
  // hours
  var hours = current.getHours();
  var ampm = hours >= 12 ? '下午' : '上午';
  hours = hours < 10 ? '0'+ hours : hours;
  hours = hours > 12 ? hours - 12 : hours;
  
  // minutes
  var minutes = current.getMinutes();
  minutes = minutes < 10 ? '0'+ minutes : minutes;
  
  var time = `${ampm} ${hours}:${minutes}`;
  document.getElementById('time').innerHTML = time;
}

// check if it is muted
function checkMute() {
  if (document.getElementById('is-mute').classList == ""){
    document.getElementById('is-mute').classList.add("unmuted")
    document.getElementById('mic').innerHTML = `<svg width="24" height="24" viewBox="0 0 48 48" fill="white"><path d="M24 27.95q-2.55 0-4.275-1.825Q18 24.3 18 21.7V9.25q0-2.45 1.725-4.2T24 3.3q2.5 0 4.25 1.75T30 9.25V21.7q0 2.6-1.7 4.425-1.7 1.825-4.3 1.825Zm-1.9 15.6v-6.9q-5.85-.6-9.675-4.85Q8.6 27.55 8.6 21.7h3.85q0 4.75 3.375 8.025Q19.2 33 24 33q4.8 0 8.175-3.275Q35.55 26.45 35.55 21.7h3.85q0 5.85-3.85 10.1t-9.65 4.85v6.9Z"/></svg><div class="hint">關閉麥克風 (⌘ + D)</div>`
    document.getElementById('mic').style.backgroundColor = "rgb(60,64,67)";
  }
  else if(document.getElementById('is-mute')) {
    document.getElementById('is-mute').classList.remove("unmuted")
    document.getElementById('mic').innerHTML = `<svg width="24" height="24" viewBox="0 0 48 48" fill="white"><path d="m35.65 30.25-2.7-2.65q.95-1.2 1.375-2.7.425-1.5.425-3.2h3.65q0 2.3-.725 4.525-.725 2.225-2.025 4.025ZM28.9 23.6 17.65 12.35V8.3q.25-1.95 1.875-3.375T23.3 3.5q2.45 0 4.175 1.7Q29.2 6.9 29.2 9.35V21.7q0 .35-.075.975t-.225.925Zm-7.4 19.7v-6.9q-5.7-.6-9.5-4.775Q8.2 27.45 8.2 21.7h3.65q0 4.75 3.35 7.975 3.35 3.225 8.1 3.225 2.15 0 4.025-.725Q29.2 31.45 30.8 30.2l2.6 2.6q-1.7 1.55-3.775 2.45-2.075.9-4.525 1.15v6.9Zm19.95 1.8L1.7 5.35 3.8 3.2l39.75 39.75Z"/></svg><div class="hint">開啟麥克風 (⌘ + D)</div>`
    document.getElementById('mic').style.backgroundColor = "rgb(234, 67, 53)";
  }
}

// check if its cam
function checkCam() {
  if (document.getElementById('cam').classList[0] == "closed"){
    document.getElementById('cam').innerHTML = `<svg width="24" height="24" viewBox="0 0 48 48" fill="white"><path d="m44.75 34.25-8-8v5.85l-4-3.95v-16.9h-16.9l-3.95-4h20.85q1.65 0 2.825 1.175Q36.75 9.6 36.75 11.25v10.5l8-8Zm-2.05 12.8L1.55 5.85l2.3-2.35L45.1 44.75ZM24.4 19.8Zm-4.6 4.35ZM7.65 7.25l3.95 4H7.25v25.5h25.5V32.4l3.95 3.95v.95q-.2 1.4-1.325 2.4t-2.625 1H7.25q-1.6 0-2.775-1.175Q3.3 38.35 3.3 36.75v-25.5q0-1.5 1-2.625T6.7 7.3Z"/></svg>
      <span class="hint">開啟攝影機 (⌘ + E)</span>`
    document.getElementById('cam').style.backgroundColor = "rgb(234, 67, 53)"
    document.getElementById('cam').classList.remove("closed")
  }
  else {
    document.getElementById('cam').innerHTML = `<svg width="24" height="24" viewBox="0 0 48 48" fill="white"><path d="M7.1 40.95q-1.65 0-2.9-1.275T2.95 36.8V11.2q0-1.65 1.25-2.925T7.1 7h25.55q1.7 0 2.95 1.275 1.25 1.275 1.25 2.925v10.4l8.2-8.2v21.2l-8.2-8.2v10.4q0 1.6-1.25 2.875t-2.95 1.275Zm0-4.15h25.55V11.2H7.1v25.6Zm0 0V11.2v25.6Z"/></svg>
      <span class="hint">關閉攝影機 (⌘ + E)</span>`
    document.getElementById('cam').style.backgroundColor = "rgb(60,64,67)";
    document.getElementById('cam').classList.add("closed")
  }
}

// initialization
initGuests()
getCurrentTime()
setInterval(getCurrentTime, 1000)