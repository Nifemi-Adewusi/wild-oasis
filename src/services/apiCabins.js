import supabase, { supabaseUrl } from "./supabase";
export async function getCabins() {

    
const { data, error } = await supabase.from("Cabins").select("*");
    if (error) {
     console.error("Error fetching cabins:", error);
     throw new Error("Cabins could not be fetched")
 }
 return data
}

export async function deleteCabin(id) {
    
const { data, error } = await supabase
  .from("Cabins")
  .delete()
  .eq("id", id);
if (error) {
    console.error("Error deleting cabin:", error);
    throw new Error("Cabin could not be deleted");
    }
    return data;
}

export async function createCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create/edit cabin
  let query = supabase.from("Cabins");

  // A) CREATE
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B) EDIT
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  // 2. Upload image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin IF there was an error uplaoding image
  if (storageError) {
    await supabase.from("Cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }

  return data;
}

// export async function createCabin(cabinData, id) {
//     const hasImagePath = cabinData.image?.startsWith?.(supabaseUrl)
//   const imageName = `${Math.random()}-${cabinData.image.name}`.replaceAll(
//     "/",
//     ""
//   );
//   const imagePath =  hasImagePath ? cabinData.image: `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
//   // Create/Edit Cabin.
//     let query = supabase.from("Cabins")

//     // At Create
//     if (!id) {
//        query = query.insert([{...cabinData, image:imagePath}])
//     }
//     if (id) {
//         query = query
//   .update({ ...cabinData, image:imagePath })
//   .eq('id', id)   }
//     const { data, error } = await query.select().single();
//   if (error) {
//     console.error("Error creating cabin:", error);
//     throw new Error("Cabin could not be created");
//   }
//   // Upload Image
//   const { error: storageError } = await supabase.storage
//     .from("cabin-images")
//     .upload(imageName, cabinData.image);
//   // Delete Record if there was an error in Uploading Image
//   if (storageError) {
//       await supabase.from("Cabins").delete().eq("id", data.id)
//       throw new Error('Cabin image could not be uploaded and the cabin was not created')
//   }

//   return data;
// }

// export async function createCabin(cabinData, id) {
//   const hasImagePath = cabinData.image?.startsWith?.(supabaseUrl);
//   const imageName = `${Math.random()}-${cabinData.image.name}`.replaceAll(
//     "/",
//     ""
//   );
//   const imagePath = hasImagePath
//     ? cabinData.image
//     : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

//   let data, error;

//   if (!id) {
//     // Create cabin
//     ({ data, error } = await supabase
//       .from("Cabins")
//       .insert([{ ...cabinData, image: imagePath }])
//       .select());
//   } else {
//     // Update cabin
//     ({ data, error } = await supabase
//       .from("Cabins")
//       .update({ ...cabinData, image: imagePath })
//       .eq("id", id)
//       .select());
//   }

//   if (error) {
//     console.error("Error creating/updating cabin:", error);
//     throw new Error("Cabin could not be created/updated");
//   }

//   // Upload image (only if it's a new upload)
//   if (!hasImagePath) {
//     const { error: storageError } = await supabase.storage
//       .from("cabin-images")
//       .upload(imageName, cabinData.image);

//     if (storageError) {
//       await supabase.from("Cabins").delete().eq("id", data[0]?.id);
//       throw new Error("Image upload failed, cabin record deleted");
//     }
//   }

//   return data;
// }
