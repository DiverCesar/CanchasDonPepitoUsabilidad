# Especificación de Requisitos: Sistema de Pedidos y Reservas "Canchas Don Pepito"

Este documento consolida y estructura de manera integral los Requisitos Funcionales (RF) y No Funcionales (RNF) extraídos del documento principal del sistema y de la Propuesta de Solución 2 (Módulo Gestión de Ingresos).

---

## 1. Documento Principal (Sistema de Pedidos y Reservas - SPR)

### 1.1. Requisitos Funcionales (RF)

#### Módulo Usuarios y Autenticación
| ID | Nombre | Descripción | Criterio de Aceptación | Prioridad |
| :--- | :--- | :--- | :--- | :--- |
| **RF-001** | Registrar cliente | El sistema deberá permitir a un cliente registrarse indicando nombre, teléfono, correo y contraseña. | El registro exige 4 campos obligatorios y valida el formato del correo. Si el correo existe o un dato es inválido, rechaza indicando el error. | Alta |
| **RF-002** | Iniciar sesión | El sistema deberá permitir a los usuarios iniciar sesión mediante credenciales válidas. | Acceso concedido si correo y contraseña coinciden. Tras 5 intentos fallidos, bloquea el acceso por 5 minutos y muestra el tiempo restante. | Alta |
| **RF-003** | Asignar rol de usuario | El sistema deberá asignar un rol (cliente, vendedor o administrador) al crearse el usuario. | Todo usuario tiene exactamente un rol asignado; no puede quedar vacío ni múltiple. | Alta |
| **RF-004** | Restringir acceso según el rol | El sistema deberá restringir el acceso a funcionalidades según el rol del usuario autenticado. | El 100% de los intentos por ejecutar funciones fuera del rol asignado son rechazados. | Alta |
| **RF-005** | Cerrar sesión | El sistema deberá permitir a un usuario cerrar su sesión activa. | Tras cerrar sesión, se redirige al login y la sesión queda invalidada. | Media |
| **RF-006** | Recuperar contraseña | El sistema deberá permitir a un usuario recuperar o restablecer su contraseña olvidada. | Envía enlace de un solo uso válido por 30 min al correo. | Media |

#### Módulo Productos
| ID | Nombre | Descripción | Criterio de Aceptación | Prioridad |
| :--- | :--- | :--- | :--- | :--- |
| **RF-007** | Registrar producto | El administrador podrá registrar productos (nombre, precio, categoría, stock). | Rechaza si falta campo o el nombre ya existe en la categoría. | Alta |
| **RF-008** | Actualizar inventario tras venta | El sistema deberá actualizar automáticamente el stock al concretar una venta. | Stock disminuye en <2s tras venta. Si se anula, se revierte. Bloqueo para evitar inconsistencias por concurrencia. | Alta |
| **RF-009** | Modificar producto | El administrador podrá modificar nombre, categoría, precio o cantidad. | Cambios reflejados en catálogo en <5s. Conserva historial de precios. | Alta |
| **RF-010** | Consultar productos | El sistema permitirá al administrador consultar productos mediante filtros. | Filtro por categoría/nombre con resultados paginados (máx 20) en <3s. | Alta |
| **RF-011** | Alertar stock mínimo | El sistema alertará cuando un producto alcance su stock mínimo configurado. | Alerta visual en panel administrativo en <1 min. | Media |
| **RF-012** | Desactivar producto | El administrador podrá desactivar productos (eliminación lógica). | Deja de mostrarse al cliente de inmediato, pero queda en historial/BD. | Media |
| **RF-013** | Registrar categoría de producto | El sistema permitirá registrar categorías de productos. | Categoría disponible de inmediato. Rechaza duplicados. | Media |
| **RF-014** | Asignar categoría a producto | El sistema permitirá asignar una categoría a un producto. | Un producto requiere categoría asignada y solo puede tener una activa. | Media |
| **RF-015** | Eliminar categoría de producto | El sistema permitirá eliminar categorías. | No se elimina si tiene productos activos (informa cuántos la usan). | Media |

