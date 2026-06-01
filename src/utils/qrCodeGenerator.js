import QRCode from 'qrcode';

export const generateQRCode = async (data, options = {}) => {
  try {
    const defaultOptions = {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      width: 200,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      },
      ...options
    };

    const qrCodeDataUrl = await QRCode.toDataURL(JSON.stringify(data), defaultOptions);
    return qrCodeDataUrl;
  } catch (err) {
    console.error('Erreur génération QR Code:', err);
    throw new Error('Impossible de générer le code QR');
  }
};

export const generateTicketQRCode = (ticketData) => {
  const qrData = {
    id: ticketData.id,
    ticketId: ticketData.ticketId,
    eventId: ticketData.eventId,
    email: ticketData.email,
    timestamp: ticketData.timestamp,
    reference: ticketData.reference
  };

  return generateQRCode(qrData, {
    width: 250,
    margin: 3
  });
};

export const generateTicketReference = (eventId, ticketId) => {
  const timestamp = Date.now().toString().slice(-6);
  const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `ENB-${eventId}-${ticketId}-${randomPart}-${timestamp}`;
};
