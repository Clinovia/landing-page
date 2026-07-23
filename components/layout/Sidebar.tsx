"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

type SidebarItem = {
  title: string;
  href?: string;
  children?: SidebarItem[];
};

type Section = {
  title: string;
  href?: string;
  items?: SidebarItem[];
};

const SIDEBAR: Section[] = [
  {
    title: "Risk Assessment",
    items: [
      {
        title: "Essential Assessment",
        href: "/risk-assessment",
      },
      {
        title: "Enhanced Assessment",
        href: "/risk-assessment-mri",
      },
    ],
  },
];

function SidebarLink({
  href,
  title,
  depth = 0,
}: {
  href: string;
  title: string;
  depth?: number;
}) {
  const pathname = usePathname();

  const active = pathname === href;

  return (
    <Link
      href={href}
      className={clsx(
        "block rounded-lg px-3 py-2 text-sm transition-colors",
        depth > 0 && "ml-4",
        active
          ? "bg-black text-white dark:bg-white dark:text-black"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      {title}
    </Link>
  );
}

function SidebarItemNode({
  item,
  depth = 0,
}: {
  item: SidebarItem;
  depth?: number;
}) {
  return (
    <div className="space-y-1">
      {item.href ? (
        <SidebarLink
          href={item.href}
          title={item.title}
          depth={depth}
        />
      ) : (
        <div
          className={clsx(
            "px-3 py-2 text-sm font-medium text-foreground",
            depth > 0 && "ml-4"
          )}
        >
          {item.title}
        </div>
      )}

      {item.children && (
        <div className="space-y-1">
          {item.children.map((child) => (
            <SidebarItemNode
              key={child.title}
              item={child}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Sidebar() {
  return (
    <aside className="w-72 border-r bg-background p-6">
      <div className="mb-8">
        <h2 className="text-xl font-semibold">
          Clinovia AI
        </h2>
      </div>

      <nav className="space-y-6">
        {SIDEBAR.map((section) => (
          <div
            key={section.title}
            className="space-y-2"
          >
            {section.href ? (
              <SidebarLink
                href={section.href}
                title={section.title}
              />
            ) : (
              <h3 className="px-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {section.title}
              </h3>
            )}

            {section.items && (
              <div className="space-y-1">
                {section.items.map((item) => (
                  <SidebarItemNode
                    key={item.title}
                    item={item}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}