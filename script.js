"use strict";

const LOCATIONS = [
  {title:"アサリの思い",lat:34.684999,lng:137.598998,cursorPhotoUrl:"1-min.jpg",clickPhotoUrl:"1.jpg"},
  {title:"ぷらゴミ、やどかり",lat:34.690076,lng:137.600551,cursorPhotoUrl:"2-min.jpg",clickPhotoUrl:"2.jpg"},
  {title:"夏を眺めて",lat:34.715005,lng:137.556874,cursorPhotoUrl:"3-min.jpg",clickPhotoUrl:"3.jpg"},
  {title:"黄昏",lat:34.715517,lng:137.556626,cursorPhotoUrl:"4-min.jpg",clickPhotoUrl:"4.jpg"},
  {title:"帰り道",lat:34.766787,lng:137.528518,cursorPhotoUrl:"5-min.jpg",clickPhotoUrl:"5.jpg"},
  {title:"私の知らない場所",lat:34.767168,lng:137.549814,cursorPhotoUrl:"6-min.jpg",clickPhotoUrl:"6.jpg"},
  {title:"海風",lat:34.771016,lng:137.548462,cursorPhotoUrl:"7-min.jpg",clickPhotoUrl:"7.jpg"},
  {title:"ただいま",lat:34.792471,lng:137.610777,cursorPhotoUrl:"8-min.jpg",clickPhotoUrl:"8.jpg"},
  {title:"寸座",lat:34.79013,lng:137.612441,cursorPhotoUrl:"9-min.jpg",clickPhotoUrl:"9.jpg"},
  {title:"一歩。",lat:34.798355,lng:137.6304,cursorPhotoUrl:"10-min.jpg",clickPhotoUrl:"10.jpg"},
  {title:"坂から",lat:34.798915,lng:137.623468,cursorPhotoUrl:"11-min.jpg",clickPhotoUrl:"11.jpg"},
  {title:"この先には",lat:34.794384,lng:137.643479,cursorPhotoUrl:"13-min.jpg",clickPhotoUrl:"13.jpg"},
  {title:"寄り道",lat:34.787545,lng:137.639553,cursorPhotoUrl:"14-min.jpg",clickPhotoUrl:"14.jpg"},
  {title:"大人になっても",lat:34.713627,lng:137.584052,cursorPhotoUrl:"15-min.jpg",clickPhotoUrl:"15.jpg"},
  {title:"放課後のたのしみ",lat:34.727091,lng:137.627818,cursorPhotoUrl:"16-min.JPG",clickPhotoUrl:"16.JPG"},
  {title:"夏の入り口",lat:34.730714,lng:137.633955,cursorPhotoUrl:"17-min.jpg",clickPhotoUrl:"17.jpg"},
  {title:"夏の香り",lat:34.74825,lng:137.597368,cursorPhotoUrl:"18-min.jpg",clickPhotoUrl:"18.jpg"},
  {title:"跳びたい",lat:34.73578,lng:137.590538,cursorPhotoUrl:"19-min.jpg",clickPhotoUrl:"19.jpg"},
  {title:"堤防、向かい家",lat:34.739419,lng:137.635416,cursorPhotoUrl:"20-min.jpg",clickPhotoUrl:"20.jpg"},
  {title:"約束。",lat:34.739419,lng:137.635416,cursorPhotoUrl:"21-min.jpg",clickPhotoUrl:"21.jpg"},
  {title:"2人だけの場所",lat:34.754443,lng:137.637512,cursorPhotoUrl:"22-min.jpg",clickPhotoUrl:"22.jpg"},
  {title:"帰りたくない",lat:34.754166,lng:137.63767,cursorPhotoUrl:"23-min.jpg",clickPhotoUrl:"23.jpg"},
  {title:"跳べ。",lat:34.754345,lng:137.638774,cursorPhotoUrl:"24-min.jpg",clickPhotoUrl:"24.jpg"},
  {title:"未来",lat:34.72978,lng:137.625388,cursorPhotoUrl:"25-min.jpg",clickPhotoUrl:"25.jpg"},
  {title:"守る",lat:34.715879,lng:137.556415,cursorPhotoUrl:"26-min.jpg",clickPhotoUrl:"26.jpg"},
  {title:"2人だけの秘密基地",lat:34.77066,lng:137.54886,cursorPhotoUrl:"27-min.jpg",clickPhotoUrl:"27.jpg"},
  {title:"約束の場所で",lat:34.766644,lng:137.5558146,cursorPhotoUrl:"28-min.jpg",clickPhotoUrl:"28.jpg"},
  {title:"おはよう",lat:34.6914208,lng:137.5965531,cursorPhotoUrl:"29-min.jpg",clickPhotoUrl:"29.jpg"},
  {title:"君だけを",lat:34.6936172,lng:137.5896255,cursorPhotoUrl:"30-min.jpg",clickPhotoUrl:"30.jpg"},
  {title:"夏の味",lat:34.6886062,lng:137.6028874,cursorPhotoUrl:"31-min.jpg",clickPhotoUrl:"31.jpg"},
  {title:"青と白",lat:34.6873965,lng:137.6021598,cursorPhotoUrl:"32-min.jpg",clickPhotoUrl:"32.jpg"},
  {title:"見つけた",lat:34.799544,lng:137.630064,cursorPhotoUrl:"33-min.JPG",clickPhotoUrl:"33.JPG"},
  {title:"思いでのオレンジ",lat:34.80172,lng:137.62627,cursorPhotoUrl:"35-min.JPG",clickPhotoUrl:"35.JPG"},
  {title:"いつかの帰り道",lat:34.80119,lng:137.62665,cursorPhotoUrl:"36-min.JPG",clickPhotoUrl:"36.JPG"},
  {title:"気持ちの良い朝",lat:34.796237,lng:137.564791,cursorPhotoUrl:"37-min.JPG",clickPhotoUrl:"37.JPG"},
  {title:"またいつか",lat:34.823251,lng:137.599873,cursorPhotoUrl:"38-min.JPG",clickPhotoUrl:"38.JPG"},
  {title:"特別な場所",lat:34.798896,lng:137.62348,cursorPhotoUrl:"44-min.jpg",clickPhotoUrl:"44.jpg"},
  {title:"守りたいこの笑顔",lat:34.7235,lng:137.62499,cursorPhotoUrl:"45-min.jpg",clickPhotoUrl:"45.jpg"},
  {lat:34.7235,lng:137.62499},
  {title:"君となら",lat:34.68943,lng:137.60113,cursorPhotoUrl:"46-min.jpg",clickPhotoUrl:"46.jpg"},
  {title:"親友と",lat:34.76747,lng:137.54962,cursorPhotoUrl:"41-min.JPG",clickPhotoUrl:"41.JPG"}
];

