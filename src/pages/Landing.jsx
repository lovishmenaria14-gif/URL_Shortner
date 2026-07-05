import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";

const Landing = () => {
  const [longURL, setLongUrl] = useState("");
  const navigate = useNavigate();

  const handleShorten = (e) => {
    e.preventDefault();

    if (!longURL) return;

    navigate(
      `/auth?createNew=true&longURL=${encodeURIComponent(longURL)}`
    );
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-white text-center font-extrabold">
        The Only URL Shortner <br /> you&rsquo;ll ever need! 👇
      </h2>

      <form
        onSubmit={handleShorten}
        className="sm:h-14 flex flex-col sm:flex-row w-full md:w-2/4 gap-2"
      >
        <Input
          type="url"
          value={longURL}
          placeholder="Enter your looooong URL"
          onChange={(e) => setLongUrl(e.target.value)}
          className="h-full flex-1 py-4 px-4"
        />

        <Button
          className="h-full"
          type="submit"
          variant="destructive"
        >
          Shorten!
        </Button>
      </form>

      <img
        src="/banner.png"
        alt="banner"
        className="w-full my-11 md:px-11"
      />

      <Accordion type="multiple" className="w-full md:px-11">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            Do I need an account to use the app?
          </AccordionTrigger>
          <AccordionContent>
            Yes, creating an account allows you to manage your URLs, view analytics,
            and customize your short URLs.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>
            How does SnapLink work?
          </AccordionTrigger>
          <AccordionContent>
            When you enter a long URL, SnapLink generates a shorter version that
            redirects to the original URL.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>
            What analytics are available?
          </AccordionTrigger>
          <AccordionContent>
            You can track clicks, locations, devices, and other useful insights
            for every shortened link.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Landing;