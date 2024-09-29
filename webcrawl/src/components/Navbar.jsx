"use client";
import React, { useState } from "react";
import { Menu, MenuItem, HoveredLink } from "./ui/navbar-menu";
import { cn } from "../lib/utils";
import Link from "next/link";

function Navbar({ className }) {
    const [active, setActive] = useState(null);
    return (
        <div className={cn(" max-w-2xl mx-auto my-8 ", className)}>
            <Menu setActive={setActive}>
                <Link href={"/"}>
                    <MenuItem setActive={setActive} active={active} item="Home" href="/">
                    </MenuItem>
                </Link>
                <Link href={"/Query"}>
                    <MenuItem setActive={setActive} active={active} item="Query" href="/Query">
                    </MenuItem>
                </Link>
                <MenuItem setActive={setActive} active={active} item="Settings" href="Settings">
                    <div className="flex flex-col space-y-4 text-sm">
                        <HoveredLink href="/Profile">Profile</HoveredLink>
                        <HoveredLink href="/Logout">Logout</HoveredLink>
                    </div>
                </MenuItem>
            </Menu>
        </div>

    )
}

export default Navbar
