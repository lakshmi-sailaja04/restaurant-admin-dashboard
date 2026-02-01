import React, { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import api from '../utils/api';
import { useToast } from '../context/ToastContext';

const CATEGORY_STYLES = {
  Appetizer: { bg: '#DBEAFE', text: '#1D4ED8' },
  'Main Course': { bg: '#D1FAE5', text: '#047857' },
  Dessert: { bg: '#FCE7F3', text: '#BE185D' },
  Beverage: { bg: '#FEF3C7', text: '#B45309' }
};

export default function MenuCard({ item, onEdit, onDelete }) {
  const { addToast } = useToast();
  const [available, setAvailable] = useState(item.isAvailable);
  const [toggling, setToggling] = useState(false);

  const handleToggle = async () => {
    const previous = available;
    setAvailable(!available);
    setToggling(true);

    try {
      await api.patch(`/menu/${item._id}/availability`, {
        isAvailable: !previous
      });
      addToast(
        `"${item.name}" is now ${!previous ? 'available' : 'unavailable'}.`,
        'success'
      );
    } catch {
      setAvailable(previous);
      addToast('Failed to update availability.', 'error');
    } finally {
      setToggling(false);
    }
  };

  const categoryStyle = CATEGORY_STYLES[item.category] || {
    bg: '#E5E7EB',
    text: '#4B5563'
  };

  return (
    <div style={styles.card}>
      <div style={{ ...styles.bar, backgroundColor: categoryStyle.bg }} />

      <div style={styles.body}>
        <div style={styles.header}>
          <span
            style={{
              ...styles.category,
              backgroundColor: categoryStyle.bg,
              color: categoryStyle.text
            }}
          >
            {item.category}
          </span>
          <span style={styles.price}>${item.price.toFixed(2)}</span>
        </div>

        <h3 style={styles.name}>{item.name}</h3>

        {item.description && (
          <p style={styles.description}>{item.description}</p>
        )}

        {item.ingredients?.length > 0 && (
          <div style={styles.ingredients}>
            {item.ingredients.slice(0, 4).map((ing) => (
              <span key={ing} style={styles.ingredient}>
                {ing}
              </span>
            ))}
            {item.ingredients.length > 4 && (
              <span style={styles.more}>
                +{item.ingredients.length - 4}
              </span>
            )}
          </div>
        )}

       
        <div style={styles.footer}>
         
          <button
            onClick={handleToggle}
            disabled={toggling}
            style={{
              ...styles.toggleBtn,
              color: available ? '#059669' : '#9CA3AF',
              cursor: toggling ? 'wait' : 'pointer',
              opacity: toggling ? 0.6 : 1
            }}
          >
            <div
              style={{
                ...styles.toggleTrack,
                backgroundColor: available ? '#10B981' : '#D1D5DB'
              }}
            >
              <div
                style={{
                  ...styles.toggleDot,
                  transform: available
                    ? 'translateX(18px)'
                    : 'translateX(2px)'
                }}
              />
            </div>
            {available ? 'Available' : 'Unavailable'}
          </button>

          
          <div style={styles.actions}>
            <button
              onClick={() => onEdit(item)}
              style={styles.iconBtn}
              title="Edit"
            >
              <Pencil size={15} />
            </button>
            <button
              onClick={() => onDelete(item._id)}
              style={styles.iconBtn}
              title="Delete"
            >
              <Trash2 size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    border: '1px solid #F3F4F6',
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  bar: {
    height: 6
  },
  body: {
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  category: {
    fontSize: 12,
    fontWeight: 600,
    padding: '2px 10px',
    borderRadius: 999
  },
  price: {
    fontSize: 18,
    fontWeight: 700,
    color: '#111827'
  },
  name: {
    fontSize: 15,
    fontWeight: 600,
    marginBottom: 4
  },
  description: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 12,
    lineHeight: 1.5
  },
  ingredients: {
    display: 'flex',
    gap: 6,
    flexWrap: 'wrap',
    marginBottom: 12
  },
  ingredient: {
    fontSize: 10,
    backgroundColor: '#F9FAFB',
    color: '#6B7280',
    padding: '2px 8px',
    borderRadius: 999,
    border: '1px solid #E5E7EB'
  },
  more: {
    fontSize: 10,
    color: '#9CA3AF'
  },
  footer: {
    marginTop: 'auto',
    paddingTop: 12,
    borderTop: '1px solid #F3F4F6',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  toggleBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontSize: 12,
    background: 'none',
    border: 'none'
  },
  toggleTrack: {
    width: 36,
    height: 20,
    borderRadius: 999,
    position: 'relative'
  },
  toggleDot: {
    width: 16,
    height: 16,
    backgroundColor: '#fff',
    borderRadius: '50%',
    position: 'absolute',
    top: 2,
    left: 0,
    transition: 'transform 0.2s ease'
  },
  actions: {
    display: 'flex',
    gap: 8
  },
  iconBtn: {
    padding: 6,
    borderRadius: 8,
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    color: '#9CA3AF'
  }
};
