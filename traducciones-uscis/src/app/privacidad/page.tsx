import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { DOCUMENT_RETENTION_DAYS } from "@/data/legal";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: `Política de privacidad | ${SITE.name}`,
  description: `Qué datos y documentos recibe ${SITE.name}, para qué los usa, con quién los comparte y cómo pedir que los eliminemos.`,
  alternates: { canonical: "/privacidad" },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Política de privacidad" current="/privacidad">
      <p>
        Para traducir tus documentos necesitamos ver información personal, a veces muy sensible. Esta política explica qué
        recibimos, para qué lo usamos y cómo lo protegemos. Aplica a {SITE.url.replace("https://", "")} y a los pedidos
        hechos con {SITE.name}.
      </p>

      <h2>Qué datos recibimos</h2>
      <ul>
        <li>
          <strong>Al hacer tu pedido y pagar:</strong> tu nombre, el tipo de documento, el número de páginas, la fecha para la que lo
          necesitas y tus comentarios. Stripe, que procesa el pago, recibe tu correo, tu teléfono y los datos de tu tarjeta;
          nosotros no vemos ni guardamos los datos de la tarjeta.
        </li>
        <li>
          <strong>Los documentos que subes:</strong> pueden incluir nombres, fechas de nacimiento, números de identificación,
          direcciones y datos de tu familia.
        </li>
        <li>
          <strong>Si nos escribes por WhatsApp:</strong> tu número y los mensajes y archivos que nos envíes.
        </li>
        <li>
          <strong>Datos técnicos:</strong> nuestro proveedor de hosting registra datos como la dirección IP y el navegador
          para que el sitio funcione y sea seguro.
        </li>
      </ul>

      <h2>Para qué los usamos</h2>
      <ul>
        <li>Traducir tus documentos y entregarte la traducción certificada.</li>
        <li>Contactarte sobre tu pedido.</li>
        <li>Procesar pagos y reembolsos, y prevenir fraudes.</li>
        <li>Cumplir obligaciones legales, contables y tributarias.</li>
      </ul>
      <p>
        <strong>No vendemos tus datos</strong> ni usamos tus documentos para publicidad o para ningún fin distinto de tu
        pedido.
      </p>

      <h2>Con quién los compartimos</h2>
      <p>Solo con quienes necesitamos para prestar el servicio:</p>
      <ul>
        <li>
          <strong>Stripe</strong>, que procesa los pagos.
        </li>
        <li>
          <strong>Vercel</strong>, que aloja el sitio, guarda los documentos en almacenamiento privado y mide las visitas
          de forma anónima.
        </li>
        <li>
          <strong>WhatsApp (Meta)</strong>, si te comunicas con nosotros por ese medio.
        </li>
        <li>El traductor que trabaja en tu pedido.</li>
      </ul>
      <p>También podemos entregar información si una ley o una orden de autoridad competente nos lo exige.</p>

      <h2>Cómo protegemos tus documentos</h2>
      <p>
        Los documentos se guardan en almacenamiento privado, sin enlaces públicos. Solo podemos abrirlos nosotros, desde un
        panel protegido con contraseña, y todas las conexiones con el sitio están cifradas (HTTPS).
      </p>

      <h2>Cuánto tiempo los guardamos</h2>
      <p>
        Guardamos tus documentos mientras trabajamos en tu pedido y los <strong>borramos automáticamente{" "}
        {DOCUMENT_RETENTION_DAYS} días después de completarlo</strong>, lo que cubre el plazo para pedir correcciones.
        Puedes pedirnos que los borremos antes. Los registros de pago los conserva Stripe según sus obligaciones legales.
      </p>

      <h2>Tus derechos</h2>
      <p>
        Puedes pedirnos una copia de tus datos, que los corrijamos o que los eliminemos. Respondemos dentro de 30 días.
        Según el estado donde vivas, la ley puede darte derechos adicionales; atendemos esas solicitudes por el mismo medio.
      </p>

      <h2>Cookies</h2>
      <p>
        No usamos cookies de publicidad ni de analítica. Para saber cuántas personas visitan el sitio y qué páginas ven,
        usamos Vercel Web Analytics, que cuenta visitas de forma agregada, sin cookies y sin identificarte. La página de
        pago de Stripe usa sus propias cookies para procesar el pago y prevenir fraudes.
      </p>

      <h2>Menores de edad</h2>
      <p>
        El servicio está dirigido a mayores de 18 años. Los documentos de menores, como actas de nacimiento de hijos, deben
        enviarlos sus padres o tutores.
      </p>

      <h2>Cambios a esta política</h2>
      <p>Si la cambiamos, publicaremos la nueva versión en esta página con su fecha.</p>
    </LegalPage>
  );
}
