const Reparacion = function () //a
{
    function configurar() {
        console.log("Iniciando la Configuracion");
    }

    
    function eventos() {
        console.log("Escuchando los eventos");
        $("#reptel").on("click", agregarDatoTelefono);
    }

    async function agregarDatoTelefono() {
        $("#divReserva").hide();
        console.log("Agregar Dato de telefono");

        const { value: formValues } = await Swal.fire({
            title: "Ingresa los datos del telefono",
            icon: "info",
            html: `
            <label class="col-md-4 control-label" for="textinput">IMEI</label>  
            <input id="imei" class="swal2-input">
            <label class="col-md-4 control-label" for="textinput">NUMERO DE SERIE</label>  
            <input id="num_serie" class="swal2-input">
            <label class="col-md-4 control-label" for="textinput">MARCA</label>  
            <input id="marca" class="swal2-input">
            <label class="col-md-4 control-label" for="textinput">EL TELEFONO ESTA REPORTADO? SI O NO</label>  
            <input id="estado" class="swal2-input">
            
            `,
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonText: "Guardar",
            denyButtonText: `Cancelar`,
            preConfirm: () => {
                return {
                    imei:  document.getElementById("imei").value,
                    num_serie: document.getElementById("num_serie").value,
                    marca:  document.getElementById("marca").value,
                    estado:  document.getElementById("estado").value
                };
            }
        });
        if(formValues.estado=="Si"){
            alert("Lo siento, no puede acceder al servicio");
            location.reload();
        }else if (formValues) {
            let telefono =new telefonos(formValues.imei, formValues.num_serie, formValues.marca, formValues.estado);
            let tecnico;
            dibujarTelefono(telefono);
            if(formValues.marca="Xiaomi"){
                tecnico =new tecnicos("Alberto Medina", "Xiaomi");
                dibujarTecnico(tecnico);
            }else if(formValues.marca="Huawei"){
                tecnico =new tecnicos("Pepe de las Casas", "Huawei");
                dibujarTecnico(tecnico);
            }
        }
    }
    function dibujarTelefono(telefono){
        console.log(telefono);
        $("#idImei").val(telefono.imei);
        $("#idNum_serie").val(telefono.num_serie);
        $("#idMarca").val(telefono.marca);
        $("#idEstado").val(telefono.estado);
        
    }

    function dibujarTecnico(tecnico){
        console.log(tecnico);
        $("#idTecnico").val(tecnico.nombre);
        reparar();
    }

    async function reparar() {
        console.log("Reparacion");

        const { value: formValues } = await Swal.fire({
            title: "Ingresa los datos de la reparacion",
            icon: "info",
            html: `
            <label class="col-md-4 control-label" for="textinput">Primer diagnostico:</label>  
            <input id="pri_diagnostico" class="swal2-input">
            <label class="col-md-4 control-label" for="textinput">Costo:</label>  
            <input id="costo" class="swal2-input">
            <label class="col-md-4 control-label" for="textinput">Tiene la autorizacion del usuario?</label>  
            <input id="autorizacion" class="swal2-input">
            <label class="col-md-4 control-label" for="textinput">Cantidad de abono del cliente:</label>  
            <input id="abono" class="swal2-input">
            <label class="col-md-4 control-label" for="textinput">Diagnostico final:</label>  
            <input id="diagnostico_final" class="swal2-input">
            `,
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonText: "Guardar",
            denyButtonText: `Cancelar`,
            preConfirm: () => {
                return {
                    pri_diagnostico:  document.getElementById("pri_diagnostico").value,
                    costo: document.getElementById("costo").value,
                    autorizacion:  document.getElementById("autorizacion").value,
                    abono:  document.getElementById("abono").value,
                    diagnostico_final:  document.getElementById("diagnostico_final").value
                };
            }
        });
        if (formValues) {
            let reparar =new reparacion(formValues.pri_diagnostico, formValues.costo, formValues.autorizacion, formValues.abono, formValues.diagnostico_final);
            dibujarReparacion(reparar);
        }
    }
    

    function dibujarReparacion(reparacion){
        console.log(reparacion);
        
        $("#repPri_diagnostico").val(reparacion.pri_diagnostico);
        $("#repCosto").val(reparacion.costo);
        $("#repAutorizacion").val(reparacion.autorizacion);
        $("#repAbono").val(reparacion.abono);
        $("#repDiagnostico_final").val(reparacion.diagnostico_final);
        
        $("#divReparacion").show();

    }
    
    return {
        init: function (parametros) {
            console.log(parametros)
            configurar();
            eventos();
        },
    };
}();

class telefonos{
    constructor(imei, num_serie, marca, estado){
        this.imei=imei;
        this.num_serie= num_serie;
        this.marca= marca;
        this.estado=estado;
    }
}

class tecnicos{
    constructor(nombre, especialidad){
        this.nombre=nombre;
        this.especialidad=especialidad;
    }
}

class reparacion{
    constructor(pri_diagnostico, costo, autorizacion, abono, diagnostico_final){
        this.pri_diagnostico=pri_diagnostico;
        this.costo=costo;
        this.autorizacion=autorizacion;
        this.abono=abono;
        this.diagnostico_final=diagnostico_final;
    }
}