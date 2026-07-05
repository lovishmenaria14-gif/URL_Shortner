import { supabase } from "../db/supabase";

// -------------------- Sign Up --------------------
export async function signup({
  name,
  email,
  password,
  profile_pic,
}) {
  const fileExt = profile_pic.name.split(".").pop();

  const fileName = `dp-${name
    .split(" ")
    .join("-")}-${Math.random()}.${fileExt}`;

  const { error: storageError } = await supabase.storage
    .from("profile_pic")
    .upload(fileName, profile_pic);

  if (storageError) throw new Error(storageError.message);

  const {
    data: { publicUrl },
  } = supabase.storage
    .from("profile_pic")
    .getPublicUrl(fileName);

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name: name,
        profile_pic: publicUrl,
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

// -------------------- Login --------------------
export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

// -------------------- Logout --------------------
export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

// -------------------- Get Current User --------------------
export async function getCurrentUser() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) return null;

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return user;
}

// -------------------- Reset Password --------------------
export async function resetPassword(email) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "http://localhost:5173/update-password",
  });

  if (error) throw new Error(error.message);

  return data;
}

// -------------------- Update Password --------------------
export async function updatePassword(password) {
  const { data, error } = await supabase.auth.updateUser({
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}