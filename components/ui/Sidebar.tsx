"use client"
import Link from "next/link"
import Image from "next/image"
import { sidebarLinks } from "@/constants"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import Footer from "./Footer"

interface SidebarProps {
  user: {
    name: string
    avatarUrl: string
  }
}

function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname()

  return (
    <section className='sidebar'>
      <nav className="flex-col flex gap-4">
        <Link href="/" className="mb-12 flex cursor-pointer items-center gap-2">
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            draggable="false"
            alt="bob logo"
            className="size-[24px] lg:size-[30px] mx-xl:size-20"
          />
          <h1 className="sidebar-logo">B_O_B</h1>
        </Link>

        {sidebarLinks.map((item, index) => {
          const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`)
          return (
            <Link
              href={item.route}
              key={index}
              className={cn("sidebar-link", { "bg-bank-gradient": isActive })}
            >
              <div className=" relative size-6">
                <Image src={item.imgURL} alt={item.label} fill className={cn({"brightness-[3] invert-0":isActive})}></Image>
              </div>
              <p className={cn("sidebar-label",{"!text-white":isActive})}>{item.label}</p>
            </Link>
          )
        })}
        USER
      </nav>
      <Footer  user={user} />
    </section>
  )
}

export default Sidebar
