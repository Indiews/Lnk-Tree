import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Lnk Tree Admin",
    description: "Your custom and open Link Tree alternative.",
    robots: "index, follow",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased bg-white text-black bg-none min-h-screen">
                {children}
            </body>
        </html>
    );
}
