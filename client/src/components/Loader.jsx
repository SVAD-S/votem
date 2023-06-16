import BC_SVG from "../assets/BC.png";
import { useAuthContext } from "./custom/hooks/useAuthContext";

const Loader = () => {
  const { loading } = useAuthContext();

  if (loading)
    return (
      <div className="min-h-screen w-full absolute top-0 left-0  flex flex-col justify-center items-center bg-[#f5f5f5b3] pointer-events-none z-[1000]">
        <div className="flex">
          <img src={BC_SVG} alt="loading" className="animate-bounce " />
        </div>
        <h2 className="text-xl font-semibold">Loading...</h2>
      </div>
    );
  else <></>;
};

export default Loader;
