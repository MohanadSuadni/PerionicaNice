"use client";

import { useEffect, useState } from "react";
import {
  createPricingItem,
  updatePricingItem,
  deletePricingItem,
  togglePricingItem,
  getPricingItems,
} from "./actions";
import Link from "next/link";
type PricingItem = {
  id: string;
  name_sr: string;
  name_en: string | null;
  name_ru: string | null;
  price: string;
  icon: string | null;
  sort_order: number;
  active: boolean;
};

type NewPricingItem = {
  name_sr: string;
  name_en: string;
  name_ru: string;
  price: string;
  icon: string;
  sort_order: number;
  active: boolean;
};

const emptyItem: NewPricingItem = {
  name_sr: "",
  name_en: "",
  name_ru: "",
  price: "",
  icon: "/icons/laundry-service.png",
  sort_order: 1,
  active: true,
};

export default function PricingAdminPage() {

  const [items, setItems] = useState<PricingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [newItem, setNewItem] =
    useState<NewPricingItem>(emptyItem);

  useEffect(() => {
    loadItems();
  }, []);

async function loadItems() {
  setLoading(true);

  try {
    const data = await getPricingItems();

    setItems(data);
  } catch (error) {
    console.error(error);

    alert(
      `Greška pri učitavanju cenovnika: ${
        error instanceof Error
          ? error.message
          : "Nepoznata greška."
      }`
    );
  } finally {
    setLoading(false);
  }
}

  function updateItem(
    id: string,
    field: keyof PricingItem,
    value: string | number | boolean | null
  ) {
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, [field]: value }
          : item
      )
    );
  }

  async function addItem() {
    if (!newItem.name_sr.trim()) {
      alert("Srpski naziv je obavezan.");
      return;
    }

    if (!newItem.price.trim()) {
      alert("Cena je obavezna.");
      return;
    }

    setSaving("new");

    try {
      const maxOrder =
        items.length > 0
          ? Math.max(...items.map((item) => item.sort_order))
          : 0;

      const item = await createPricingItem({
        name_sr: newItem.name_sr.trim(),
        name_en: newItem.name_en.trim() || null,
        name_ru: newItem.name_ru.trim() || null,
        price: newItem.price.trim(),
        icon: newItem.icon.trim() || null,
        sort_order:
          newItem.sort_order > 0
            ? newItem.sort_order
            : maxOrder + 1,
        active: newItem.active,
      });

      setItems((current) =>
        [...current, item].sort(
          (a, b) => a.sort_order - b.sort_order
        )
      );

      setNewItem({
        ...emptyItem,
        sort_order: maxOrder + 2,
      });

      setAdding(false);
    } catch (error) {
      console.error(error);

      alert(
        `Greška pri dodavanju usluge: ${
          error instanceof Error
            ? error.message
            : "Nepoznata greška."
        }`
      );
    } finally {
      setSaving(null);
    }
  }

  async function saveItem(item: PricingItem) {
    if (!item.name_sr.trim()) {
      alert("Srpski naziv je obavezan.");
      return;
    }

    if (!item.price.trim()) {
      alert("Cena je obavezna.");
      return;
    }

    setSaving(item.id);

    try {
      const updatedItem = await updatePricingItem(
        item.id,
        {
          name_sr: item.name_sr.trim(),
          name_en: item.name_en?.trim() || null,
          name_ru: item.name_ru?.trim() || null,
          price: item.price.trim(),
          icon: item.icon?.trim() || null,
          sort_order: item.sort_order,
          active: item.active,
        }
      );

      setItems((current) =>
        current.map((currentItem) =>
          currentItem.id === item.id
            ? updatedItem
            : currentItem
        )
      );

      setEditingId(null);
    } catch (error) {
      console.error(error);

      alert(
        `Greška pri čuvanju: ${
          error instanceof Error
            ? error.message
            : "Nepoznata greška."
        }`
      );
    } finally {
      setSaving(null);
    }
  }

  async function deleteItem(id: string) {
    const confirmed = window.confirm(
      "Da li sigurno želiš da obrišeš ovu uslugu?"
    );

    if (!confirmed) return;

    setSaving(id);

    try {
      await deletePricingItem(id);

      setItems((current) =>
        current.filter((item) => item.id !== id)
      );

      if (editingId === id) {
        setEditingId(null);
      }
    } catch (error) {
      console.error(error);

      alert(
        `Greška pri brisanju: ${
          error instanceof Error
            ? error.message
            : "Nepoznata greška."
        }`
      );
    } finally {
      setSaving(null);
    }
  }

  async function toggleActive(item: PricingItem) {
    setSaving(item.id);

    try {
      const updatedItem = await togglePricingItem(
        item.id,
        !item.active
      );

      setItems((current) =>
        current.map((currentItem) =>
          currentItem.id === item.id
            ? updatedItem
            : currentItem
        )
      );
    } catch (error) {
      console.error(error);

      alert(
        `Greška pri promeni statusa: ${
          error instanceof Error
            ? error.message
            : "Nepoznata greška."
        }`
      );
    } finally {
      setSaving(null);
    }
  }

  function cancelEditing() {
    setEditingId(null);
    loadItems();
  }

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-gray-500">
          Učitavanje cenovnika...
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
<Link
  href="/admin/dashboard"
  className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-gray-900"
