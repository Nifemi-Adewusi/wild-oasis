/* eslint-disable no-unused-vars */
import { data } from "autoprefixer";
import supabase from "./supabase";
// import { supabaseUrl } from "./config";
import { supabaseUrl } from "./supabase";

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);
  console.log(data);
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();
  console.log(data);
  if (error) throw new Error(error.message);
  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function signup({ fullName, email, password }) {
  await supabase.auth.signUp({
    email,
    fullName,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  // Update the password or fullName or avatar.

  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };
  if (avatar) updateData = { data: { avatar } };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);
  if (!avatar) return;

  // Upload Avatar Image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  // Update avatar in the user
  const { data: updatedUser, error: updateError } =
    await supabase.auth.updateUser({
      // avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });

  if (updateError) throw new Error(updateError.message);
  return updatedUser;
}
