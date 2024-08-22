'use client'
import React from "react"
import Image from "next/image"
import logo from '@/assets/amu_logo.png'
export const Appbar =  () => {
    return(
        <div className="flex flex-row items-center gap-x-5 bg-white border-b border-black rounded-sm p-2">
            <Image src={logo} alt="logo" className="size-12 " />
            <h1 className="text-xl font-semibold text-gray-900">ALIGARH MUSLIM UNIVERSITY</h1>
        </div>
    )
}