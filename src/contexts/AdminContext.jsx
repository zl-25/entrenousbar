import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext();

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
  const defaultSettings = {
    name: 'Entre Nous Bar',
    email: 'contact@entrenousbar.ga',
    phone: '+241 62 12 34 56',
    instagram: 'https://instagram.com/entrenousbar',
    facebook: 'https://facebook.com/entrenousbar',
    hours: 'Ouvert tous les jours de 18h à l\'aube'
  };

  const getInitialSettings = () => {
    const saved = localStorage.getItem('entrenous_site_settings');
    return saved ? JSON.parse(saved) : defaultSettings;
  };

  const getInitialUsers = () => {
    const saved = localStorage.getItem('entrenous_admin_users');
    const defaults = [
      { id: 1, name: 'Super Admin', email: 'admin@entrenous.ga', role: 'admin', initials: 'SA', lastLogin: "Aujourd'hui, 15:40", status: 'Actif', accessCode: '123' },
      { id: 2, name: 'Manager', email: 'manager@entrenous.ga', role: 'manager', initials: 'MN', lastLogin: 'Jamais', status: 'Actif', accessCode: '123' },
      { id: 3, name: 'Staff Entrée', email: 'editeur@entrenous.ga', role: 'editor', initials: 'SE', lastLogin: 'Jamais', status: 'Actif', accessCode: '123' }
    ];

    if (saved) {
      const parsed = JSON.parse(saved);
      // Migration automatique si l'utilisateur possède l'ancienne base à 1 seul élément (admin@entrenous.com)
      if (parsed.length === 1 && (parsed[0].email === 'admin@entrenous.com' || parsed[0].email === 'admin@entrenous.ga')) {
        localStorage.setItem('entrenous_admin_users', JSON.stringify(defaults));
        return defaults;
      }
      return parsed;
    }
    return defaults;
  };

  const [events, setEvents] = useState([]);
  const [reservations, setReservations] = useState([
    { id: 101, name: 'Jean Dupont', email: 'jean.d@example.com', phone: '0612345678', date: '2024-06-15', type: 'VIP', persons: 4, time: '21:00', status: 'Confirmé' },
    { id: 102, name: 'Marie Claire', email: 'marie.c@example.com', phone: '0698765432', date: '2024-06-16', type: 'Standard', persons: 2, time: '22:30', status: 'En attente' }
  ]);
  const [transactions, setTransactions] = useState([
    { id: 'TRX-001', amount: '15000 XAF', date: '2024-06-10 14:30', event_id: 'EVT-10', status: 'Payé' },
    { id: 'TRX-002', amount: '45000 XAF', date: '2024-06-11 09:15', event_id: 'EVT-11', status: 'Payé' }
  ]);
  const [gallery, setGallery] = useState([]);
  const [newsletters, setNewsletters] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [users, setUsers] = useState(getInitialUsers);
  const [siteSettings, setSiteSettings] = useState(getInitialSettings);
  const [loading, setLoading] = useState(true);

  // Fetch initial data
  const fetchData = async () => {
    try {
      const [eventsRes, resRes, transRes, galRes, newsRes] = await Promise.all([
        fetch('/api/events'),
        fetch('/api/reservations'),
        fetch('/api/transactions'),
        fetch('/api/gallery'),
        fetch('/api/newsletters')
      ]);

      if (eventsRes.ok) setEvents(await eventsRes.json());
      if (resRes.ok) setReservations(await resRes.json());
      if (transRes.ok) setTransactions(await transRes.json());
      if (galRes.ok) setGallery(await galRes.json());
      if (newsRes.ok) setNewsletters(await newsRes.json());
    } catch (error) {
      console.error("Erreur de connexion au backend:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Image Upload
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      if (res.ok) {
        const data = await res.json();
        return data.imageUrl;
      }
    } catch (error) {
      console.error("Erreur upload:", error);
    }
    return null;
  };

  // Events API
  const addEvent = async (event) => {
    let savedEvent = { ...event, id: Date.now() }; // fallback id
    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
      });
      if (res.ok) {
        savedEvent = await res.json();
      }
    } catch (error) {
      console.warn("API indisponible, sauvegarde locale:", error);
    }
    setEvents(prev => [...prev, savedEvent]);
  };

  const deleteEvent = async (id) => {
    try {
      await fetch(`/api/events/${id}`, { method: 'DELETE' });
    } catch (error) {
      console.warn("API indisponible, suppression locale:", error);
    }
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  const updateEvent = async (id, updatedEvent) => {
    // A implémenter plus tard si besoin de l'edit inline
    setEvents(events.map(e => e.id === id ? { ...e, ...updatedEvent } : e));
  };

  // Reservations API
  const addReservation = async (reservation) => {
    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reservation)
      });
      if (res.ok) {
        fetchData();
      }
    } catch (error) {
      console.error("Erreur réservation:", error);
    }
  };

  const updateReservationStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/reservations/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        setReservations(reservations.map(r => r.id === id ? { ...r, status } : r));
      }
    } catch (error) {
      console.error("Erreur statut réservation:", error);
    }
  };

  // Gallery API
  const addGalleryImage = async (url) => {
    try {
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      if (res.ok) {
        const newImg = await res.json();
        setGallery([newImg, ...gallery]);
      }
    } catch (error) {
      console.error("Erreur galerie:", error);
    }
  };

  const deleteGalleryImage = async (id) => {
    try {
      const res = await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
      if (res.ok) setGallery(gallery.filter(g => g.id !== id));
    } catch (error) {
      console.error("Erreur suppression galerie:", error);
    }
  };

  // Users API
  const addUser = (userData) => {
    const newUser = {
      ...userData,
      id: Date.now(),
      initials: userData.name.substring(0, 2).toUpperCase(),
      lastLogin: 'Jamais',
      status: 'Actif'
    };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('entrenous_admin_users', JSON.stringify(updatedUsers));
  };

  const updateUser = (id, updatedData) => {
    const updatedUsers = users.map(user => {
      if (user.id === id) {
        return {
          ...user,
          ...updatedData,
          initials: updatedData.name ? updatedData.name.substring(0, 2).toUpperCase() : user.initials
        };
      }
      return user;
    });
    setUsers(updatedUsers);
    localStorage.setItem('entrenous_admin_users', JSON.stringify(updatedUsers));
  };

  const deleteUser = (id) => {
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
    localStorage.setItem('entrenous_admin_users', JSON.stringify(updatedUsers));
  };

  // Settings API
  const updateSiteSettings = (newSettings) => {
    const updatedSettings = { ...siteSettings, ...newSettings };
    setSiteSettings(updatedSettings);
    localStorage.setItem('entrenous_site_settings', JSON.stringify(updatedSettings));
  };

  // Newsletters Campaigns
  const addCampaign = (campaign) => {
    setCampaigns([{ ...campaign, id: Date.now(), date: new Date().toISOString() }, ...campaigns]);
  };

  return (
    <AdminContext.Provider value={{
      events, addEvent, updateEvent, deleteEvent,
      reservations, addReservation, updateReservationStatus,
      transactions,
      gallery, addGalleryImage, deleteGalleryImage,
      newsletters, campaigns, addCampaign,
      users, addUser, updateUser, deleteUser,
      siteSettings, updateSiteSettings,
      uploadImage,
      loading
    }}>
      {children}
    </AdminContext.Provider>
  );
};
