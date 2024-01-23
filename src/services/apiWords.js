import supabase from "./supabase";
const WORD_RANGE = 600; // The word will be chosen from first WORD_RANGE most popular words

export async function getWord(wordLength, language) {
  const randomNumber = Math.floor(Math.random() * WORD_RANGE);
  const { data, error } = await supabase
    .from("dictionary")
    .select("id, word")
    .eq("language", language)
    .eq("length", wordLength)
    .order("frequency", { ascending: false })
    .range(randomNumber, randomNumber)
    .single();

  if (error) {
    throw new Error("The word can't be loaded");
  }
  return data;
}

export async function checkWordInDictionary(word, language) {
  const { count, error } = await supabase
    .from("dictionary")
    .select("*", { count: "exact", head: true })
    .eq("word", word)
    .eq("language", language);

  if (error) {
    throw new Error("We can't check the word. Somethig went wrong :(");
  }

  return count > 0;
}
