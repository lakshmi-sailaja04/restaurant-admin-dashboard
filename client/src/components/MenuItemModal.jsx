import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const CATEGORIES = ['Appetizer', 'Main Course', 'Dessert', 'Beverage'];

const INITIAL = {
  name: '',
  category: 'Appetizer',
  description: '',
  price: '',
  ingredients: ''
};

export default function MenuItemModal({ isOpen, onClose, onSave, editItem }) {
  const [form, setForm] = useState(INITIAL);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editItem) {
      setForm({
        name: editItem.name || '',
        category: editItem.category || 'Appetizer',
        description: editItem.description || '',
        price: editItem.price?.toString() || '',
        ingredients: editItem.ingredients?.join(', ') || ''
      });
    } else {
      setForm(INITIAL);
    }
    setError('');
  }, [editItem, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!form.name.trim()) return setError('Name is required.');
    if (!form.price || isNaN(form.price) || Number(form.price) < 0)
      return setError('A valid price is required.');

    onSave(
      {
        name: form.name.trim(),
        category: form.category,
        description: form.description.trim(),
        price: parseFloat(Number(form.price).toFixed(2)),
        ingredients: form.ingredients
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean)
      },
      editItem?._id || null
    );
  };

  return (
    <>
      <div style={styles.backdrop} onClick={onClose} />
      <div style={styles.wrapper}>
        <div style={styles.modal}>
          <div style={styles.header}>
            <h2 style={styles.title}>
              {editItem ? 'Edit Menu Item' : 'New Menu Item'}
            </h2>
            <button onClick={onClose} style={styles.closeBtn}>
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit} style={styles.form}>
            {error && <div style={styles.error}>{error}</div>}

            <Field label="Item Name *">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Grilled Salmon"
                style={styles.input}
              />
            </Field>


            <Field label="Category *">
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                style={styles.input}
              >
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </Field>

            <Field label="Description">
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={2}
                placeholder="Short description…"
                style={{ ...styles.input, resize: 'none' }}
              />
            </Field>

            <Field label="Price ($) *">
              <input
                type="number"
                step="0.01"
                min="0"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="0.00"
                style={styles.input}
              />
            </Field>

            <Field label="Ingredients (comma-separated)">
              <input
                name="ingredients"
                value={form.ingredients}
                onChange={handleChange}
                placeholder="salmon, lemon, butter"
                style={styles.input}
              />
            </Field>

            <div style={styles.actions}>
              <button
                type="button"
                onClick={onClose}
                style={styles.cancelBtn}
              >
                Cancel
              </button>
              <button type="submit" style={styles.saveBtn}>
                {editItem ? 'Save Changes' : 'Add Item'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}


function Field({ label, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <label style={styles.label}>{label}</label>
      {children}
    </div>
  );
}

const styles = {
  backdrop: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.4)',
    backdropFilter: 'blur(4px)',
    zIndex: 40
  },
  wrapper: {
    position: 'fixed',
    inset: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    zIndex: 50
  },
  modal: {
    background: '#fff',
    borderRadius: 16,
    width: '100%',
    maxWidth: 420,
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px 24px',
    borderBottom: '1px solid #F3F4F6'
  },
  title: {
    fontSize: 16,
    fontWeight: 600,
    fontFamily: "'Playfair Display', serif"
  },
  closeBtn: {
    border: 'none',
    background: 'none',
    color: '#9CA3AF',
    cursor: 'pointer'
  },
  form: {
    padding: '20px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: 16
  },
  label: {
    fontSize: 12,
    fontWeight: 600,
    color: '#4B5563'
  },
  input: {
    padding: '8px 12px',
    fontSize: 14,
    borderRadius: 8,
    border: '1px solid #E5E7EB',
    outline: 'none'
  },
  error: {
    fontSize: 12,
    color: '#B91C1C',
    background: '#FEE2E2',
    padding: '8px 12px',
    borderRadius: 8,
    border: '1px solid #FECACA'
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 8
  },
  cancelBtn: {
    padding: '8px 14px',
    borderRadius: 8,
    border: 'none',
    background: '#F3F4F6',
    fontSize: 14,
    cursor: 'pointer'
  },
  saveBtn: {
    padding: '8px 18px',
    borderRadius: 8,
    border: 'none',
    background: '#F59E0B',
    color: '#fff',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer'
  }
};
