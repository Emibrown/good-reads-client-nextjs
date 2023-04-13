export default function FormInput({label, ...props}) {

    return (
      <div className=" my-[10px] w-[100%]">
        <p className="text-[18px] m-2">{label}</p>
        <input className="w-[100%] h-[50px] border-[1px] border-black rounded-[50px] p-4" {...props}/>
      </div>
    )
  }
  