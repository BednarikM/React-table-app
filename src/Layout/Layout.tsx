import { Outlet, useNavigation } from "react-router-dom";
import Header from "../components/Header.tsx";
import SpinningLoader from "../components/SpinningLoader.tsx";

export default function Layout() {
  // Must be used in Router and this solution because deffer (in route loader) will be deprecated in V7
  const navigation = useNavigation();

  return (
    <div className="page">
      <Header />
      {navigation.state === "loading" ? (
        <SpinningLoader />
      ) : (
        <main className="page__content">
          <Outlet />
        </main>
      )}
    </div>
  );
}
