import React, { useEffect, useState } from 'react'

function useFetch(url) {
    const [data,setData] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error,setError] = useState(null)

    useEffect(()=>{
        const controller = new AbortController()

        const fetchData = async() =>{
             setIsPending(true)
            try {
                const res = await fetch(url,{signal:controller.signal})
                if(!res.ok) throw new Error(res.statusText)
                
                const data = await res.json()
                setIsPending(false)
                setData(data)
                setError(null)
            } catch (error) {
                if(error.name === "AbortError"){
                    console.log("the fetch is aaborted")
                } else{
                    setIsPending(false)
                    setError('could not fetch the data')
                }  
            }
        }
        fetchData()
         
        return ()=>{
            controller.abort()
        }
    },[url])

  return (
    {data,isPending,error}
  )
}

export default useFetch