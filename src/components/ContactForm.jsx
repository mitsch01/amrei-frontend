import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

// Define the colors here for better readability (optional, but good practice)
const COLOR_PRIMARY = '#F2A999'; // Button
const COLOR_ACCENT = '#F2D377'; // Button Hover
const COLOR_TEXT = '#0D0D0D';
const COLOR_SUCCESS = '#80B9BF'; // For success messages
const COLOR_ERROR = '#F2A999'; // For error messages

export const ContactForm = () => {
  const form = useRef();
  const [status, setStatus] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const sendEmail = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus('Sending...');

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then(() => {
        setStatus('Thank you! Your message has been sent successfully.');
        setIsSuccess(true);
        e.target.reset();
      }, (error) => {
        console.error("EmailJS Error:", error);
        setStatus('Error sending. Please try again later.');
        setIsSuccess(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div
      className="max-w-xl py-6 md:py-10"
    >

      <form ref={form} onSubmit={sendEmail} className="space-y-4">

        {/* --- Input: Name --- */}
        <div>
          <label
            htmlFor="from_name"
            className="block text-sm font-medium mb-1"
            style={{ color: COLOR_TEXT }}
          >
            Name
          </label>
          <input
            id="from_name"
            name="from_name"
            required
            className="w-full p-3 border border-gray-400 rounded-sm focus:ring-2 focus:ring-opacity-50"
            style={{
              color: COLOR_TEXT,
              '--tw-ring-color': COLOR_ACCENT
            }}
            disabled={isLoading}
          />
        </div>

        {/* --- Input: E-Mail Adresse --- */}
        <div>
          <label
            htmlFor="from_email"
            className="block text-sm font-medium mb-1"
            style={{ color: COLOR_TEXT }}
          >
            Email Address
          </label>
          <input
            id="from_email"
            type="email"
            name="from_email"
            required
            className="w-full p-3 border border-gray-400 rounded-sm focus:ring-2 focus:ring-opacity-50"
            style={{
              color: COLOR_TEXT,
              '--tw-ring-color': COLOR_ACCENT
            }}
            disabled={isLoading}
          />
        </div>

        {/* --- Textarea: Anliegen (Message) --- */}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium mb-1"
            style={{ color: COLOR_TEXT }}
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows="4"
            className="w-full p-3 border border-gray-400 rounded-sm resize-none focus:ring-2 focus:ring-opacity-50"
            style={{
              color: COLOR_TEXT,
              '--tw-ring-color': COLOR_ACCENT
            }}
            disabled={isLoading}
          />
        </div>

        {/* --- Button --- */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full text-white font-semibold py-3 px-4 rounded-md transition duration-300 disabled:opacity-50"
          style={{
            backgroundColor: COLOR_PRIMARY,
          }}
          // Hier wird der Hover-Stil mit der Akzentfarbe inline definiert, da Tailwind keine Arbitrary Values für Hover-Klassen ohne JIT kann.
          // Besser: In der tailwind.config.js eine custom color hinzufügen, aber inline funktioniert direkt:
          onMouseOver={(e) => !isLoading && (e.currentTarget.style.backgroundColor = COLOR_ACCENT)}
          onMouseOut={(e) => !isLoading && (e.currentTarget.style.backgroundColor = COLOR_PRIMARY)}
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>

        {/* --- Status Message --- */}
        {status && (
          <p
            className={`mt-4 p-3 rounded-md text-center font-medium ${isSuccess ? 'bg-opacity-20' : 'bg-opacity-20'}`}
            style={{
              color: isSuccess ? '#fff' : '#fff',
              backgroundColor: isSuccess ? COLOR_SUCCESS : COLOR_ERROR,
            }}
          >
            {status}
          </p>
        )}
      </form>
    </div>
  );
};