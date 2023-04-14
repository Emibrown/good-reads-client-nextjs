import React, {useContext} from "react";
import Link from "next/link"
import { UserContext } from "@/providers/UserContextProvider";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

export default function Header() {
  const { isSignedIn, signOut } = useContext(UserContext)
  const { t } = useTranslation();
  const router = useRouter();

  const { locales, locale: activeLocale } = router;

  const otherLocales = locales?.filter(
    (locale) => locale !== activeLocale && locale !== "default"
  );

  const logout = async (e) => {
    e.preventDefault()
    signOut()
  }

  return (
    <div className="flex flex-1 bg-[#f4f2e9] justify-center items-center py-[20px] px-[30px]">
        <div className="max-w-[1200px] flex flex-1 flex-col justify-between">
            <div className="flex flex-1 items-center justify-between">
                <div className=" flex justify-center items-center space-x-[20px]">
                    <Link href="/" className="flex flex-1 text-[30px] md:text-[35px] text-[#9f9387]"><span className="text-[#46301f]">My</span>Book<span className="text-[#46301f]">Library</span></Link>
                    <span className=" text-sm cursor-pointer text-black">
                        {otherLocales?.map((locale) => {
                            const { pathname, query, asPath } = router;
                            return (
                            <span key={"locale-" + locale}>
                                <Link href={{ pathname, query }} as={asPath} locale={locale}>
                                    {locale === "en" ? "English" : locale === "de" ? "Garmany" : null}
                                </Link>
                            </span>
                            );
                        })}
                    </span>
                </div>
                {isSignedIn() ? (
                    <div className="flex flex-1 text-black items-center justify-end">
                        <a href="" onClick={logout} className="text-[20px]">{t("home:logout")}</a>
                    </div>
                ): null}
            </div>
            {isSignedIn() ? (
            <div className="flex flex-1 text-black items-center mt-[20px] space-x-[30px]">
                <Link href="/book/add" className="text-[22px]">{t("home:add_bk")}</Link>
                <Link href="/book/books" className="text-[22px]">{t("home:my_bk")}</Link>
            </div>
            ): null}
        </div>
    </div>
  )
}