#### Módulo Canchas
| ID | Nombre | Descripción | Criterio de Aceptación | Prioridad |
| :--- | :--- | :--- | :--- | :--- |
| **RF-016** | Registrar cancha | Permitir al administrador registrar canchas (nombre, tipo, tarifa, estado). | Queda registrada en estado inicial "disponible". No permite guardar sin datos. | Alta |
| **RF-017** | Modificar información de cancha | Permitir modificar nombre, tipo, tarifa y horario de una cancha. | Reflejado en <5s. Cambio de tarifa no afecta reservas ya confirmadas. | Alta |
| **RF-018** | Consultar disponibilidad (Admin) | Administrador puede consultar disponibilidad en un calendario. | Visualiza calendario de todas las canchas, latencia <=3s tras cambios. | Alta |
| **RF-019** | Deshabilitar cancha | Permitir deshabilitar canchas. | Desaparece para nuevas reservas de inmediato. Mantiene confirmadas notificando a afectados si corresponde. | Media |
| **RF-020** | Mostrar/alertar hora límite | Mostrar hora límite de reserva activa y alertar a los 10 minutos restantes. | Alerta se dispara automáticamente con margen de error <30s. | Media |

#### Módulo Reservas
| ID | Nombre | Descripción | Criterio de Aceptación | Prioridad |
| :--- | :--- | :--- | :--- | :--- |
| **RF-021** | Consultar disponibilidad | El cliente podrá consultar disponibilidad de canchas. | Horarios libres, reservados y bloqueados visibles con latencia máx 3s. | Alta |
| **RF-022** | Registrar reserva | El cliente podrá registrar reserva (cancha, fecha, horario, 1h duración). | Queda en estado "pendiente" o "confirmada" en <3s. Límite de 30 días. | Alta |
| **RF-023** | Validar/bloquear horario | Validar que no haya solape con reservas existentes y bloquear horario. | Rechaza 100% de solapes o fechas pasadas. Solo confirma 1 ante concurrencia. | Alta |
| **RF-024** | Notificar confirmación/rechazo | Notificar al cliente la confirmación o rechazo de reserva. | Notificación enviada en <1 min. Hasta 3 reintentos si falla. | Alta |
| **RF-025** | Cancelar y liberar reserva | Cliente puede cancelar reserva hasta 1h antes del inicio. | Horario disponible en <1 min. Solicita reembolso automático si hay pago. | Alta |
| **RF-026** | Registrar reserva asistida | Vendedor puede registrar reserva en nombre del cliente presencial/telefónico. | Misma validación que cliente. Registra nombre de vendedor por auditoría. | Alta |
| **RF-027** | Modificar/cancelar asistida | Vendedor puede modificar o cancelar reserva que él mismo registró. | Registra nombre de vendedor, fecha y motivo. Revalida conflictos. | Media |
| **RF-028** | Consultar estado de reservas | El cliente podrá consultar el estado de sus reservas. | Visualiza estado actual y el historial de cambios con fecha y hora. | Media |

#### Módulo Pedidos
| ID | Nombre | Descripción | Criterio de Aceptación | Prioridad |
| :--- | :--- | :--- | :--- | :--- |
| **RF-029** | Visualizar catálogo | Cliente visualiza productos disponibles. | Nombre, precio y disponibilidad visibles con carga <3s. | Alta |
| **RF-030** | Registrar pedido | Cliente registra pedido, reservando stock temporalmente. | Pasa a "pendiente" si hay 100% de stock. Reserva expira a los 5 min sin pago. | Alta |
| **RF-031** | Capturar ubicación GPS | Solicitar GPS con consentimiento explícito para entrega en complejo. | Requiere GPS o selección manual de zona. Consentimiento separado, se elimina tras entrega. | Alta |
| **RF-032** | Notificar nuevo pedido | Notificar al vendedor (alerta visual y sonora) el nuevo pedido. | Alerta llega en <5s bajo 4G. Se envía a todos los vendedores activos. | Alta |
| **RF-033** | Consultar pedidos pendientes | Vendedor podrá consultar pedidos pendientes. | Ordenados por hora de creación, actualización automática cada 5s. | Alta |
| **RF-034** | Transicionar estado de pedido | Vendedor modificará estado: pendiente > en preparación > despachado > entregado. | Rechaza transiciones fuera del flujo (ej. pendiente a entregado directo). | Alta |
| **RF-035** | Despachar pedido | Vendedor podrá despachar pedidos formalizando la transición. | Estado cambia a "despachado" y registra hora exacta. | Alta |
| **RF-036** | Consultar historial pedidos | Vendedor/admin pueden consultar historial. | Filtrable, resultados paginados (máx 20) en <5s para rango de un mes. | Media |
| **RF-037** | Cancelar pedido pendiente | Cliente podrá cancelar pedido si está en estado "pendiente". | Libera stock de inmediato y gestiona reembolso; no se puede cancelar en preparación. | Media |

