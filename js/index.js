// =============================================================
// == Index ====================================================

document.addEventListener ( 'DOMContentLoaded', ( ) =>
{
  //
  function carritoAgregarElemento ( vElemento )
  {
    //
    let vCarrito = JSON.parse ( localStorage.getItem ( 'carrito' ) ) || { };
    //
    vCarrito [ vElemento.id ] = vElemento;
    //
    localStorage.setItem ( 'carrito', JSON.stringify ( vCarrito ) );
    //
    return Object.keys ( vCarrito ).length;
  }

  //
  function cargarDesdeApi ( )
  {
    //
    fetch ( 'https://jd-01.github.io/tt_front-end-js_2024_24225_proyecto/api/api-juegos.json' )
    .then ( ( vRespuesta ) => vRespuesta.json ( ) )
    .then ( ( vJuegos ) =>
    {
      //
      let vContenedorCardsJuegos = document.getElementsByClassName ( 'main_sec-1' ) [ 0 ];
      
      // Valida si la variable vJuegos es un array o no está vacio
      if ( Array.isArray ( vJuegos ) && vJuegos.length )
      {
        //
        vJuegos.forEach ( vJuego =>
        {
          // <!-- == #### Card de juego ############################## == -->
          let vCardJuego = document.createElement ( 'div' );
          vCardJuego.className = 'main_sec-1_d-t-1';
          //
          let vCardJuegoHtml =  `
                <!-- == Id del juego == -->
                <input type="hidden" id="juego-id" value="${vJuego.id}">

                <!-- == Imagen del juego == -->
                <img src="${vJuego.imagen}" alt="${vJuego.nombre}" class="dm-sans-medium main_sec-1_d-t-1_img-1">

                <!-- == Información del juego == -->
                <div class="main_sec-1_d-t-1_d-1">

                  <!-- == Contenedor del nombre del juego == -->
                  <div class="main_sec-1_d-t-1_d-1_d-1">

                    <!-- == Nombre del juego == -->
                    <p class="dm-sans-bold">${vJuego.nombre}</p>

                  </div>

                  <!-- == Contenedor de iconos de consolas y puntuación == -->
                  <div class="main_sec-1_d-t-1_d-1_d-2">

                    <!-- == Contenedor de iconos de consolas == -->
                    <div class="main_sec-1_d-t-1_d-1_d-2_d-1">
          `;
          //
          if ( Array.isArray ( vJuego.plataformas ) 
               && vJuego.plataformas.length )
          {
            //
            vJuego.plataformas.forEach ( vPlataforma =>
            {
              switch ( vPlataforma )
              {
                case 'win':
                  vCardJuegoHtml += `
                      <!-- == Icono de Windows == -->
                      <img src="recursos/iconos/icono-windows_t-1.png" alt="Win" class="dm-sans-regular main_sec-1_d-t-1_d-1_d-2_d-1_img-t-1">
                  `;
                  break;
                //
                case 'xbox': 
                  vCardJuegoHtml += `
                      <!-- == Icono de Xbox == -->
                      <img src="recursos/iconos/icono-xbox_t-1.png" alt="Xbox" class="dm-sans-regular main_sec-1_d-t-1_d-1_d-2_d-1_img-t-2">
                  `;
                  break;
                //
                case 'play':
                  vCardJuegoHtml += `
                      <!-- == Icono de Play Station == -->
                      <img src="recursos/iconos/icono-play-station_t-1.png" alt="Play" class="dm-sans-regular main_sec-1_d-t-1_d-1_d-2_d-1_img-t-3">
                  `;
              }
            });
          }
          //
          vCardJuegoHtml += `
                    </div>

                    <!-- == Contenedor de puntuación == -->
                    <div class="main_sec-1_d-t-1_d-1_d-2_d-2">

                      <!-- == Icono estrella - Tipo 1 == -->
                      <img src="recursos/iconos/icono-estrella_t-1.png" alt="Estalla T-1" class="dm-sans-regular main_sec-1_d-t-1_d-1_d-2_d-2_img-t-1">

                      <!-- == Números de estrellas: totales == -->
                      <p class="dm-sans-bold main_sec-1_d-t-1_d-1_d-2_d-2_p-1">${vJuego.calificacion}</p>

                      <!-- == Números de estrellas: barra == -->
                      <p class="dm-sans-medium main_sec-1_d-t-1_d-1_d-2_d-2_p-2">/</p>

                      <!-- == Números de estrellas: máximo == -->
                      <p class="dm-sans-bold main_sec-1_d-t-1_d-1_d-2_d-2_p-3">5</p>

                    </div>

                  </div>

                  <!-- == Contenedor de descuento y precios == -->
                  <div class="main_sec-1_d-t-1_d-1_d-3">
          `;
          //
          if ( vJuego.descuento
               && vJuego.descuento.porcentaje !== undefined
               && vJuego.descuento.porcentaje !== null )
          {
            vCardJuegoHtml += `
                    <!-- == Contenedor de descuento == -->
                    <div class="main_sec-1_d-t-1_d-1_d-3_d-1">

                      <!-- == Descuento == -->
                      <p class="dm-sans-bold">${vJuego.descuento.porcentaje}%</p>

                    </div>
            `;
          }
          //
          vCardJuegoHtml += `
                    <!-- == Contenedor de precio anterior y actual == -->
                    <div class="main_sec-1_d-t-1_d-1_d-3_d-2">
          `;
          if ( vJuego.precio
               && vJuego.precio.anterior !== undefined 
               && vJuego.precio.anterior !== null )
          {
            vCardJuegoHtml += `
                      <!-- == Precio anterior == -->
                      <p class="dm-sans-medium main_sec-1_d-t-1_d-1_d-3_d-2_p-1">$${separarMilesNumeroString(vJuego.precio.anterior)}</p>
            `;
          }
          //
          vCardJuegoHtml += `
                      <!-- == Precio actual == -->
                      <p class="dm-sans-bold main_sec-1_d-t-1_d-1_d-3_d-2_p-2">$${separarMilesNumeroString(vJuego.precio.actual)}</p>

                    </div>

                  </div>

                  <!-- == Contenedor de enlace Ver y botón Añadir == -->
                  <div class="main_sec-1_d-t-1_d-1_d-4">

                    <!-- == Enlace Ver == -->
                    <a class="main_sec-1_d-t-1_d-1_d-4_a-1">

                      <!-- == Icono Ver == -->
                      <img src="recursos/iconos/icono-ver_t-1.png" alt="ver" class="dm-sans-regular">

                      <!-- == Ver == -->
                      <p class="dm-sans-medium-italic">Ver</p>

                    </a>

                    <!-- == Botón Añadir == -->
                    <button class="main_sec-1_d-t-1_d-1_d-4_button-1">

                      <!-- == Icono Añadir == -->
                      <img src="recursos/iconos/icono-carrito_t-1_e-2_t-2.png" alt="añadir" class="dm-sans-regular">

                      <!-- == Añadir == -->
                      <p class="dm-sans-medium-italic">Añadir</p>

                    </button>

                  </div>

                </div>
          `;
          //
          vCardJuego.innerHTML = vCardJuegoHtml;
          //
          let vBotonAgregar = vCardJuego.querySelector ( 'button' );
          //
          vBotonAgregar.addEventListener ( 'click', ( ) =>
          {
            //
            let vCantidadElementos = carritoAgregarElemento ( vJuego );
            carritoIconoFormatearEstado ( vCantidadElementos );
          });
          //
          vContenedorCardsJuegos.appendChild ( vCardJuego );
        });
      }
      // Entra si la variable vJuegos no es un array o está vacio
      else
      {
        // == Pruebas ==================
        console.log ( 'No es array o está vacio' );
        // =============================
      }
    })
    .catch ( ( vError ) =>
    {
      console.error ( vError, '( Error al obtener información de juegos )' );
    });
  }

  // =============================================================
  
  try
  {
    //
    carritoIconoFormatearEstado ( Object.keys ( JSON.parse ( localStorage.getItem ( 'carrito' ) ) || { } ).length );
    //
    cargarDesdeApi ( );
  }
  catch ( vError ) 
  {
    console.error ( vError );
  }

  // =============================================================  

});