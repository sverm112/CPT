import React from 'react';

  import { toast } from 'react-toastify';
 

  const toastMessage =(props : any) =>{
    return (
      toast.success(props.message)
    )
  }

  export default toastMessage;