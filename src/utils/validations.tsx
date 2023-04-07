// During Form Submission we have to call validateForm
// (We have to give id for form element and we would call 
// validateForm like validateForm('#AddMarket')) in form 
// Submission while for individual fields we have to call 
// validateSingleFormGroup from individual fields onBlur inside input tag

// We have to add an error div as a sibling of the control

// We have to add attributes like PatternsAndMessages, required and others , 
// we also have to give ids for form-group 

const inputValidationOptions = [
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
      errorMessage: (input: any, label: any) => `Please enter a valid ${label.textContent}`
    }
  ];

  const selectValidationOptions = [
    {
      attribute: 'required',
      isValid: (select: any) => select.value.trim() !== '',
      errorMessage : (select: any, label: any) => `Please select a valid ${label.textContent}`
    },
  ];
  const dateValidationOptions = [
    {
      attribute: 'required',
      isValid: (datePicker: any) => datePicker.value.trim() !== '',
      errorMessage : (datePicker: any, label: any) => `Please select a valid ${label.textContent}`
    },
  ];
export function validateInputFields(formGroup: any){
  const label = formGroup.querySelector('label');
  const input = formGroup.querySelector('input');
  const errorContainer = formGroup.querySelector('.error');
  errorContainer.textContent='';
  for(const option of inputValidationOptions){
    if(input !==null && input.hasAttribute(option.attribute) && !option.isValid(input)){
      errorContainer.textContent = option.errorMessage(input, label);
    }
}
}

export function validateSelectFields(formGroup: any){
  const label = formGroup.querySelector('label');
  const select = formGroup.querySelector('select');
  const errorContainer = formGroup.querySelector('.error');
  errorContainer.textContent='';
  for(const option of selectValidationOptions){
    if(select !==null ){
      if(select.value==="0"){
        errorContainer.textContent = option.errorMessage(select, label);
        // formGroup.querySelector('select').setAttribute('style','border-color:red;color:red');
      }else{
        formGroup.querySelector('select').setAttribute('style','');
      }
    }
  }

}

export function validateDatePicker(formGroup: any){
  const label = formGroup.querySelector('label');
  const datePicker = formGroup.querySelector('.react-date-picker__inputGroup__day');
  const monthPicker = formGroup.querySelector('.react-date-picker__inputGroup__month');
  const yearPicker = formGroup.querySelector('.react-date-picker__inputGroup__year');
  const errorContainer = formGroup.querySelector('.error');
  errorContainer.textContent='';
  console.log("Date value", datePicker.value);
  console.log("Month value", monthPicker.value);
  console.log("Year value", yearPicker.value);
  for(const option of dateValidationOptions){
    console.log("Hello: ",datePicker.value);
    errorContainer.textContent = "";
      if(datePicker !== null && !option.isValid(datePicker) ){
        errorContainer.textContent = option.errorMessage(datePicker, label);
      }else{
        errorContainer.textContent = "";
      }
  }
}

export function validateSingleFormGroup(formGroup: any, controlType: any){
    const errorContainer = formGroup.querySelector('.error');
    errorContainer.textContent='';
    if(controlType=='input'){
      validateInputFields(formGroup);
    }else if(controlType=='select'){
      validateSelectFields(formGroup);
    }else if(controlType=='datePicker'){
      validateDatePicker(formGroup);
    }
  };

export function validateForm(formSelector: any){
    const formGroupToBeValidated = document.querySelector(formSelector);
    const formFields = Array.from(formGroupToBeValidated.querySelectorAll('.form-group'));
    let i=0;
    // console.log("Form Fields", formFields);
    formFields.forEach((ff: any) => {
      console.log(`Form Fields ${++i}`, ff);
      const selectFields = ff.getElementsByTagName('select');
      const inputFields = ff.getElementsByTagName('input');
      // const dateFields = ff.querySelector('.react-date-picker__inputGroup__day');
      i=0;
      for(const selectField of selectFields){
        console.log(`Select Field ${++i}`, selectField);
        validateSingleFormGroup(ff, 'select');
      }
      i=0;
      for(const inputField of inputFields){
        console.log(`Input Field ${++i}`, inputField);
        validateSingleFormGroup(ff, 'input');
      }
      // i=0;
      // for(const dateField of dateFields){
      //   console.log(`Date Field ${++i}`, dateField);
      // }
    })
    // for(const ff of formFields){
    //   console.log(`Form Field ${++i}`, ff);
    //   const selectFields = ff.getElementsByTagName('select');
    //   const inputFields = formGroupToBeValidated.getElementsByTagName('input');
    //   const dateFields = formGroupToBeValidated.querySelector('.react-date-picker__inputGroup__day');
    //   for(const selectField of selectFields){
    //     console.log(`Select Field ${++i}`, selectField.parentNode);
    //   }
    //   i=0;
    //   for(const inputField of inputFields){
    //     console.log(`Input Field ${++i}`, inputField);
    //   }
    //   i=0;
    //   for(const dateField of dateFields){
    //     console.log(`Date Field ${++i}`, dateField);
    //   }
    // }

    const validateAllFormGroups = (formToValidate: any) => {
      const formGroups = Array.from(formToValidate.querySelectorAll('.form-group'));
      console.log("Validate Form: ", formGroups);
      formGroups.forEach(formGroup => {
        validateSingleFormGroup(formGroup, 'input');
      })
    }
    const formElement = document.querySelector(formSelector);
    validateAllFormGroups(formElement);

    formElement.setAttribute('novalidate','');
  };

//   validateForm('#AddMarket')