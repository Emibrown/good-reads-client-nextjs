import React, {useContext} from "react";
import Link from "next/link"
import { UserContext } from "@/providers/UserContextProvider";
import { useTranslation } from "next-i18next";

export default function AccountBox() {
  const { isSignedIn } = useContext(UserContext)
  const { t } = useTranslation();

  if(isSignedIn()) return null

  return (
    <div className="flex flex-1 flex-col justify-center items-center p-[20px] 
      bg-white md:absolute md:top-[-50px] md:right-[15%]"
    >
        <Link href="/user/signup" className="bg-[#f6d479] w-[100%] text-center justify-center items-center 
          inline-block text-black py-[10px] px-[20px] mb-[20px]"
        >
          {t("home:create_acc")}
        </Link>
        <Link href="/user/login" className="bg-black inline-block text-center w-[100%] text-white py-[10px] px-[20px]">
          {t("home:sign_in")}
        </Link>
    </div>
  )
}
