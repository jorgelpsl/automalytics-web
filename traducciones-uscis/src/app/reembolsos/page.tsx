import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { CORRECTION_DAYS } from "@/data/legal";
import { SITE } from "@/data/site";
import { generalWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: `Política de reembolsos | ${SITE.name}`,
  description: `En ${SITE.name} todas las compras son finales. Qué revisar antes de pagar y cómo corregimos errores sin costo.`,
  alternates: { canonical: "/reembolsos" },
};

export default function RefundsPage() {
  return (
    <LegalPage title="Política de reembolsos" current="/reembolsos">
      <p>
        <strong>Todas las compras son finales.</strong> Una vez hecho el pago no hacemos reembolsos, ni totales ni parciales,
        y el pedido no se puede cancelar. Esta política forma parte de los{" "}
        <Link href="/terminos">Términos del servicio</Link>.
      </p>

      <h2>Antes de pagar</h2>
      <p>Como no hay reembolsos, revisa tu pedido antes de pagar:</p>
      <ul>
        <li>
          <strong>El número de páginas.</strong> Cuenta cada cara del documento que tenga texto, sellos o firmas. Cobramos y
          traducimos según las páginas que indicas.
        </li>
        <li>
          <strong>El tipo de documento.</strong> Si no está en la lista, elige “Otro” y descríbelo en los comentarios.
        </li>
        <li>
          <strong>Si tienes dudas,</strong>{" "}
          <a href={generalWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
            pregúntanos por WhatsApp
          </a>{" "}
          antes de pagar.
        </li>
      </ul>

      <h2>Si tu documento tiene más páginas</h2>
      <p>
        Solo puedes subir las páginas que pagaste. Si tu documento tiene más, paga las páginas adicionales en un pedido
        nuevo y súbelas ahí.
      </p>

      <h2>Correcciones sin costo</h2>
      <p>
        Aunque no hay reembolsos, si la traducción tiene un error lo corregimos gratis, siempre que nos avises dentro de los{" "}
        {CORRECTION_DAYS} días siguientes a la entrega.
      </p>

      <h2>Problemas con un cobro</h2>
      <p>
        Si ves un cobro que no reconoces o tienes un problema con tu pedido, escríbenos antes de disputarlo con tu banco: lo
        revisamos directamente y más rápido.
      </p>
    </LegalPage>
  );
}
