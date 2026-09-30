#!/usr/bin/env python3
"""Genera CV_TOMASVALLEJOS.pdf a partir de los datos reales del portfolio
(content.js). Todo el contenido vive en este archivo: para actualizar el CV
alcanza con editar CONTENT más abajo y volver a correr el script.
"""
import sys
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.units import inch
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, KeepTogether, HRFlowable,
)

OUT = sys.argv[1] if len(sys.argv) > 1 else "CV_TOMASVALLEJOS.pdf"

INK = HexColor("#141414")
MUTED = HexColor("#4a4a4a")
BLUE = HexColor("#1F4E79")  # enlaces
BROWN = HexColor("#B4501C")  # títulos de sección (naranja tostado)

# ------------------------------------------------------------------ estilos
styles = {
    "name": ParagraphStyle(
        "name", fontName="Helvetica-Bold", fontSize=20, leading=23,
        textColor=INK, alignment=1, spaceAfter=2,
    ),
    "role": ParagraphStyle(
        "role", fontName="Helvetica", fontSize=10.5, leading=13,
        textColor=MUTED, alignment=1, spaceAfter=3,
    ),
    "contact": ParagraphStyle(
        "contact", fontName="Helvetica", fontSize=8.7, leading=12,
        textColor=INK, alignment=1, spaceAfter=1,
    ),
    "section": ParagraphStyle(
        "section", fontName="Helvetica-Bold", fontSize=10, leading=12.5,
        textColor=BROWN, spaceBefore=6, spaceAfter=2, letterSpacing=0.4,
    ),
    "body": ParagraphStyle(
        "body", fontName="Helvetica", fontSize=9, leading=11.8,
        textColor=INK, alignment=TA_LEFT, spaceAfter=2,
    ),
    "entryTitle": ParagraphStyle(
        "entryTitle", fontName="Helvetica-Bold", fontSize=9.6, leading=12.6,
        textColor=INK, spaceAfter=0,
    ),
    "entryMeta": ParagraphStyle(
        "entryMeta", fontName="Helvetica-Oblique", fontSize=8.4, leading=10.5,
        textColor=MUTED, spaceAfter=1.5,
    ),
    "bullet": ParagraphStyle(
        "bullet", fontName="Helvetica", fontSize=8.8, leading=11.3,
        textColor=INK, leftIndent=11, bulletIndent=0, spaceAfter=1,
    ),
    "links": ParagraphStyle(
        "links", fontName="Helvetica", fontSize=8.4, leading=10.8,
        textColor=MUTED, spaceAfter=2,
    ),
}

LINK = lambda text, href: f'<a href="{href}"><font color="#1F4E79"><u>{text}</u></font></a>'


def p(text, style="body"):
    return Paragraph(text, styles[style])


def bullets(items):
    return [Paragraph(f"&bull;&nbsp;&nbsp;{t}", styles["bullet"]) for t in items]


def section(title):
    return [
        HRFlowable(width="100%", thickness=0.6, color=HexColor("#c9c9c9"), spaceBefore=1, spaceAfter=4),
        p(title.upper(), "section"),
    ]


def entry(title_html, meta, body_lines, link_line=None):
    flow = [p(title_html, "entryTitle"), p(meta, "entryMeta")]
    flow += bullets(body_lines)
    if link_line:
        flow.append(p(link_line, "links"))
    return KeepTogether(flow)


# ------------------------------------------------------------------ contenido

doc_flow = []

# --- Header ---------------------------------------------------------------
doc_flow.append(p("TOMÁS VALLEJOS", "name"))
doc_flow.append(p("Estudiante de Ingeniería en Sistemas &middot; Full Stack &amp; IA", "role"))
doc_flow.append(p(
    "Venado Tuerto, Santa Fe, Argentina &nbsp;|&nbsp; tomasvallejos081@gmail.com &nbsp;|&nbsp; +54 9 3462-609305",
    "contact",
))
doc_flow.append(p(
    LINK("tomasvallejos.tech", "https://tomasvallejos.tech") + " &nbsp;|&nbsp; " +
    LINK("linkedin.com/in/tomasvallejos123", "https://www.linkedin.com/in/tomasvallejos123") + " &nbsp;|&nbsp; " +
    LINK("github.com/tomasvallejos1", "https://github.com/tomasvallejos1"),
    "contact",
))
doc_flow.append(Spacer(1, 2.5))

# --- Perfil profesional -----------------------------------------------------
doc_flow += section("Perfil profesional")
doc_flow.append(p(
    "Estudiante de Ingeniería en Sistemas de Información (UTN FRVT, 60% completado) con experiencia real "
    "construyendo y manteniendo software para clientes: desarrollo full stack con foco en IA aplicada, desde el "
    "modelo de datos hasta la puesta en producción. Sumo a eso reparación y mantenimiento de hardware de forma "
    "particular desde 2023. Aprendizaje continuo, organización y trabajo en equipo, aplicados a productos que usa "
    "gente real.",
    "body",
))

# --- Experiencia -------------------------------------------------------------
doc_flow += section("Experiencia")

