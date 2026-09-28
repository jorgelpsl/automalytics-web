import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { CORRECTION_DAYS } from "@/data/legal";
import { SITE } from "@/data/site";
import { PRICE_TIERS, formatUsd, tierRange } from "@/lib/pricing";

export const metadata: Metadata = {
  title: `Términos del servicio | ${SITE.name}`,
  description: `Condiciones para contratar traducciones certificadas para USCIS con ${SITE.name}: precio, plazos, correcciones y responsabilidades.`,
  alternates: { canonical: "/terminos" },
};

export default function TermsPage() {
  return (
    <LegalPage title="Términos del servicio" current="/terminos">
      <p>
        Estos términos regulan el uso de {SITE.url.replace("https://", "")} y la compra de traducciones a {SITE.name}{" "}
        (“Certa”, “nosotros”). Al pagar un pedido aceptas estos términos, la{" "}
        <Link href="/reembolsos">Política de reembolsos</Link> y la <Link href="/privacidad">Política de privacidad</Link>.
      </p>

      <h2>1. Qué ofrecemos</h2>
      <p>
        Traducimos documentos del español al inglés y entregamos, en PDF, la traducción completa junto con una certificación
        firmada por el traductor. En ella declara que es competente para traducir del español al inglés y que la traducción
        es completa y exacta, que es lo que USCIS pide para documentos en otro idioma (8 CFR § 103.2(b)(3)).
      </p>
      <ul>
        <li>
          <strong>Somos un servicio privado.</strong> No estamos afiliados a USCIS ni a ninguna agencia del gobierno de
          Estados Unidos.
        </li>
        <li>
          <strong>No damos asesoría legal ni migratoria.</strong> No indicamos qué documentos presentar ni cómo llenar
          formularios.
        </li>
        <li>
          <strong>La decisión sobre tu trámite es de USCIS.</strong> Nos comprometemos a entregar una traducción completa,
          exacta y certificada; no podemos garantizar el resultado de tu solicitud.
        </li>
      </ul>

      <h2>2. Precio y páginas</h2>
      <ul>
        {PRICE_TIERS.map((tier) => (
          <li key={tier.minPages}>
            {tierRange(tier)}: {formatUsd(tier.perPage)} por página.
          </li>
        ))}
      </ul>
      <p>
        El precio por página depende del total de páginas del pedido y se aplica a todas. Una página es cada cara de un
        documento que tenga texto, sellos o firmas. Los precios están en dólares estadounidenses (USD).
      </p>
      <p>
        Cobramos según el número de páginas que indicas al pagar, y puedes subir hasta esa cantidad. Si tu documento tiene
        más páginas, necesitas pagar las adicionales en un pedido nuevo antes de que las traduzcamos. Podemos cambiar los
        precios en el futuro, pero el precio de un pedido ya pagado no cambia.
      </p>

      <h2>3. Pago</h2>
      <p>
        Los pagos se procesan con Stripe, con tarjeta de crédito o débito, Apple Pay o Google Pay. No vemos ni guardamos los
        datos de tu tarjeta. Stripe te envía el recibo del pago a tu correo.
      </p>

      <h2>4. Plazo de entrega</h2>
      <ul>
        <li>
          Entregamos {SITE.turnaround ? `en ${SITE.turnaround}` : "en el plazo que te confirmamos al cotizar"}, contado
          desde que recibimos todas las páginas pagadas, completas y legibles.
        </li>
        <li>Si alguna página no se lee bien, te pediremos otra foto; el plazo corre desde que la recibimos.</li>
        <li>
          Si nos indicas una fecha límite, te avisamos de inmediato si no podemos cumplirla, para que decidas si seguir con
          el pedido.
        </li>
      </ul>

      <h2>5. Lo que necesitamos de ti</h2>
      <ul>
        <li>Fotos o PDF legibles de todas las páginas, incluidos sellos, firmas y notas al margen.</li>
        <li>
          Que tengas derecho a entregarnos esos documentos: que sean tuyos o de personas que te autorizaron, como tus hijos
          menores de edad.
        </li>
        <li>
          Que revises la traducción al recibirla, en especial nombres, fechas y números, y nos avises si ves un error.
        </li>
      </ul>

      <h2>6. Correcciones</h2>
      <p>
        Si encuentras un error en la traducción, lo corregimos sin costo si nos avisas dentro de los {CORRECTION_DAYS} días
        siguientes a la entrega. Traducimos fielmente lo que dice el documento original: si el original contiene un error,
        por ejemplo un nombre mal escrito, la traducción lo reproduce, y podemos agregar una nota del traductor que lo
        señale.
      </p>

      <h2>7. Cancelaciones y reembolsos</h2>
      <p>
        <strong>Todas las compras son finales.</strong> Una vez hecho el pago no hacemos reembolsos y el pedido no se puede
        cancelar. Los detalles están en la <Link href="/reembolsos">Política de reembolsos</Link>.
      </p>

      <h2>8. Responsabilidad</h2>
      <p>
        En la medida en que la ley lo permita, nuestra responsabilidad por un pedido se limita al monto que pagaste por ese
        pedido. No respondemos por demoras, requerimientos o decisiones de USCIS u otras autoridades, ni por daños
        indirectos derivados del uso de la traducción.
      </p>

      <h2>9. Cambios a estos términos</h2>
      <p>
        Si cambiamos estos términos publicaremos la nueva versión en esta página con su fecha. Los cambios se aplican a los
        pedidos pagados después de esa fecha.
      </p>
    </LegalPage>
  );
}
