const ButtonAuthSubmit = ({ loadingSubmit, submitText="Sign In" } : { loadingSubmit : boolean, submitText? : string}) => {
  return (
    <button type="submit" disabled={loadingSubmit} className="w-4/5 flex h-[37px] relative justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-blue-900 " >             
        {loadingSubmit ? (
        <div className="size-5   absolute border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : <span>{submitText}</span>}
    </button>
  )
}

export default ButtonAuthSubmit