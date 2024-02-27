import type { Metadata } from 'next';
import { Dancing_Script, IBM_Plex_Sans, Oleo_Script_Swash_Caps } from 'next/font/google';
import { cn } from '@/lib/utils';
import { ClerkProvider } from '@clerk/nextjs';

import './globals.css';

const IBMPlex = IBM_Plex_Sans({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-ibm-plex',
});

const OleoScriptSwashCaps = Oleo_Script_Swash_Caps({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-oleo-script-swash-caps',
});

export const metadata: Metadata = {
    title: 'AI Pixel',
    description: 'AI-powered image generator',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider
            appearance={{
                variables: { colorPrimary: '#624cf5' },
            }}
        >
            <html lang="en">
                <body
                    className={cn(
                        'font-IBMPlex antialiased',
                        IBMPlex.variable,
                        OleoScriptSwashCaps.variable,
                    )}
                >
                    {children}
                </body>
            </html>
        </ClerkProvider>
    );
}
