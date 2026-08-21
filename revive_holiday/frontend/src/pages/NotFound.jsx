import { LuCompass } from "react-icons/lu";
import Button from "../components/shared/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center gap-6 bg-navy-950 px-6 pt-24 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-amber-400">
        <LuCompass size={30} />
      </span>
      <h1 className="text-4xl font-bold text-white">Looks Like You&rsquo;re Off the Map</h1>
      <p className="max-w-md text-navy-200">
        The page you&rsquo;re looking for doesn&rsquo;t exist. Let&rsquo;s get you back on
        course.
      </p>
      <Button to="/" variant="primary">
        Back to Home
      </Button>
    </section>
  );
}
