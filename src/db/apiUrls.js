
import { supabase } from "./supabase";


export async function getUrls(user_id) {
  const { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("user_id", user_id);

  if (error) throw new Error(error.message);

  return data;
}


export async function getUrl(shortUrl) {
  const { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("short_url", shortUrl)
    .single();

  if (error) throw new Error(error.message);

  return data;
}


export async function createUrl(formData) {
  console.log("formData:", formData);

  const short_url =
    formData.custom_url?.trim() ||
    Math.random().toString(36).substring(2, 8);

  const { data, error } = await supabase
    .from("urls")
    .insert([
      {
        title: formData.title,
        original_url: formData.original_url,
        custom_url: formData.custom_url || null,
        short_url,
        user_id: formData.user_id,
        qr: "",
      },
    ])
    .select()
    .single();

  console.log("data:", data);
  console.log("error:", error);
  console.log(formData.user_id);

  if (error) throw new Error(error.message);

  return data;
}

