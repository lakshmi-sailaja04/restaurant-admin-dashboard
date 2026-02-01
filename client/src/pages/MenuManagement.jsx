import React, { useState, useEffect, useCallback } from "react";
import { Search, Plus } from "lucide-react";
import MenuCard from "../components/MenuCard";
import MenuItemModal from "../components/MenuItemModal";
import useDebounce from "../hooks/useDebounce";
import { useMenu } from "../context/MenuContext";
import { useToast } from "../context/ToastContext";
import api from "../utils/api";
import "../styles/MenuManagement.css";

const CATEGORIES = ["All", "Appetizer", "Main Course", "Dessert", "Beverage"];

export default function MenuManagement() {
  const { menu, setMenu, loading, fetchMenu } = useMenu();
  const { addToast } = useToast();

  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput, 400);

  const [activeCategory, setActiveCategory] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    fetchMenu(activeCategory === "All" ? "" : activeCategory, debouncedSearch);
  }, [debouncedSearch, activeCategory, fetchMenu]);

  const handleSave = useCallback(
    async (payload, id) => {
      try {
        if (id) {
          const res = await api.put(`/menu/${id}`, payload);
          setMenu((prev) =>
            prev.map((item) => (item._id === id ? res.data : item)),
          );
          addToast(`"${res.data.name}" updated successfully.`, "success");
        } else {
          const res = await api.post("/menu", payload);
          setMenu((prev) => [res.data, ...prev]);
          addToast(`"${res.data.name}" added to the menu!`, "success");
        }
        setModalOpen(false);
        setEditItem(null);
      } catch (err) {
        addToast(
          err.response?.data?.message || "Failed to save item.",
          "error",
        );
      }
    },
    [setMenu, addToast],
  );

  const handleDelete = useCallback(
    async (id) => {
      if (!window.confirm("Are you sure you want to delete this item?")) return;
      try {
        await api.delete(`/menu/${id}`);
        setMenu((prev) => prev.filter((item) => item._id !== id));
        addToast("Menu item deleted.", "success");
      } catch (err) {
        addToast("Failed to delete item.", "error");
      }
    },
    [setMenu, addToast],
  );

  const handleEdit = useCallback((item) => {
    setEditItem(item);
    setModalOpen(true);
  }, []);

  return (
    <div className="menu-container">
      <div className="header">
        <div>
          <h1>Menu Management</h1>
          <p>Add, edit, search & toggle your menu items.</p>
        </div>
        <button
          className="add-button"
          onClick={() => {
            setEditItem(null);
            setModalOpen(true);
          }}
        >
          <Plus size={16} /> Add Item
        </button>
      </div>

      <div className="search-container">
        <div className="search-input-wrapper">
          <Search size={16} />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search by name or ingredient…"
          />
        </div>

        <div className="categories">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`category-pill ${activeCategory === cat ? "active" : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="loading-spinner"></div>
      ) : menu.length === 0 ? (
        <div className="no-items">
          No items found. Try a different search or add a new item.
        </div>
      ) : (
        <div className="menu-grid">
          {menu.map((item) => (
            <MenuCard
              key={item._id}
              item={item}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <MenuItemModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditItem(null);
        }}
        onSave={handleSave}
        editItem={editItem}
      />
    </div>
  );
}
