import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../utils/api';

const MenuContext = createContext();

export function MenuProvider({ children }) {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMenu = useCallback(async (category = 'All', searchQuery = '') => {
    setLoading(true);
    try {
      let res;
      if (searchQuery.trim()) {
        res = await api.get('/menu/search', { params: { q: searchQuery } });
      } else {
        const params = {};
        if (category !== 'All') params.category = category;
        res = await api.get('/menu', { params });
      }
      setMenu(res.data);
    } catch (err) {
      console.error('Failed to fetch menu:', err.message);
      setMenu([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMenu();
  }, [fetchMenu]);

  return (
    <MenuContext.Provider value={{ menu, setMenu, loading, fetchMenu }}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  return useContext(MenuContext);
}
