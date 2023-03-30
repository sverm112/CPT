// During Form Submission we have to call validateForm
// (We have to give id for form element and we would call 
// validateForm like validateForm('#AddMarket')) in form 
// Submission while for individual fields we have to call 
// validateSingleFormGroup from individual fields onBlur inside input tag


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
    console.log("Hello Form Group", formGroup);
    const label = formGroup.querySelector('label');
    const input = formGroup.querySelector('input');
    const errorContainer = formGroup.querySelector('.error');

    errorContainer.textContent='';
    for(const option of validationOptions){
      if(input.hasAttribute(option.attribute) && !option.isValid(input)){
        errorContainer.textContent = option.errorMessage(input, label);
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