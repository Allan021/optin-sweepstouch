"use client";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function OptInForm() {
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [name, setName] = useState("");
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const formatPhoneNumber = (input: string) => {
    const digits = input.replace(/\D/g, "").substring(0, 10);
    const match = digits.match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    if (!match) return "";
    return [
      match[1] ? `(${match[1]}` : "",
      match[2] ? `) ${match[2]}` : "",
      match[3] ? `-${match[3]}` : "",
    ]
      .join("")
      .trim();
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhoneNumber(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!consent) {
      toast.error("Debes aceptar recibir promociones por SMS.");
      return;
    }

    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length !== 10) {
      toast.error("Número inválido. Deben ser 10 dígitos válidos de EE.UU.");
      return;
    }

    toast.success(`Número ${phone} guardado correctamente`);
    setPhone("");
    setName("");
    setConsent(false);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-xl border border-gray-200 ">
      <Toaster position="top-center" reverseOrder={false} />

      <h2 className="text-2xl font-semibold mb-4">Sweepstouch</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1 font-medium text-sm">
            Nombre completo
          </label>
          <input
            type="text"
            placeholder="Ej. Juan Pérez"
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-200"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-sm">
            Número de teléfono (EE.UU.)
          </label>
          <input
            type="tel"
            value={phone}
            onChange={handlePhoneChange}
            placeholder="Ej. (123) 456-7890"
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-200"
            inputMode="numeric"
          />
        </div>

        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            id="smsConsent"
            checked={consent}
            onChange={() => setConsent(!consent)}
            className="mt-1"
          />
          <label htmlFor="smsConsent" className="text-sm">
            Quiero recibir promociones por SMS. Máximo 4 al mes. Aplican cargos.
            Puedo cancelar con <strong>STOP</strong>. Ver{" "}
            <button
              type="button"
              onClick={() => setShowTerms(true)}
              className="text-blue-600 underline"
            >
              Términos de servicio
            </button>{" "}
            y{" "}
            <button
              type="button"
              onClick={() => setShowPrivacy(true)}
              className="text-blue-600 underline"
            >
              Política de privacidad
            </button>
            .
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
        >
          Registrarme
        </button>
      </form>

      {showTerms && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg overflow-y-auto max-h-[80vh]">
            <h3 className="text-lg font-semibold mb-4">Términos de servicio</h3>
            <p className="text-sm mb-4 space-y-2">
              Al suscribirse a nuestras promociones por SMS, usted acepta
              recibir mensajes de texto con fines comerciales relacionados con
              ofertas y productos de su supermercado preferido. El número máximo
              de mensajes es 4 por mes. Los mensajes pueden generar cargos según
              su proveedor móvil. Usted puede cancelar en cualquier momento
              respondiendo con la palabra STOP.
              <br />
              <br />
              El servicio está destinado únicamente a usuarios mayores de 18
              años y residentes en EE.UU. No compartimos su información con
              terceros sin su consentimiento expreso. Nos reservamos el derecho
              de modificar estos términos en cualquier momento, notificando los
              cambios a través de este sitio web.
            </p>
            <button
              onClick={() => setShowTerms(false)}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {showPrivacy && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg overflow-y-auto max-h-[80vh]">
            <h3 className="text-lg font-semibold mb-4">
              Política de privacidad
            </h3>
            <p className="text-sm mb-4 space-y-2">
              Nos comprometemos a proteger su información personal. Recopilamos
              únicamente su nombre y número de teléfono con el fin exclusivo de
              enviarle promociones por SMS. Esta información no será compartida
              ni vendida a terceros.
              <br />
              <br />
              Toda la información se almacena de forma segura y se utiliza
              conforme a las leyes de privacidad aplicables en EE.UU. Usted
              puede solicitar en cualquier momento la eliminación de sus datos
              enviando un correo a soporte@sweepstouch.com.
            </p>
            <button
              onClick={() => setShowPrivacy(false)}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
