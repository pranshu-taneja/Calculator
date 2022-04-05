document.addEventListener('DOMContentLoaded',()=>{

    class calculator{
        constructor(prevOperand, currOperand){
            this.prevOperand = prevOperand;     //final ones
            this.currOperand = currOperand;     //final ones
            this.clear()
        }

        clear(){
            this.preOperand_ = ""       //temp for shifting to final ones by update display
            this.currOperand_ = ""      //temp for shifting to final ones by update display            
            this.operation = undefined       
        }
        
        append(apndText){
            if(apndText === "." && this.currOperand_.includes("."))return
            this.currOperand_ = this.currOperand_.toString() + apndText.toString()
        }
        
        delete(){
            this.currOperand_ = this.currOperand_.toString().slice(0,-1)
        }
        
        chooseoperation(operation){
            if(this.currOperand_ === "")return
            if(this.preOperand_ !== ""){
                this.compute()
            }
            this.operation = operation
            this.preOperand_ = this.currOperand_
            this.currOperand_ = ""
        } 
        
        compute(){
            let answer
            const prev = parseFloat(this.preOperand_)
            const cur = parseFloat(this.currOperand_)
            if(isNaN(prev) || isNaN(cur))return

            switch(this.operation){
                case'+':
                    answer = prev + cur
                    break;
                case'-':
                    answer = prev - cur
                    break;
                case'*':
                    answer = prev * cur
                    break;
                case'÷':
                    answer = prev / cur
                    break;
                default:
                    return
            }
            this.currOperand_ = answer
            this.operation = undefined
            this.preOperand_ = ""
        }

        getDisplayNumber(number){
            const floatnumber = parseFloat(number)
            if(isNaN(floatnumber))return''
            return floatnumber.toLocaleString('en')
        }

        updatedisplay(){
            this.currOperand.innerHTML = this.getDisplayNumber(this.currOperand_)
            this.prevOperand.innerHTML = this.preOperand_;
            if(this.operation != null){
                this.prevOperand.innerHTML = `${this.preOperand_} ${this.operation}`
            }
        }
    }
    const numberCal = document.querySelectorAll('[data-number]');       //need to use [] while searching for text data in elements
    const operationCal = document.querySelectorAll('[data-operation]')
    const deleteCal = document.querySelector('[data-delete]')
    const equalsCal = document.querySelector('[data-equals]')
    const allClrCal = document.querySelector('[data-all-clear]')
    const prevOperand = document.querySelector('[data-previous-operand]')
    const currOperand = document.querySelector('[data-current-operand]')


    const objcal1 = new calculator(prevOperand, currOperand)
    
    numberCal.forEach((button)=>{           //use foreach when using qsall() so that pass from all
        button.addEventListener("click",()=>{
            objcal1.append(button.innerHTML)
            objcal1.updatedisplay()
        })
    })
    operationCal.forEach((button)=>{
        button.addEventListener("click",()=>{
            objcal1.chooseoperation(button.innerHTML)
            objcal1.updatedisplay()
        })
    })

    equalsCal.addEventListener("click",()=>{            //  use direct eventlistner when using qs() only
        objcal1.compute()
        objcal1.updatedisplay()
    })

    allClrCal.addEventListener("click",()=>{
        objcal1.clear()
        objcal1.updatedisplay()
    })

    deleteCal.addEventListener("click",()=>{
        objcal1.delete()
        objcal1.updatedisplay()
    })

})
