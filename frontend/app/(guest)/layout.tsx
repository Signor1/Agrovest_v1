
export default function GuestLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <section className="w-full">
            {/* <Header /> */}
            <main className="w-full">{children}</main>
            {/* <Footer /> */}
        </section>
    );
}