/*
SISTEMA DE RESERVACIONES PREMIUM - RESTAURANTE TASTY
Sistema avanzado de reservaciones con validaciones, disponibilidad y UX mejorada
*/

class ReservationSystem {
    constructor() {
        this.form = null;
        this.dateInput = null;
        this.timeSelect = null;
        this.guestsSelect = null;
        this.availableTimes = this.initializeAvailableTimes();
        this.bookedSlots = this.initializeBookedSlots();
        
        // Inicializar cuando el DOM esté listo
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }
    
    init() {
        console.log('🍽️ Reservation System initialized');
        this.setupForm();
        this.setupEventListeners();
        this.setupValidation();
        this.updateTimeSlots();
    }
    
    // Horarios disponibles del restaurante
    initializeAvailableTimes() {
        return {
            lunch: [
                { time: '12:00', label: '12:00 PM', recommended: true },
                { time: '12:30', label: '12:30 PM', recommended: true },
                { time: '13:00', label: '1:00 PM', recommended: true },
                { time: '13:30', label: '1:30 PM', recommended: false },
                { time: '14:00', label: '2:00 PM', recommended: false },
                { time: '14:30', label: '2:30 PM', recommended: false },
                { time: '15:00', label: '3:00 PM', recommended: false }
            ],
            dinner: [
                { time: '18:00', label: '6:00 PM', recommended: false },
                { time: '18:30', label: '6:30 PM', recommended: false },
                { time: '19:00', label: '7:00 PM', recommended: true },
                { time: '19:30', label: '7:30 PM', recommended: true },
                { time: '20:00', label: '8:00 PM', recommended: true },
                { time: '20:30', label: '8:30 PM', recommended: true },
                { time: '21:00', label: '9:00 PM', recommended: false },
                { time: '21:30', label: '9:30 PM', recommended: false },
                { time: '22:00', label: '10:00 PM', recommended: false }
            ]
        };
    }
    
    // Simular slots ocupados (en producción vendría de una API)
    initializeBookedSlots() {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        
        return {
            [this.formatDate(today)]: ['19:00', '20:00', '20:30'],
            [this.formatDate(tomorrow)]: ['19:30', '21:00']
        };
    }
    
    // Configurar el formulario
    setupForm() {
        this.form = document.getElementById('form-wrap');
        if (!this.form) {
            console.error('❌ Reservation form not found');
            return;
        }
        
        // Reemplazar el campo de fecha y hora combinado
        this.replaceDateTimeField();
        this.updateGuestsSelect();
        
        console.log('✅ Form setup completed');
    }
    
