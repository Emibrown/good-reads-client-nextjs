import React from "react";
import Banner from '@/components/Banner'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from "next-i18next";

export default function Home({books}) {
  const {t} = useTranslation();

  return (
    <>
      <Banner/>
      <div className="flex flex-1 bg-white text-black justify-center items-center py-[20px] px-[30px]">
          <div className="max-w-[1200px] flex-1">
            <div>
              <h1 className="text-[30px] text-[#9f9387] font-bold">{t("home:welcome_title")}</h1>
              <p className="text-[20px]">
                {t("home:welcome_msg")}
              </p>
            </div>
          </div>
      </div>
    </>
  )
}

export async function getServerSideProps({ locale }) {

  return {
    props: {
      ...(await serverSideTranslations(locale, ['home'])),
    }
  } 
}