>
              ← Kontrolna tabla
</Link>
        
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Cenovnik
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Upravljanje uslugama i cenama na sajtu
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            setAdding((current) => !current)
          }
          className="rounded-lg bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          {adding ? "Otkaži" : "+ Dodaj uslugu"}
        </button>
      </div>

      {/* Add */}

      {adding && (
        <div className="mb-8 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-semibold text-gray-900">
            Nova usluga
          </h2>

          <div className="grid gap-5 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                🇷🇸 Serbian *
              </label>

              <input
                type="text"
                value={newItem.name_sr}
                onChange={(e) =>
                  setNewItem((current) => ({
                    ...current,
                    name_sr: e.target.value,
                  }))
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-black"
                placeholder="Naziv usluge"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                🇬🇧 English
              </label>

              <input
                type="text"
                value={newItem.name_en}
                onChange={(e) =>
                  setNewItem((current) => ({
                    ...current,
                    name_en: e.target.value,
                  }))
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-black"
                placeholder="Service name"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                🇷🇺 Russian
              </label>

              <input
                type="text"
                value={newItem.name_ru}
                onChange={(e) =>
                  setNewItem((current) => ({
                    ...current,
                    name_ru: e.target.value,
                  }))
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-black"
                placeholder="Название услуги"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Cena *
              </label>

              <input
                type="text"
                value={newItem.price}
                onChange={(e) =>
                  setNewItem((current) => ({
                    ...current,
                    price: e.target.value,
                  }))
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-black"
                placeholder="500 RSD/kg"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Ikona
              </label>

              <input
                type="text"
                value={newItem.icon}
                onChange={(e) =>
                  setNewItem((current) => ({
                    ...current,
                    icon: e.target.value,
                  }))
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-black"
                placeholder="/icons/laundry-service.png"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Redosled
              </label>

              <input
                type="number"
                min="1"
                value={newItem.sort_order}
                onChange={(e) =>
                  setNewItem((current) => ({
                    ...current,
                    sort_order: Number(e.target.value),
                  }))
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-black"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={addItem}
            disabled={saving === "new"}
            className="mt-6 rounded-lg bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving === "new"
              ? "Čuvanje..."
              : "Sačuvaj uslugu"}
          </button>
        </div>
      )}

      {/* Items */}

      <div className="space-y-5">
        {items.length === 0 ? (
          <div className="rounded-xl border bg-white p-8 text-center text-gray-500">
            Nema usluga u cenovniku.
          </div>
        ) : (
          items.map((item) => {
            const editing =
              editingId === item.id;

            return (
              <div
                key={item.id}
                className={`rounded-xl border bg-white p-6 shadow-sm transition ${
                  !item.active
                    ? "opacity-60"
                    : ""
                }`}
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
                  {/* Icon */}

                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-gray-50">
                    {item.icon ? (
                      <img
                        src={item.icon}
                        alt=""
                        className="h-10 w-10 object-contain"
                      />
                    ) : (
                      <span className="text-xs text-gray-400">
                        No icon
                      </span>
                    )}
                  </div>

                  {/* Content */}

                  <div className="min-w-0 flex-1">
                    {editing ? (
                      <div className="grid gap-4 md:grid-cols-3">
                        <div>
                          <label className="mb-1 block text-xs font-medium text-gray-500">
                            🇷🇸 Serbian *
                          </label>

                          <input
                            type="text"
                            value={item.name_sr}
                            onChange={(e) =>
                              updateItem(
                                item.id,
                                "name_sr",
                                e.target.value
                              )
                            }
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-black"
                          />
                        </div>

                        <div>
                          <label className="mb-1 block text-xs font-medium text-gray-500">
                            🇬🇧 English
                          </label>

                          <input
                            type="text"
                            value={item.name_en ?? ""}
                            onChange={(e) =>
                              updateItem(
                                item.id,
                                "name_en",
                                e.target.value
                              )
                            }
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-black"
                          />
                        </div>

                        <div>
                          <label className="mb-1 block text-xs font-medium text-gray-500">
                            🇷🇺 Russian
                          </label>

                          <input
                            type="text"
                            value={item.name_ru ?? ""}
                            onChange={(e) =>
                              updateItem(
                                item.id,
                                "name_ru",
                                e.target.value
                              )
                            }
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-black"
                          />
                        </div>

                        <div>
                          <label className="mb-1 block text-xs font-medium text-gray-500">
                            Cena *
                          </label>

                          <input
                            type="text"
                            value={item.price}
                            onChange={(e) =>
                              updateItem(
                                item.id,
                                "price",
                                e.target.value
                              )
                            }
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-black"
                          />
                        </div>

                        <div>
                          <label className="mb-1 block text-xs font-medium text-gray-500">
                            Ikona
                          </label>

                          <input
                            type="text"
                            value={item.icon ?? ""}
                            onChange={(e) =>
                              updateItem(
                                item.id,
                                "icon",
                                e.target.value
                              )
                            }
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-black"
                          />
                        </div>

                        <div>
                          <label className="mb-1 block text-xs font-medium text-gray-500">
                            Redosled
                          </label>

                          <input
                            type="number"
                            min="1"
                            value={item.sort_order}
                            onChange={(e) =>
                              updateItem(
                                item.id,
                                "sort_order",
                                Number(e.target.value)
                              )
                            }
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-black"
                          />
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <h2 className="text-lg font-semibold text-gray-900">
                            {item.name_sr}
                          </h2>

                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                              item.active
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-500"
                            }`}
                          >
                            {item.active
                              ? "Aktivno"
                              : "Skriveno"}
                          </span>
                        </div>

                        <p className="mt-1 text-sm text-gray-500">
                          🇬🇧 {item.name_en || "—"}
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                          🇷🇺 {item.name_ru || "—"}
                        </p>

                        <p className="mt-3 font-semibold text-gray-900">
                          {item.price}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          Redosled: {item.sort_order}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}

                  <div className="flex shrink-0 flex-row flex-wrap gap-2 lg:flex-col">
                    {editing ? (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            saveItem(item)
                          }
                          disabled={
                            saving === item.id
                          }
                          className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {saving === item.id
                            ? "Čuvanje..."
                            : "Sačuvaj"}
                        </button>

                        <button
                          type="button"
                          onClick={cancelEditing}
                          disabled={
                            saving === item.id
                          }
                          className="rounded-lg border px-4 py-2 text-sm transition hover:bg-gray-50 disabled:opacity-50"
                        >
                          Otkaži
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            setEditingId(item.id)
                          }
                          className="rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-gray-50"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            toggleActive(item)
                          }
                          disabled={
                            saving === item.id
                          }
                          className="rounded-lg border px-4 py-2 text-sm transition hover:bg-gray-50 disabled:opacity-50"
                        >
                          {item.active
                            ? "Sakrij"
                            : "Aktiviraj"}
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            deleteItem(item.id)
                          }
                          disabled={
                            saving === item.id
                          }
                          className="rounded-lg border border-red-200 px-4 py-2 text-sm text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                        >
                          Obriši
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}