let stepBtn = document.querySelector('.js-step');
        let stepGroup = document.querySelector('.step-group');
        let stepItem = document.querySelectorAll('.step-item');
        let firstForm = document.querySelector('.js-first-form');
        let secondForm = document.querySelector('.js-second-form');
        let thirdForm = document.querySelector('.js-third-form');
        let recepitBtn = document.querySelectorAll('.section-check-receipt-item');
        let recepitEle = document.querySelector('.js-recepit-ele');
        let recepitMail = document.querySelector('.js-recepit-mail');
        let stepCount = 0;
        let recepitFlag = false;
        stepItem[stepCount].className = 'step-item__active'

        stepBtn.addEventListener('click', stepHandler);
        recepitBtn.forEach(item => {
            item.addEventListener('click', function(e){
                lastClass = e.target.classList.length - 1;
                if(e.target.classList[lastClass] === 'active') return;
                if(recepitFlag === true){
                    recepitBtn[0].classList.add('active');
                    recepitBtn[1].classList.remove('active');
                    recepitEle.style = 'display: flex';
                    recepitMail.style = 'display: none';
                    recepitFlag = !recepitFlag;
                }else{
                    recepitBtn[1].classList.add('active');
                    recepitBtn[0].classList.remove('active');
                    recepitEle.style = 'display: none';
                    recepitMail.style = 'display: flex';
                    recepitFlag = !recepitFlag;
                }
                
            })
        })




        function stepHandler(e){
            e.preventDefault();

            if(stepCount <= 3){
                stepItem[stepCount].className = 'step-item__check';
                stepCount++;
                if(stepCount == 1){
                    firstForm.style = 'display:none';
                    secondForm.style = 'display:block';
                    stepItem[stepCount].className = 'step-item__active';
                }else if(stepCount == 2){
                    secondForm.style = 'display:none';
                    thirdForm.style = 'display:block';
                    stepBtn.textContent = '確認結帳'
                    stepItem[stepCount].className = 'step-item__active';
                }else if(stepCount == 3){
                    window.location.href="./checkout-success.html"
                }
            }
        }