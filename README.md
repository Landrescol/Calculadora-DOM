# Calculadora IA con Razonamiento

Una calculadora web moderna con interfaz estilo iOS que muestra el razonamiento paso a paso.

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
