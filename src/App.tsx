import AnimationContainer from "./components/module/animation";
import SiteHeader from "./components/module/header";

export default function App() {
  return (
    <div className="w-full min-h-screen p-0">

        <SiteHeader />

      <main className="w-full overflow-x-hidden">
        <AnimationContainer />
      </main>
    </div>
  );
}