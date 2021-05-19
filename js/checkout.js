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







        var vm = new Vue({
            el: '#registerApp',
              data: {
                basicInfo: {
                  name: '',
                  tel: '',
                  email: '',
                },
                companyInfo: {
                  companyName: '',
                  companyScale: '',
                  industry: '',
                  industryInput: '',
                  jobTitle: '',
                  analysisRole: '',
                  analysisFrequency: '',
                },
                disclaimerRead: false,
                active: 0,
                dialogVisible: false,
                labelPosition: '',
                isProcessing: false,
                isLoading: true,
                isRegisterFull: null,
                theRegisterWasFull:"",
                url:"",
              },
              mounted: function() {
                //if (!(window.location.search.includes('QNZaX5') || window.location.search.includes('WrUQK2'))) {
                //  window.location.replace(window.location.origin);
                //}
                this.updateLabelPosition()
                window.addEventListener('resize', function() {
                  vm.updateLabelPosition()
                })
                this.getRegisterLimt()
                this.getUrl()
              },
              methods: {
                getUrl: function(){
                  vm.url = window.location.href;
                  console.log(vm.url)
                },
                updateLabelPosition: function() {
                    this.labelPosition = window.innerWidth > 1180 ? 'right' : 'top'
                },
                nextStep: function() {
                    window.scroll(0, 0)
                    if (vm.active++ > 2) vm.active = 0;
                },
                prevStep: function() {
                    window.scroll(0, 0)
                    if (vm.active-- < 0) vm.active = 2;
                },
                validateBasicInfoForm: function(formName) {
                    vm.$refs[formName].validate(function(valid) {
                        if (valid) vm.nextStep()
                    });
                },
                validateCompanyInfoForm: function(formName) {
                    vm.$refs[formName].validate(function(valid) {
                        if (valid) vm.submitForm()
                    });
                },
                submitForm: function() {
                  vm.isProcessing = true
                  
                  $.ajax({
                    url: "http://0.0.0.0:5000/test",
                    method: "POST",
                    contentType: 'application/x-www-form-urlencoded',
                    data: {
                      name: vm.basicInfo.name,
                      tel:vm.basicInfo.tel,
                      email:vm.basicInfo.email,
                      companyName: vm.basicInfo.companyName,
                      identify: vm.basicInfo.identify,
                    },
                    success: function(data11){
                      if (data11 == 'True'){
                        vm.active = 2;
                      }else{
                        vm.active = 3;
                        vm.theRegisterWasFull = data11;
                        console.log($(".sent-reminding"))
                      }
                    },error: function (err){
                      console.log(err)
                    }
                  });
                  
                },
                getRegisterLimt: function () {
                  $.ajax({
                    method: 'GET',
                    url: 'http://0.0.0.0:5000/loading',
                    success: function (data) {
                      if(data =='True'){
                        vm.isLoading = false;
                        vm.isRegisterFull = data;
                        $(".loading").css('display','none');
                        $(".form__body").css('display','block');
                        
                      }else{
                        alert(data)
                        vm.active = 2;
                        vm.isLoading = false;
                        $(".loading").css('display','none');
                        $(".form__body").css('display','block');
                        $(".sent-reminding").html(data);
                      }
                      
                    },
                    error: function (err) {
                      
                      console.log(err)
                    }
                  });
                }
              },
              watch: {
                  'companyInfo.industryInput': function(newVal) {
                      vm.companyInfo.industry = newVal ? '其他' : null
                  }
              }
          })
          // 切換語言版本，並導至當前頁面
          
          $(document).ready(function() {
            var langData = {
              "production": {
                "zh-tw": "http://www.synergies.com.tw",
                "zh-cn": "http://www.synergiesai.cn"
              },
              "stage": {
                "zh-tw": "http://twdev.sis.ai",
                "zh-cn": "http://cndev.sis.ai"
              }
            }
            var btns = $('.lang-btn')
            
            btns.click(function (e) {
              e.preventDefault()
              var lang = this.dataset.lang
              var isProduction = !(location.hostname === 'cndev.sis.ai' || location.hostname === 'twdev.sis.ai' || location.hostname === 'localhost')
              var env = isProduction ? 'production' : 'stage'
          
              location.href = langData[env][lang] + location.pathname + location.search
            })
          
            // footer get new datetime
            var theDate = new Date()
            $('#footer-year').text('© 2017 - ' + theDate.getFullYear() + ' Synergies Intelligent Systems, Inc. All rights reserved.')
          });



