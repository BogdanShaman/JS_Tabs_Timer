window.addEventListener('DOMContentLoaded', function() {

    "use strict";
    let infoHeaderTab = document.querySelectorAll('.info-header-tab'),
        infoHeader = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {
        for( let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1);

    function showTabContent(b) {
        if(tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    infoHeader.addEventListener('click', function(e) {
        let target = e.target;
        if( target && target.classList.contains('info-header-tab') ) {
            for( let i = 0; i < infoHeaderTab.length; i++ ) {
                if(target == infoHeaderTab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                }
            }
        }
    });

    //TIMER //TIMER   //TIMER    //TIMER    //TIMER    //TIMER //

    let deadline = '2019-07-11';

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t/1000) % 60),
            minutes = Math.floor((t/1000/60) % 60),
            hours = Math.floor(t / (1000 * 60 * 60)) - 3;

        return {
            'total' : t,
            'hours' : hours < 10 ? '0' + hours : hours,
            'minutes' : minutes < 10 ? '0' + minutes :  minutes,
            'seconds' : seconds < 10 ? '0' + seconds : seconds
        }
    }

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

            function updateClock() {
                let t = getTimeRemaining(endtime);
                hours.textContent = t.hours;
                minutes.textContent = t.minutes;
                seconds.textContent = t.seconds;

                if( t.total <= 0 ) {
                    clearInterval(timeInterval);
                }
            }
    }
   
    setClock('timer', deadline);

    //Modal window

    let more = document.querySelector('.more'),
        descriptionBtn = document.querySelectorAll('.description-btn'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');

        function showMore() {
            overlay.style.display = 'block';
            more.classList.add('more-splash');
            document.body.style.overflow = 'hidden';
        }

        more.addEventListener('click', showMore);
        
        for (let i = 0; i < descriptionBtn.length; i++) {
            descriptionBtn[i].addEventListener('click', showMore);
        }

        close.addEventListener('click', function() {
            overlay.style.display = 'none';
            more.classList.remove('more-splash');
            document.body.style.overflow = '';
        });
});