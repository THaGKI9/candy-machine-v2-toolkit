import React, { ReactNode } from "react";

interface LayoutProps {
  id?: string;
  description?: ReactNode;
  title: ReactNode;
  children: ReactNode;
}

export default function SetCollectionLayout(props: LayoutProps) {
  return (
    <section id={props.id}>
      <h1 className="text-3xl">{props.title}</h1>
      {props.description && <h3 className="pt-2 text-zinc-500">{props.description}</h3>}
      <article className="pt-8 flex flex-row gap-12">{props.children}</article>
    </section>
  );
}
