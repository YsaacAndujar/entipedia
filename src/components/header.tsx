
export const Header = ({
}: Readonly<{
  children?: React.ReactNode;
}>) => {
    return (
        <div>
            <header className=" h-16 border-b bg-background flex items-center px-10 py-2 w-full">
                <a href="/" className="h-full">
                    <img
                        src="/logo-full.png"
                        alt="Logo"
                        className="h-full object-contain"
                    />
                </a>
            </header>
        </div>
    )
}
