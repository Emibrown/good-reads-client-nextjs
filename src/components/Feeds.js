import { useTranslation } from "next-i18next";

export default function Feeds() {
    const { t } = useTranslation();

    return (
      <div className="flex flex-1 bg-white text-black justify-center items-center py-[20px] px-[30px]">
          <div className="max-w-[1200px] flex-1">
            <div>
              <h1 className="text-[30px] text-[#9f9387] font-bold">{t("home:feeds_page_title")}</h1>
              <p className="text-[20px]">
                {t("home:feed_msg")}
              </p>
            </div>
          </div>
      </div>
    )
  }
  