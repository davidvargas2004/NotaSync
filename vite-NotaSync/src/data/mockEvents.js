/**
 * ==========================================================
 * NotaSync — Banco de datos de eventos precargados
 * Utiliza arrow functions para fábricas, formateo y utilidades
 * ==========================================================
 */

/**
 * Función fábrica (arrow function) para crear y normalizar un evento
 */
export const createMockEvent = ({
  id,
  titulo,
  descripcion,
  fecha,
  hora,
  ubicacion,
  categoria,
  color = 'var(--lime)',
  enviadoACalendar = false
}) => ({
  id,
  titulo,
  descripcion,
  fecha,
  hora,
  ubicacion,
  categoria,
  color,
  enviadoACalendar
})

/**
 * Arrow function auxiliar para formatear fecha ISO a texto legible
 */
export const formatEventDate = (isoString) => {
  const date = new Date(isoString)
  return new Intl.DateTimeFormat('es-ES', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(date)
}

/**
 * Banco principal de eventos precargados
 */
export const mockEvents = [
  createMockEvent({
    id: 'evt-001',
    titulo: 'Revisión Estratégica Q4 y Roadmap',
    descripcion: 'Presentación de métricas de sincronización de notas y validación de entregables técnicos.',
    fecha: '2026-09-15T18:00:00',
    hora: '18:00 - 19:30',
    ubicacion: 'Google Meet / Sala 4B',
    categoria: 'trabajo',
    color: 'var(--lime)',
    enviadoACalendar: false
  }),
  createMockEvent({
    id: 'evt-002',
    titulo: 'Sesión de Mindfulness & Enfoque',
    descripcion: 'Bloque protegido sin notificaciones para meditación guiada y organización mental.',
    fecha: '2026-09-16T08:00:00',
    hora: '08:00 - 08:45',
    ubicacion: 'Espacio Personal',
    categoria: 'salud',
    color: 'var(--paper)',
    enviadoACalendar: false
  }),
  createMockEvent({
    id: 'evt-003',
    titulo: 'Lectura & Síntesis: Arquitectura React',
    descripcion: 'Análisis de patrones de inmutabilidad, composición y estado desacoplado en NotaSync.',
    fecha: '2026-09-17T15:30:00',
    hora: '15:30 - 17:00',
    ubicacion: 'Biblioteca Central',
    categoria: 'personal',
    color: 'var(--fog)',
    enviadoACalendar: false
  }),
  createMockEvent({
    id: 'evt-004',
    titulo: 'Tech Meetup: Sincronización en Tiempo Real',
    descripcion: 'Networking con desarrolladores y charla técnica sobre integraciones con Google Calendar API.',
    fecha: '2026-09-18T19:00:00',
    hora: '19:00 - 21:30',
    ubicacion: 'Hub de Innovación & Coworking',
    categoria: 'social',
    color: 'var(--cal-blue)',
    enviadoACalendar: false
  }),
  createMockEvent({
    id: 'evt-005',
    titulo: 'Sprint Planning: Módulo de Recordatorios',
    descripcion: 'Definición de historias de usuario y priorización de integración con agendas externas.',
    fecha: '2026-09-21T10:00:00',
    hora: '10:00 - 11:30',
    ubicacion: 'Google Meet',
    categoria: 'trabajo',
    color: 'var(--lime)',
    enviadoACalendar: false
  }),
  createMockEvent({
    id: 'evt-006',
    titulo: 'Chequeo Médico Preventivo & Ergonomía',
    descripcion: 'Evaluación postural y revisión de salud visual para jornadas de programación.',
    fecha: '2026-09-23T11:00:00',
    hora: '11:00 - 12:00',
    ubicacion: 'Centro Médico Especializado',
    categoria: 'salud',
    color: 'var(--paper)',
    enviadoACalendar: false
  })
]

export const INITIAL_EVENTS = mockEvents

export default mockEvents
