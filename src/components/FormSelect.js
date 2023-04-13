export default function FormSelect({label, options=[], ...props}) {

    return (
      <div className=" my-[10px] w-[100%]">
        <p className="text-[18px] m-2">{label}</p>
        <select className="w-[100%] h-[50px] border-[1px] border-black rounded-[50px] p-4" {...props}>
            {options.map((option, i) => (
                <option key={i} value={option} >
                    {option}
                </option>
            ))}
        </select>
      </div>
    )
  }
  