    // Reemplazar campo de fecha y hora por campos separados con date picker personalizado
    replaceDateTimeField() {
        const dateTimeField = document.getElementById('taskdatetime');
        if (!dateTimeField) return;

        const dateTimeContainer = dateTimeField.closest('.form-group');
        if (!dateTimeContainer) return;

        const translate = window.languageManager ? window.languageManager.translate.bind(window.languageManager) : (key) => key;

        // Crear nuevos campos con date picker personalizado
        const newFieldsHTML = `
            <div class="row form-group">
                <div class="col-md-6">
                    <label for="reservation-date">${translate('pages.reservation.form.date')}</label>
                    <div class="custom-date-picker" id="custom-date-picker">
                        <input type="text" class="form-control date-display" id="reservation-date-display"
                               placeholder="${translate('pages.reservation.form.placeholders.date')}" readonly required>
                        <input type="hidden" id="reservation-date" required>
                        <div class="date-picker-icon">
                            <i class="icon-calendar"></i>
                        </div>
                        <div class="date-picker-dropdown" id="date-picker-dropdown">
                            <div class="date-picker-header">
                                <button type="button" class="date-nav-btn" id="prev-month">
                                    <i class="icon-chevron-left"></i>
                                </button>
                                <div class="date-picker-title" id="date-picker-title">
                                    <span class="month-year"></span>
                                </div>
                                <button type="button" class="date-nav-btn" id="next-month">
                                    <i class="icon-chevron-right"></i>
                                </button>
                            </div>
                            <div class="date-picker-calendar">
                                <div class="weekdays">
                                    <div class="weekday">Dom</div>
                                    <div class="weekday">Lun</div>
                                    <div class="weekday">Mar</div>
                                    <div class="weekday">Mié</div>
                                    <div class="weekday">Jue</div>
                                    <div class="weekday">Vie</div>
                                    <div class="weekday">Sáb</div>
                                </div>
                                <div class="days-grid" id="days-grid">
                                    <!-- Los días se generarán dinámicamente -->
                                </div>
                            </div>
                            <div class="date-picker-footer">
                                <button type="button" class="date-picker-today" id="select-today">Hoy</button>
                                <button type="button" class="date-picker-clear" id="clear-date">Limpiar</button>
                            </div>
                        </div>
                    </div>
                    <div class="field-error" id="date-error"></div>
                </div>
                <div class="col-md-6">
                    <label for="reservation-time">${translate('pages.reservation.form.time')}</label>
                    <select class="form-control custom_select" id="reservation-time" required>
                        <option value="">${translate('pages.reservation.form.placeholders.time')}</option>
                    </select>
                    <div class="field-error" id="time-error"></div>
                </div>
            </div>
            <div class="row form-group">
                <div class="col-md-12">
                    <div class="time-slots-info">
                        <div class="time-legend">
                            <span class="legend-item available">
                                <span class="legend-dot"></span>
                                ${translate('pages.reservation.form.timeSlots.available')}
                            </span>
                            <span class="legend-item recommended">
                                <span class="legend-dot"></span>
                                ${translate('pages.reservation.form.timeSlots.recommended')}
                            </span>
                            <span class="legend-item unavailable">
                                <span class="legend-dot"></span>
                                ${translate('pages.reservation.form.timeSlots.unavailable')}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        dateTimeContainer.outerHTML = newFieldsHTML;

        // Obtener referencias a los nuevos campos
        this.dateInput = document.getElementById('reservation-date');
        this.dateDisplay = document.getElementById('reservation-date-display');
        this.timeSelect = document.getElementById('reservation-time');

        // Inicializar el date picker personalizado
        this.initCustomDatePicker();
    }
    
    // Actualizar selector de huéspedes con traducciones
    updateGuestsSelect() {
        const guestsSelect = document.getElementById('many');
        if (!guestsSelect) return;
        
        const translate = window.languageManager ? window.languageManager.translate.bind(window.languageManager) : (key) => key;
        
        guestsSelect.innerHTML = '';
        
        for (let i = 1; i <= 8; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = translate(`pages.reservation.form.guestOptions.${i}`);
            guestsSelect.appendChild(option);
        }
        
        this.guestsSelect = guestsSelect;
    }
    
    // Inicializar date picker personalizado
    initCustomDatePicker() {
        this.currentDate = new Date();
        this.selectedDate = null;
        this.minDate = new Date();
        this.maxDate = new Date();
        this.maxDate.setMonth(this.currentDate.getMonth() + 3);

        this.setupDatePickerEvents();
        this.renderCalendar();

        console.log('📅 Custom date picker initialized');
    }

    // Configurar eventos del date picker
    setupDatePickerEvents() {
        const datePicker = document.getElementById('custom-date-picker');
        const dateDisplay = document.getElementById('reservation-date-display');
        const dropdown = document.getElementById('date-picker-dropdown');
        const prevBtn = document.getElementById('prev-month');
        const nextBtn = document.getElementById('next-month');
        const todayBtn = document.getElementById('select-today');
        const clearBtn = document.getElementById('clear-date');

        // Mostrar/ocultar dropdown
        dateDisplay.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('show');
            if (dropdown.classList.contains('show')) {
                this.renderCalendar();
            }
        });

        // Cerrar dropdown al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (!datePicker.contains(e.target)) {
                dropdown.classList.remove('show');
            }
        });

        // Navegación de meses
        prevBtn.addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() - 1);
            this.renderCalendar();
        });

        nextBtn.addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() + 1);
            this.renderCalendar();
        });

        // Botón "Hoy"
        todayBtn.addEventListener('click', () => {
            this.selectDate(new Date());
        });

        // Botón "Limpiar"
        clearBtn.addEventListener('click', () => {
            this.clearDate();
        });
    }

    // Renderizar calendario
    renderCalendar() {
        const monthNames = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];

        const titleElement = document.querySelector('#date-picker-title .month-year');
        const daysGrid = document.getElementById('days-grid');

        if (!titleElement || !daysGrid) return;

        // Actualizar título
        titleElement.textContent = `${monthNames[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`;

        // Limpiar grid
        daysGrid.innerHTML = '';

        // Obtener primer día del mes y número de días
        const firstDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
        const lastDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());

        // Generar 42 días (6 semanas)
        for (let i = 0; i < 42; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);

            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = date.getDate();

            // Clases condicionales
            if (date.getMonth() !== this.currentDate.getMonth()) {
                dayElement.classList.add('other-month');
            }

            if (date < this.minDate || date > this.maxDate) {
                dayElement.classList.add('disabled');
            }

            if (this.isToday(date)) {
                dayElement.classList.add('today');
            }

            if (this.selectedDate && this.isSameDay(date, this.selectedDate)) {
                dayElement.classList.add('selected');
            }

            // Event listener para seleccionar fecha
            if (!dayElement.classList.contains('disabled') && !dayElement.classList.contains('other-month')) {
                dayElement.addEventListener('click', () => {
                    this.selectDate(date);
                });
            }

            daysGrid.appendChild(dayElement);
        }
    }

    // Seleccionar fecha
    selectDate(date) {
        this.selectedDate = new Date(date);
        this.dateInput.value = this.formatDate(date);
        this.dateDisplay.value = this.formatDisplayDate(date);

        // Cerrar dropdown
        document.getElementById('date-picker-dropdown').classList.remove('show');

        // Actualizar slots de tiempo
        this.updateTimeSlots();
        this.validateField(this.dateDisplay);

        // Renderizar calendario para mostrar selección
        this.renderCalendar();

        console.log('📅 Date selected:', this.formatDate(date));
    }

    // Limpiar fecha
    clearDate() {
        this.selectedDate = null;
        this.dateInput.value = '';
        this.dateDisplay.value = '';

        // Cerrar dropdown
        document.getElementById('date-picker-dropdown').classList.remove('show');

        // Limpiar slots de tiempo
        this.timeSelect.innerHTML = '<option value="">Selecciona primero una fecha</option>';

        // Renderizar calendario
        this.renderCalendar();
    }

    // Verificar si es hoy
    isToday(date) {
        const today = new Date();
        return this.isSameDay(date, today);
    }

    // Verificar si son el mismo día
    isSameDay(date1, date2) {
        return date1.getDate() === date2.getDate() &&
               date1.getMonth() === date2.getMonth() &&
               date1.getFullYear() === date2.getFullYear();
    }

    // Formatear fecha para mostrar
    formatDisplayDate(date) {
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        return date.toLocaleDateString('es-ES', options);
    }

    // Configurar event listeners
    setupEventListeners() {
        if (this.dateInput) {
            this.dateInput.addEventListener('change', () => {
                this.updateTimeSlots();
                this.validateField(this.dateInput);
            });
        }

        if (this.timeSelect) {
            this.timeSelect.addEventListener('change', () => {
                this.validateField(this.timeSelect);
            });
        }

        if (this.form) {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSubmit();
            });
        }

        // Validación en tiempo real para todos los campos
        const inputs = this.form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }
    
    // Actualizar slots de tiempo basado en la fecha seleccionada
    updateTimeSlots() {
        if (!this.dateInput || !this.timeSelect) return;
        
        const selectedDate = this.dateInput.value;
        if (!selectedDate) {
            this.timeSelect.innerHTML = '<option value="">Selecciona primero una fecha</option>';
            return;
        }
        
        const translate = window.languageManager ? window.languageManager.translate.bind(window.languageManager) : (key) => key;
        const bookedTimes = this.bookedSlots[selectedDate] || [];
        
        // Limpiar opciones existentes
        this.timeSelect.innerHTML = `<option value="">${translate('pages.reservation.form.placeholders.time')}</option>`;
        
        // Agregar sección de almuerzo
        const lunchGroup = document.createElement('optgroup');
        lunchGroup.label = translate('pages.reservation.form.timeSlots.lunch');
        
        this.availableTimes.lunch.forEach(slot => {
            const option = document.createElement('option');
            option.value = slot.time;
            option.textContent = slot.label;
            
            if (bookedTimes.includes(slot.time)) {
                option.disabled = true;
                option.textContent += ` - ${translate('pages.reservation.form.timeSlots.unavailable')}`;
            } else if (slot.recommended) {
                option.textContent += ` - ${translate('pages.reservation.form.timeSlots.recommended')}`;
                option.classList.add('recommended');
            }
            
            lunchGroup.appendChild(option);
        });
        
        // Agregar sección de cena
        const dinnerGroup = document.createElement('optgroup');
        dinnerGroup.label = translate('pages.reservation.form.timeSlots.dinner');
        
        this.availableTimes.dinner.forEach(slot => {
            const option = document.createElement('option');
            option.value = slot.time;
            option.textContent = slot.label;
            
            if (bookedTimes.includes(slot.time)) {
                option.disabled = true;
                option.textContent += ` - ${translate('pages.reservation.form.timeSlots.unavailable')}`;
            } else if (slot.recommended) {
                option.textContent += ` - ${translate('pages.reservation.form.timeSlots.recommended')}`;
                option.classList.add('recommended');
            }
            
            dinnerGroup.appendChild(option);
        });
        
        this.timeSelect.appendChild(lunchGroup);
        this.timeSelect.appendChild(dinnerGroup);
        
        console.log(`⏰ Time slots updated for ${selectedDate}`);
    }
    
    // Configurar validaciones
    setupValidation() {
        console.log('✅ Validation system setup completed');
    }
    
    // Validar campo individual
    validateField(field) {
        const translate = window.languageManager ? window.languageManager.translate.bind(window.languageManager) : (key) => key;
        let isValid = true;
        let errorMessage = '';
        
        // Limpiar error previo
        this.clearFieldError(field);
        
        // Validación por tipo de campo
        switch (field.type) {
            case 'text':
                if (field.required && !field.value.trim()) {
                    errorMessage = translate('pages.reservation.form.validation.required');
                    isValid = false;
                }
                break;
                
            case 'email':
                if (field.required && !field.value.trim()) {
                    errorMessage = translate('pages.reservation.form.validation.required');
                    isValid = false;
                } else if (field.value && !this.isValidEmail(field.value)) {
                    errorMessage = translate('pages.reservation.form.validation.invalidEmail');
                    isValid = false;
                }
                break;
                
            case 'tel':
                if (field.required && !field.value.trim()) {
                    errorMessage = translate('pages.reservation.form.validation.required');
                    isValid = false;
                } else if (field.value && !this.isValidPhone(field.value)) {
                    errorMessage = translate('pages.reservation.form.validation.invalidPhone');
                    isValid = false;
                }
                break;
                
            case 'date':
                if (field.required && !field.value) {
                    errorMessage = translate('pages.reservation.form.validation.required');
                    isValid = false;
                } else if (field.value && new Date(field.value) < new Date().setHours(0,0,0,0)) {
                    errorMessage = translate('pages.reservation.form.validation.pastDate');
                    isValid = false;
                }
                break;
        }
        
        // Validación para select
        if (field.tagName === 'SELECT' && field.required && !field.value) {
            errorMessage = translate('pages.reservation.form.validation.required');
            isValid = false;
        }
        
        // Mostrar error si existe
        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }
        
        return isValid;
    }
    
    // Mostrar error en campo
    showFieldError(field, message) {
        field.classList.add('error');
        
        const errorId = field.id + '-error';
        let errorElement = document.getElementById(errorId);
        
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.id = errorId;
            errorElement.className = 'field-error';
            field.parentNode.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    // Limpiar error de campo
    clearFieldError(field) {
        field.classList.remove('error');
        
        const errorId = field.id + '-error';
        const errorElement = document.getElementById(errorId);
        
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }
    
    // Validar email
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Validar teléfono
    isValidPhone(phone) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }
    
    // Formatear fecha para input date
    formatDate(date) {
        return date.toISOString().split('T')[0];
    }
    
    // Manejar envío del formulario
    handleSubmit() {
        console.log('📝 Processing reservation submission...');
        
        // Validar todos los campos
        const inputs = this.form.querySelectorAll('input[required], select[required]');
        let isFormValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });
        
        if (!isFormValid) {
            console.log('❌ Form validation failed');
            return;
        }
        
        // Recopilar datos del formulario
        const formData = this.collectFormData();
        
        // Simular envío (en producción sería una llamada a API)
        this.submitReservation(formData);
    }
    
    // Recopilar datos del formulario
    collectFormData() {
        return {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            date: this.dateInput.value,
            time: this.timeSelect.value,
            guests: this.guestsSelect.value,
            message: document.getElementById('message').value
        };
    }
    
    // Enviar reservación
    submitReservation(data) {
        const translate = window.languageManager ? window.languageManager.translate.bind(window.languageManager) : (key) => key;
        
        // Mostrar loading
        const submitBtn = this.form.querySelector('input[type="submit"]');
        const originalValue = submitBtn.value;
        submitBtn.value = 'Enviando...';
        submitBtn.disabled = true;
        
        // Simular llamada a API
        setTimeout(() => {
            console.log('✅ Reservation submitted:', data);
            
            // Mostrar mensaje de éxito
            this.showSuccessMessage(translate('pages.reservation.form.validation.success'));
            
            // Resetear formulario
            this.form.reset();
            this.updateTimeSlots();
            
            // Restaurar botón
            submitBtn.value = originalValue;
            submitBtn.disabled = false;
            
        }, 2000);
    }
    
    // Mostrar mensaje de éxito
    showSuccessMessage(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'alert alert-success reservation-success';
        successDiv.innerHTML = `
            <i class="icon-check"></i>
            <strong>${message}</strong>
            <p>Te contactaremos pronto para confirmar tu reserva.</p>
        `;
        
        this.form.parentNode.insertBefore(successDiv, this.form);
        
        // Remover mensaje después de 5 segundos
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
        
        // Scroll al mensaje
        successDiv.scrollIntoView({ behavior: 'smooth' });
    }
}

// Inicializar el sistema de reservaciones
let reservationSystem;

// Esperar a que se carguen las traducciones
if (typeof translations !== 'undefined') {
    reservationSystem = new ReservationSystem();
} else {
    document.addEventListener('DOMContentLoaded', () => {
        if (typeof translations !== 'undefined') {
            reservationSystem = new ReservationSystem();
        }
    });
}

// Exportar para uso global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ReservationSystem;
} else {
    window.ReservationSystem = ReservationSystem;
    window.reservationSystem = reservationSystem;
}
