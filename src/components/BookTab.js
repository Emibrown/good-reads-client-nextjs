import { Tab } from '@headlessui/react'
import Image from 'next/image';
import moment from 'moment';
import Link from 'next/link';

const tabTitle = ['Want to read','Reading','Read'];

export default function BookTab({books = []}) {

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
    
    return (
      <div className="w-full max-w-full px-2 py-8 sm:px-0">
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-[#f4f2e9] p-1">
            {tabTitle.map((title, i) => (
              <Tab
                key={i}
                className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-[#9f9387]',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-[#9f9387] focus:outline-none focus:ring-2',
                    selected
                      ? 'bg-white shadow'
                      : 'text-[#9f9387] hover:bg-white/[0.12]'
                  )
                }
              >
                {title}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-2">
            {tabTitle.map((title, idx) => (
              <Tab.Panel
                key={idx}
                className={classNames(
                  'rounded-xl bg-white p-3',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                )}
              >
                <ul>
                  {books.filter((item)=>item.bookCollection === title).map((book) => (
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
                        <li>{book.rating} Rating</li>
                        <li>&middot;</li>
                      </ul>

                      <ul className="mt-1 flex space-x-1 text-[18px] font-normal leading-4 text-gray-500">
                        <li>{moment(new Date(parseInt(book.addedOn))).format('LLL')} Date</li>
                      </ul>
  
                      <Link
                        href={`/book/books/${book.id}`}
                        className={classNames(
                          'absolute inset-0 rounded-md',
                          'ring-blue-400 focus:z-10 focus:outline-none focus:ring-2'
                        )}
                      />
                    </li>
                  ))}
                </ul>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    )
  }