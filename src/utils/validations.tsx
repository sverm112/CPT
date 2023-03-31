// During Form Submission we have to call validateForm
// (We have to give id for form element and we would call 
// validateForm like validateForm('#AddMarket')) in form 
// Submission while for individual fields we have to call 
// validateSingleFormGroup from individual fields onBlur inside input tag

// We have to add an error div as a sibling of the control

// We have to add attributes like PatternsAndMessages, required and others , 
// we also have to give ids for form-group 

const validationOptions = [
    {
      attribute:'minlength',
      isValid: (input: any)=> input.value && input.value.length >= parseInt(input.minLength,4),
      errorMessage: (input: any, label: any) => `${label.textContent} needs to be atleast ${input.minLength} characters`
    },
    {
      attribute: 'required',
      isValid: (input: any) => input.value.trim() !== '',
      errorMessage : (input: any, label: any) => `${label.textContent} is required`
    },
    {
      attribute: 'pattern',
      isValid: (input: any) => {
        const patternRegex = new RegExp(input.pattern);
        return patternRegex.test(input.value);
      },
      errorMessage: (input: any, label: any) => `Not a valid ${label.textContent}`
    }
  ];

export function validateSingleFormGroup(formGroup: any){
    const label = formGroup.querySelector('label');
    const input = formGroup.querySelector('input');
    const select = formGroup.querySelector('select');
    const datePicker = formGroup.querySelector('DatePicker');
    const errorContainer = formGroup.querySelector('.error');
    errorContainer.textContent='';
    
    for(const option of validationOptions){
      if(input !==null && input.hasAttribute(option.attribute) && !option.isValid(input)){
        errorContainer.textContent = option.errorMessage(input, label);
      }
      if(select !==null ){
        if(select.value==="0"){
          errorContainer.textContent = option.errorMessage(select, label);
          formGroup.querySelector('select').setAttribute('style','border-color:red;color:red');
        }else{
          formGroup.querySelector('select').setAttribute('style','');
        }
      }
      // console.log(formGroup.querySelector(".react-date-picker"));
      if(datePicker !==null){
        if(datePicker.value===null){
          console.log(formGroup.querySelector(".react-date-picker"));
          errorContainer.textContent = option.errorMessage(select, label);
          formGroup.querySelector(".react-date-picker").setAttribute('style','border-color:red;color:red');
        }
      }
    }
  };

export function validateForm(formSelector: any){
    const validateAllFormGroups = (formToValidate: any) => {
      const formGroups = Array.from(formToValidate.querySelectorAll('.form-group'));
      formGroups.forEach(formGroup => {
        validateSingleFormGroup(formGroup);
      })
    }
    const formElement = document.querySelector(formSelector);
    validateAllFormGroups(formElement);

    formElement.setAttribute('novalidate','');
  };

//   validateForm('#AddMarket')