from fastapi import FastAPI, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import os
from pathlib import Path

app = FastAPI(title="Calculadora IA")

# Configurar CORS
origins = [
    "http://localhost:8000",
    "http://127.0.0.1:8000",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modelo de datos para la solicitud
class CalcRequest(BaseModel):
    num1: Optional[float] = None
    operator: Optional[str] = None
    num2: Optional[float] = None
    current_input: Optional[str] = None

# Clase para razonamiento (Chain of Thought)
class ReasoningEngine:
    def __init__(self):
        self.reasoning_log = []
    
    def think(self, message: str):
        """Registra un paso del razonamiento"""
        self.reasoning_log.append(message)
        print(f"[RAZONAMIENTO] {message}")
    
    def get_log(self):
        """Retorna el log de razonamiento"""
        return self.reasoning_log
    
    def clear(self):
        """Limpia el log"""
        self.reasoning_log = []

reasoning = ReasoningEngine()

# Servir archivos estáticos del frontend
frontend_path = Path(__file__).parent.parent / "frontend"
if frontend_path.exists():
    app.mount("/static", StaticFiles(directory=str(frontend_path)), name="static")

@app.get("/", response_class=HTMLResponse)
async def root():
    """Página principal"""
    frontend_index = frontend_path / "index.html"
    if frontend_index.exists():
        with open(frontend_index, 'r', encoding='utf-8') as f:
            return f.read()
    return {
        "mensaje": "Calculadora IA - Backend listo",
        "endpoints": ["/calculate", "/docs"]
    }

@app.post("/calculate")
async def calculate(request: CalcRequest):
    """
    Endpoint principal para calcular operaciones
    """
    reasoning.clear()
    
    reasoning.think(f"Solicitud recibida: num1={request.num1}, operator={request.operator}, num2={request.num2}")
    
    # Validación: ¿tenemos los datos necesarios?
    if request.num1 is None or request.operator is None or request.num2 is None:
        reasoning.think("ERROR: Faltan parámetros para realizar la operación")
        raise HTTPException(status_code=400, detail="Faltan números u operador")
    
    reasoning.think(f"Validación OK. Operación: {request.num1} {request.operator} {request.num2}")
    
    try:
        resultado = ejecutar_operacion(request.num1, request.operator, request.num2, reasoning)
        
        reasoning.think(f"Resultado final calculado: {resultado}")
        
        return {
            "resultado": resultado,
            "operacion": f"{request.num1} {request.operator} {request.num2}",
            "razonamiento": reasoning.get_log(),
            "exito": True
        }
    
    except Exception as e:
        reasoning.think(f"ERROR durante cálculo: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))

def ejecutar_operacion(num1: float, operator: str, num2: float, reasoning: ReasoningEngine):
    """
    Ejecuta la operación matemática según el operador
    """
    reasoning.think(f"Identificando operador: '{operator}'")
    
    if operator == "+":
        reasoning.think(f"Operador: SUMA. Sumaré {num1} + {num2}")
        resultado = num1 + num2
        reasoning.think(f"Suma completada: {num1} + {num2} = {resultado}")
        
    elif operator == "-":
        reasoning.think(f"Operador: RESTA. Restaré {num1} - {num2}")
        resultado = num1 - num2
        reasoning.think(f"Resta completada: {num1} - {num2} = {resultado}")
        
    elif operator == "*":
        reasoning.think(f"Operador: MULTIPLICACIÓN. Multiplicaré {num1} × {num2}")
        resultado = num1 * num2
        reasoning.think(f"Multiplicación completada: {num1} × {num2} = {resultado}")
        
    elif operator == "/":
        reasoning.think(f"Operador: DIVISIÓN. Dividiré {num1} ÷ {num2}")
        
        if num2 == 0:
            reasoning.think("ERROR: No puedo dividir por cero (división indefinida)")
            raise ValueError("División por cero no permitida")
        
        resultado = num1 / num2
        reasoning.think(f"División completada: {num1} ÷ {num2} = {resultado}")
        
    elif operator == "%":
        reasoning.think(f"Operador: PORCENTAJE. Calcularé {num1}% de {num2}")
        resultado = (num1 / 100) * num2
        reasoning.think(f"Porcentaje calculado: {num1}% de {num2} = {resultado}")
        
    else:
        reasoning.think(f"ERROR: Operador desconocido: '{operator}'")
        raise ValueError(f"Operador no soportado: {operator}")
    
    return resultado

if __name__ == "__main__":
    import uvicorn
    reasoning.think("=== INICIANDO SERVIDOR FASTAPI ===")
    uvicorn.run(app, host="127.0.0.1", port=8000)
