/* ------------------------------------------------------------------
   Contenido profesional centralizado.

   `projects[].case` alimenta la página de detalle (proyectos/<slug>.html).
   Todo lo que se muestra en el sitio sale de este archivo: para actualizar
   el portfolio no hace falta tocar HTML ni CSS.
------------------------------------------------------------------- */

window.PORTFOLIO_DATA = Object.freeze({
  person: {
    name: 'Tomás Vallejos',
    role: 'Estudiante de Ingeniería en Sistemas · Full Stack & IA',
    location: 'Venado Tuerto, Santa Fe, Argentina',
    email: 'tomasvallejos081@gmail.com',
    linkedin: 'https://www.linkedin.com/in/tomasvallejos123',
    github: 'https://github.com/tomasvallejos1',
    cv: 'CV_TOMASVALLEJOS.pdf',
  },

  projects: [
    /* ============================================================ 01 */
    {
      slug: 'mangofi',
      number: '01',
      title: 'MangoFi',
      category: 'Fintech · IA aplicada',
      year: '2026 — Presente',
      status: 'Beta pública',
      role: 'Producto y desarrollo full stack',
      description:
        'Gestor financiero personal que junta gastos, inversiones, cuentas y tarjetas en un solo lugar. Se cargan gastos por WhatsApp, se escanean comprobantes con IA y las cotizaciones se actualizan solas. Construido con foco en el rendimiento: se usa desde el celular y tiene que abrir al instante.',
      technologies: ['TypeScript', 'Angular', 'Node.js', 'Express', 'PostgreSQL', 'OpenAI', 'NVIDIA NIM'],
      href: 'https://mangofi.pages.dev/',
      source: 'https://github.com/tomasvallejos1/ERP-Finanzas-Personales',
      sourceLabel: 'Ver prototipo inicial',
      linkLabel: 'Explorar la beta',
      visualLabel: 'FINTECH / AI / 2026',
      accent: '#c8ff66',
      accentInk: '#4d6b00',
      cover: 'assets/proyectos/mangofi/app-inicio.webp',
      coverDevice: 'mobile',
      coverAlt:
        'Pantalla de inicio de MangoFi en un celular: patrimonio total, balance del mes, inversiones, análisis de gastos por categoría y presupuestos.',

      case: {
        tagline: 'Finanzas personales sin planillas: registrar un gasto tiene que costar menos que olvidarlo.',

        facts: [
          { label: 'Rol', value: 'Producto + full stack' },
          { label: 'Equipo', value: 'Proyecto individual' },
          { label: 'Foco', value: 'Rendimiento y experiencia' },
          { label: 'Estado', value: 'Beta pública, en desarrollo' },
          { label: 'Desde', value: 'Marzo 2026' },
        ],

        problem: {
          title: 'El problema',
          lead: 'Llevar las finanzas personales en una planilla funciona hasta la tercera semana.',
          paragraphs: [
            'Casi todos los que intentan ordenar sus gastos arrancan con una planilla de Excel o Google Sheets. El problema no es la herramienta: es que cargar cada gasto a mano tiene un costo mayor al beneficio percibido, y en dos semanas la planilla queda desactualizada. Cuando la información está incompleta, deja de servir para decidir.',
            'A eso se le suma un contexto argentino particular: se convive con dos monedas, las compras se pagan en cuotas que vencen meses después, y las inversiones cambian de valor todos los días. Una planilla estática no modela nada de eso sin volverse un monstruo de fórmulas.',
          ],
          bullets: [
            'Cargar un gasto tiene que llevar segundos, no minutos.',
            'Las cuotas de tarjeta son deuda futura, no un gasto puntual del mes.',
            'Pesos y dólares tienen que convivir sin conversiones manuales.',
            'Si el patrimonio no se actualiza solo, nadie lo mira.',
          ],
        },

        origin: {
          title: 'Cómo nació',
          paragraphs: [
            'Nació de un problema propio. Estaba llevando mis gastos en una planilla y me cansé de la fricción de abrirla, buscar la fila y anotar. La pregunta que disparó todo fue simple: ¿y si en lugar de ir yo hasta la app, la app viniera hasta donde ya estoy?',
            'El primer prototipo fue un ERP de finanzas con React, Vite y Supabase, más un documento de arquitectura, modelo de datos y casos de uso escritos antes de la primera línea de código. Ese prototipo sirvió para validar el modelo relacional (la separación entre movimiento y cuota, el uso de tipos de precisión exacta para plata) y quedó publicado como repositorio.',
            'Con el modelo de datos ya probado, reescribí el producto: Angular en el front, una API REST propia en Node y PostgreSQL como base. Ahí apareció Manguito, el asistente de WhatsApp, que es lo que terminó definiendo el producto: cargar un gasto escribiendo un mensaje o mandando la foto de un ticket.',
          ],
        },

        solves: {
          title: 'Qué resuelve',
          items: [
            {
              title: 'Todo el dinero, en un panel',
              text: 'Gastos, ingresos, cuentas e inversiones en una sola vista, con el patrimonio neto siempre al día.',
            },
            {
              title: 'Carga por WhatsApp',
              text: 'Un asistente lee el mensaje en lenguaje natural, entiende qué se gastó y lo registra sin abrir la app.',
            },
            {
              title: 'Lectura de comprobantes',
              text: 'Una foto del ticket o del resumen alcanza: un modelo de visión extrae los datos y arma el movimiento.',
            },
            {
              title: 'Inversiones que se actualizan solas',
              text: 'Las cotizaciones se refrescan cada 15 minutos en horario de mercado, sin tocar nada.',
            },
            {
              title: 'Tarjetas y cuotas sin sorpresas',
              text: 'Cierres, vencimientos y cuánto queda por pagar, modelado como deuda futura y no como gasto del mes.',
            },
            {
              title: 'Pesos y dólares',
              text: 'Las dos monedas conviven en el mismo panel con el tipo de cambio que el usuario elija.',
            },
          ],
        },

        stack: {
          title: 'Stack y por qué',
          groups: [
            {
              name: 'Frontend',
              items: [
                {
                  name: 'Angular + TypeScript',
                  why: 'Es una app con muchos formularios, estados y validaciones de plata. Angular trae routing, formularios reactivos e inyección de dependencias de fábrica, y TypeScript evita la clase de errores más cara acá: confundir tipos en montos y fechas.',
                },
                {
                  name: 'PWA + Cloudflare Pages',
                  why: 'El uso real es desde el celular. Se publica como PWA instalable sobre una CDN estática: carga rápida, sin servidor que mantener del lado del front y despliegue automático en cada push.',
                },
              ],
            },
            {
              name: 'Backend',
              items: [
                {
                  name: 'Node.js + Express',
                  why: 'API REST propia, separada del front. Mantener el mismo lenguaje en los dos lados baja el costo de contexto cuando se trabaja solo.',
                },
                {
                  name: 'PostgreSQL',
                  why: 'Los datos son estrictamente relacionales: usuarios, cuentas, movimientos, cuotas, inversiones. Se eligió una base relacional con integridad referencial en vez de documentos, justamente para no poder guardar una cuota huérfana.',
                },
              ],
            },
            {
              name: 'Inteligencia artificial',
              items: [
                {
                  name: 'OpenAI · NVIDIA NIM',
                  why: 'Dos usos distintos: entender mensajes en lenguaje natural (“gasté 12 lucas en el súper”) y leer comprobantes con un modelo de visión que devuelve JSON estructurado.',
                },
              ],
            },
          ],
        },

        performance: {
          title: 'Rendimiento como parte de la experiencia',
          lead:
            'MangoFi se usa desde el celular, muchas veces con datos móviles y en el momento justo en que se hace el gasto. Una app de finanzas que tarda en abrir es una app que no se abre: acá el rendimiento no es una optimización de último momento, es el requisito que ordena las decisiones técnicas.',
          items: [
            {
              title: 'PWA instalable, con su propio caché',
              text: 'La app se instala en el teléfono y guarda su shell. A partir de la segunda visita no espera a la red para pintar la primera pantalla.',
            },
            {
              title: 'CSS crítico embebido en el HTML',
              text: 'El build inserta en la respuesta los estilos de lo que se ve primero, en vez de pedir la hoja completa y quedarse en blanco esperándola.',
            },
            {
              title: 'Fuentes que no bloquean el texto',
              text: 'Precarga de los dominios de fuentes y font-display: swap. El texto es legible desde el primer cuadro, aunque la tipografía llegue un instante después.',
            },
            {
              title: 'Carga diferida por ruta',
              text: 'Cada sección viaja en su propio paquete. Entrar al login no descarga el código de inversiones, tarjetas ni el del asistente.',
            },
            {
              title: 'Front estático servido desde el borde',
              text: 'El frontend es estático y se sirve por CDN, cerca del usuario. La API vive aparte y sólo se consulta cuando hay datos que traer.',
            },
            {
              title: 'Diseñado primero para la pantalla chica',
              text: 'El layout parte del celular, así que no hay que descargar ni ejecutar una versión de escritorio para después adaptarla.',
            },
          ],
        },

        patterns: {
          title: 'Patrones y decisiones de diseño',
          intro:
            'No se aplicaron patrones por catálogo: cada uno resuelve un problema concreto que ya había aparecido.',
          items: [
            {
              name: 'Cliente / servidor desacoplado',
              where: 'Angular en Cloudflare Pages ↔ API REST en Node',
              why: 'El front es estático y la API vive aparte. Se pueden desplegar por separado, y mañana un cliente distinto (el bot de WhatsApp, por ejemplo) consume la misma API sin duplicar lógica.',
            },
            {
              name: 'Repository / capa de servicios',
              where: 'Servicios de Angular como única puerta a la API',
              why: 'Ningún componente hace fetch. Cada dominio (movimientos, cuentas, inversiones) tiene su servicio, así el día que cambia un endpoint se toca un archivo y no quince componentes.',
            },
            {
              name: 'Interceptor + guards de ruta',
              where: 'Autenticación con token de acceso y refresh',
              why: 'El token se inyecta de forma transparente en cada request y se renueva solo cuando expira. Las rutas privadas quedan detrás de guards: la protección es declarativa y no se olvida en una pantalla nueva.',
            },
            {
              name: 'Tipos de precisión exacta para dinero',
              where: 'Modelo de base de datos',
              why: 'Nada de coma flotante para plata. Con float, sumar mil movimientos deja un error de centavos que en una app de finanzas rompe la confianza en el número.',
            },
            {
              name: 'Movimiento y cuota como entidades separadas',
              where: 'Modelo relacional',
              why: 'Una compra en 12 cuotas es un movimiento y doce obligaciones futuras. Modelarlo así permite responder “cuánto debo en marzo” sin recalcular nada.',
            },
          ],
        },

        decisions: {
          title: 'Decisiones que costaron',
          items: [
            {
              title: 'Reescribir el prototipo en vez de estirarlo',
              choice: 'El primer prototipo (React + Supabase) quedó como validación del modelo de datos y el producto se rehízo en Angular con API propia.',
              why: 'El prototipo servía para probar el esquema, no para sostener autenticación, roles, tarjetas e inversiones. Con el modelo ya validado, reescribir salió más barato que parchear.',
              tradeoff: 'Se perdieron semanas de trabajo de UI, pero se ganó una base sobre la que se puede seguir construyendo.',
            },
            {
              title: 'Documentar la arquitectura antes de programar',
              choice: 'Arquitectura, modelo físico de base de datos y casos de uso escritos antes del primer commit.',
              why: 'Con un modelo relacional estricto, cambiar el esquema a mitad de camino obliga a migrar datos y tocar todas las consultas. Es más barato discutirlo en un documento.',
              tradeoff: 'Arrancar lleva más tiempo y hay que resistir la tentación de codear el primer día.',
            },
            {
              title: 'Que el producto vaya al usuario',
              choice: 'Asistente por WhatsApp además de la app web.',
              why: 'La app compite contra el olvido, no contra otras apps. Si registrar un gasto exige abrir algo, se pierde. WhatsApp ya está abierto.',
              tradeoff: 'Sumó un canal más que mantener y la complejidad de interpretar lenguaje natural con márgenes de error.',
            },
          ],
        },

        learned: {
          title: 'Lo que me llevo',
          items: [
            'En una app de plata, la precisión de los tipos no es un detalle: es el producto.',
            'Un prototipo tiene que servir para aprender algo concreto y después poder tirarse.',
            'La mejor función es la que elimina un paso, no la que agrega una pantalla.',
          ],
        },

        screens: {
          title: 'Pantallas reales',
          note: 'Capturas de la app en uso, con datos cargados.',
          items: [
            {
              src: 'assets/proyectos/mangofi/app-inicio.webp',
              alt: 'Pantalla de inicio de MangoFi: patrimonio total, balance del mes, inversiones, rendimientos del día, un anillo con lo gastado en el mes por categoría y el avance de los presupuestos.',
              caption: 'Inicio',
              text: 'Patrimonio neto, balance del mes, gastos por categoría y presupuestos en una sola pantalla. El presupuesto marca dónde debería estar el gasto según el día del mes.',
              device: 'mobile',
              deviceFrame: true,
            },
            {
              src: 'assets/proyectos/mangofi/app-cuentas.webp',
              alt: 'Pantalla "Mis cuentas" de MangoFi con la tarjeta de una billetera virtual y su saldo, accesos para agregar, pasar dinero y registrar un gasto, y el historial de últimos movimientos.',
              caption: 'Cuentas y movimientos',
              text: 'Cada cuenta con su saldo y el historial debajo, donde aparecen los gastos que entraron por el chat.',
              device: 'mobile',
              deviceFrame: true,
            },
            {
              src: 'assets/proyectos/mangofi/app-tarjetas.webp',
              alt: 'Pantalla "Mis tarjetas" de MangoFi con una tarjeta de crédito, el límite disponible en un gráfico circular y el próximo resumen proyectado mes a mes.',
              caption: 'Tarjetas y cuotas',
              text: 'Límite disponible, consumos y el resumen proyectado hacia adelante: las cuotas se ven como lo que son, deuda futura.',
              device: 'mobile',
              deviceFrame: true,
            },
            {
              src: 'assets/proyectos/mangofi/app-inversiones.webp',
              alt: 'Pantalla "Mi cartera" de MangoFi: valor total de las inversiones en pesos y su equivalente en dólares, ganancia diaria, ganancia total y resultado realizado, botones para comprar, vender e importar, y una sección de análisis con IA de riesgo y oportunidades.',
              caption: 'Inversiones',
              text: 'Valor de la cartera en pesos o dólares, ganancia del día y total, y un análisis con IA de riesgos y oportunidades.',
              device: 'mobile',
              deviceFrame: true,
            },
            {
              src: 'assets/proyectos/mangofi/app-chat.webp',
              alt: 'Asistente Manguito dentro de MangoFi, con accesos rápidos para cargar un movimiento, consultar el balance y ver preguntas frecuentes, y un campo para escribir, dictar o sacar una foto.',
              caption: 'Manguito, el asistente',
              text: 'El mismo asistente que responde por WhatsApp, dentro de la app: acepta texto, voz o la foto de un comprobante.',
              device: 'mobile',
              deviceFrame: true,
            },
          ],
        },

        links: [
          { label: 'Entrar a la beta', href: 'https://mangofi.pages.dev/', kind: 'primary' },
          {
            label: 'Prototipo inicial en GitHub',
            href: 'https://github.com/tomasvallejos1/ERP-Finanzas-Personales',
            kind: 'secondary',
          },
        ],
      },
    },

    /* ============================================================ 02 */
    {
      slug: 'gestor-taller',
      number: '02',
      title: 'Gestión de talleres',
      category: 'Software de gestión · Cliente real',
      year: '2025 — Presente',
      status: 'En producción',
      role: 'Desarrollo full stack',
      description:
        'Solución a medida para un taller de reparaciones real. Digitaliza años de fichas técnicas en papel con IA, las relaciona con cada reparación y le da seguimiento tanto en estado como contable, con presupuestos, remitos y facturación electrónica integrada con ARCA.',
      technologies: ['JavaScript', 'React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Deno', 'NVIDIA NIM', 'ARCA (WSFE)'],
      href: 'https://bobinadosdavid.vercel.app/',
      source: 'https://github.com/tomasvallejos1/gestor-taller',
      linkLabel: 'Visitar el sistema',
      visualLabel: 'OPERATIONS / 2025',
      accent: '#ff8e6e',
      accentInk: '#b3451f',
      cover: 'assets/proyectos/gestor-taller/landing.webp',
      coverAlt: 'Portada del sitio de Bobinados David con el mensaje "Potenciamos tus motores"',

      case: {
        tagline: 'Un taller con años de fichas técnicas en papel, sin forma de relacionarlas con cada reparación ni de saber qué se debía cobrar.',

        facts: [
          { label: 'Rol', value: 'Full stack' },
          { label: 'Cliente', value: 'Bobinados David, Venado Tuerto' },
          { label: 'Estado', value: 'En producción' },
          { label: 'Desde', value: 'Noviembre 2025' },
          { label: 'Impacto', value: '3 min → 15 s por ficha' },
        ],

        problem: {
          title: 'El problema',
          lead: 'La empresa trabaja con una ficha técnica por cada producto que pasa por el taller, y esas fichas eran papel: años de carpetas, sin relación con las reparaciones que generaban.',
          paragraphs: [
            'Un taller de reparaciones recibe un motor, lo diagnostica con una ficha técnica, presupuesta, repara y entrega. La ficha —marca, modelo, mediciones, características— podía ser nueva o ya existir en una carpeta de años atrás. El problema no era solo cargar fichas: era relacionarlas con la reparación correspondiente y después poder seguir esa reparación, tanto en qué estado de trabajo estaba como en qué quedaba pendiente de cobrar.',
            'Encima de eso, funciones que hoy parecen básicas —armar un presupuesto, dar de alta un cliente, generar un remito o facturar— se hacían a mano, cada vez desde cero. Cuando un cliente llamaba para preguntar por su motor, había que ir a buscar el papel; y no había forma de saber, sin contarlo, cuánto quedaba sin cobrar en un momento dado.',
          ],
          bullets: [
            'Fichas técnicas de años, en papel, sin relación con las reparaciones que originaron.',
            'Buscar una ficha por marca o característica en papel no es viable; en un sistema, es una búsqueda.',
            'Seguimiento de la reparación en dos planos a la vez: estado de trabajo y estado de cobro.',
            'Presupuestos, remitos y facturas rehechos a mano cada vez.',
            'El cliente llama porque no tiene forma de saber en qué estado está su equipo.',
          ],
        },

        origin: {
          title: 'Cómo nació',
          paragraphs: [
            'La empresa presentó el problema tal cual lo vivía en el día a día. A partir de ahí se relevaron los requisitos, tanto los explícitos —lo que el taller pedía directamente— como los implícitos: cosas que daban por sentadas sin nombrarlas, como que una ficha nueva y una ya guardada en papel tenían que cargarse del mismo modo, o que el mismo sistema debía verse igual de bien en una PC de administración que en una tablet de taller. Con ese relevamiento se diseñó una solución a medida, no una plantilla genérica de gestión.',
            'La primera versión fue un MERN clásico: React, Express y MongoDB, con carga de fotos a Cloudinary y autenticación con JWT. Resolvía el CRUD, pero cada función nueva pedía más backend propio: subir archivos, mandar mails, generar PDFs, correr tareas programadas.',
            'Esa versión también chocó con una realidad del taller: nadie iba a sentarse a tipear la ficha técnica en una computadora. Escribir el papel toma un minuto; cargarlo a mano en un formulario, diez. Si el sistema agrega trabajo, no se usa. De ahí salió la idea que cambió el proyecto: sacarle una foto a la ficha escrita a mano y que un modelo de visión la transcriba a datos estructurados. Con eso, digitalizar años de papel deja de ser una tarea y pasa a ser un gesto.',
            'Por eso también se optó por un cliente web y no una aplicación de escritorio: el mismo sistema tenía que andar sin instalar nada, tanto en las PC de administración como en las tablets que se pusieron en las zonas de taller.',
            'La versión actual es un monorepo con la app web en React, la base y la lógica de servidor sobre Supabase (PostgreSQL con seguridad a nivel de fila y funciones edge en TypeScript), facturación electrónica integrada con ARCA y un bot de Telegram para operar desde el celular sin salir del chat.',
          ],
        },

        solves: {
          title: 'Qué resuelve',
          items: [
            {
              title: 'Fichas técnicas por foto',
              text: 'Se fotografía la ficha —nueva o de una carpeta de años atrás— y un modelo de visión devuelve los datos ya cargados, listos para revisar y confirmar. Se buscan después por marca o característica, no hoja por hoja.',
            },
            {
              title: 'Reparaciones ligadas a su ficha',
              text: 'Cada reparación queda relacionada con la ficha técnica del equipo: qué se midió, qué se hizo, con qué motor.',
            },
            {
              title: 'Seguimiento de estado',
              text: 'En el taller, para entregar, entregada: el panel muestra de un vistazo en qué etapa está cada trabajo.',
            },
            {
              title: 'Seguimiento contable',
              text: 'Pagado, impago, cuánto hay sin cobrar en total. La plata pendiente deja de vivir solo en la cabeza del dueño.',
            },
            {
              title: 'Presupuestos, clientes y remitos',
              text: 'Funciones que antes eran manuales: armar un presupuesto desde los datos ya cargados, gestionar clientes y generar el remito de entrega.',
            },
            {
              title: 'Facturación electrónica con ARCA',
              text: 'El sistema está integrado con ARCA: emite la factura online y la valida, sin pasar por un facturador aparte.',
            },
            {
              title: 'Portal del cliente',
              text: 'Desde la landing, el cliente consulta el estado de su reparación con el número de orden y accede al remito y, si ya está emitida, a la factura.',
            },
            {
              title: 'Operación desde Telegram',
              text: 'Cargar una ficha o consultar un presupuesto desde el chat, sin abrir la computadora.',
            },
          ],
        },

        impact: {
          title: 'Impacto medible',
          lead: 'Digitalizar años de fichas en papel dejó de ser un proyecto y pasó a ser una tarea de fondo.',
          stats: [
            { value: '3 min', label: 'por ficha, a mano' },
            { value: '15 s', label: 'por ficha, con el escáner con IA' },
            { value: '12×', label: 'más rápido' },
            { value: '≈ 46 h', label: 'ahorradas cada 1.000 fichas' },
          ],
          note: 'Estimaciones del taller sobre su propio volumen de fichas. Además del tiempo, resuelve algo que el papel no puede: encontrar una ficha por marca o característica en segundos, en vez de revisar carpetas de años.',
        },

        stack: {
          title: 'Stack y por qué',
          groups: [
            {
              name: 'Frontend',
              items: [
                {
                  name: 'React + Vite, como PWA',
                  why: 'El mismo cliente web se usa en las PC de administración y en las tablets instaladas en las zonas de taller, sin instalar nada. Vite da un build liviano y la PWA se instala como una app más, con actualización avisada en pantalla.',
                },
                {
                  name: 'React Router + Context',
                  why: 'Estado global chico y acotado: sesión y tema. No hacía falta una librería de estado externa para dos contextos.',
                },
              ],
            },
            {
              name: 'Datos y backend',
              items: [
                {
                  name: 'Supabase (PostgreSQL)',
                  why: 'Base relacional con migraciones versionadas y seguridad a nivel de fila. Las reglas de acceso viven en la base, no en el cliente: aunque alguien llame a la API directo, no ve datos ajenos.',
                },
                {
                  name: 'Edge Functions en TypeScript (Deno)',
                  why: 'La lógica sensible —extracción con IA, alta de usuarios, generación de PDF, bot de Telegram— corre del lado del servidor, donde las claves están a salvo.',
                },
              ],
            },
            {
              name: 'Inteligencia artificial',
              items: [
                {
                  name: 'NVIDIA NIM + Gemini',
                  why: 'Un modelo de visión principal y otro de respaldo para transcribir las fichas manuscritas a JSON. Dos proveedores, una misma interfaz.',
                },
              ],
            },
            {
              name: 'Integraciones',
              items: [
                {
                  name: 'ARCA (facturación electrónica)',
                  why: 'La emisión y validación de la factura corre en el servidor, integrada directamente con ARCA. Nada de certificados ni datos fiscales expuestos en el cliente.',
                },
                {
                  name: 'Telegram Bot API',
                  why: 'El taller ya usaba el celular todo el día. Un bot evita instalar y aprender una app nueva.',
                },
              ],
            },
          ],
        },

        patterns: {
          title: 'Patrones y decisiones de diseño',
          intro:
            'Los patrones acá aparecieron por necesidad: un proveedor de IA que se cae deja al taller sin poder cargar fichas.',
          items: [
            {
              name: 'Adapter + Strategy con fallback',
              where: 'Proveedores de visión para leer fichas',
              why: 'NVIDIA NIM y Gemini piden y devuelven cosas distintas. Cada uno vive detrás de la misma interfaz (disponible / extraer) y el orquestador no sabe cuál está usando. Si el principal falla —sin clave, cuota agotada, timeout, JSON inválido— se intenta con el de respaldo automáticamente.',
            },
            {
              name: 'Capa de acceso a datos por dominio',
              where: 'src/lib: clientes, motores, presupuestos, reparaciones, usuarios',
              why: 'Cada dominio tiene su módulo y es el único que habla con la base. Los componentes piden datos, no arman consultas: la lógica queda en un lugar y se puede testear sola.',
            },
            {
              name: 'Guard de rutas + roles',
              where: 'ProtectedRoute en el cliente, RLS en la base',
              why: 'Dos capas a propósito. La del cliente es para la experiencia (no mostrar lo que no corresponde); la de la base es la que realmente protege.',
            },
            {
              name: 'Parseo tolerante de la respuesta del modelo',
              where: 'Extracción de fichas',
              why: 'Los modelos devuelven el JSON de formas distintas según el día: pelado, dentro de un bloque markdown, o con una frase antes. En vez de fallar por un par de backticks, se recupera el JSON igual y recién ahí se valida el esquema.',
            },
            {
              name: 'Migraciones versionadas',
              where: 'supabase/migrations',
              why: 'El esquema es código: cada cambio queda como archivo con fecha. Se puede recrear la base desde cero y saber exactamente cuándo entró cada tabla.',
            },
            {
              name: 'Humano en el medio',
              where: 'Pantalla “Revisar ficha”',
              why: 'La IA no escribe en la base. Propone, la persona confirma. En un taller, un dato mal cargado se paga con un motor mal presupuestado.',
            },
          ],
        },

        decisions: {
          title: 'Decisiones que costaron',
          items: [
            {
              title: 'Migrar de MongoDB a PostgreSQL',
              choice: 'El sistema arrancó MERN con Mongo y se rehizo sobre Supabase con PostgreSQL.',
              why: 'Los datos del taller son relacionales de punta a punta: un presupuesto pertenece a un motor, que pertenece a un cliente. Con documentos, cada consulta que cruzaba entidades era trabajo manual y nada impedía guardar datos inconsistentes.',
              tradeoff: 'Hubo que migrar datos y reescribir el acceso completo. A cambio, el esquema quedó versionado y la seguridad bajó a la base.',
            },
            {
              title: 'Dos proveedores de IA en vez de uno',
              choice: 'NVIDIA NIM como principal y Gemini como respaldo, detrás de la misma interfaz.',
              why: 'Es un sistema en producción en un taller que trabaja todos los días. Que un proveedor tenga un mal día no puede significar que no se puedan cargar fichas.',
              tradeoff: 'Más código para mantener y dos formatos de prompt que probar cada vez que cambia el esquema.',
            },
            {
              title: 'Empezar por la foto, no por el formulario',
              choice: 'La vía principal de carga es fotografiar la ficha de papel.',
              why: 'El taller no iba a cambiar su forma de trabajar para usar el sistema. El sistema tenía que adaptarse al papel que ya existía.',
              tradeoff: 'Depende de la calidad de la foto y obliga a un paso de revisión humana antes de guardar.',
            },
          ],
        },

        learned: {
          title: 'Lo que me llevo',
          items: [
            'Un sistema que agrega trabajo al usuario no se usa, por bueno que sea el código.',
            'Elegir bien el motor de base de datos al principio ahorra una migración entera después.',
            'Cuando algo externo puede fallar, el plan B se escribe el mismo día que el plan A.',
          ],
        },

        screens: {
          title: 'Pantallas reales',
          note: 'Capturas del sistema en producción. Los apellidos de clientes están difuminados. El panel de gestión está detrás de “Acceso Negocio”.',
          items: [
            {
              src: 'assets/proyectos/gestor-taller/panel.webp',
              alt: 'Panel operativo de Bobinados David con motores en el taller, accesos directos a fichas, presupuestos, precios y facturas.',
              caption: 'Panel operativo',
              text: 'Lo primero que ve el taller al entrar: cuántos motores hay adentro y cuáles están listos para entregar.',
              device: 'desktop',
            },
            {
              src: 'assets/proyectos/gestor-taller/reparaciones.webp',
              alt: 'Listado de reparaciones con estado de trabajo y de cobro por cada orden, y filtros por en el taller, para entregar, deudores y entregadas.',
              caption: 'Reparaciones: estado y cobro',
              text: 'Cada orden con su estado de trabajo y de pago a la vez, y el total sin cobrar siempre visible abajo.',
              device: 'desktop',
            },
            {
              src: 'assets/proyectos/gestor-taller/estado.webp',
              alt: 'Pantalla "Estado de tu reparacion" con el número de orden, una línea de tiempo y acceso al remito de entrega.',
              caption: 'Consulta de estado',
              text: 'El cliente entra con su número de orden y apellido, sigue la línea de tiempo de su motor y accede al remito (y a la factura, si ya está). Sin cuenta, sin llamado.',
              device: 'desktop',
            },
            {
              src: 'assets/proyectos/gestor-taller/landing.webp',
              alt: 'Portada del sitio de Bobinados David con el título "Potenciamos tus motores con diagnostico preciso y respuesta rapida".',
              caption: 'Portada pública',
              text: 'La cara visible del taller, con acceso directo a consultar el estado de un equipo.',
              device: 'desktop',
            },
            {
              src: 'assets/proyectos/gestor-taller/servicios.webp',
              alt: 'Sección de servicios del sitio con tarjetas de bobinados industriales, mecánica de precisión y bombas hidráulicas.',
              caption: 'Servicios y métricas',
              text: 'Contenido del negocio real: servicios, años de experiencia y datos de contacto.',
              device: 'desktop',
            },
            {
              src: 'assets/proyectos/gestor-taller/login.webp',
              alt: 'Pantalla de acceso al panel de gestión del taller.',
              caption: 'Acceso al panel',
              text: 'Detrás del login viven fichas, motores, presupuestos, reparaciones, remitos y facturas.',
              device: 'desktop',
            },
            {
              src: 'assets/proyectos/gestor-taller/mobile.webp',
              alt: 'Sitio de Bobinados David visto en un celular.',
              caption: 'Móvil',
              text: 'El mismo sistema en la PC de administración y en las tablets del taller: la PWA se instala y funciona como una app más.',
              device: 'mobile',
            },
          ],
        },

        links: [
          { label: 'Visitar el sistema', href: 'https://bobinadosdavid.vercel.app/', kind: 'primary' },
          { label: 'Código en GitHub', href: 'https://github.com/tomasvallejos1/gestor-taller', kind: 'secondary' },
        ],
      },
    },

    /* ============================================================ 03 */
    {
      slug: 'hermanos-jota',
      number: '03',
      title: 'Hermanos Jota',
      category: 'E-commerce · Equipo de 4',
      year: '2025',
      status: 'Terminado',
      role: 'Desarrollo full stack en equipo',
      description:
        'E-commerce Full Stack para digitalizar la venta de una mueblería. Catálogo, carrito, API REST, autenticación con JWT, roles y panel de administración con gestión de productos, pedidos y usuarios.',
      technologies: ['MongoDB', 'Express', 'React', 'Node.js', 'JWT', 'Jira'],
      href: 'https://hermanos-jota.vercel.app/',
      source: 'https://github.com/tomasvallejos1/hermanos-jota',
      linkLabel: 'Visitar la tienda',
      visualLabel: 'ECOMMERCE / MERN',
      accent: '#9381ff',
      accentInk: '#5b46d6',
      cover: 'assets/proyectos/hermanos-jota/catalogo.webp',
      coverAlt: 'Catálogo de Hermanos Jota con tarjetas de muebles y sus precios',

      case: {
        tagline: 'Proyecto final de la certificación Full Stack: una mueblería tradicional vendiendo online.',

        facts: [
          { label: 'Rol', value: 'Full stack' },
          { label: 'Equipo', value: '4 personas' },
          { label: 'Estado', value: 'Terminado y desplegado' },
          { label: 'Contexto', value: 'Proyecto final ITBA' },
        ],

        problem: {
          title: 'El problema',
          lead: 'Una mueblería con productos únicos y ningún canal de venta digital.',
          paragraphs: [
            'El escenario planteaba una mueblería tradicional que vendía solo en el local. Cada pieza tiene su historia, sus materiales y sus medidas, y todo eso se transmitía en persona. Sin catálogo online, el alcance del negocio terminaba en la vereda.',
            'Digitalizar la venta no era solo publicar fotos: hacía falta un catálogo administrable por el dueño, un carrito, cuentas de cliente, pedidos con estados y un panel donde el negocio pudiera trabajar sin tocar código.',
          ],
          bullets: [
            'El catálogo lo tiene que poder cargar el negocio, no un programador.',
            'Cliente y administrador ven la misma tienda con permisos distintos.',
            'Un pedido tiene un ciclo de vida, no es solo una compra.',
            'Los precios y el stock son datos reales, no maquetas.',
          ],
        },

        origin: {
          title: 'Cómo nació',
          paragraphs: [
            'Fue el proyecto final de la Certificación Avanzada en Full Stack Developer del ITBA, desarrollado en equipo de cuatro personas y entregado en diciembre de 2025.',
            'La consigna era construir un producto completo con stack MERN. Lo tratamos como un proyecto de trabajo real: tablero en Jira, ramas por funcionalidad y revisiones entre integrantes. La coordinación resultó tan importante como el código: con cuatro personas tocando el mismo repositorio, ponerse de acuerdo en la estructura de carpetas y en el contrato de la API antes de empezar evitó la mayoría de los conflictos.',
            'Mi parte se concentró en el backend —modelos, controladores y middlewares de autenticación y roles— y en la integración con el frontend a través de la capa de cliente HTTP.',
          ],
        },

        solves: {
          title: 'Qué resuelve',
          items: [
            {
              title: 'Catálogo con búsqueda',
              text: 'Productos reales con fotos, descripción, materiales y precio, filtrables desde la propia tienda.',
            },
            {
              title: 'Carrito persistente',
              text: 'El carrito sobrevive a la navegación y muestra subtotal y total antes de confirmar.',
            },
            {
              title: 'Cuentas y roles',
              text: 'Registro, login y dos roles: cliente y administrador. Todo registro nuevo entra como cliente.',
            },
            {
              title: 'Pedidos con estados',
              text: 'Pendiente, procesando, enviado, completado o cancelado. El cliente ve los suyos; el admin, todos.',
            },
            {
              title: 'Panel de administración',
              text: 'ABM completo de productos, gestión de pedidos y de usuarios sin tocar la base a mano.',
            },
            {
              title: 'API REST propia',
              text: 'Backend Express con MongoDB Atlas, desplegado aparte del frontend.',
            },
          ],
        },

        stack: {
          title: 'Stack y por qué',
          groups: [
            {
              name: 'Frontend',
              items: [
                {
                  name: 'React (Create React App)',
                  why: 'Stack pedido por la consigna. Componentes reutilizables para las tarjetas de producto y las pantallas de administración, que se repiten con datos distintos.',
                },
                {
                  name: 'React Router + Context API',
                  why: 'Carrito y sesión son estado global que casi toda la app necesita. Con dos contextos alcanzaba: sumar Redux para eso habría sido más ceremonia que beneficio.',
                },
              ],
            },
            {
              name: 'Backend',
              items: [
                {
                  name: 'Node.js + Express',
                  why: 'API REST con una estructura clara de rutas, controladores y middlewares, fácil de repartir entre cuatro personas trabajando en paralelo.',
                },
                {
                  name: 'MongoDB Atlas + Mongoose',
                  why: 'Base del stack MERN. Mongoose aporta esquemas y validaciones, que es lo que le faltaba a una base sin esquema.',
                },
                {
                  name: 'JWT + bcrypt',
                  why: 'Autenticación sin estado, que encaja con tener el front y la API en servicios distintos. Las contraseñas se guardan hasheadas y el campo ni siquiera se devuelve en las consultas.',
                },
              ],
            },
            {
              name: 'Equipo',
              items: [
                {
                  name: 'Jira + Git',
                  why: 'Tablero de tareas y ramas por funcionalidad. Con cuatro personas, el proceso es parte del producto.',
                },
              ],
            },
          ],
        },

        patterns: {
          title: 'Patrones y decisiones de diseño',
          intro: 'Un proyecto en equipo obliga a que la estructura sea evidente para todos, no solo para quien la escribió.',
          items: [
            {
              name: 'Rutas → Controladores → Modelos',
              where: 'backend/src',
              why: 'Separación por responsabilidad: la ruta define el endpoint, el controlador la lógica y el modelo la forma del dato. Cada integrante podía trabajar en una capa sin pisar al resto.',
            },
            {
              name: 'Middleware chain',
              where: 'authMiddleware → adminGuard → controlador',
              why: 'La autenticación y el permiso de administrador son eslabones que se enchufan antes de cada ruta protegida. Proteger un endpoint nuevo es agregar una palabra, no copiar lógica.',
            },
            {
              name: 'Provider / Context',
              where: 'CartProvider y AuthProvider',
              why: 'El carrito y la sesión se consumen desde cualquier componente sin pasar props por cinco niveles.',
            },
            {
              name: 'Route guards en el cliente',
              where: 'ProtectedRoute y AdminRoute',
              why: 'Envuelven las rutas privadas. La regla de acceso se declara una vez y se reutiliza, en lugar de repetir un “si no hay sesión, redirigí” en cada página.',
            },
            {
              name: 'Cliente HTTP centralizado',
              where: 'utils/apiClient.js',
              why: 'Una sola función arma todas las peticiones: agrega el header de contenido, inyecta el token cuando la ruta es privada y convierte los errores de la API en errores de JavaScript. Ningún componente llama a fetch directo.',
            },
            {
              name: 'Roles como dato, no como código',
              where: 'Modelo de usuario',
              why: 'El rol vive en el usuario y lo otorga otro administrador desde el panel. No hay listas de correos privilegiados escritas en el código.',
            },
          ],
        },

        decisions: {
          title: 'Decisiones que costaron',
          items: [
            {
              title: 'Acordar el contrato de la API antes de codear',
              choice: 'Definimos endpoints, formato de respuesta y forma de los errores antes de repartir tareas.',
              why: 'Con cuatro personas trabajando en paralelo, front y back avanzaban a la vez. Sin un contrato acordado, la integración se convierte en una semana de arreglar desajustes.',
              tradeoff: 'Un par de reuniones antes de escribir la primera línea, que después se pagaron solas.',
            },
            {
              title: 'Context API en vez de Redux',
              choice: 'Estado global resuelto con dos contextos.',
              why: 'El estado compartido era chico y estable: carrito y sesión. Redux habría sumado configuración y conceptos nuevos para el equipo sin resolver un problema que tuviéramos.',
              tradeoff: 'Si la app hubiera crecido en estado compartido, habría que haber migrado.',
            },
            {
              title: 'Front y API desplegados por separado',
              choice: 'Frontend en Vercel, API en Render, base en MongoDB Atlas.',
              why: 'Cada parte se despliega y escala sola, y el frontend queda como sitio estático servido por CDN.',
              tradeoff: 'El plan gratuito de Render suspende el servicio por inactividad: la primera carga después de un rato tarda unos segundos.',
            },
          ],
        },

        learned: {
          title: 'Lo que me llevo',
          items: [
            'En equipo, ponerse de acuerdo en las interfaces vale más que escribir código rápido.',
            'Un middleware bien pensado evita repetir la misma verificación en veinte lugares.',
            'Desplegar temprano expone problemas que en local no aparecen nunca.',
          ],
        },

        screens: {
          title: 'Pantallas reales',
          note: 'Capturas de la tienda publicada, con datos reales de la base.',
          items: [
            {
              src: 'assets/proyectos/hermanos-jota/home.webp',
              alt: 'Portada de Hermanos Jota con un carrusel de ambientes y el texto "Nueva colección".',
              caption: 'Portada',
              text: 'Carrusel de la colección y entrada directa al catálogo.',
              device: 'desktop',
            },
            {
              src: 'assets/proyectos/hermanos-jota/catalogo.webp',
              alt: 'Catálogo de Hermanos Jota con tarjetas de productos, precios y botón de agregar.',
              caption: 'Catálogo',
              text: 'Productos servidos por la API, con búsqueda y filtros sobre datos reales.',
              device: 'desktop',
            },
            {
              src: 'assets/proyectos/hermanos-jota/detalle.webp',
              alt: 'Detalle del producto Aparador Uspallata, con galería de imágenes, precio y selector de cantidad.',
              caption: 'Detalle de producto',
              text: 'Galería, descripción de materiales y selector de cantidad antes de sumar al carrito.',
              device: 'desktop',
            },
            {
              src: 'assets/proyectos/hermanos-jota/carrito.webp',
              alt: 'Carrito de compras con dos productos, cantidades y un resumen con subtotal y total.',
              caption: 'Carrito',
              text: 'El carrito vive en un contexto de React: sobrevive a la navegación y recalcula el resumen al instante.',
              device: 'desktop',
            },
            {
              src: 'assets/proyectos/hermanos-jota/login.webp',
              alt: 'Pantalla de inicio de sesión de Hermanos Jota.',
              caption: 'Ingreso',
              text: 'Autenticación con JWT. El rol que devuelve la API define qué pantallas se habilitan.',
              device: 'desktop',
            },
            {
              src: 'assets/proyectos/hermanos-jota/mobile.webp',
              alt: 'Portada de Hermanos Jota vista en un celular.',
              caption: 'Móvil',
              text: 'Layout responsive: la misma tienda adaptada a la pantalla del celular.',
              device: 'mobile',
            },
          ],
        },

        links: [
          { label: 'Visitar la tienda', href: 'https://hermanos-jota.vercel.app/', kind: 'primary' },
          { label: 'Código en GitHub', href: 'https://github.com/tomasvallejos1/hermanos-jota', kind: 'secondary' },
        ],
      },
    },
  ],

  experience: [
    {
      period: 'Nov 2025 — Actualidad',
      title: 'Sistema de gestión para Bobinados David',
      description:
        'Diseño, implementación y mantenimiento del sistema de gestión de un taller electromecánico real, de forma freelance: desde el modelo de datos hasta el despliegue en producción.',
      href: 'proyectos/gestor-taller.html',
    },
    {
      period: '2023 — Actualidad',
      title: 'Reparación y mantenimiento de equipos',
      description:
        'Reparación y mantenimiento de PCs, notebooks y consolas de forma particular, tanto en hardware (diagnóstico de fallas, limpieza, cambio de componentes) como en software (sistemas operativos, drivers, optimización).',
    },
    {
      period: '1 mes',
      title: 'Pasantía en empresa financiera',
      description:
        'Testing funcional de un sistema beta, detección y comunicación de errores, validación de funcionalidades y elaboración de un manual de usuario.',
    },
  ],

  education: [
    {
      period: '2024 — Actualidad',
      title: 'Ingeniería en Sistemas de Información',
      institution: 'Universidad Tecnológica Nacional (UTN)',
      progress: 60,
    },
    {
      period: 'Jun 2026 — Actualidad',
      title: 'Formación Consultor IA',
      institution: 'Educación IT · En curso',
    },
  ],

  certifications: [
    {
      period: 'Dic 2025',
      title: 'Certificación Avanzada en Full Stack Developer',
      issuer: 'ITBA Innovación',
      href: 'https://view.pok.tech/c/9f3386c3-e402-4dbf-baa3-9cc08d049f54',
    },
  ],

  skills: {
    development: ['JavaScript', 'TypeScript', 'Python', 'C', 'Angular', 'React', 'Node.js', 'Express'],
    data: ['PostgreSQL', 'MongoDB', 'Supabase', 'APIs REST', 'Análisis de datos'],
    ai: ['IA generativa', 'LLMs', 'Chatbots', 'Automatización', 'OpenAI API', 'NVIDIA NIM'],
    tools: ['Git', 'GitHub', 'AWS', 'Vercel', 'Jira', 'Slack', 'Google Workspace'],
  },

  languages: ['Español nativo', 'Inglés intermedio · lectura técnica'],
});
