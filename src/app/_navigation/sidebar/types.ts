export type SidebarItem = {
    separator?: boolean;
    title: string;
    href: string;
    icon: React.ReactElement<React.ComponentPropsWithoutRef<"svg">>;
    isActive?: boolean;
}