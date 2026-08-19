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
 * Incluye manejo defensivo para fechas no estándar
 */
export const formatEventDate = (isoString) => {
  try {
    const date = new Date(isoString)
    if (isNaN(date.getTime())) {
      return isoString || 'Fecha por definir'
    }
    return new Intl.DateTimeFormat('es-ES', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date)
  } catch {
    return isoString || 'Fecha por definir'
  }
}

/**
 * Banco principal de eventos precargados (37 eventos completos)
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
  }),
  createMockEvent({
    id: 'evt-007',
    titulo: 'Daily Standup: Equipo NotaSync',
    descripcion: 'Sincronización rápida de avances, bloqueos y prioridades del sprint en curso.',
    fecha: '2026-09-24T09:00:00',
    hora: '09:00 - 09:15',
    ubicacion: 'Google Meet',
    categoria: 'trabajo',
    color: 'var(--lime)',
    enviadoACalendar: false
  }),
  createMockEvent({
    id: 'evt-008',
    titulo: 'Yoga Matutino & Respiración',
    descripcion: 'Rutina suave de estiramiento y respiración consciente antes de empezar el día.',
    fecha: '2026-09-24T06:30:00',
    hora: '06:30 - 07:15',
    ubicacion: 'Parque Central',
    categoria: 'salud',
    color: 'var(--paper)',
    enviadoACalendar: false
  }),
  createMockEvent({
    id: 'evt-009',
    titulo: 'Cine con Amigos: Estreno de Ciencia Ficción',
    descripcion: 'Función nocturna seguida de café para comentar la película.',
    fecha: '2026-09-25T20:00:00',
    hora: '20:00 - 22:30',
    ubicacion: 'Cinema Plaza Norte',
    categoria: 'social',
    color: 'var(--cal-blue)',
    enviadoACalendar: false
  }),
  createMockEvent({
    id: 'evt-010',
    titulo: 'Organización de Finanzas Personales',
    descripcion: 'Revisión mensual de presupuesto, gastos fijos y metas de ahorro.',
    fecha: '2026-09-26T19:00:00',
    hora: '19:00 - 20:00',
    ubicacion: 'Espacio Personal',
    categoria: 'personal',
    color: 'var(--fog)',
    enviadoACalendar: false
  }),
  createMockEvent({
    id: 'evt-011',
    titulo: 'Revisión de Pull Requests Semanal',
    descripcion: 'Code review colaborativo de las ramas abiertas del módulo de recordatorios.',
    fecha: '2026-09-28T14:00:00',
    hora: '14:00 - 15:00',
    ubicacion: 'Google Meet',
    categoria: 'trabajo',
    color: 'var(--lime)',
    enviadoACalendar: false
  }),
  createMockEvent({
    id: 'evt-012',
    titulo: 'Nutricionista: Seguimiento Trimestral',
    descripcion: 'Ajuste de plan alimenticio según objetivos de energía y rendimiento cognitivo.',
    fecha: '2026-09-29T10:30:00',
    hora: '10:30 - 11:15',
    ubicacion: 'Clínica Bienestar Integral',
    categoria: 'salud',
    color: 'var(--paper)',
    enviadoACalendar: false
  }),
  createMockEvent({
    id: 'evt-013',
    titulo: 'Cena de Cumpleaños: Camila',
    descripcion: 'Celebración familiar con reserva confirmada para ocho personas.',
    fecha: '2026-09-30T20:30:00',
    hora: '20:30 - 23:00',
    ubicacion: 'Restaurante La Terraza',
    categoria: 'social',
    color: 'var(--cal-blue)',
    enviadoACalendar: false
  }),
  createMockEvent({
    id: 'evt-014',
    titulo: 'Curso Online: Diseño de Sistemas',
    descripcion: 'Módulo 3 sobre patrones de escalabilidad y balanceo de carga.',
    fecha: '2026-10-01T18:00:00',
    hora: '18:00 - 19:30',
    ubicacion: 'Plataforma Educativa Virtual',
    categoria: 'personal',
    color: 'var(--fog)',
    enviadoACalendar: false
  }),
  createMockEvent({
    id: 'evt-015',
    titulo: 'Demo de Producto: Stakeholders',
    descripcion: 'Presentación de nuevas funcionalidades de sincronización a inversionistas y equipo directivo.',
    fecha: '2026-10-02T16:00:00',
    hora: '16:00 - 17:00',
    ubicacion: 'Sala de Juntas Principal',
    categoria: 'trabajo',
    color: 'var(--lime)',
    enviadoACalendar: false
  }),
  createMockEvent({
    id: 'evt-016',
    titulo: 'Sesión de Fisioterapia',
    descripcion: 'Tratamiento preventivo para tensión cervical por largas jornadas frente al computador.',
    fecha: '2026-10-03T09:30:00',
    hora: '09:30 - 10:15',
    ubicacion: 'Centro de Rehabilitación Vital',
    categoria: 'salud',
    color: 'var(--paper)',
    enviadoACalendar: false
  }),
  createMockEvent({
    id: 'evt-017',
    titulo: 'Torneo Amistoso de Fútbol 5',
    descripcion: 'Partido recreativo con excompañeros de universidad, incluye asado después.',
    fecha: '2026-10-04T15:00:00',
    hora: '15:00 - 17:00',
    ubicacion: 'Cancha Sintética El Bosque',
    categoria: 'social',
    color: 'var(--cal-blue)',
    enviadoACalendar: false
  }),
  createMockEvent({
    id: 'evt-018',
    titulo: 'Planificación de Viaje: Fin de Año',
    descripcion: 'Investigación de destinos, presupuesto estimado y reserva de vuelos.',
    fecha: '2026-10-05T17:00:00',
    hora: '17:00 - 18:00',
    ubicacion: 'Espacio Personal',
    categoria: 'personal',
    color: 'var(--fog)',
    enviadoACalendar: false
  }),
  createMockEvent({
    id: 'evt-019',
    titulo: 'Retrospectiva de Sprint',
    descripcion: 'Análisis de lo que funcionó y lo que se puede mejorar en el ciclo actual.',
    fecha: '2026-10-06T11:00:00',
    hora: '11:00 - 12:00',
    ubicacion: 'Google Meet',
    categoria: 'trabajo',
    color: 'var(--lime)',
    enviadoACalendar: false
  }),
  createMockEvent({
    id: 'evt-020',
    titulo: 'Jornada de Donación de Sangre',
    descripcion: 'Campaña organizada por la empresa en alianza con el banco de sangre local.',
    fecha: '2026-10-07T09:00:00',
    hora: '09:00 - 12:00',
    ubicacion: 'Auditorio Corporativo',
    categoria: 'salud',
    color: 'var(--paper)',
    enviadoACalendar: false
  }),
  createMockEvent({
    id: 'evt-021',
    titulo: 'Noche de Trivia entre Amigos',
    descripcion: 'Competencia casual por equipos con premios simbólicos.',
    fecha: '2026-10-08T19:30:00',
    hora: '19:30 - 22:00',
    ubicacion: 'Bar Cultural Rincón 88',
    categoria: 'social',
    color: 'var(--cal-blue)',
    enviadoACalendar: false
  }),
  createMockEvent({
    id: 'evt-022',
    titulo: 'Sesión de Escritura Creativa',
    descripcion: 'Bloque semanal dedicado a un proyecto personal de relatos cortos.',
    fecha: '2026-10-09T20:00:00',
    hora: '20:00 - 21:00',
    ubicacion: 'Espacio Personal',
    categoria: 'personal',
    color: 'var(--fog)',
    enviadoACalendar: false
  }),
  createMockEvent({
    id: 'evt-023',
    titulo: 'Reunión con Inversionista Ángel',
    descripcion: 'Presentación de métricas de tracción y proyecciones para próxima ronda.',
    fecha: '2026-10-10T13:00:00',
    hora: '13:00 - 14:00',
    ubicacion: 'Oficina Coworking Central',
    categoria: 'trabajo',
    color: 'var(--lime)',
    enviadoACalendar: false
  }),
  createMockEvent({
    id: 'evt-024',
    titulo: 'Chequeo Odontológico Semestral',
    descripcion: 'Limpieza y revisión general programada de rutina.',
    fecha: '2026-10-11T08:30:00',
    hora: '08:30 - 09:15',
    ubicacion: 'Clínica Dental Sonrisa Plena',
    categoria: 'salud',
    color: 'var(--paper)',
    enviadoACalendar: false
  }),
  createMockEvent({
    id: 'evt-025',
    titulo: 'Almuerzo Familiar de Domingo',
    descripcion: 'Reunión mensual con la familia extendida en casa de los abuelos.',
    fecha: '2026-10-12T13:00:00',
    hora: '13:00 - 16:00',
    ubicacion: 'Casa Familiar',
    categoria: 'social',
    color: 'var(--cal-blue)',
    enviadoACalendar: false
  }),
  createMockEvent({
    id: 'evt-026',
    titulo: 'Actualización de Portafolio Profesional',
    descripcion: 'Revisión y actualización de proyectos destacados en el sitio personal.',
    fecha: '2026-10-13T18:30:00',
    hora: '18:30 - 19:30',
    ubicacion: 'Espacio Personal',
    categoria: 'personal',
    color: 'var(--fog)',
    enviadoACalendar: false
  }),
  createMockEvent({
    id: 'evt-027',
    titulo: 'Kickoff: Integración con Google Calendar API',
    descripcion: 'Definición de arquitectura técnica y asignación de responsabilidades del equipo.',
    fecha: '2026-10-14T10:00:00',
    hora: '10:00 - 11:30',
    ubicacion: 'Google Meet',
    categoria: 'trabajo',
    color: 'var(--lime)',
    enviadoACalendar: false
  }),
  createMockEvent({
    id: 'evt-028',
    titulo: 'Terapia Psicológica: Sesión Quincenal',
    descripcion: 'Espacio de seguimiento y acompañamiento profesional programado.',
    fecha: '2026-10-15T17:00:00',
    hora: '17:00 - 18:00',
    ubicacion: 'Consultorio Privado',
    categoria: 'salud',
    color: 'var(--paper)',
    enviadoACalendar: false
  }),
  createMockEvent({
    id: 'evt-029',
    titulo: 'Caminata Nocturna & Fotografía Urbana',
    descripcion: 'Recorrido con grupo de fotografía callejera por el centro histórico.',
    fecha: '2026-10-16T19:00:00',
    hora: '19:00 - 21:00',
    ubicacion: 'Centro Histórico',
    categoria: 'social',
    color: 'var(--cal-blue)',
    enviadoACalendar: false
  }),
  createMockEvent({
    id: 'evt-030',
    titulo: 'Meditación Guiada de Fin de Semana',
    descripcion: 'Sesión extendida enfocada en claridad mental y reducción de estrés.',
    fecha: '2026-10-17T08:00:00',
    hora: '08:00 - 09:00',
    ubicacion: 'Espacio Personal',
    categoria: 'personal',
    color: 'var(--fog)',
    enviadoACalendar: false
  }),
  createMockEvent({
    id: 'evt-031',
    titulo: 'Revisión de Presupuesto de Infraestructura',
    descripcion: 'Análisis de costos de servidores y servicios cloud para el próximo trimestre.',
    fecha: '2026-10-18T15:00:00',
    hora: '15:00 - 16:00',
    ubicacion: 'Google Meet',
    categoria: 'trabajo',
    color: 'var(--lime)',
    enviadoACalendar: false
  }),
  createMockEvent({
    id: 'evt-032',
    titulo: 'Rutina de Entrenamiento Funcional',
    descripcion: 'Sesión de fuerza y movilidad con entrenador personal.',
    fecha: '2026-10-19T07:00:00',
    hora: '07:00 - 08:00',
    ubicacion: 'Gimnasio FitZone',
    categoria: 'salud',
    color: 'var(--paper)',
    enviadoACalendar: false
  }),
  createMockEvent({
    id: 'evt-033',
    titulo: 'Junta de Vecinos del Edificio',
    descripcion: 'Discusión sobre mantenimiento de áreas comunes y presupuesto anual.',
    fecha: '2026-10-20T19:00:00',
    hora: '19:00 - 20:30',
    ubicacion: 'Salón Comunal',
    categoria: 'social',
    color: 'var(--cal-blue)',
    enviadoACalendar: false
  }),
  createMockEvent({
    id: 'evt-034',
    titulo: 'Backup y Organización de Archivos Digitales',
    descripcion: 'Limpieza de disco, respaldo en la nube y orden de documentos personales.',
    fecha: '2026-10-21T20:00:00',
    hora: '20:00 - 21:00',
    ubicacion: 'Espacio Personal',
    categoria: 'personal',
    color: 'var(--fog)',
    enviadoACalendar: false
  }),
  createMockEvent({
    id: 'evt-035',
    titulo: 'Lanzamiento Beta: NotaSync v1.0',
    descripcion: 'Despliegue controlado a usuarios seleccionados y monitoreo de métricas iniciales.',
    fecha: '2026-10-22T09:00:00',
    hora: '09:00 - 10:00',
    ubicacion: 'Oficina Principal',
    categoria: 'trabajo',
    color: 'var(--lime)',
    enviadoACalendar: false
  }),
  createMockEvent({
    id: 'evt-036',
    titulo: 'Examen de Laboratorio Anual',
    descripcion: 'Batería de exámenes de rutina para chequeo general de salud.',
    fecha: '2026-10-23T07:30:00',
    hora: '07:30 - 08:15',
    ubicacion: 'Laboratorio Clínico Diagnos',
    categoria: 'salud',
    color: 'var(--paper)',
    enviadoACalendar: false
  }),
  createMockEvent({
    id: 'evt-037',
    titulo: 'David Mauricio Vargas',
    descripcion: 'Intercambio de experiencias y oportunidades laborales en el sector tecnológico.',
    fecha: '2026-10-24T18:00:00',
    hora: '18:00 - 19:30',
    ubicacion: 'Auditorio TechHub',
    categoria: 'social',
    color: 'var(--cal-blue)',
    enviadoACalendar: false
  })
]

export const INITIAL_EVENTS = mockEvents

export default mockEvents
