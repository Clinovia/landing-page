"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type SidebarLeafItem = {
  title: string;
  href: string;
};

type SidebarParentItem = {
  title: string;
  children: SidebarLeafItem[];
};

type SidebarItem = SidebarLeafItem | SidebarParentItem;

type SidebarSection = {
  title: string;
  href: string;
  items: SidebarItem[];
};

const sidebar: SidebarSection[] = [
  {
    title: "Cardiology",
    href: "/protected/cardiology",
    items: [
      { title: "ASCVD", href: "/protected/cardiology/ascvd" },
      { title: "Blood Pressure Categorization", href: "/protected/cardiology/bp-category" },
      { title: "CHA2DS2-VASc", href: "/protected/cardiology/cha2ds2vasc" },
      { title: "ECG Interpreter", href: "/protected/cardiology/ecg-interpreter" },
      { title: "Batch Processing", href: "/protected/cardiology/batch" },
      { title: "Reports", href: "/protected/cardiology/reports" },
    ],
  },
  {
    title: "Neurology / Alzheimer",
    href: "/protected/alzheimer",
    items: [
      { title: "Risk Screener", href: "/protected/alzheimer/risk-screener" },
      {
        title: "Diagnosis",
        children: [
          { title: "Screening", href: "/protected/alzheimer/diagnosis-screening" },
          { title: "Basic Features", href: "/protected/alzheimer/diagnosis-basic" },
          { title: "Extended Features", href: "/protected/alzheimer/diagnosis-extended" },
        ],
      },
      {
        title: "Prognosis (2yr)",
        children: [
          { title: "Basic Features", href: "/protected/alzheimer/prognosis-2yr-basic" },
          { title: "Extended Features", href: "/protected/alzheimer/prognosis-2yr-extended" },
        ],
      },
      { title: "Batch Processing", href: "/protected/alzheimer/batch" },
      { title: "Reports", href: "/protected/alzheimer/reports" },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen p-4 border-r bg-background overflow-y-auto">
      <nav className="space-y-6">
        {sidebar.map((section) => (
          <div key={section.title}>
            <Link
              href={section.href}
              className="font-semibold text-lg mb-2 block hover:underline text-foreground"
            >
              {section.title}
            </Link>

            <ul className="ml-2 space-y-1">
              {section.items.map((item) =>
                "children" in item ? (
                  <li key={item.title}>
                    <span className="font-medium text-foreground">{item.title}</span>
                    <ul className="ml-4 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <li key={child.title}>
                          <Link
                            href={child.href}
                            className={`text-sm hover:underline ${
                              pathname === child.href
                                ? "text-primary font-semibold"
                                : "text-muted-foreground"
                            }`}
                          >
                            {child.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li key={item.title}>
                    <Link
                      href={item.href}
                      className={`hover:underline ${
                        pathname === item.href
                          ? "text-primary font-semibold"
                          : "text-muted-foreground"
                      }`}
                    >
                      {item.title}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
