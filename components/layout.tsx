import { NavigationBar } from "../components/navigationBar";
import { ReactElement } from "react";

export const Layout = (props: { children?: ReactElement }) => {
  return (
    <div className="w-full flex flex-col min-h-screen">
      <NavigationBar />
      {props.children}
      <footer className="text-center">
        <div className="divider text-xs">Candy Machine V2 Toolkit</div>
      </footer>
    </div>
  );
};
