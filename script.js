const search = element => document.querySelector(element);
const searchAll = element => document.querySelectorAll(element);

const b7Validator = {
  handleSubmit: event => {
    event.preventDefault();

    let send = true;
    let inputs = form.querySelectorAll('input');

    b7Validator.clearErrors();

    for (let i = 0; i < inputs.length; i++) {
      let input = inputs[i];
      let check = b7Validator.checkInput(input);

      if (check !== true) {
        send = false;
        b7Validator.showError(input, check);
      };
    };

    if (send) {
      form.submit();
    };
  },
  checkInput: input => {
    let rules = input.getAttribute('data-rules');

    if (rules) {
      rules = rules.split('|');

      for (let k in rules) {
        let ruleDetails = rules[k].split('=');

        switch (ruleDetails[0]) {
          case 'required':
            if (input.value === '') {
              return 'Este campo não pode estar vazio.'
            };
            break
          case 'min':
            if(input.value.length < ruleDetails[1]) {
              return `Esse campo precisa ter pelo menos ${ruleDetails[1]} caracteres.`;
            };
            break;
          case 'email':
            if(input.value != ''){
              let regex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
              if(!regex.test(input.value.toLowerCase())){
                return `O e-mail digitado não é valido.`
              };
            };
            break;
        };
      };
    };

    return true;
  },
  showError: (input, error) => {
    input.style.borderColor = '#ff0000';

    let elementClass = 'error';
    let errorElement = `<div class="${elementClass}">${error}</div>`;

    input.parentElement.insertAdjacentHTML('beforeend', errorElement);
  },
  clearErrors: () => {
    let inputs = form.querySelectorAll('input');

    for (let i = 0; i < inputs.length; i++) {
      inputs[i].style = '';
    };

    let errorElements = searchAll('.error');

    for (let i = 0; i < errorElements.length; i++) {
      errorElements[i].remove();
    };
  }
}

let form = search('.b7validator');

form.addEventListener('submit', b7Validator.handleSubmit);