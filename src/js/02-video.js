 import Player from '@vimeo/player';
 import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

// Функция для сохранения текущего времени в local storage
const saveCurrentTime = function () {
  player.getCurrentTime().then(function (seconds) {
  localStorage.setItem('videoplayer-current-time', Math.floor(seconds));
  });
};
// Каждую секунду фротлим
const throttledSave = throttle(saveCurrentTime, 1000);
// применяем метод on() и вызываем throttledSave function
player.on('timeupdate', throttledSave);

// достаем сохраненное время проигывания из local storage и продолжаем с этого момента
const savedTime = localStorage.getItem('videoplayer-current-time');
if (savedTime) {
  player.setCurrentTime(savedTime).then(function () {
    console.log('Воспроизведение возобновлено  сохраненной позиции:', savedTime);
  });
}
