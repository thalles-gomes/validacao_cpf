class CPF_validation 
{
    constructor()
    {
        this.P_MSG = document.querySelector('[data-MSG]');
        this.BOX = document.querySelector('[data-status]');
        this.FIELD_CPF = document.getElementById('fieldCPF');
        this.BUTTON_CPF_VALIDATION = document.getElementById('validaCPF');
    }

    start()
    {
        this._catchClicks();
    }

    _catchClicks()
    {
        this.BUTTON_CPF_VALIDATION.addEventListener('click', () => {

            this._resultValidation();
        });

        this.FIELD_CPF.addEventListener('keypress', (e) => {
            
            // Formatação dos valores inseridos no input
            let inputLength = this.FIELD_CPF.value.length;
            if(inputLength === 3 || inputLength === 7) this.FIELD_CPF.value += '.';
            if(inputLength === 11) this.FIELD_CPF.value += '-';

            // Execução da função caso seja pressionado enter
            if(e.key === 'Enter')
            {
                this._resultValidation();
            }
        });
    }

    _resultValidation()
    {
        // o valor dentro do input está sendo enviado formatado
        const VALIDATION = this._cpfValidation(String(this.FIELD_CPF.value).replace(/\D+/g, ''));

        this.FIELD_CPF.focus();

        if (VALIDATION)
        {
            this.P_MSG.style.color = '#00e600';
            this.P_MSG.innerText = 'CPF Válido';
            this.BOX.dataset.status = 'valid';
        }else
        {    
            this.P_MSG.style.color = '#e60000';
            this.P_MSG.innerText = 'CPF Inválido';
            this.BOX.dataset.status = 'invalid';      
        }
    }
    
    _cpfValidation(sentCPF)
    {
        if(sentCPF.length !== 11) return false;
        if(this._isSequence(sentCPF)) return false;
        const NEW_CPF = this._newCPF(sentCPF.slice(0, -2));
        return NEW_CPF === sentCPF;
    }

    _isSequence(sentCPF)
    {
        return sentCPF[0].repeat(sentCPF.length) === sentCPF;
    }

    _newCPF(cleanCPF)
    {
        const FIRST_DIGIT = this._createDigit(cleanCPF);
        const SECOND_DIGIT = this._createDigit(cleanCPF + FIRST_DIGIT);
        return cleanCPF + FIRST_DIGIT + SECOND_DIGIT;
    }

    _createDigit(cleanCPF)
    {
        let reverse = cleanCPF.length + 1;
        const TOTAL = cleanCPF.split('').reduce((acc, value) => {
           const PRODUCT = Number(value) * reverse;
            reverse--;
            // o resultado do calculo é somado ao acumulador
            return acc + PRODUCT;
        }, 0);

        // calculo realizado para adquirir os últimos dígitos, se for um valor maior que 9 retorna '0'
        const RESULT = 11 - (TOTAL % 11);
        return RESULT > 9 ? '0': String(RESULT);
    }
}

const CPF_VALIDATION = new CPF_validation();
CPF_VALIDATION.start();
