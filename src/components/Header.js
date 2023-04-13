import React, {useContext} from "react";
import Link from "next/link"
import { UserContext } from "@/providers/UserContextProvider";

export default function Header() {
  const { isSignedIn, signOut } = useContext(UserContext)

  const logout = async (e) => {
    e.preventDefault()
    signOut()
  }

  return (
    <div className="flex flex-1 bg-[#f4f2e9] justify-center items-center py-[20px] px-[30px]">
        <div className="max-w-[1200px] flex flex-1 flex-col justify-between">
            <div className="flex flex-1 items-center justify-between">
                <Link href="/" className="flex flex-1 text-[30px] md:text-[35px] text-[#9f9387]"><span className="text-[#46301f]">My</span>Book<span className="text-[#46301f]">Library</span></Link>
                {isSignedIn() ? (
                    <div className="flex flex-1 text-black items-center justify-end">
                        <a href="" onClick={logout} className="text-[20px]">Logout</a>
                    </div>
                ): null}
            </div>
            {isSignedIn() ? (
            <div className="flex flex-1 text-black items-center mt-[20px] space-x-[30px]">
                <Link href="/book/add" className="text-[22px]">Add book</Link>
                <Link href="/book/books" className="text-[22px]">My books</Link>
            </div>
            ): null}
        </div>
    </div>
  )
}
