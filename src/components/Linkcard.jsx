import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, ExternalLink, QrCode } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import { useNavigate } from "react-router-dom";

const Linkcard = ({ url }) => {
  const [showQR, setShowQR] = useState(false);
  const navigate = useNavigate();

  const shortLink = `${window.location.origin}/${url.short_url}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shortLink);
    alert("Short link copied!");
  };

  return (
    <Card className="hover:shadow-md transition">
      <CardContent className="py-4 flex justify-between items-center">
       
        <div
          className="cursor-pointer flex-1"
          onClick={() => navigate(`/Link/${url.id}`)}
        >
          <h2 className="text-xl font-semibold">{url.title}</h2>

         
          <a
            href={shortLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline break-all"
            onClick={(e) => e.stopPropagation()}
          >
            {shortLink}
          </a>

          {/* Original URL */}
          <p className="text-sm text-gray-500 truncate mt-1">
            {url.original_url}
          </p>

          {/* QR Code */}
          {showQR && (
            <div
              className="mt-3 bg-white p-2 rounded inline-block"
              onClick={(e) => e.stopPropagation()}
            >
              <QRCodeCanvas
                value={shortLink}
                size={120}
              />
            </div>
          )}
        </div>

        {/* Right Side Icons */}
        <div className="flex gap-3 ml-4">
          {/* Copy */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCopy();
            }}
            title="Copy Short Link"
          >
            <Copy className="h-5 w-5" />
          </button>

          <a
            href={url.original_url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            title="Open Original URL"
          >
            <ExternalLink className="h-5 w-5" />
          </a>

         
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowQR(!showQR);
            }}
            title="Show QR Code"
          >
            <QrCode className="h-5 w-5" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Linkcard;