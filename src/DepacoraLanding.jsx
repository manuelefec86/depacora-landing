import React, { useState, useEffect } from "react";

/**
 * 🔧 Build error fix: remove static image imports that were failing the build.
 * We now reference image paths as strings from /public/assets to avoid compile errors
 * if files are missing. Make sure your images are placed in: public/assets/
 *   - IMG_6701.jpeg
 *   - Screenshot_2025-09-19_at_4.25.21_PM.png
 *   - ... (todas las que ya subiste)
 *
 * Tip: en Vercel/Netlify, coloca la carpeta `assets` dentro de `public/`.
 */

const ASSET = (name) => `/assets/${name}`; // runtime path (no import)
const LOGO = ASSET("IMG_6701.jpeg");

// Fallback inline SVG (no red externa) por si alguna imagen no existe
const FALLBACK_IMG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`\
    <svg xmlns='http://www.w3.org/2000/svg' width='800' height='800'>\
      <rect width='100%' height='100%' fill='#f3f4f6'/>\
      <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'\
            font-size='24' fill='#9ca3af'>Imagen no encontrada</text>\
    </svg>`);

// ==== Datos de productos (usa rutas de /public/assets) ====
const productosData = [
  {
    name: "Gato/Perro en porcelana con flores preservadas",
    price: 85000,
    oldPrice: 95000,
    desc:
      "Base en porcelana en forma de gato o perro con flores preservadas que duran años. No necesitan agua ni sol. Disponible en 12 colores.",
    imgs: [
      ASSET("Screenshot_2025-09-19_at_4.25.21_PM.png"),
      ASSET("Screenshot_2025-09-19_at_4.25.54_PM.png"),
      ASSET("Screenshot_2025-09-19_at_4.25.28_PM.png"),
      ASSET("Screenshot_2025-09-19_at_4.25.12_PM.png"),
    ],
    tag: "Oferta",
  },
  {
    name: "Florero 'Venus' con flores preservadas",
    price: 109000,
    oldPrice: 115000,
    desc:
      "Florero en cerámica 'Venus' con flores preservadas. Disponible en 12 colores. Altura del florero 13 cm.",
    imgs: [
      ASSET("Screenshot_2025-09-19_at_4.30.17_PM.png"),
      ASSET("Screenshot_2025-09-19_at_4.30.10_PM.png"),
      ASSET("Screenshot_2025-09-19_at_4.30.31_PM.png"),
      ASSET("Screenshot_2025-09-19_at_4.30.41_PM.png"),
    ],
    tag: "Nuevo",
  },
  {
    name: "Florero 'Artemisa' con flores preservadas",
    price: 119000,
    oldPrice: 125000,
    desc:
      "Florero en cerámica (Sentidos) con flores preservadas que duran años y no necesitan agua. 12 colores disponibles. Altura del florero 16 cm.",
    imgs: [
      ASSET("Screenshot_2025-09-19_at_4.32.50_PM.png"),
      ASSET("Screenshot_2025-09-19_at_4.32.56_PM.png"),
      ASSET("Screenshot_2025-09-19_at_4.33.12_PM.png"),
      ASSET("Screenshot_2025-09-19_at_4.33.02_PM.png"),
      ASSET("Screenshot_2025-09-19_at_4.32.42_PM.png"),
    ],
    tag: "Exclusivo",
  },
  {
    name: "Centro de mesa 'Angelita'",
    price: 98000,
    oldPrice: null,
    desc:
      "Hortensia preservada (20 cm diámetro aprox.) en canasto artesanal con follaje. Colores a elección según disponibilidad.",
    imgs: [
      ASSET("Screenshot_2025-09-19_at_4.35.22_PM.png"),
      ASSET("Screenshot_2025-09-19_at_4.35.31_PM.png"),
      ASSET("Screenshot_2025-09-19_at_4.35.15_PM.png"),
      ASSET("Screenshot_2025-09-19_at_4.35.10_PM.png"),
    ],
    tag: "Clásico",
  },
  {
    name: "Diseño floral redondo 'Maga'",
    price: 215000,
    oldPrice: null,
    desc:
      "Diseño floral redondo preservado con hortensia y follaje. Colores personalizables según disponibilidad. No incluye florero.",
    imgs: [ASSET("Screenshot_2025-09-19_at_4.36.54_PM.png"), ASSET("Screenshot_2025-09-19_at_4.36.45_PM.png")],
    tag: "Premium",
  },
  {
    name: "Diseño floral 'Paz' mesa de recibidor",
    price: 276000,
    oldPrice: null,
    desc:
      "Diseño floral con flores preservadas (hortensias y rosas) y follaje. Incluye florero en cerámica blanco.",
    imgs: [
      ASSET("Screenshot_2025-09-19_at_4.37.53_PM.png"),
      ASSET("Screenshot_2025-09-19_at_4.38.01_PM.png"),
      ASSET("Screenshot_2025-09-19_at_4.38.07_PM.png"),
      ASSET("Screenshot_2025-09-19_at_4.38.16_PM.png"),
    ],
    tag: "Elegancia",
  },
  {
    name: "Base porcelana 'Slim' con flores preservadas",
    price: 75000,
    oldPrice: 85000,
    desc:
      "Base en porcelana con flores preservadas que duran años y no necesitan agua. 12 colores disponibles. Siguiendo las recomendaciones duran más de 2 años.",
    imgs: [
      ASSET("Screenshot_2025-09-19_at_4.39.32_PM.png"),
      ASSET("Screenshot_2025-09-19_at_4.39.37_PM.png"),
      ASSET("Screenshot_2025-09-19_at_4.39.42_PM.png"),
      ASSET("Screenshot_2025-09-19_at_4.39.49_PM.png"),
    ],
    tag: "Económico",
  },
];

