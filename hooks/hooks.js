import { useState } from "react"
import toast from "react-hot-toast"

const useAsyncMutation=(mutationHook)=>{
    const [isloading,setIsLoading]=useState(false)
    const [data,setData]=useState(null)
    const [mutate]=mutationHook()

    const executeMutation=async (toastMessage,...args)=>{
        setIsLoading(true)
        const toastId=toast.loading(toastMessage || "Updating Data....")
        try{
            const res=await mutate(...args)
            console.log(res);


            if(res.data){
              toast.success(res.data.message || "Data Updated Successfully",{
                id:toastId
              })
              setData(res.data)
            }
            else{
              toast.error(res?.error?.data?.message || "Something went wrong",{
                id:toastId
              })
            }
      
          }
          catch(e){
            console.log(e)
            toast.error("Something went wrong",{
                id:toastId
              })
          }
        finally{
            setIsLoading(false)
        }
    }
    return [executeMutation,isloading,data]
}

export {useAsyncMutation}