import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className='flex min-h-screen w-full justify-between font-inter '>

             <Toaster />
            {children}
            <div className="auth-asset">
                <Image src="/icons/auth-image.svg" alt="auth-image" width={500} height={500}/>
            </div>
        </main>
    );
}