#### Módulo Pagos y Ventas
| ID | Nombre | Descripción | Criterio de Aceptación | Prioridad |
| :--- | :--- | :--- | :--- | :--- |
| **RF-038** | Registrar pago en efectivo | Vendedor registra cobro en efectivo. | Registra monto, cambio, fecha y referencia en <2s. | Alta |
| **RF-039** | Registrar pago banca móvil | Registrar pago de pedido/reserva mediante transferencia. | Vincula monto, fecha y token/referencia de banco al pago. | Alta |
| **RF-040** | Procesar confirmación banco | Procesar respuesta del banco (espera 15s, 2 reintentos, idempotencia). | Pasa a "confirmado" en <5s. En rechazo, cancela pedido/reserva. | Alta |
| **RF-041** | Revertir pago cancelado | Revertir o marcar pendiente de reembolso un pago de pedido/reserva cancelado. | Solicita reversión cambiando a "revertido/pendiente" en <2s. | Alta |
| **RF-042** | Registrar venta con historial | Registro automático de ventas con historial por rango de fechas. | Incluye fecha (zona Guayaquil), monto y método. Anulaciones reflejadas. | Alta |
| **RF-043** | Generar factura de venta | Generar factura secuencial o nota de crédito (ante devoluciones). | Se genera tras confirmar pago, con numeración única sin saltos. | Media |

#### Módulo Reportes
| ID | Nombre | Descripción | Criterio de Aceptación | Prioridad |
| :--- | :--- | :--- | :--- | :--- |
| **RF-044** | Generar reportes | Generar reportes (PDF/Excel) de productos, pedidos, reservas y ventas/caja. | Generados de forma independiente y filtrables por fecha en <5s. | Alta |

---

### 1.2. Requisitos No Funcionales (RNF)

| ID | Categoría | Descripción | Criterio de Aceptación / Métrica | Prioridad |
| :--- | :--- | :--- | :--- | :--- |
| **RNF-001** | Seguridad | Contraseñas cifradas mediante hash con sal (bcrypt, factor 10-12). | 100% de contraseñas cifradas y no recuperables en texto plano. | Alta |
| **RNF-002** | Seguridad | Control de acceso basado en roles (RBAC). | 100% de intentos fuera de matriz de permisos rechazados. | Alta |
| **RNF-003** | Seguridad | Comunicación cifrada HTTPS/TLS 1.2+ con renovación previa. | 100% peticiones usan HTTPS, verificado por inspección de red. | Alta |
| **RNF-004** | Disponibilidad | Disponibilidad mínima 95% (24/7) mensual (excluyendo ventanas mant.). | Inactividad no planificada menor al 5%. | Alta |
| **RNF-005** | Disponibilidad | Registro de reservas atómico (ACID) para evitar duplicados. | Ante 50 solicitudes concurrentes en mismo horario, solo 1 se aprueba. | Alta |
| **RNF-006** | Compatibilidad | Web responsiva móvil y app nativa para Android. | Funciona en Chrome/Safari móvil y últimas 2 versiones mayores Android. | Alta |
| **RNF-007** | Compatibilidad | Integración API banca móvil Banco Pichincha (sandbox). | Procesa confirmación y rechazo en sandbox antes de producción. | Alta |
| **RNF-008** | Rendimiento | Consultas de disponibilidad <3s bajo 4G y 50 usuarios concurrentes. | 95% de consultas responden en <=3s (percentil 95). | Alta |
| **RNF-009** | Rendimiento | Alerta a vendedor en <5s bajo 4G (hasta 10 pedidos concurrentes). | 95% de alertas llegan al dispositivo en <=5s. | Alta |
| **RNF-010** | Rendimiento | El sistema proveerá herramientas que permitan entregar en <10min. | Personal logra objetivo en al menos 93% de pedidos muestreados. | Alta |
| **RNF-011** | Usabilidad | Completar pedido en máx 3 pasos en <30s promedio. | 90% de usuarios lo logran en pruebas de usabilidad. | Alta |
| **RNF-012** | Usabilidad | Disponibilidad visual WCAG AA (color, icono y texto). | Estado identificado en <5s. Operable por teclado y lector pantalla. | Alta |
| **RNF-013** | Usabilidad | Disponibilidad, precio y entrega en 1 sola pantalla (Ley Defensa Consumidor). | 100% de pantallas muestran datos sin navegación extra. | Media |
| **RNF-014** | Cumplimiento Legal | Consentimiento específico para datos y GPS revocable (LOPDP). | Casilla general + consentimiento explícito GPS. Permite revocar en perfil. | Alta |
| **RNF-015** | Mantenibilidad | Arquitectura modular (cambio no impacta a >1 módulo extra). | Cambio simulado no afecta a múltiples módulos (excepto transversales). | Media |

