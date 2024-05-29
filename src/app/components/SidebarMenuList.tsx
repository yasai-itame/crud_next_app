'use client'
import Link from 'next/link'
import SvgIcon from './SvgIcon'
import { usePathname } from 'next/navigation'

interface SideMenuList {
  type?: 'accordion'
  id: string
  title: string
  link?: string
  icon: boolean
  subMenu?: {
    title: string
    link: string
  }[]
}

const linkStyle = `flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600`

const currentLinkStyle = `flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-900 dark:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600`

const accordionButtonStyle = `hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:hs-accordion-active:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600`

const subMenuLinkStyle = `flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600`

const SidebarMenuList: React.FC<SideMenuList> = ({ type, id, title, link = '/', icon, subMenu }) => {

  const pathname = usePathname()
  let current = pathname.split('/')[1]
  if (!current) current = '/'

  if (type == 'accordion') {
    return (
      <li className="hs-accordion" id={id}>
        <button type="button" className={accordionButtonStyle}>
          {
            icon && <SvgIcon type={title} />
          }
          {title}
          <SvgIcon type="DownArrow" />
          <SvgIcon type="UpArrow" />
        </button>
        <div id={`${id}-sub`} className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden">
          <ul className="pt-2 ps-2">
            {
              subMenu?.length != 0 && subMenu?.map((v) => {
                return (
                  <li key={v.link}>
                    <Link href={v.link} className={subMenuLinkStyle}>
                      {v.title}
                    </Link>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </li>
    )
  }

  
  return (
    <li>
      {
        current == link ?
        <a className={currentLinkStyle}>
          {
            icon && <SvgIcon type={title} />
          }
          {title}
        </a> :
        <Link href={link} className={linkStyle}>
          {
            icon && <SvgIcon type={title} />
          }
          {title}
        </Link>
      }
    </li>
  )
}

export default SidebarMenuList