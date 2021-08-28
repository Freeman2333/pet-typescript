export interface LeftMenuRoute {
  key: string;
  icon?: string;
  label?: string;
  link?: string;
  show?: boolean;
  regexr: RegExp;
}

export const leftMenuRoutes: LeftMenuRoute[] = [
  {
    key: "dashboard",
    icon: "pie-chart",
    label: "Dashboard",
    link: "/",
    regexr: new RegExp(/^\/$/)
  },
  {
    key: "invoices",
    icon: "snippets",
    label: "Invoices",
    link: "/invoices",
    regexr: new RegExp(/^\/invoices(.+)?$/)
  }
];