---
---

## 2. Propuesta de Solución 2 (Módulo Gestión de Ingresos - GI)

### 2.1. Requisitos Funcionales (RF)

| ID | Nombre | Descripción | Criterio de Aceptación | Prioridad |
| :--- | :--- | :--- | :--- | :--- |
| **RF-001** | Iniciar pago de pedido/reserva | Permitir al cliente iniciar pago eligiendo efectivo o transferencia. | Queda "pendiente" y expira a los 15 min si no se confirma. | Alta |
| **RF-002** | Registrar cobro en efectivo | Vendedor registrará cobro al entregar/iniciar, incluyendo monto y cambio. | Registra monto recibido, cambio, fecha; asociado a cierre de caja. | Alta |
| **RF-003** | Procesar transferencia | Procesar envío a banca móvil (espera máx 5s, 2 reintentos, idempotencia). | Confirma solo con respuesta bancaria válida, sino rechaza. | Alta |
| **RF-004** | Registrar devolución de pago | Registrar devolución de pago cancelado en máx 7 días (autorización admin sobre umbral). | Registra monto, motivo, fecha y ref original; corrige errores solo admin. | Alta |
| **RF-005** | Generar reporte de ingresos | Reporte consolidado de ingresos por ventas y canchas descontando devoluciones. | Calcula ingresos netos en <5s, filtrable por rango/método. | Alta |
| **RF-006** | Consultar pago | Vendedor consulta estado/detalle de pagos. Restringido a sus transacciones. | Resultados paginados (máx 20) en <3s. | Media |

### 2.2. Requisitos No Funcionales (RNF)

| ID | Categoría | Descripción | Criterio de Aceptación / Métrica | Prioridad |
| :--- | :--- | :--- | :--- | :--- |
| **RNF-001** | Seguridad | RBAC y segregación para devoluciones (Vendedor solicita, Admin autoriza altos montos). | 100% de clientes bloqueados. 100% sobre umbral requieren Admin. | Alta |
| **RNF-002** | Seguridad | Comunicación HTTPS/TLS 1.2+ con banca móvil. | 100% de peticiones a la API usan HTTPS/TLS. | Alta |
| **RNF-003** | Seguridad | Log de auditoría de devoluciones retenido por 7 años. | 100% devoluciones auditadas (monto, motivo, fecha, usuario) sin borrado. | Alta |
| **RNF-004** | Disponibilidad | Atomicidad de pagos y devoluciones (transacción única de base de datos). | Sin registros parciales o inconsistentes ante fallo simulado. | Alta |
| **RNF-005** | Compatibilidad | Integración con banca móvil Banco Pichincha (API / Sandbox). | Procesa confirmación y devolución de prueba exitosamente. | Alta |
| **RNF-006** | Rendimiento | Validación de transferencia (sandbox) no excede 5 segundos. | 95% de validaciones responden en <=5s. | Alta |
| **RNF-007** | Usabilidad | Flujo de pago en máximo 2 pasos tras confirmación. | 90% de usuarios lo completan en <=2 pasos. | Media |
| **RNF-008** | Cumplimiento Legal | Validez probatoria de actos electrónicos (Ley Comercio Electrónico). | Conserva monto, fecha, medio, referencia inmutables con marca de tiempo. | Media |