doc_flow.append(entry(
    LINK("Freelance &mdash; Sistema de gestión, Bobinados David", "https://tomasvallejos.tech/proyectos/gestor-taller.html"),
    "Nov 2025 &ndash; Actualidad",
    [
        "Diseño, implementación y mantenimiento de un sistema a medida para un taller electromecánico real, de forma freelance.",
        "Digitalización de fichas técnicas con IA (foto &rarr; datos estructurados): de 3 min a 15 s por ficha, 12&times; más rápido.",
        "Facturación electrónica integrada con ARCA, portal público de consulta de estado y bot de Telegram para operar desde el celular.",
        "Stack: React, Supabase (PostgreSQL), TypeScript, Deno, NVIDIA NIM.",
    ],
))
doc_flow.append(Spacer(1, 2.5))

doc_flow.append(entry(
    "Reparación y mantenimiento de equipos (particular)",
    "2023 &ndash; Actualidad",
    [
        "Diagnóstico y reparación de hardware en PCs, notebooks y consolas.",
        "Mantenimiento de software: sistemas operativos, drivers y optimización.",
    ],
))
doc_flow.append(Spacer(1, 2.5))

doc_flow.append(entry(
    "Pasantía en empresa financiera",
    "1 mes",
    [
        "Testing funcional de un sistema en etapa beta, detección de errores y validación de funcionalidades.",
        "Documentación técnica y elaboración de manual de usuario.",
    ],
))

# --- Educación ---------------------------------------------------------------
doc_flow += section("Educación")
doc_flow.append(p(
    "<b>Ingeniería en Sistemas de Información</b> &mdash; UTN FRVT &nbsp;|&nbsp; "
    "<i>2024 &ndash; Actualidad (60% completado)</i>",
    "body",
))
doc_flow.append(p(
    "<b>Formación Consultor IA</b> &mdash; Educación IT &nbsp;|&nbsp; <i>Jun 2026 &ndash; Actualidad</i>",
    "body",
))

# --- Certificaciones ----------------------------------------------------------
doc_flow += section("Certificaciones")
doc_flow.append(p(
    LINK("Certificación Avanzada en Full Stack Developer", "https://view.pok.tech/c/9f3386c3-e402-4dbf-baa3-9cc08d049f54")
    + " &mdash; ITBA Innovación &nbsp;|&nbsp; <i>Dic 2025</i>",
    "body",
))

# --- Proyectos destacados -------------------------------------------------------
doc_flow += section("Proyectos destacados")

doc_flow.append(entry(
    LINK("MangoFi &mdash; Gestor financiero personal con IA", "https://tomasvallejos.tech/proyectos/mangofi.html"),
    "2026 &ndash; Presente",
    [
        "Gastos, inversiones y tarjetas en un solo lugar; carga por WhatsApp y lectura de comprobantes con IA.",
        "Angular + TypeScript, API REST propia en Node/Express, PostgreSQL. IA: OpenAI API + NVIDIA NIM.",
        "PWA con foco en rendimiento: carga diferida por ruta, CSS crítico embebido, caché offline.",
    ],
    link_line=LINK("Beta: mangofi.pages.dev", "https://mangofi.pages.dev/") + " &nbsp;&middot;&nbsp; " +
    LINK("Caso completo: tomasvallejos.tech/proyectos/mangofi.html", "https://tomasvallejos.tech/proyectos/mangofi.html"),
))
doc_flow.append(Spacer(1, 2.5))

doc_flow.append(entry(
    LINK("Hermanos Jota &mdash; E-commerce Full Stack (equipo de 4)", "https://tomasvallejos.tech/proyectos/hermanos-jota.html"),
    "2025",
    [
        "Catálogo, carrito, roles de usuario y panel de administración para una mueblería.",
        "Responsable del backend (modelos, controladores, middlewares de autenticación y roles) e integración con el frontend.",
        "Stack: MongoDB, Express, React, Node.js, JWT. Coordinación de equipo con Jira y ramas por funcionalidad.",
    ],
    link_line=LINK("Tienda: hermanos-jota.vercel.app", "https://hermanos-jota.vercel.app/") + " &nbsp;&middot;&nbsp; " +
    LINK("Caso completo: tomasvallejos.tech/proyectos/hermanos-jota.html", "https://tomasvallejos.tech/proyectos/hermanos-jota.html"),
))

# --- Habilidades técnicas --------------------------------------------------------
doc_flow += section("Habilidades técnicas")
skills_rows = [
    ("Lenguajes y frameworks", "JavaScript, TypeScript, Python, C, Angular, React, Node.js, Express"),
    ("Datos", "PostgreSQL, MongoDB, Supabase, APIs REST"),
    ("IA aplicada", "LLMs, chatbots, automatización de flujos, OpenAI API, NVIDIA NIM"),
    ("Herramientas", "Git, GitHub, Vercel, AWS, Jira, Google Workspace"),
]
for label, value in skills_rows:
    doc_flow.append(p(f"<b>{label}:</b> {value}", "body"))

# --- Idiomas ------------------------------------------------------------------
doc_flow += section("Idiomas")
doc_flow.append(p("Español nativo &nbsp;|&nbsp; Inglés intermedio &ndash; lectura técnica", "body"))

# ------------------------------------------------------------------ build

doc = SimpleDocTemplate(
    OUT, pagesize=LETTER,
    topMargin=0.42 * inch, bottomMargin=0.38 * inch,
    leftMargin=0.62 * inch, rightMargin=0.62 * inch,
    title="Tomás Vallejos — CV", author="Tomás Vallejos",
)
doc.build(doc_flow)
print(f"escrito: {OUT}")
