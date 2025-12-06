export type SidebarItem = {
    title: string;
    href: string;
    icon: React.ReactElement<React.ComponentPropsWithoutRef<"svg">>;
    isActive?: boolean;
}