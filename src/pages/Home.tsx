import { Header } from "@/components/Header/Header";
import { Main } from "@/components/Main/Main";
import './Home.scss';

export function Home() {
  return (
    <div className="home">
      <Header />
      <Main />
    </div>
  );
}

export default Home;