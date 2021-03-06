
function Validator(options){

    var selectorRules = {};

    function validate(inputElement, rule){
        var errorElement = inputElement.parentElement.querySelector(options.errorSelect);
        var errorMess;

        var rules = selectorRules[rule.selector];

        for(var i = 0; i < rules.length; ++i){
            errorMess = rules[i](inputElement.value);
            if(errorMess) break;
        }

        if(errorMess){
            errorElement.innerText = errorMess;
            inputElement.parentElement.classList.add('invalid');
        }else{
            errorElement.innerText = '';
            inputElement.parentElement.classList.remove('invalid');
        }

        return !errorMess;
    }

    var formElement = document.querySelector(options.form);

    if(formElement){
        formElement.onsubmit = function(e){
            e.preventDefault();

            var isFormValid = true;

            options.rules.forEach(function(rule){
            var inputElement = formElement.querySelector(rule.selector);
            var isValid  = validate(inputElement, rule);
            if(!isValid){
                isFormValid = false;
            }
            });            
            if(isFormValid){
                if(typeof options.onSubmit === 'function'){
                    var enableInputs = formElement.querySelectorAll('[name]')
                    var formValues = Array.from(enableInputs).reduce(function(values,input){
                        return (values[input.name]=input.value) && values
                    },{})
                    options.onSubmit(formValues)
                }else formElement.submit()
            } 
        }

        options.rules.forEach(function(rule){

            if(Array.isArray(selectorRules[rule.selector])){
                selectorRules[rule.selector].push(rule.test);
            }else {
                selectorRules[rule.selector] = [rule.test];
            }

            var inputElement = formElement.querySelector(rule.selector);
           
            if(inputElement){
                inputElement.onblur = function(){
                   validate(inputElement, rule);
                }

                inputElement.oninput = function(){
                    var errorElement = inputElement.parentElement.querySelector(options.errorSelect);
                    errorElement.innerText = '';
                    inputElement.parentElement.classList.remove('invalid');
                }
            }
        });
    }
}

Validator.isRequired = function(selector, message){
    return {
        selector: selector,
        test: function(value){
            return value.trim() ? undefined : message || 'Vui l??ng nh???p tr?????ng n??y';
        }
    };
}

Validator.isName = function(selector, message){
    return {
        selector: selector,
        test: function(value){
            return value.length >=5 ? undefined : message || 'H??? t??n ph???i c?? ????? d??i h??n 5 k?? t???';
        }
    };
}


Validator.isEmail = function(selector, message){
     return {
        selector: selector,
        test: function(value){
            var regax = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regax.test(value) ? undefined : message || 'Vui l??ng nh???p ????ng ?????nh d???ng email';
        }
    };
}

Validator.isPhone = function(selector, message){
    return {
       selector: selector,
       test: function(value){
           var regax = /^(84|0[3|5|7|8|9])+[0-9]{8}$/;
           return regax.test(value) ? undefined : 'Vui l??ng nh???p ????ng s??? ??i???n tho???i';
       }
   };
}


Validator.minLength = function(selector, message){
    return {
       selector: selector,
       test: function(value){
           return value.length >=8 ? undefined : 'Vui l??ng nh???p t???i thi???u 8 k?? t???';
       }
   };
}

Validator.isConfirm = function(selector, getConfirm, message){
    return {
       selector: selector,
       test: function(value){
           return value == getConfirm() ? undefined :'M???t kh???u kh??ng tr??ng kh???p';
       }
   };
}

Validator.isNotConfirm = function(selector, getConfirm, message){
    return {
       selector: selector,
       test: function(value){
           return value != getConfirm() ? undefined :'M???t kh???u m???i kh??ng ???????c tr??ng v???i m???t kh???u c??';
       }
   };
}

Validator.isAddress = function(selector, message){
    return {
        selector: selector,
        test: function(value){
            return value.length >=5 ? undefined : message || 'M???i b???n nh???p ?????a ch??? th???c t???';
        }
    };
}

Validator.isWard = function(selector, message){
    return {
        selector: selector,
        test: function(value){
            return value.trim() ? undefined : message || 'Vui l??ng nh???p tr?????ng n??y';
        }
    };
}





function showError(key, mess){
    document.getElementById(key + '_error').innerHTML = mess;
}

function validate()
{
    var flag = true;

    var timefrom = document.getElementById('time-from').value;
    if (timefrom == ''){
        showError('timefrom', 'Vui l??ng ch???n ng??y');
        flag = false;
    }
   
    else{
        showError('timefrom','');
        flag = true;
    }

    var timeto = document.getElementById('time-to').value;
    if (timeto == ''){
        showError('timeto', 'Vui l??ng ch???n ng??y');
        flag = false;
    }
   
    else{
        showError('timeto','');
        flag = true;
    }
}



//     var password = document.getElementById('pass').value;

//     if (password == '' ){
//         showError('pass', 'Vui l??ng kh??ng ????? tr???ng m???t kh???u');
//         flag = false;

//     }
//     else if (password.length < 8){
//         showError('pass', '????? d??i ph???i l???n h??n 8 k?? t???');
//         flag = false;

//     }
//     else{
//         showError('pass','');
//         flag = true;
//     }


//     var repassword = document.getElementById('repass').value;
//     if (repassword == '' ){
//         showError('repass', 'Vui l??ng kh??ng ????? tr???ng m???t kh???u');
//         flag = false;

//     }
//     else if (password != repassword){
//         showError('repass', 'M???t kh???u kh??ng tr??ng kh???p');
//         flag = false;
//     }
//     else{
//         showError('repass','');
//         flag = true;
//     }


//     var phone = document.getElementById('phone').value;
//     var phoneformat = /^(84|0[3|5|7|8|9])+[0-9]{8}$/;
//     if (phone == ''){
//         showError('phone', 'Vui l??ng kh??ng ????? tr???ng s??? ??i???n tho???i');
//         flag = false;
//     }
//     else if ( !phoneformat.test(phone)){
//         showError('phone', 'Vui l??ng nh???p ????ng s??? ??i???n tho???i');
//         flag = false;
//     }
//     else{
//         showError('phone','');
//         flag = true;
//     }


//     var email = document.getElementById('email').value;
//     var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
//     if (email == ''){

//         showError('email', 'Vui l??ng kh??ng ????? tr???ng email');
//         flag = false;

//     }
//     else if (!mailformat.test(email)){

//         showError('email', 'Sai ?????nh d???ng email');
//         flag = false;

//     }
//     else{
//         showError('email', '');
//         flag = true;
//     }


//     var birth = document.getElementById('birth').value;
//     if(birth == ''){
//         showError('birth','Vui l??ng ch???n ng??y sinh');
//         flag = false;
//     }
//     else{
//         showError('birth','');
//         flag = true;
//     }

//     return flag;
// } 