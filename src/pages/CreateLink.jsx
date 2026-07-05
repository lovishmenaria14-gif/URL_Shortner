import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { UrlState } from "../Context";
import { createUrl } from "../db/apiUrls";

const CreateLink = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { user } = UrlState();

  const [title, setTitle] = useState("");
  const [customUrl, setCustomUrl] = useState("");

  const original_url = searchParams.get("longURL") || "";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = await createUrl({
        title,
        original_url,
        custom_url: customUrl,
        user_id: user.id,
      });

      console.log(url);

      navigate("/Dashboard");
    
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Create Link</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          value={original_url}
          disabled
        />

        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Input
          placeholder="Custom URL (optional)"
          value={customUrl}
          onChange={(e) => setCustomUrl(e.target.value)}
        />

        <Button type="submit">
          Create Short Link
        </Button>
      </form>
    </div>
  );
};

export default CreateLink;