const PHOTO_LOCATIONS = LOCATIONS.filter(location => location.clickPhotoUrl);
const state = {map:null,markers:[],infoWindow:null,userMarker:null,statusTimer:null};

function escapeHtml(value="") {
  return value.replace(/[&<>'"]/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[char]);
}

function seasonFor(location) {
  const title = location.title || "";
  if (/春|spring/i.test(title)) return "spring";
  if (/夏|summer/i.test(title)) return "summer";
  if (/秋|autom|autumn/i.test(title)) return "autumn";
  if (/冬|winter/i.test(title)) return "winter";
  return "all";
}

function showStatus(message) {
  const element = document.getElementById("map-status");
  clearTimeout(state.statusTimer);
  element.textContent = message;
  element.classList.add("is-visible");
  state.statusTimer = setTimeout(() => element.classList.remove("is-visible"), 3200);
}

function openPhoto(location) {
  if (!location.clickPhotoUrl) return;
  const modal = document.getElementById("photo-modal");
  const image = document.getElementById("photo");
  image.dataset.fallback = "false";
  image.alt = location.title ? `${location.title}の写真` : "浜松の風景写真";
  image.src = location.clickPhotoUrl;
  document.getElementById("photo-title").textContent = location.title || "名称未設定のスポット";
  document.getElementById("photo-description").textContent = `緯度 ${location.lat} ・ 経度 ${location.lng}`;
  if (!modal.open) modal.showModal();
}

function createMarker(location) {
  const marker = new google.maps.Marker({
    map:state.map,position:{lat:location.lat,lng:location.lng},title:location.title || "写真スポット",
    icon:{url:"icon3.png",scaledSize:new google.maps.Size(34,34)},optimized:true
  });
  marker.season = seasonFor(location);
  marker.location = location;
  marker.addListener("click", () => openPhoto(location));
  if (location.cursorPhotoUrl) {
    marker.addListener("mouseover", () => {
      state.infoWindow.setContent(`<div class="preview"><img src="${escapeHtml(location.cursorPhotoUrl)}" alt="" loading="lazy"><strong>${escapeHtml(location.title)}</strong></div>`);
      state.infoWindow.open({map:state.map,anchor:marker,shouldFocus:false});
    });
    marker.addListener("mouseout", () => state.infoWindow.close());
  }
  return marker;
}

function fitVisibleMarkers() {
  const visible = state.markers.filter(marker => marker.getMap());
  if (!visible.length) return;
  const bounds = new google.maps.LatLngBounds();
  visible.forEach(marker => bounds.extend(marker.getPosition()));
  state.map.fitBounds(bounds, 70);
}

function filterMarkers(filter) {
  let shown = 0;
  state.markers.forEach(marker => {
    const visible = filter === "all" || marker.season === filter;
    marker.setMap(visible ? state.map : null);
    if (visible) shown += 1;
  });
  document.querySelectorAll(".filter").forEach(button => {
    const active = button.dataset.filter === filter;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  if (shown) fitVisibleMarkers(); else showStatus("この季節に分類された写真はまだありません");
}

function locateUser() {
  if (!navigator.geolocation) return showStatus("この端末では現在地を取得できません");
  const button = document.getElementById("locate");
  button.disabled = true;
  showStatus("現在地を確認しています…");
  navigator.geolocation.getCurrentPosition(position => {
    const point = {lat:position.coords.latitude,lng:position.coords.longitude};
    if (state.userMarker) state.userMarker.setMap(null);
    state.userMarker = new google.maps.Marker({map:state.map,position:point,title:"現在地",zIndex:999,icon:{path:google.maps.SymbolPath.CIRCLE,scale:9,fillColor:"#087b68",fillOpacity:1,strokeColor:"#fff",strokeWeight:4}});
    state.map.panTo(point); state.map.setZoom(15); button.disabled = false; showStatus("現在地を表示しました");
  }, error => {button.disabled=false;showStatus(error.code===1?"現在地の利用が許可されていません":"現在地を取得できませんでした");},{enableHighAccuracy:true,timeout:10000,maximumAge:60000});
}

function bindUi() {
  document.querySelectorAll(".filter").forEach(button => button.addEventListener("click", () => filterMarkers(button.dataset.filter)));
  document.getElementById("fit-map").addEventListener("click", fitVisibleMarkers);
  document.getElementById("locate").addEventListener("click", locateUser);
  const modal = document.getElementById("photo-modal");
  document.getElementById("close-photo").addEventListener("click", () => modal.close());
  modal.addEventListener("click", event => {if (event.target === modal) modal.close();});
  document.getElementById("photo").addEventListener("error", event => {
    const image = event.currentTarget;
    if (image.dataset.fallback === "true") return;
    image.dataset.fallback = "true";
    image.src = "icon3.png";
    image.alt = "この写真ファイルは現在利用できません";
    showStatus("この写真ファイルは現在利用できません");
  });
  document.getElementById("photo").addEventListener("load", event => {
    if (!event.currentTarget.src.endsWith("icon3.png")) event.currentTarget.dataset.fallback = "false";
  });
}

window.initMap = function initMap() {
  state.map = new google.maps.Map(document.getElementById("map"), {
    mapId:"39d03b6e2c12d6e6",center:{lat:34.73871,lng:137.59298},zoom:12.3,
    clickableIcons:false,fullscreenControl:false,mapTypeControl:false,streetViewControl:false,gestureHandling:"greedy"
  });
  state.infoWindow = new google.maps.InfoWindow({disableAutoPan:true});
  state.markers = LOCATIONS.map(createMarker);
  document.getElementById("photo-count").textContent = PHOTO_LOCATIONS.length;
  bindUi();
  google.maps.event.addListenerOnce(state.map,"tilesloaded", () => document.getElementById("loading").classList.add("is-hidden"));
  setTimeout(() => document.getElementById("loading").classList.add("is-hidden"), 8000);
};
