import AccountBox from "./AccountBox"

export default function Banner() {
  return (
    <div className="flex flex-1 bg-[#fff7e9] justify-center items-center">
        <div className=" relative max-w-[1700px] flex-1 h-[300px] p-[40px] justify-center 
          items-center bg-cover bg-center bg-no-repeat" 
          style={{ backgroundImage: `url(/banner.png)`}}
        >
          <AccountBox />
        </div>
    </div>
  )
}
