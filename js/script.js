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

    let deadline = '2019-07-12';

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
            seconds = timer.querySelector('.seconds');

            if(getTimeRemaining(endtime).total <= 0) {
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
                return;
            }

            let timeInterval = setInterval(updateClock, 1000);

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

        //Form

        // let message = {
        //     loading: 'Загрузка...',
        //     success: 'Спасибо! Скоро мы с вами свяжемся!',
        //     failure: 'Что-то пошло не так...'
        // };

        // let form = document.querySelector('.main-form'),
        //     input = form.getElementsByTagName('input'),
        //     statusMessage = document.createElement('div');
        //     statusMessage.classList.add('status');
        //     form.addEventListener('submit', function(event) {
        //         event.preventDefault();
        //         form.appendChild(statusMessage);
        //         let req = new XMLHttpRequest();
        //         req.open('POST', 'server.php');
        //         req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        //         let formData = new FormData(form);
        //         req.send(formData);
        //         req.addEventListener('readystatechange', function() {
        //             if(req.readyState < 4) statusMessage.innerHTML = message.loading;
        //             else if(req.readyState === 4 && req.status == 200) statusMessage.innerHTML = message.success;
        //             else statusMessage.innerHTML = message.failure;
        //         });

        //         for(let i = 0; i < input.length; i++) input[i].value = '';
        //     });
        function sendFormData(classNameMessage, urlServerFile) {
            let message = {
                loading : "Loading...",
                success : "Success!",
                failure : "Error!"
            };
            let statusMessage = document.createElement('div');
                statusMessage.classList.add(classNameMessage);

            document.body.addEventListener('click', function(e) {
                let form;
                e.preventDefault(); 
                if(e.target.type == 'submit') e.path.forEach(function(item, i) {
                    if(item.tagName == 'FORM') {
                        form = e.path[i];
                        form.appendChild(statusMessage);
                        let req = new XMLHttpRequest();
                        req.open('POST', urlServerFile);
                        req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                        let formData = new FormData(form);
                        req.send(formData);
                        req.addEventListener('readystatechange', function() {
                            if(req.readyState < 4) statusMessage.innerHTML = message.loading;
                            else if(req.readyState === 4 && req.status == 200) statusMessage.innerHTML = message.success;
                            else statusMessage.innerHTML = message.failure;
                        });
                        let inputs = form.querySelectorAll('input');
                        for(let i = 0; i < inputs.length; i++) {
                            if(inputs[i].type == 'submit') continue;
                            inputs[i].value = '';
                        }
                    }
                });
            });
        }      
        sendFormData('status', 'server.php');
});