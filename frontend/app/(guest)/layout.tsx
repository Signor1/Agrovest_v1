import GuestFooter from "@/components/shared/GuestFooter";
import GuestHeader from "@/components/shared/GuestHeader";

export default function GuestLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <section className="w-full">
            <GuestHeader />
            <main className="w-full">{children}</main>
            <GuestFooter />
        </section>
    );
}