import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

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
      if (parsed.length === 1 && (parsed[0].email === 'admin@entrenous.com' || parsed[0].email === 'admin@entrenous.ga')) {
        localStorage.setItem('entrenous_admin_users', JSON.stringify(defaults));
        return defaults;
      }
      return parsed;
    }
    return defaults;
  };

  const [events, setEvents] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [newsletters, setNewsletters] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [users, setUsers] = useState(getInitialUsers);
  const [siteSettings, setSiteSettings] = useState(getInitialSettings);
  const [loading, setLoading] = useState(true);

  // Fetch initial data from Supabase
  const fetchData = async () => {
    try {
      const [eventsRes, resRes, newsRes] = await Promise.all([
        supabase.from('events').select('*').order('id', { ascending: false }),
        supabase.from('reservations').select('*').order('id', { ascending: false }),
        supabase.from('newsletters').select('*').order('id', { ascending: false })
      ]);

      if (eventsRes.data) {
        // Parser les champs JSON stockés en texte
        const parsed = eventsRes.data.map(e => ({
          ...e,
          description: typeof e.description === 'string' ? JSON.parse(e.description || '[]') : (e.description || []),
          artists: typeof e.artists === 'string' ? JSON.parse(e.artists || '[]') : (e.artists || []),
          tickets: typeof e.tickets === 'string' ? JSON.parse(e.tickets || '[]') : (e.tickets || [])
        }));
        setEvents(parsed);
      }
      if (resRes.data) setReservations(resRes.data);
      if (newsRes.data) setNewsletters(newsRes.data);
    } catch (error) {
      console.error("Erreur de connexion à Supabase:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Image Upload via Supabase Storage
  const uploadImage = async (file) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `events/${fileName}`;

      const { data, error } = await supabase.storage
        .from('event-images')
        .upload(filePath, file);

      if (error) throw error;

      const { data: publicUrlData } = supabase.storage
        .from('event-images')
        .getPublicUrl(filePath);

      return publicUrlData.publicUrl;
    } catch (error) {
      console.error("Erreur upload Supabase Storage:", error);
    }
    return null;
  };

  // Events API via Supabase
  const addEvent = async (event) => {
    try {
      // Préparer les données pour Supabase (sérialiser les tableaux en JSON string)
      const eventData = {
        title: event.title,
        type: event.type || 'Soirée',
        day: event.day,
        month: event.month,
        year: event.year,
        date: event.date,
        time: event.time,
        endTime: event.endTime,
        price: event.price,
        image: event.image || null,
        cardImage: event.cardImage || null,
        description: JSON.stringify(event.description || []),
        artists: JSON.stringify(event.artists || event.djs || []),
        neonClass: event.neonClass || 'neon-green',
        tickets: JSON.stringify(event.tickets || []),
        status: 'active'
      };

      const { data, error } = await supabase
        .from('events')
        .insert([eventData])
        .select()
        .single();

      if (error) throw error;

      // Parser les champs JSON pour l'état local
      const parsedEvent = {
        ...data,
        description: typeof data.description === 'string' ? JSON.parse(data.description || '[]') : (data.description || []),
        artists: typeof data.artists === 'string' ? JSON.parse(data.artists || '[]') : (data.artists || []),
        tickets: typeof data.tickets === 'string' ? JSON.parse(data.tickets || '[]') : (data.tickets || [])
      };
      setEvents(prev => [parsedEvent, ...prev]);
    } catch (error) {
      console.error("Erreur ajout événement:", error);
      // Fallback local
      const fallback = { ...event, id: Date.now() };
      setEvents(prev => [fallback, ...prev]);
    }
  };

  const deleteEvent = async (id) => {
    try {
      const { error } = await supabase.from('events').delete().eq('id', id);
      if (error) throw error;
    } catch (error) {
      console.warn("Erreur suppression Supabase:", error);
    }
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  const updateEvent = async (id, updatedEvent) => {
    try {
      const { error } = await supabase.from('events').update(updatedEvent).eq('id', id);
      if (error) throw error;
    } catch (error) {
      console.warn("Erreur mise à jour Supabase:", error);
    }
    setEvents(events.map(e => e.id === id ? { ...e, ...updatedEvent } : e));
  };

  // Reservations API via Supabase
  const addReservation = async (reservation) => {
    try {
      const { data, error } = await supabase
        .from('reservations')
        .insert([{
          name: reservation.name,
          email: reservation.email,
          phone: reservation.phone,
          persons: reservation.persons || 1,
          date: reservation.date,
          time: reservation.time,
          type: reservation.type || 'Standard',
          status: 'En attente'
        }])
        .select()
        .single();

      if (error) throw error;
      setReservations(prev => [data, ...prev]);
    } catch (error) {
      console.error("Erreur réservation:", error);
    }
  };

  const updateReservationStatus = async (id, status) => {
    try {
      const { error } = await supabase
        .from('reservations')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      setReservations(reservations.map(r => r.id === id ? { ...r, status } : r));
    } catch (error) {
      console.error("Erreur statut réservation:", error);
    }
  };

  // Gallery API (reste en local pour l'instant)
  const addGalleryImage = async (url) => {
    setGallery([{ id: Date.now(), url }, ...gallery]);
  };

  const deleteGalleryImage = async (id) => {
    setGallery(gallery.filter(g => g.id !== id));
  };

  // Users API (localStorage)
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
