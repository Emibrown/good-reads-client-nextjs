export default function ErrorMessage({message, ...props}) {

    if(!message) return null;
  
    return (
     <div 
       className=" bg-[#fff5f4] px-[30px] py-[20px] rounded-[20px] mb-[10px]"
       {...props}
     >
        <p className=" text-[22px]">There was a problem</p>
        <p className=" text-[18px]">{message}</p>
     </div>
    )
  }
  