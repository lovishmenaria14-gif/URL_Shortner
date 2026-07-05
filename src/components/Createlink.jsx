import { useEffect, useRef, useState } from "react";
import { QRCode } from "react-qrcode-logo";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BeatLoader } from "react-spinners";
import { useNavigate, useSearchParams } from "react-router-dom";

import { UrlState } from "../Context";
import useFetch from "../hooks/Use-fetch";
import { createUrl } from "../db/apiUrls";

const CreateLink = () => {
  const { user } = UrlState();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const qrRef = useRef();

  const [formData, setFormData] = useState({
    title: "",
    longUrl: "",
    customUrl: "",
  });

  const {
    loading,
    error,
    fn: createNewUrl,
  } = useFetch(createUrl);

  useEffect(() => {
    const url = searchParams.get("longURL");

    if (url) {
      setFormData((prev) => ({
        ...prev,
        longUrl: url,
      }));
    }
  }, [searchParams]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreate = async () => {
    if (!formData.title || !formData.longUrl) {
      alert("Please fill all required fields");
      return;
    }

    let blob = null;

    if (qrRef.current?.canvasRef?.current) {
      blob = await new Promise((resolve) =>
        qrRef.current.canvasRef.current.toBlob(resolve)
      );
    }

    const data = await createNewUrl({
      title: formData.title,
      original_url: formData.longUrl,
      custom_url: formData.customUrl,
      user_id: user.id,
      qr: blob,
    });

    if (data) {
      navigate("/Dashboard");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-4xl font-bold mb-8">
        Create Short Link
      </h1>

      <Card>
        <CardContent className="space-y-5 p-8">
          <Input
            placeholder="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />

          <Input
            placeholder="Long URL"
            name="longUrl"
            value={formData.longUrl}
            onChange={handleChange}
          />

          <Input
            placeholder="Custom URL (optional)"
            name="customUrl"
            value={formData.customUrl}
            onChange={handleChange}
          />

          {formData.longUrl && (
            <div className="flex justify-center">
              <QRCode
                ref={qrRef}
                value={formData.longUrl}
                size={180}
              />
            </div>
          )}

          {error && (
            <p className="text-red-500">{error}</p>
          )}

          <Button
            onClick={handleCreate}
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              <BeatLoader size={8} color="white" />
            ) : (
              "Create Link"
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateLink;