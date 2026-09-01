import { ChangelogItemType, type Changelog } from '@/type/changelog.type';

export const Changelogs: Changelog[] = [
	{
		version: 20250615,
		title: 'Junio 2025',
		items: [
			{ text: 'Mejoras de seguridad', type: ChangelogItemType.SECURITY },
			{ text: 'Mejoras de rendimiento al crear pedidos', type: ChangelogItemType.TECHNICAL },
			{ text: 'Actualización del sistema', type: ChangelogItemType.SECURITY }
		]
	},
	{
		version: 20250710,
		title: 'Julio 2025',
		items: [
			{ text: 'Mejoras de seguridad', type: ChangelogItemType.SECURITY },
			{ text: 'Actualización del sistema', type: ChangelogItemType.SECURITY },
			{ text: 'Nueva fórmula: m2 * precio * iva * 12 + 2', type: ChangelogItemType.NEW },
			{
				text: 'Cambio de usuario al crear un pedido desde un presupuesto',
				type: ChangelogItemType.TECHNICAL
			},
			{ text: 'Cambios en la hoja de impresión', type: ChangelogItemType.MINOR_CHANGE }
		]
	},
	{
		version: 20250804,
		title: 'Agosto 2025',
		items: [
			{ text: 'Mejoras de seguridad', type: ChangelogItemType.SECURITY },
			{ text: 'Actualización del sistema', type: ChangelogItemType.SECURITY },
			{ text: 'Mejoras en la usabilidad y visibilidad', type: ChangelogItemType.TECHNICAL },
			{
				text: 'Forzado idioma español para evitar problemas de traducción',
				type: ChangelogItemType.TECHNICAL
			}
		]
	},
	{
		version: 20250930,
		title: 'Septiembre 2025',
		items: [
			{ text: 'Actualización del sistema', type: ChangelogItemType.SECURITY },
			{
				text: 'Solucionado problema al notificar pedidos finalizados por WhatsApp desde iPhone',
				type: ChangelogItemType.TECHNICAL
			},
			{
				text: 'Cambio en el campo PP por Medidas PP o Fondo (cm)',
				type: ChangelogItemType.MINOR_CHANGE
			},
			{ text: 'Nuevo estado de facturación en pedidos', type: ChangelogItemType.NEW },
			{ text: 'Nuevo botón de imprimir en listados', type: ChangelogItemType.NEW },
			{
				text: 'Actualización de seguridad en el procesamiento de excel',
				type: ChangelogItemType.SECURITY
			}
		]
	},
	{
		version: 20251027,
		title: 'Octubre 2025',
		items: [
			{ text: 'Actualización del sistema', type: ChangelogItemType.SECURITY },
			{ text: 'Mejoras de seguridad', type: ChangelogItemType.SECURITY }
		]
	},
	{
		version: 20251117,
		title: 'Noviembre 2025',
		items: [
			{
				text: 'Acciones en lote: WhatsApp, recogido, pagado y facturado',
				type: ChangelogItemType.NEW
			},
			{ text: 'Creación de listado de pedidos', type: ChangelogItemType.NEW },
			{ text: 'Nuevo sistema de impresión', type: ChangelogItemType.TECHNICAL },
			{ text: 'Base e IVA en impresión de pedidos', type: ChangelogItemType.MINOR_CHANGE },
			{
				text: 'Actualización de seguridad',
				type: ChangelogItemType.SECURITY
			},
			{ text: 'Actualización del sistema', type: ChangelogItemType.SECURITY }
		]
	},
	{
		version: 20251209,
		title: 'Diciembre 2025',
		items: [
			{
				text: 'Actualización de seguridad',
				type: ChangelogItemType.SECURITY
			},
			{ text: 'Actualización del sistema', type: ChangelogItemType.SECURITY },
			{
				text: 'Solucionado problema en boton de enviar WhatsApp',
				type: ChangelogItemType.TECHNICAL
			}
		]
	},
	{
		version: 20260130,
		title: 'Enero 2025',
		items: [
			{ text: 'Actualización del sistema', type: ChangelogItemType.SECURITY },
			{ text: 'Mejoras de seguridad', type: ChangelogItemType.SECURITY },
			{ text: 'Mejoras de rendimiento', type: ChangelogItemType.TECHNICAL },
			{
				text: 'Solucionada inconsistencia en la ordenación de los pedidos en listados',
				type: ChangelogItemType.TECHNICAL
			}
		]
	},
	{
		version: 20260209,
		title: 'Febrero 2026',
		items: [
			{ text: 'Solución de errores de conexión', type: ChangelogItemType.TECHNICAL },
			{ text: 'Actualización del sistema', type: ChangelogItemType.SECURITY },
			{ text: 'Mejoras de seguridad', type: ChangelogItemType.SECURITY }
		]
	},
	{
		version: 20260323,
		title: 'Marzo 2026',
		items: [
			{ text: 'Mejoras de rendimiento', type: ChangelogItemType.TECHNICAL },
			{ text: 'Actualización de dependencias del sistema', type: ChangelogItemType.SECURITY },
			{ text: 'Correcciones de seguridad', type: ChangelogItemType.SECURITY }
		]
	},
	{
		version: 20260413,
		title: 'Abril 2026',
		items: [
			{ text: 'Actualización del sistema', type: ChangelogItemType.SECURITY },
			{ text: 'Mejoras de seguridad', type: ChangelogItemType.SECURITY }
		]
	},
	{
		version: 20260525,
		title: 'Mayo 2026',
		items: [
			{ text: 'Mejoras en la carga de archivos', type: ChangelogItemType.MINOR_CHANGE },
			{ text: 'Mejoras de rendimiento y velocidad', type: ChangelogItemType.TECHNICAL },
			{ text: 'Cambios de seguridad', type: ChangelogItemType.SECURITY },
			{ text: 'Actualización de librerías', type: ChangelogItemType.SECURITY }
		]
	},
	{
		version: 20260622,
		title: 'Junio 2026',
		items: [
			{ text: 'Mejoras de rendimiento general', type: ChangelogItemType.TECHNICAL },
			{ text: 'Mejoras de seguridad', type: ChangelogItemType.SECURITY },
			{ text: 'Actualización de librerías del sistema', type: ChangelogItemType.SECURITY },
			{ text: 'Optimizaciones internas', type: ChangelogItemType.TECHNICAL }
		]
	},
	{
		version: 20260702,
		title: 'Julio 2026',
		items: [
			{ text: 'Indicador de cantidad en la lista de pedidos', type: ChangelogItemType.NEW },
			{ text: 'Mejoras de seguridad', type: ChangelogItemType.SECURITY },
			{ text: 'Actualización del sistema', type: ChangelogItemType.TECHNICAL }
		]
	},
	{
		version: 20260827,
		title: 'Agosto 2026',
		items: [
			{ text: 'Mejoras de seguridad', type: ChangelogItemType.SECURITY },
			{ text: 'Mejoras de rendimiento', type: ChangelogItemType.TECHNICAL }
		]
	}
];
