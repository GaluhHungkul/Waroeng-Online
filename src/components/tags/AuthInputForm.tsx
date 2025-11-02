import { FC, ReactNode } from "react";

type Props = {
  errorMessage? : string;
  inputForm : ReactNode
}

const AuthInputForm : FC<Props>= ({ errorMessage, inputForm }) => {

  return (
    <div className='lg:pb-2 '>
      {inputForm}
      <p className='text-red-500 lg:text-sm lg:pt-2 '>{errorMessage}</p>
    </div>
  )
}

export default AuthInputForm