import {HomeFooter} from "./_components/HomeFooter";
import {HomeNav} from "./_components/HomeNav";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HomeNav />
      <HomeFooter />
    </main>
  );
}