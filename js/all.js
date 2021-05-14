let bar = document.querySelector('.js-barControl');
        let menu = document.querySelector('.js-menu');
        let flag = 0;
        bar.addEventListener('click', barHandler);


        function barHandler(e) {
            e.preventDefault();
            flag += 1;
            if (flag % 2 === 1) {
                menu.classList.add('show')
            } else {
                menu.classList.remove('show')
            }
        }

