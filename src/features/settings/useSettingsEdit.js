import supabase from "../../services/supabase";
export async function useSettingsEdit(newSettings) {
    const { data, error } = await supabase
  .from("settings")
  .insert([newSettings])
  .select();

  return { data, error };
}