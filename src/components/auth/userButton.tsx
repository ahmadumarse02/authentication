"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { FaUser } from "react-icons/fa"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { Button } from "../ui/button"
import { logout } from "@/actions/logout"
import { useTransition } from "react"

const UserButton = () => {
    const user = useCurrentUser()
    const [isPending, startTransition] = useTransition()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={user?.image || ""} />
                    <AvatarFallback className="bg-blue-400">
                        <FaUser className="text-white" />
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
                    <Button 
                        onClick={() => startTransition(logout)}
                        disabled={isPending}
                        variant="outline"
                    >
                        {isPending ? "Logging out..." : "Logout"}
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserButton
