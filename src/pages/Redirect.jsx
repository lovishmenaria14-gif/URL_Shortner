import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUrl } from "../db/apiUrls";

const Redirect = () => {
  const { id } = useParams();

  useEffect(() => {
    const redirect = async () => {
      try {
        console.log("Short code:", id);

        const url = await getUrl(id);

        console.log("Supabase result:", url);

        if (!url) {
          alert("Link not found");
          return;
        }

        window.location.replace(url.original_url);
      } catch (err) {
        console.error("ERROR:", err);
      }
    };

    redirect();
  }, [id]);

  return (
    <div className="flex h-screen items-center justify-center text-2xl font-bold">
      Redirecting...
    </div>
  );
};

export default Redirect;