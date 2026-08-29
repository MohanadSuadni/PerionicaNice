"use server";

import { createClient } from "@/lib/supabase/server";

type PricingData = {
  name_sr: string;
  name_en: string | null;
  name_ru: string | null;
  price: string;
  icon: string | null;
  sort_order: number;
  active: boolean;
};

async function getAuthenticatedClient() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Niste prijavljeni.");
  }

  return supabase;
}

export async function createPricingItem(data: PricingData) {
  const supabase = await getAuthenticatedClient();

  const { data: item, error } = await supabase
    .from("pricing_items")
    .insert(data)
    .select()
    .single();

  if (error) {
    console.error("Create pricing item error:", error);
    throw new Error(error.message);
  }

  return item;
}

export async function updatePricingItem(
  id: string,
  data: PricingData
) {
  const supabase = await getAuthenticatedClient();

  const { data: item, error } = await supabase
    .from("pricing_items")
    .update({
      ...data,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Update pricing item error:", error);
    throw new Error(error.message);
  }

  return item;
}

export async function deletePricingItem(id: string) {
  const supabase = await getAuthenticatedClient();

  const { error } = await supabase
    .from("pricing_items")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Delete pricing item error:", error);
    throw new Error(error.message);
  }

  return true;
}

export async function togglePricingItem(
  id: string,
  active: boolean
) {
  const supabase = await getAuthenticatedClient();

  const { data: item, error } = await supabase
    .from("pricing_items")
    .update({
      active,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Toggle pricing item error:", error);
    throw new Error(error.message);
  }

  return item;
}

export async function getPricingItems() {
  const supabase = await getAuthenticatedClient();

  const { data, error } = await supabase
    .from("pricing_items")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Get pricing items error:", error);
    throw new Error(error.message);
  }

  return data ?? [];
}