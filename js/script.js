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
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds
        }
    }

    
   
    getTimeRemaining(deadline);
});