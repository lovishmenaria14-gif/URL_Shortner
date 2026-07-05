import { supabase } from "./supabase";

export async function getCLicksForUrls(urlIds) {
  if (!urlIds || urlIds.length === 0) {
    return [];
  }

  const { data, error } = await supabase
    .from("clicks")
    .select("*")
    .in("url_id", urlIds);

  if (error) throw new Error(error.message);

  return data;
}

export async function storeClick(clickData) {
  const { data, error } = await supabase
    .from("clicks")
    .insert([clickData])
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}