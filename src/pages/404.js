import Link from 'next/link'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from "next-i18next";

export default function FourOhFour() {
const {t} = useTranslation();
  return (
    <div className='flex flex-1 flex-col w-full h-full justify-center items-center text-black pt-[100px]'>
        <h1 className='text-[30px]'>{t("home:page_not_found")}</h1>
        <Link href="/">
           {t("home:back_home")}
        </Link>
    </div>
  )
}

export async function getStaticProps({ locale }) {

    return {
      props: {
        ...(await serverSideTranslations(locale, ['home'])),
      }
    } 
  }