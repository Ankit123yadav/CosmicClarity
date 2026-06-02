export interface BookingSheetRow {
  booking_ref: string;
  service: string;
  booking_date: string;
  booking_slot: string;
  name: string;
  email: string;
  phone: string;
  amount: number;
  amount_currency: string;
  source: string;
  submitted_at: string;
}

export async function saveBookingToSheet(payload: BookingSheetRow, endpoint: string) {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const responseText = await response.text();

    if (!response.ok) {
      throw new Error(responseText || `Google Sheets save failed with status ${response.status}`);
    }

    return {
      ok: true,
      responseText
    };
  } catch (error) {
    try {
      await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        mode: 'no-cors'
      });

      return {
        ok: true,
        responseText: 'submitted via no-cors fallback'
      };
    } catch (fallbackError) {
      throw error;
    }
  }
}
