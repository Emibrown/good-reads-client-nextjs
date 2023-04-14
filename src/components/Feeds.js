import { useTranslation } from "next-i18next";
import Image from "next/image";
import StarRating from "./StarRating";
import moment from "moment";

export default function Feeds({books=[]}) {
    const { t } = useTranslation();

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    return (
      <div className="flex flex-1 bg-white text-black justify-center items-center py-[20px] px-[30px]">
          <div className="max-w-[1200px] flex-1">
            <div>
              <h1 className="text-[30px] text-[#9f9387] font-bold">{t("home:feeds_page_title")}</h1>
              <p className="text-[20px]">
                {t("home:feed_msg")}
              </p>
            </div>
            <ul>
                  {books.map((book) => (
                    <li
                      key={book.id}
                      className="relative rounded-md p-3 hover:bg-gray-100"
                    >
                      <div>
                        <Image alt='' loader={() => book.coverImage} src={book.coverImage} width={50} height={50}/>
                      </div>
                      <h3 className="text-[20px] font-medium leading-5">
                        {book.title}
                      </h3>
  
                      <ul className="mt-1 flex space-x-1 text-[18px]font-normal leading-4 text-gray-500">
                        <li>{book.author} Author</li>
                        <li>&middot;</li>
                        {/* <li>{book.rating} Rating</li> */}
                        <li><StarRating max={5} value={book.rating}/></li>
                      </ul>

                      <ul className="mt-1 flex space-x-1 text-[18px] font-normal leading-4 text-gray-500">
                        <li>{moment(new Date(parseInt(book.updatedAt))).format('LLL')} Date</li>
                      </ul>
  
                      <div
                        className={classNames(
                          'absolute inset-0 rounded-md',
                          'ring-blue-400 focus:z-10 focus:outline-none focus:ring-2'
                        )}
                      />
                    </li>
                  ))}
                </ul>
          </div>
      </div>
    )
  }
  