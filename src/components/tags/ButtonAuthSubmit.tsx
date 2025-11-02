import { Button } from "../ui/button"

const ButtonAuthSubmit = ({ loadingSubmit, submitText="Sign In" } : { loadingSubmit : boolean, submitText? : string}) => {
  return (
    <Button type="submit" disabled={loadingSubmit} className="w-full flex relative justify-center rounded-md  px-3 py-1.5 text-sm/6 font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  md:text-xl md:py-2" >             
        {loadingSubmit ? (
        <div className="size-5  border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : <span>{submitText}</span>}
    </Button>
  )
}

export default ButtonAuthSubmit