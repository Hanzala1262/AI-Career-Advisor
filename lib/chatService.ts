import { supabase } from "./supabase";

export async function createChat(
  userId: string,
  title: string = "New Chat"
) {
  const { data, error } = await supabase
    .from("chats")
    .insert({
      user_id: userId,
      title,
    })
    .select()
    .single();



  if (error) throw error;

  return data;
}

export async function getChats(userId: string) {
  const { data, error } = await supabase
    .from("chats")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", {
      ascending: true,
    });

  if (error) throw error;
  
  console.log("User ID:", userId);
  console.log("Chats from DB:", data);

  return data;
}

export async function renameChat(
  chatId: string,
  title: string
) {
  const { error } = await supabase
    .from("chats")
    .update({
      title,
    })
    .eq("id", chatId);

  if (error) throw error;
}

export async function deleteChat(
  chatId: string
) {
  const { error } = await supabase
    .from("chats")
    .delete()
    .eq("id", chatId);

  if (error) throw error;
}







export async function saveMessage(
  chatId: string,
  role: "user" | "assistant",
  message: string
) {
  const { error } = await supabase.from("messages").insert({
    chat_id: chatId,
    role,
    message,
  });

  if (error) throw error;
}

export async function getMessages(chatId: string) {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("chat_id", chatId)
    .order("created_at", {
      ascending: true,
    });

  if (error) throw error;

  return data;
}