export default function DepacoraLanding() {
  const [openProduct, setOpenProduct] = useState(null);
  const [checkout, setCheckout] = useState(null);

  useEffect(() => {
    runSmokeTests(productosData);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-100 text-neutral-900">
      {/* NAVBAR */}
      <header className="sticky top-0 z-40 backdrop-blur bg-white/80 border-b">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={LOGO} onError={(e)=>{e.currentTarget.src=FALLBACK_IMG}} alt="DEPACORA logo" className="h-10 w-auto" />
            <div className="leading-tight">
              <div className="font-semibold tracking-wide text-amber-700">DEPACORA</div>
              <div className="text-xs text-neutral-500 -mt-0.5">Con amor, hecho a mano</div>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#productos" className="hover:text-amber-700">Productos</a>
            <a href="#beneficios" className="hover:text-amber-700">Beneficios</a>
            <a href="#pagos" className="hover:text-amber-700">Pagos</a>
            <a href="#faq" className="hover:text-amber-700">FAQ</a>
          </nav>
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/c/573107837057"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-2xl px-4 py-2 border border-amber-700 text-amber-700 hover:bg-amber-700 hover:text-white transition"
            >
              Catálogo WhatsApp
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center py-16">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-amber-800">
              Detalles para el corazón 💖
            </h1>
            <p className="mt-4 text-neutral-700 text-lg">
              DEPACORA te trae flores preservadas con amor, hechas a mano, que duran años y transmiten emociones auténticas.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#productos"
                className="rounded-2xl px-5 py-3 bg-amber-700 text-white hover:opacity-90"
              >
                Ver productos
              </a>
              <a
                href="https://wa.me/message/NQK7XG6ERYK6I1"
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl px-5 py-3 border border-amber-700 text-amber-700 hover:bg-amber-50"
              >
                Asesor en vivo
              </a>
            </div>
            <div className="mt-6 flex items-center gap-6 text-sm text-neutral-600">
              <div>🚚 Envíos nacionales</div>
              <div>🎁 Empaque premium</div>
              <div>🛡️ Garantía 12 meses</div>
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-3xl bg-pink-50 shadow-inner">
            <div className="absolute inset-0 grid place-items-center text-neutral-400">
              <div className="text-center">
                <div className="text-7xl">🌸</div>
                <div className="mt-2">Fotografía principal del producto</div>
                <div className="text-xs">(reemplazar por imagen real)</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTOS */}
      <section id="productos" className="py-12 border-t">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-amber-800">Productos destacados</h2>
          <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {productosData.map((p, idx) => (
              <ProductCard key={idx} p={p} onOpen={(prod)=>setOpenProduct(prod)} />
            ))}
          </div>
        </div>
      </section>

      {openProduct && (
        <ProductModal
          product={openProduct}
          onClose={()=>setOpenProduct(null)}
          onCheckout={(p, buyer)=>setCheckout(buildPayuParams(p, buyer))}
        />
      )}

      {/* POLÍTICAS Y ENVÍOS */}
      <section id="politicas" className="py-12 border-t bg-white/60">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-amber-800">Políticas y envíos</h2>
          <div className="mt-4 text-neutral-700">
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li><span className="font-medium">Bogotá:</span> costo de envío fijo de <span className="font-semibold">$10.000</span>.</li>
              <li><span className="font-medium">Resto del país:</span> tarifa según empresa de envíos / transportadora.</li>
            </ul>
          </div>
        </div>
      </section>

      {checkout && <AutoSubmitPayU params={checkout} onDone={()=>setCheckout(null)} />}

      {/* FOOTER */}
      <footer className="border-t py-10 bg-white/50">
        <div className="max-w-6xl mx-auto px-4 text-sm text-neutral-600">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="font-semibold text-amber-700">DEPACORA</div>
              <div className="italic">Con amor, hecho a mano</div>
              <div className="text-xs">© {new Date().getFullYear()} DEPACORA. Todos los derechos reservados.</div>
            </div>
            <div className="flex gap-4">
              <a href="https://wa.me/c/573107837057" target="_blank" rel="noreferrer" className="underline">WhatsApp</a>
              <a href="#politicas" className="underline">Políticas</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ProductCard({ p, onOpen }) {
  const [i, setI] = useState(0);
  const total = p.imgs?.length || 0;
  const prev = (e)=>{ e.preventDefault(); setI((i-1+total)%total); };
  const next = (e)=>{ e.preventDefault(); setI((i+1)%total); };

  useEffect(()=>{ setI(0); }, [p]);

  return (
    <article className="group rounded-3xl border overflow-hidden bg-white">
      <div
        className="relative aspect-square bg-neutral-100 overflow-hidden cursor-zoom-in"
        onClick={()=>onOpen(p)} role="button" tabIndex={0}
        onKeyDown={(e)=>{ if(e.key==='Enter') onOpen(p); }}
      >
        <img src={p.imgs?.[i] || p.imgs?.[0]} onError={(e)=>{e.currentTarget.src=FALLBACK_IMG}} alt={p.name} className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-[1.02]" />
        {total>1 && (
          <>
            <button onClick={prev} aria-label="Anterior" className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white shadow px-2 py-1 text-sm">‹</button>
            <button onClick={next} aria-label="Siguiente" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white shadow px-2 py-1 text-sm">›</button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {p.imgs.map((_, idx) => (
                <button key={idx} onClick={(e)=>{e.preventDefault(); setI(idx);}} className={`h-1.5 w-4 rounded-full ${idx===i? 'bg-amber-700' : 'bg-white/70 border border-neutral-300'}`} aria-label={`Imagen ${idx+1}`} />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold leading-tight text-amber-800">{p.name}</h3>
          <span className="text-xs bg-amber-700 text-white px-2 py-1 rounded-full">{p.tag}</span>
        </div>
        <div className="mt-1 text-neutral-600 text-sm">{p.desc}</div>
        <div className="mt-2">
          {p.oldPrice && <span className="line-through text-neutral-400 text-sm mr-2">{formatCOP(p.oldPrice)}</span>}
          <span className="text-lg font-bold text-amber-700">{formatCOP(p.price)}</span>
        </div>
        <div className="mt-3 flex gap-2">
          <a href="#pagos" className="flex-1 rounded-xl px-4 py-2 bg-amber-700 text-white text-sm text-center hover:opacity-90">Comprar ahora</a>
          <a href="https://wa.me/message/NQK7XG6ERYK6I1" target="_blank" rel="noreferrer" className="rounded-xl px-4 py-2 border border-amber-700 text-sm text-amber-700 hover:bg-amber-50">Consultar</a>
        </div>
      </div>
    </article>
  );
}

function ProductModal({ product, onClose, onCheckout }) {
  const [i, setI] = useState(0);
  const [qty, setQty] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  useEffect(()=>{ setI(0); setQty(1); setAddress(""); setCity(""); }, [product]);
  if (!product) return null;
  const total = product.imgs?.length || 0;
  const prev = ()=> setI((i-1+total)%total);
  const next = ()=> setI((i+1)%total);
  const unit = Number(product.price)||0;
  const totalAmount = unit * Math.max(1, parseInt(qty||1,10));

  function handleCheckout(){
    if(!/.+@.+\..+/.test(email)){ alert("Ingresa un correo válido para continuar"); return; }
    if(!address || !city){ alert("Por favor ingresa dirección y ciudad de entrega"); return; }
    onCheckout(product, { qty, name, email, phone, address, city });
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" aria-modal="true" role="dialog">
      <div className="bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-xl">
        <div className="flex flex-col md:flex-row">
          <div className="relative w-full md:w-1/2 aspect-square bg-neutral-100">
            <img src={product.imgs?.[i]} onError={(e)=>{e.currentTarget.src=FALLBACK_IMG}} alt={product.name} className="object-cover w-full h-full" />
            {total>1 && (
              <>
                <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white shadow px-2 py-1 text-sm">‹</button>
                <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white shadow px-2 py-1 text-sm">›</button>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                  {product.imgs.map((_, idx) => (
                    <button key={idx} onClick={() => setI(idx)} className={`h-1.5 w-4 rounded-full ${idx===i? 'bg-amber-700' : 'bg-white/70 border border-neutral-300'}`} />
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="p-6 md:w-1/2">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-xl font-semibold text-amber-800 leading-snug">{product.name}</h3>
              <button onClick={onClose} className="rounded-full bg-neutral-100 hover:bg-neutral-200 w-8 h-8 grid place-items-center">✕</button>
            </div>
            <div className="mt-2 text-neutral-600 text-sm">{product.desc}</div>
            <div className="mt-3">
              {product.oldPrice && <span className="line-through text-neutral-400 text-sm mr-2">{formatCOP(product.oldPrice)}</span>}
              <span className="text-2xl font-bold text-amber-700">{formatCOP(product.price)}</span>
              <span className="ml-2 text-sm text-neutral-500">Unidad</span>
            </div>

            {/* Formulario de compra */}
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <label className="col-span-1">Cantidad
                <input type="number" min={1} value={qty} onChange={e=>setQty(e.target.value)} className="mt-1 w-full rounded-xl border px-3 py-2" />
              </label>
              <div className="col-span-1 flex items-end">
                <div className="text-neutral-600">Total: <span className="font-semibold text-amber-700">{formatCOP(totalAmount)}</span></div>
              </div>
              <label className="col-span-2">Nombre completo
                <input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="Tu nombre" className="mt-1 w-full rounded-xl border px-3 py-2" />
              </label>
              <label className="col-span-1">Correo electrónico*
                <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="tucorreo@dominio.com" className="mt-1 w-full rounded-xl border px-3 py-2" />
              </label>
              <label className="col-span-1">Teléfono
                <input type="tel" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="300 000 0000" className="mt-1 w-full rounded-xl border px-3 py-2" />
              </label>
              <label className="col-span-2">Dirección de entrega*
                <input type="text" value={address} onChange={e=>setAddress(e.target.value)} placeholder="Calle 00 #00-00, apto 000" className="mt-1 w-full rounded-xl border px-3 py-2" />
              </label>
              <label className="col-span-2">Ciudad*
                <input type="text" value={city} onChange={e=>setCity(e.target.value)} placeholder="Bogotá / Medellín / Cali" className="mt-1 w-full rounded-xl border px-3 py-2" />
              </label>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <button onClick={handleCheckout} className="rounded-2xl px-5 py-3 bg-amber-700 text-white hover:opacity-90">Pagar con PayU</button>
              <a href={`https://wa.me/message/NQK7XG6ERYK6I1`} target="_blank" rel="noreferrer" className="rounded-2xl px-5 py-3 border border-amber-700 text-amber-700 hover:bg-amber-50">WhatsApp</a>
              <button onClick={onClose} className="ml-auto text-sm underline">Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// === PayU Sandbox integration (WebCheckout) ===
// Nota: en producción la firma debe generarse en el servidor.
const PAYU_TEST = {
  apiKey: "4Vj8eK4rloUd272L48hsrarnUA",
  merchantId: "508029",
  accountId: "512321",
  currency: "COP",
  action: "https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/",
  responseUrl: typeof window !== 'undefined' ? window.location.href : "https://example.com",
  confirmationUrl: "https://example.com/confirmation",
};

function buildPayuParams(product, buyer = {}) {
  const qty = Math.max(1, parseInt(buyer.qty || 1, 10));
  const unit = Number(product.price) || 0;
  const amount = Number(unit * qty).toFixed(2);
  const referenceCode = `DEP-${Date.now()}`;
  const signaturePlain = `${PAYU_TEST.apiKey}~${PAYU_TEST.merchantId}~${referenceCode}~${amount}~${PAYU_TEST.currency}`;
  const signature = md5(signaturePlain);
  return {
    ...PAYU_TEST,
    description: `${product.name} x${qty}`,
    referenceCode,
    amount,
    tax: "0",
    taxReturnBase: "0",
    buyerEmail: buyer.email || "test@buyer.com",
    buyerFullName: buyer.name || "Cliente Prueba",
    telephone: buyer.phone || "",
    shippingAddress: buyer.address || "",
    shippingCity: buyer.city || "",
    extra1: String(qty),
    signature,
    test: "1",
  };
}

function AutoSubmitPayU({ params, onDone }) {
  useEffect(() => {
    const f = document.getElementById("payuForm");
    if (f) f.submit();
    const t = setTimeout(onDone, 1500);
    return () => clearTimeout(t);
  }, [params]);
  return (
    <form id="payuForm" method="post" action={params.action} className="hidden">
      <input name="merchantId" defaultValue={params.merchantId} />
      <input name="accountId" defaultValue={params.accountId} />
      <input name="description" defaultValue={params.description} />
      <input name="referenceCode" defaultValue={params.referenceCode} />
      <input name="amount" defaultValue={params.amount} />
      <input name="tax" defaultValue={params.tax} />
      <input name="taxReturnBase" defaultValue={params.taxReturnBase} />
      <input name="currency" defaultValue={params.currency} />
      <input name="signature" defaultValue={params.signature} />
      <input name="test" defaultValue={params.test} />
      <input name="buyerEmail" defaultValue={params.buyerEmail} />
      <input name="buyerFullName" defaultValue={params.buyerFullName} />
      <input name="telephone" defaultValue={params.telephone} />
      <input name="shippingAddress" defaultValue={params.shippingAddress} />
      <input name="shippingCity" defaultValue={params.shippingCity} />
      <input name="responseUrl" defaultValue={params.responseUrl} />
      <input name="confirmationUrl" defaultValue={params.confirmationUrl} />
      <input name="extra1" defaultValue={params.extra1} />
    </form>
  );
}

function formatCOP(v) {
  try {
    return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(v);
  } catch {
    return `$${v.toLocaleString('es-CO')}`;
  }
}

/* Minimal MD5 implementation (public domain) */
function md5cycle(x, k) {
  let [a,b,c,d]=x;
  a=ff(a,b,c,d,k[0],7,-680876936); d=ff(d,a,b,c,k[1],12,-389564586); c=ff(c,d,a,b,k[2],17,606105819); b=ff(b,c,d,a,k[3],22,-1044525330);
  a=ff(a,b,c,d,k[4],7,-176418897); d=ff(d,a,b,c,k[5],12,1200080426); c=ff(c,d,a,b,k[6],17,-1473231341); b=ff(b,c,d,a,k[7],22,-45705983);
  a=ff(a,b,c,d,k[8],7,1770035416); d=ff(d,a,b,c,k[9],12,-1958414417); c=ff(c,d,a,b,k[10],17,-42063); b=ff(b,c,d,a,k[11],22,-1990404162);
  a=ff(a,b,c,d,k[12],7,1804603682); d=ff(d,a,b,c,k[13],12,-40341101); c=ff(c,d,a,b,k[14],17,-1502002290); b=ff(b,c,d,a,k[15],22,1236535329);
  a=gg(a,b,c,d,k[1],5,-165796510); d=gg(d,a,b,c,k[6],9,-1069501632); c=gg(c,d,a,b,k[11],14,643717713); b=gg(b,c,d,a,k[0],20,-373897302);
  a=gg(a,b,c,d,k[5],5,-701558691); d=gg(d,a,b,c,k[10],9,38016083); c=gg(c,d,a,b,k[15],14,-660478335); b=gg(b,c,d,a,k[4],20,-405537848);
  a=gg(a,b,c,d,k[9],5,568446438); d=gg(d,a,b,c,k[14],9,-1019803690); c=gg(c,d,a,b,k[3],14,-187363961); b=gg(b,c,d,a,k[8],20,1163531501);
  a=gg(a,b,c,d,k[13],5,-1444681467); d=gg(d,a,b,c,k[2],9,-51403784); c=gg(c,d,a,b,k[7],14,1735328473); b=gg(b,c,d,a,k[12],20,-1926607734);
  a=hh(a,b,c,d,k[5],4,-378558); d=hh(d,a,b,c,k[8],11,-2022574463); c=hh(c,d,a,b,k[11],16,1839030562); b=hh(b,c,d,a,k[14],23,-35309556);
  a=hh(a,b,c,d,k[1],4,-1530992060); d=hh(d,a,b,c,k[4],11,1272893353); c=hh(c,d,a,b,k[7],16,-155497632); b=hh(b,c,d,a,k[10],23,-1094730640);
  a=hh(a,b,c,d,k[13],4,681279174); d=hh(d,a,b,c,k[0],11,-358537222); c=hh(c,d,a,b,k[3],16,-722521979); b=hh(b,c,d,a,k[6],23,76029189);
  a=ii(a,b,c,d,k[0],6,-198630844); d=ii(d,a,b,c,k[7],10,1126891415); c=ii(c,d,a,b,k[14],15,-1416354905); b=ii(b,c,d,a,k[5],21,-57434055);
  a=ii(a,b,c,d,k[12],6,1700485571); d=ii(d,a,b,c,k[3],10,-1894986606); c=ii(c,d,a,b,k[10],15,-1051523); b=ii(b,c,d,a,k[1],21,-2054922799);
  a=ii(a,b,c,d,k[8],6,1873313359); d=ii(d,a,b,c,k[15],10,-30611744); c=ii(c,d,a,b,k[6],15,-1560198380); b=ii(b,c,d,a,k[13],21,1309151649);
  x[0]=add32(a,x[0]); x[1]=add32(b,x[1]); x[2]=add32(c,x[2]); x[3]=add32(d,x[3]);
}
function cmn(q,a,b,x,s,t){a=add32(add32(a,q),add32(x,t));return add32((a<<s)|(a>>> (32-s)),b);} 
function ff(a,b,c,d,x,s,t){return cmn((b & c)|((~b)&d),a,b,x,s,t);} 
function gg(a,b,c,d,x,s,t){return cmn((b & d)|(c & (~d)),a,b,x,s,t);} 
function hh(a,b,c,d,x,s,t){return cmn(b ^ c ^ d,a,b,x,s,t);} 
function ii(a,b,c,d,x,s,t){return cmn(c ^ (b | (~d)),a,b,x,s,t);} 
function md51(s){const n=s.length;const state=[1732584193,-271733879,-1732584194,271733878];let i; for(i=64;i<=n;i+=64) md5cycle(state, md5blk(s.substring(i-64,i))); s=s.substring(i-64); const tail=new Array(16).fill(0); for(i=0;i<s.length;i++) tail[i>>2]|=s.charCodeAt(i) << ((i%4)<<3); tail[i>>2]|=0x80 << ((i%4)<<3); if(i>55){ md5cycle(state, tail); for(i=0;i<16;i++) tail[i]=0; } tail[14]=n*8; md5cycle(state, tail); return state;}
function md5blk(s){const md5blks=[]; for(let i=0;i<64;i+=4){ md5blks[i>>2]= s.charCodeAt(i) + (s.charCodeAt(i+1)<<8) + (s.charCodeAt(i+2)<<16) + (s.charCodeAt(i+3)<<24);} return md5blks;}
function rhex(n){const s="0123456789abcdef"; let out=""; for(let j=0;j<4;j++){ out += s.charAt((n >> (j*8+4)) & 0x0F) + s.charAt((n >> (j*8)) & 0x0F);} return out;}
function hex(x){for(let i=0;i<x.length;i++) x[i]=rhex(x[i]); return x.join("");}
function md5(s){return hex(md51(s));}
function add32(a,b){return (a + b) & 0xFFFFFFFF;}

// ===============
// Smoke tests 🧪
// ===============
function runSmokeTests(items){
  const results = [];
  const assert = (name, cond) => results.push({ name, ok: !!cond });

  assert("productosData no vacío", Array.isArray(items) && items.length > 0);
  items.forEach((p, i) => {
    assert(`Producto #{${i+1}} tiene nombre`, typeof p.name === 'string' && p.name.trim().length > 0);
    assert(`Producto #{${i+1}} precio válido`, typeof p.price === 'number' && p.price > 0);
    assert(`Producto #{${i+1}} imgs válidas`, Array.isArray(p.imgs) && p.imgs.length > 0);
  });

  const fails = results.filter(r=>!r.ok);
  if (fails.length){
    console.warn("[DEPACORA] Smoke tests con fallas:", fails);
  } else {
    console.log("[DEPACORA] Smoke tests OK ✔");
  }
}
