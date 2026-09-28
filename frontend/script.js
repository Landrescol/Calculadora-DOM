class Calculadora {
    constructor() {
        // Estado de la calculadora
        this.entrada = '0';
        this.num1 = null;
        this.num2 = null;
        this.operador_actual = null;
        this.nueva_entrada = false;
        
        // Referencias al DOM
        this.display = document.querySelector('.entrada');
        this.razonamiento_panel = document.querySelector('.razonamiento-panel');
        this.razonamiento_content = document.querySelector('.razonamiento-content');
        
        this.init();
    }
    
    init() {
        // Event listeners para números
        document.querySelectorAll('[data-numero]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const numero = e.target.dataset.numero;
                this.ingresarNumero(numero);
            });
        });
        
        // Event listeners para operadores
        document.querySelectorAll('[data-operator]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const op = e.target.dataset.operator;
                this.seleccionarOperador(op);
            });
        });
        
        // Event listeners para acciones (AC, C, =)
        document.querySelectorAll('[data-action]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.dataset.action;
                if (action === 'ac') this.limpiarTodo();
                if (action === 'c') this.limpiar();
                if (action === 'igual') this.calcular();
            });
        });
        
        this.actualizarDisplay();
    }
    
    ingresarNumero(numero) {
        console.log(`[JS] Usuario presionó número: ${numero}`);
        
        // Si es un punto y ya existe un punto, ignorar
        if (numero === '.' && this.entrada.includes('.')) {
            console.log('[JS] Punto duplicado ignorado');
            return;
        }
        
        // Si es nueva entrada y presionan número, reemplazar el 0
        if (this.nueva_entrada && numero !== '.') {
            this.entrada = numero;
            this.nueva_entrada = false;
            console.log(`[JS] Nueva entrada reemplazó el 0: ${this.entrada}`);
        } else {
            // Agregar número a la entrada actual
            if (this.entrada === '0' && numero !== '.') {
                this.entrada = numero;
            } else {
                this.entrada += numero;
            }
            console.log(`[JS] Entrada actualizada: ${this.entrada}`);
        }
        
        this.actualizarDisplay();
    }
    
    seleccionarOperador(op) {
        console.log(`[JS] Usuario seleccionó operador: ${op}`);
        
        // Convertir la entrada actual a número
        const numero_actual = parseFloat(this.entrada);
        
        if (this.operador_actual !== null && !this.nueva_entrada) {
            // Si ya hay operador pendiente, calcular primero
            console.log('[JS] Hay operador pendiente, calculando primero...');
            this.num2 = numero_actual;
            this.calcularSinMostrar();
            this.operador_actual = op;
        } else {
            // Guardar primer número y operador
            this.num1 = numero_actual;
            this.operador_actual = op;
            console.log(`[JS] Guardado: num1=${this.num1}, operador=${op}`);
        }
        
        this.nueva_entrada = true;
        this.actualizarDisplay();
    }
    
    async calcular() {
        console.log('[JS] Usuario presionó =');
        
        // Validación
        if (this.num1 === null || this.operador_actual === null) {
            console.log('[JS] No hay operación completa para calcular');
            return;
        }
        
        this.num2 = parseFloat(this.entrada);
        console.log(`[JS] Iniciando cálculo: ${this.num1} ${this.operador_actual} ${this.num2}`);
        
        try {
            // Mostrar panel de razonamiento
            this.razonamiento_panel.classList.add('visible');
            this.razonamiento_content.innerHTML = '<p><strong>Enviando solicitud al servidor...</strong></p>';
            
            // Llamar al backend
            const response = await fetch('http://localhost:8000/calculate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    num1: this.num1,
                    operator: this.operador_actual,
                    num2: this.num2,
                    current_input: this.entrada
                })
            });
            
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            
            const data = await response.json();
            
            console.log('[JS] Respuesta del servidor:', data);
            
            // Mostrar razonamiento en el panel
            this.mostrarRazonamiento(data.razonamiento, data.resultado);
            
            // Actualizar display con resultado
            this.entrada = data.resultado.toString();
            this.num1 = data.resultado;
            this.operador_actual = null;
            this.nueva_entrada = true;
            
            this.actualizarDisplay();
            
        } catch (error) {
            console.error('[JS] Error en cálculo:', error);
            this.razonamiento_content.innerHTML = `<p><strong style="color: red;">Error:</strong> ${error.message}</p>`;
        }
    }
    
    calcularSinMostrar() {
        // Calcula pero sin mostrar UI (para operadores en cadena)
        if (this.num1 === null || this.operador_actual === null || this.num2 === null) {
            return;
        }
        
        let resultado;
        switch (this.operador_actual) {
            case '+':
                resultado = this.num1 + this.num2;
                break;
            case '-':
                resultado = this.num1 - this.num2;
                break;
            case '*':
                resultado = this.num1 * this.num2;
                break;
            case '/':
                if (this.num2 === 0) {
                    alert('No se puede dividir por cero');
                    return;
                }
                resultado = this.num1 / this.num2;
                break;
            case '%':
                resultado = (this.num1 / 100) * this.num2;
                break;
            default:
                return;
        }
        
        this.entrada = resultado.toString();
        this.num1 = resultado;
        this.operador_actual = null;
        this.num2 = null;
    }
    
    limpiar() {
        console.log('[JS] Usuario presionó C (limpiar)');
        this.entrada = '0';
        this.nueva_entrada = true;
        this.actualizarDisplay();
    }
    
    limpiarTodo() {
        console.log('[JS] Usuario presionó AC (limpiar todo)');
        this.entrada = '0';
        this.num1 = null;
        this.num2 = null;
        this.operador_actual = null;
        this.nueva_entrada = false;
        this.razonamiento_panel.classList.remove('visible');
        this.actualizarDisplay();
    }
    
    actualizarDisplay() {
        this.display.textContent = this.entrada;
    }
    
    mostrarRazonamiento(razonamiento_log, resultado) {
        let html = `<p><strong style="color: green;">✓ Resultado: ${resultado}</strong></p><hr style="margin: 10px 0;">`;
        
        razonamiento_log.forEach((paso, index) => {
            html += `<p><strong>Paso ${index + 1}:</strong> ${paso}</p>`;
        });
        
        this.razonamiento_content.innerHTML = html;
    }
}

// Inicializar cuando cargue el DOM
document.addEventListener('DOMContentLoaded', () => {
    console.log('[JS] Página cargada, inicializando Calculadora...');
    new Calculadora();
});
