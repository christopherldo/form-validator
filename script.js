const search = element => document.querySelector(element);

const b7Validator = {
  handleSubmit: event => {
    event.preventDefault();

    let send = true;
    let inputs = form.querySelectorAll('input');

    for (let i = 0; i < inputs.length; i++) {
      let input = inputs[i];
      let check = b7Validator.checkInput(input);

      if (check !== true) {
        send = false;
        console.log(check);
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

            break;
        };
      };
    };

    return true;
  }
}

let form = search('.b7validator');

form.addEventListener('submit', b7Validator.handleSubmit);