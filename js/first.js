class Calculator {
    constructor(previousText, currentText) {
        this.previousText = previousText
        this.currentText = currentText
        this.clear()
    }
    clear() {
        this.current = ''
        this.previous = ''
        this.operator = undefined
    }
    append(number) {
      if(number==='.' && this.current.includes('.')) return
        this.current = this.current.toString()+number.toString()
    }
    operations(operator){
        if(this.current==='') return
        if(this.previous!='') this.compute()
        this.operator=operator
        this.previous=this.current
        this.current=''
    }
    update() {
        if(this.operator!=undefined )
         this.previousText.innerText=this.previous.toString()+this.operator
        else
         this.previousText.innerText=''
           
        this.currentText.innerText = this.current
       

    }
    compute(){
        switch(this.operator)
        {
            case '+':
                this.current=parseFloat(this.current)+parseFloat(this.previous)
                break  
            case '-':
                this.current=parseFloat(this.previous)-parseFloat(this.current)
                break       
            case '*':
                this.current=parseFloat(this.current)*parseFloat(this.previous)
                break         
            case '/':
               this.current=parseFloat(this.previous)/parseFloat(this.current)
                break 
            case '%':
                this.current=parseFloat(this.previous*100)/parseFloat(this.current)
                break 
            default:
                return

            }
        this.previous=''
        this.operator=undefined
      
    }
    backspace(){
        
        this.current= this.current.toString().slice(0,-1)
        if(this.current==='') {
            
            this.current=this.previous
            this.previous=''
            this.operator=undefined
        }
    }

}

const numberButtons = document.querySelectorAll('[data-number]')
const operations = document.querySelectorAll('[data-operator]')
const equals = document.querySelector('[data-equal]')
const clearall = document.querySelector('[data-clear]')
const backspace = document.querySelector('[data-delete]')
const previousText = document.querySelector('[data-previous]')
const currentText = document.querySelector('[data-current]')

const cal = new Calculator(previousText, currentText)
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        cal.append(button.innerText)
        cal.update()
    })
})
operations.forEach(operation => {
    operation.addEventListener('click', () => {
        cal.operations(operation.innerText)
        cal.update()
    })
})

equals.addEventListener('click', () => {
    cal.compute()
    cal.update()
})
clearall.addEventListener('click', () => {
    cal.clear()
    cal.update()
})

backspace.addEventListener('click', () => {
    cal.backspace()
    cal.update()
})