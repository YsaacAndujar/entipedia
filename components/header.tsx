import { SidebarTrigger } from "./ui/sidebar"

export const Header = () => {
    return (
        <header className="flex items-center h-16 px-4 py-2 border-b w-full gap-x-5">
            <SidebarTrigger />
            <a href="/" className="flex items-center space-x-2 h-full">
                <img
                    src="/logo-full.png"
                    alt="Logo"
                    className="h-full object-contain"
                />
            </a>
        </header>
    )
}
