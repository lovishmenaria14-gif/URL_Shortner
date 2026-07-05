import React, { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Error from "../components/Error";
import Linkcard from "../components/Linkcard";
import useFetch from "../hooks/Use-fetch";
import { getUrls } from "../db/apiUrls";
import { getCLicksForUrls } from "../db/apiClicks";
import { UrlState } from "../Context";

const Dashboard = () => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");

  const { user } = UrlState();

  // URLs
  const {
    loading,
    error,
    data: urls,
    fn: fnUrls,
  } = useFetch(getUrls);

  // Clicks
  const {
    loading: loadingClicks,
    data: clicks,
    fn: fnClicks,
  } = useFetch(getCLicksForUrls);

  // Fetch URLs
  useEffect(() => {
    if (user?.id) {
      fnUrls(user.id);
    }
  }, [user]);

  // Fetch Clicks
  useEffect(() => {
    if (urls?.length > 0) {
      fnClicks(urls.map((url) => url.id));
    }
  }, [urls]);

  const filteredUrls =
    urls?.filter((url) =>
      url.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  return (
    <div className="flex flex-col gap-8">

      {(loading || loadingClicks) && (
        <BarLoader width="100%" color="#36d7b7" />
      )}

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Links Created</CardTitle>
            <CardAction>Total</CardAction>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">
              {urls?.length || 0}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Clicks</CardTitle>
            <CardAction>Clicks</CardAction>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">
              {clicks?.length || 0}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-extrabold">
          My Links
        </h1>

        <Button onClick={() => navigate("/create-link")}>
          Create Link
        </Button>
      </div>

      <div className="relative">
        <Input
          type="text"
          placeholder="Filter Links..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <Filter className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
      </div>

      {error && <Error message={error} />}

      <div className="flex flex-col gap-4">
        {filteredUrls.length > 0 ? (
          filteredUrls.map((url) => (
            <Linkcard key={url.id} url={url} />
          ))
        ) : (
          !loading &&
          !error && (
            <p className="text-center text-gray-500">
              No links found.
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default Dashboard;