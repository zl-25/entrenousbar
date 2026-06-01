import { z } from 'zod';

export const reservationSchema = z.object({
  name: z.string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(100, 'Le nom ne peut pas dépasser 100 caractères')
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'Le nom contient des caractères invalides'),
  
  email: z.string()
    .email('Veuillez entrer une adresse email valide')
    .min(5, 'Email trop court'),
  
  phone: z.string()
    .regex(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/, 'Numéro de téléphone invalide'),
  
  address: z.string().optional(),
  
  newsletters: z.boolean().default(false)
});

export const ticketingSchema = z.object({
  name: z.string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(100, 'Le nom ne peut pas dépasser 100 caractères'),
  
  email: z.string()
    .email('Veuillez entrer une adresse email valide'),
  
  phone: z.string()
    .regex(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/, 'Numéro de téléphone invalide'),
  
  address: z.string().optional(),
  
  newsletters: z.boolean().default(false)
});

export const validateField = (schema, fieldName, value) => {
  try {
    const fieldSchema = z.object({ [fieldName]: schema.shape[fieldName] });
    fieldSchema.parse({ [fieldName]: value });
    return { isValid: true, error: null };
  } catch (error) {
    return { isValid: false, error: error.errors[0]?.message || 'Erreur de validation' };
  }
};

export const validateForm = (schema, data) => {
  try {
    schema.parse(data);
    return { isValid: true, errors: {} };
  } catch (error) {
    const errors = {};
    error.errors.forEach(err => {
      errors[err.path[0]] = err.message;
    });
    return { isValid: false, errors };
  }
};
