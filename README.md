# Calculadora IA con Razonamiento

# Calculadora IA con Razonamiento

> **Proyecto desarrollado con asistencia de agentes de Inteligencia Artificial**

Este proyecto fue desarrollado y ejecutado utilizando un agente de Inteligencia Artificial mediante **Codex**, con el objetivo de explorar el uso de modelos de IA como asistentes durante el proceso de desarrollo de software.

Se utilizó un modelo de mayor costo, con un consumo aproximado de US$2.36 . A lo largo de la ejecución se identificaron algunas limitaciones y fallos en determinadas tareas, especialmente durante la generación, modificación y depuración del código.

A partir de estas observaciones, se decidió realizar un cambio de modelo y utilizar una alternativa mas dinamica respecto a precios y usabiliad, buscando mejorar la relación entre costo, capacidad y experiencia durante la ejecución de las tareas.

El cambio permitió continuar el desarrollo utilizando un modelo con un costo de operación menor y con un comportamiento que se adaptó mejor a las necesidades observadas durante la construcción del proyecto.

Este proyecto funciona también como un pequeño experimento práctico para evaluar el uso de diferentes modelos de Inteligencia Artificial en un flujo real de desarrollo, teniendo en cuenta aspectos como:

* Calidad del código generado.
* Capacidad para comprender y modificar un proyecto existente.
* Manejo de errores y depuración.
* Seguimiento de instrucciones.
* Experiencia durante la interacción con el agente.
* Costo de utilización.
* Capacidad de razonamiento y resolución de problemas.


## Bitácora del desarrollo y evaluación de modelos

### Primera etapa: desarrollo con un agente de Inteligencia Artificial

Este proyecto fue desarrollado y ejecutado utilizando un agente de Inteligencia Artificial mediante **Codex**, con el objetivo de explorar el uso de diferentes modelos como asistentes durante un proceso real de desarrollo de software.

Durante la primera etapa se utilizó **Claude Haiku de Anthropic**. El modelo presentó un tiempo de respuesta considerablemente menor durante la ejecución de las tareas, lo que permitió avanzar rápidamente en diferentes partes del proyecto.

Sin embargo, durante la revisión y depuración comenzaron a identificarse algunas inconsistencias en el código y dificultades en determinadas tareas. Por esta razón, además de evaluar la velocidad de respuesta, se decidió prestar atención a otros factores como la calidad del código generado, la capacidad de razonamiento, la depuración y la experiencia general durante el desarrollo.

### Integración de diferentes modelos mediante LiteLLM

Para poder experimentar con diferentes modelos sin tener que modificar constantemente el flujo de trabajo utilizado con Codex, se implementó **LiteLLM como una capa adaptadora entre el agente y los diferentes proveedores de modelos**.

Esta configuración permitió centralizar las solicitudes mediante un único punto de acceso y utilizar diferentes modelos a través de una interfaz compatible. De esta manera, Codex podía mantener prácticamente el mismo flujo de trabajo mientras se cambiaba el modelo utilizado internamente.

La arquitectura utilizada quedó conceptualmente de la siguiente manera:

**Codex → LiteLLM → Modelo de IA**

Esto permitió realizar una comparación práctica entre diferentes modelos utilizando un entorno de desarrollo similar, reduciendo la necesidad de modificar la configuración del proyecto cada vez que se quería probar una alternativa.

### Segunda etapa: depuración y nuevo proyecto

Durante la etapa de depuración del proyecto realizamos una revisión del código y encontramos varias inconsistencias que afectaban su funcionamiento y la experiencia general de uso.

A partir de este proceso, registramos los principales puntos en los que era necesario mejorar y utilizamos estas observaciones como referencia para plantear una nueva versión del proyecto.

Como resultado, se decidió iniciar un proyecto nuevo, incorporando mejores funcionalidades y un diseño más orientado al **Responsive Design**, buscando una adaptación más adecuada a diferentes tamaños de pantalla y dispositivos.

En esta nueva etapa, el **100 % del HTML y CSS fue generado con asistencia de Inteligencia Artificial**. La intervención humana se concentró principalmente en la revisión de la lógica desarrollada en **JavaScript**, intentando comprender, depurar y recuperar el funcionamiento del proyecto a partir del código generado.

Sin embargo, después de revisar los resultados y las inconsistencias encontradas durante la ejecución, consideramos que el resultado obtenido no era satisfactorio para continuar desarrollando sobre esta base.

Por este motivo, se tomó la decisión de cambiar nuevamente el modelo utilizado y continuar el experimento con el modelo chino **MiMo-V2.6-Pro**, buscando evaluar su comportamiento frente al mismo tipo de tareas, especialmente en aspectos como generación de código, razonamiento, depuración, seguimiento de instrucciones, calidad de las soluciones, velocidad de respuesta y experiencia general durante el desarrollo.


## Estructura

\\\
calculadora-ia/
├── backend/          # FastAPI + lógica de cálculo
├── frontend/         # HTML/CSS/JS (Desktop-first)
├── requirements.txt  # Dependencias Python
└── README.md         # Este archivo
\\\

## Operaciones soportadas

- Suma (+)
- Resta (-)
- Multiplicación (×)
- División (÷)
- Porcentaje (%)
- Limpiar (C)
- Todo Limpio (AC)

## Instalación

1. Crear entorno virtual:
   \\\ash
   python -m venv venv
   venv\Scripts\activate
   \\\

2. Instalar dependencias:
   \\\ash
   pip install -r requirements.txt
   \\\

3. Ejecutar servidor:
   \\\ash
   python backend/main.py
   \\\

4. Abrir en navegador: http://localhost:8000

## Componentes

### Backend (FastAPI)
- Endpoint /calculate para procesar operaciones
- Lógica de razonamiento en Chain of Thought
- CORS habilitado para frontend

### Frontend
- Interfaz desktop-first estilo iOS
- Botones: 0-9, operadores, AC, C, =
- Pantalla mostrando entrada y resultado
