# DLB Estudio Jurídico – Sitio Web Corporativo con SEO Avanzado

**Diana Leslie Blanco – Estudio Jurídico**  
Firma jurídica especializada en derecho de seguros · Bucaramanga, Colombia  
Torre Vitro Centro Empresarial

---

## 🏛️ Descripción

Sitio web corporativo de alto nivel para DLB Estudio Jurídico. Diseño inspirado en firmas internacionales de referencia (Willkie Farr), con identidad corporativa propia, logo SVG corporativo y estrategia SEO completa para posicionamiento en **Google, Bing y motores de búsqueda de IA** (ChatGPT, Perplexity, Claude).

---

## ✅ Novedades v2

### Logo Corporativo SVG
- `images/logo-dlb-color.svg` — Logo completo sobre fondo claro (DLB + Diana Leslie Blanco + Estudio Jurídico)
- `images/logo-dlb-blanco.svg` — Logo en blanco/dorado para navbar oscuro y footer
- `images/logo-dlb-isotipo.svg` — Isotipo cuadrado usado como favicon

### SEO Técnico Implementado

| Elemento SEO | Estado |
|---|---|
| Title tag optimizado con keyword principal | ✅ |
| Meta description con keywords locales | ✅ |
| Meta keywords | ✅ |
| Canonical URL | ✅ |
| Geolocalización (geo.region, geo.position) | ✅ |
| Open Graph (Facebook, LinkedIn, WhatsApp) | ✅ |
| Twitter/X Card | ✅ |
| Favicon SVG + Apple Touch Icon | ✅ |
| Theme color (barra móvil) | ✅ |
| JSON-LD: LegalService + LawFirm | ✅ |
| JSON-LD: Person (Dra. Diana Leslie Blanco) | ✅ |
| JSON-LD: WebSite | ✅ |
| JSON-LD: FAQPage (6 preguntas) | ✅ |
| JSON-LD: BreadcrumbList | ✅ |
| Microdata itemscope en servicios | ✅ |
| Microdata LocalBusiness en footer | ✅ |
| Sitemap XML | ✅ |
| robots.txt con permisos para bots IA | ✅ |
| Skip link de accesibilidad | ✅ |
| Breadcrumb estructurado | ✅ |
| H1 con keyword principal | ✅ |
| H2 con keywords secundarias | ✅ |
| Alt text optimizado en imágenes | ✅ |
| Sección FAQ visible + acordeón | ✅ |

---

## 🎯 Estrategia de Keywords

### Keyword Principal
- `abogados derecho de seguros Bucaramanga`

### Keywords Secundarias
- `firma jurídica seguros Colombia`
- `litigios seguros Bucaramanga`
- `abogados seguros Santander`
- `reclamaciones pólizas Colombia`
- `subrogación de seguros Colombia`
- `responsabilidad civil abogados Bucaramanga`
- `derecho laboral seguros Bucaramanga`
- `DLB Estudio Jurídico`
- `Diana Leslie Blanco abogada`
- `Torre Vitro abogados Bucaramanga`

### Optimizado para búsquedas IA
El robots.txt permite explícitamente el rastreo de:
- GPTBot (ChatGPT)
- ChatGPT-User
- Google-Extended (Bard/Gemini)
- PerplexityBot
- ClaudeBot / anthropic-ai

---

## 📁 Estructura de Archivos

```
index.html                    ← Página principal (SEO completo)
css/
  style.css                   ← Estilos + FAQ acordeón + logo styles
js/
  main.js                     ← Nav, animaciones, FAQ, formulario, logo failsafe
images/
  logo-dlb-color.svg          ← Logo corporativo completo (colores)
  logo-dlb-blanco.svg         ← Logo para fondos oscuros (navbar/footer)
  logo-dlb-isotipo.svg        ← Isotipo cuadrado / favicon
  torre-vitro-1.jpg           ← Hero y contacto
  torre-vitro-2.jpg           ← Quiénes somos y enfoque
seo/
  schema-reference.js         ← Referencia de schema types usados
sitemap.xml                   ← Mapa del sitio para buscadores
robots.txt                    ← Directivas crawlers (Google + IA bots)
README.md                     ← Documentación
```

---

## 🗃️ Modelo de Datos

### Tabla: `consultas`
| Campo | Tipo | Descripción |
|---|---|---|
| id | text | ID único |
| nombre | text | Nombre del solicitante |
| apellido | text | Apellido |
| email | text | Correo electrónico |
| telefono | text | Teléfono |
| area | text | Área jurídica (enum) |
| mensaje | rich_text | Descripción del caso |
| fecha | datetime | Fecha de solicitud |

**API:** `tables/consultas`

---

## 🌐 Secciones del Sitio

| Sección | ID | Descripción |
|---|---|---|
| Hero | `#hero` | H1 con keyword principal + Torre Vitro |
| Strip datos | — | Contadores animados |
| Quiénes somos | `#quienes` | Historia + valores + logo |
| Áreas de práctica | `#areas` | 9 servicios con microdata |
| FAQ | `#faq` | 6 preguntas optimizadas para SEO/IA |
| Cita destacada | `#cita` | Quote socia fundadora |
| Enfoque | `#enfoque` | Metodología 4 pasos |
| Sectores | `#sectores` | Clientes atendidos |
| Por qué elegirnos | `#porque` | 4 diferenciadores |
| Equipo | `#equipo` | Dra. Diana Leslie Blanco |
| Cobertura | `#cobertura` | Mapa + ciudades |
| Contacto | `#contacto` | Formulario + datos |

---

## 🎨 Identidad Visual

| Elemento | Valor |
|---|---|
| Navy principal | `#0A1628` |
| Dorado | `#C9A84C` |
| Fuente display | Cormorant Garamond |
| Fuente cuerpo | Inter |
| Favicon | `logo-dlb-isotipo.svg` |

---

## 🔧 Próximos Pasos Recomendados

1. **Actualizar datos de contacto reales** (tel, email, WhatsApp)
2. **Registrar en Google Business Profile** con la misma información NAP del sitio
3. **Enviar sitemap.xml** a Google Search Console y Bing Webmaster Tools
4. **Añadir foto profesional** de la Dra. Diana Leslie Blanco
5. **Crear blog/noticias jurídicas** sobre seguros (contenido fresco para SEO)
6. **Obtener backlinks** desde directorios de abogados (Cámara de Comercio, Supersociedades)
7. **Google Analytics 4** para medir tráfico orgánico
8. **Versión en inglés** para clientes internacionales

---

## 🚀 Despliegue

Para publicar, usar la pestaña **Publish**.  
Tras publicar: enviar `sitemap.xml` a Google Search Console → Cobertura → Enviar sitemap.

---

*DLB Estudio Jurídico – Bucaramanga, Colombia © 2025*
