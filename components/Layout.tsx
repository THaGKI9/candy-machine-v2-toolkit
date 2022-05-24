import { ReactElement } from "react";
import { NavigationBar } from "../components/NavigationBar";

export default function Layout(props: { children?: ReactElement[] | ReactElement }) {
  return (
    <div className="w-full flex flex-col min-h-screen">
      <NavigationBar />
      <main className="m-8 flex-grow">{props.children}</main>
      <footer className="text-center mx-8 mt-12">
        <div className="divider text-xs">Candy Machine V2 Toolkit</div>
      </footer>
    </div>
  );
}
