class Validator {
    constructor() {
        this.validations = [
            'data-required',
            'data-min-length',
            'data-max-length',
            'data-email-validate',
            'data-only-letter',
            'data-equal',
            'data-password-validate'
        ]
    }
    // Iniciar validação
    validate(form) {
        //resgata as validações
        let currentValidations = document.querySelectorAll('form .error-validation')

        if(currentValidations.length > 0) {
            this.cleanValidations(currentValidations)
        }
        // pegar os inputs
        let inputs = form.getElementsByTagName('input');
        // HTMLColecction -> array
        let inputsArray = [...inputs]
        // Loop nos inputs e validação mediante ao que for encontrado
        inputsArray.forEach(function(input) {
            // loop em todas as validações
            for(let i = 0; this.validations.length > i ; i++){
                // Verifica se a validação atual existe no input
                if(input.getAttribute(this.validations[i]) != null){
                    console.log('teste')
                    let method = this.validations[i].replace('data-', '').replace('-', '')
                    // Valor do input
                    let value = input.getAttribute(this.validations[i])
                    // Invocar o metodo
                    this[method](input, value);   
                }
            }

        }, this)
    }
    // Valida senha
    passwordvalidate(input){
        //explodir string em um array
        let chaArr = input.value.split("")
        let uppercases = 0
        let numbers = 0
        console.log(chaArr)
        for(let i = 0; chaArr.length > i; i++){
            if(chaArr[i] === chaArr[i].toUpperCase() && isNaN(parseInt(chaArr[i]))) {
                uppercases++
            } else if (!isNaN(parseInt(chaArr[i]))) {
                numbers++
            }

        }
        if(uppercases === 0 || numbers === 0){
            let errorMessage = `A senha precisa de um caractere maiúsculo e um número`
            this.printMessage(input, errorMessage) 
        }
    }
    // Verifica se dois campos são iguais
    equal(input, inputName) {
        let inputToCompare = document.getElementsByName(inputName)[0]

        let errorMessage = `As senhas não são iguais!`
        if(input.value != inputToCompare.value) {
            this.printMessage(input, errorMessage)
        }
    }
  
    // Valida se tem apenas letras
    onlyletter(input) {
        let re = /^[A-Za-z]+$/
        let inputValue = input.value

        let errorMessage = `Este campo não aceita numeros nem caracteres especiais`

        if(!re.test(inputValue)) {
            this.printMessage(input, errorMessage)
        }
    }
    // Valida emails
    emailvalidate(input) {
        //email@email.com
        let re = /\S+@\S+\.\S+/

        let email = input.value

        let errorMessage = `Insira um e-mail no padrão email@email.com`

        if(!re.test(email)) {
            this.printMessage(input,errorMessage)
        }
    }
    // Veririfa se passou dos limites de caracteres
    maxlength(input, maxValue){
        let inputLenght = input.value.length;
       let errorMessage = `O campo não pode ter mais de ${maxValue} caracteres`
       if(inputLenght > maxValue){
            this.printMessage(input, errorMessage)
       }
    }
    // Verifica se tem minimo de caracterers
    minlength(input, minValue) {
       let inputLenght = input.value.length;
       let errorMessage = `O campo precisa ter pelo menos ${minValue} caracteres`
       if(inputLenght < minValue){
            this.printMessage(input, errorMessage)
       }

    } // Metodo para imprimir mensagem de erro na tela
    printMessage(input, msg) {
        //Quantidade de erros
        let errorsQty = input.parentNode.querySelector('.error-validation')
        if(errorsQty === null) {
            let template = document.querySelector('.error-validation').cloneNode(true)
            template.textContent = msg
            let inputParent = input.parentNode
            template.classList.remove('template')
            inputParent.appendChild(template)
        }
    }
    //Verifica se o input é requerido
    required(input) {
        let inputValue = input.value
        if(inputValue == ''){
            let errorMessage = `Este campo é obrigatório`
            this.printMessage(input, errorMessage)
        }
    }
    // Limpa as validações
    cleanValidations(validations) {
        validations.forEach(el => el.remove())
    }
}


let form = document.getElementById("register-form")
let submit = document.getElementById("btn-submit")
let validator = new Validator()

// Evento que dispara as validaçoes

submit.addEventListener('click', (e) => {
    e.preventDefault()
    validator.validate(form)
})