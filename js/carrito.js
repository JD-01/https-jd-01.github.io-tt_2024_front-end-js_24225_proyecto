// =============================================================
// == Carrito ==================================================

document.addEventListener ( 'DOMContentLoaded', ( ) =>
{
  //
  function carritoElementosFormatearEstado ( vCantidadElementos = 0 )
  {
    try
    {
      //
      let vSpanCantidadElementos = 
        document.getElementsByClassName ( 'main_sec-1_d-1_d-1' ) [ 0 ]
                .getElementsByTagName ( 'p' ) [ 0 ]
                .getElementsByClassName ( 'span-2' ) [ 0 ];
      //
      vSpanCantidadElementos.className = 
        ( vCantidadElementos )
        ? 'dm-sans-bold span-2'
        : 'dm-sans-regular span-2';
      //
      vSpanCantidadElementos.innerHTML = vCantidadElementos;
    }
    catch ( vError ) {
      console.error ( vError, '( vSpanCantidadElementos )' );
    }
  }

  //
  function carritoFormatearEstadoVacio ( )
  {
    try
    {
      //
      let vContenedorCarritoElementos =
        document.getElementsByClassName ( 'main_sec-1_d-1' ) [ 0 ];
      //
      let vContenedorTotal =
        document.getElementsByClassName ( 'main_sec-1_d-1_d-3' ) [ 0 ];
      //
      let vContenedorTotalMontoBotonPagar =
        document.getElementsByClassName ( 'main_sec-1_d-2' ) [ 0 ];
      //
      let vContenedorCarritoVacio =
        document.getElementsByClassName ( 'main_sec-1_d-1_d-2' ) [ 0 ];
      //
      vContenedorCarritoElementos.className     = 'main_sec-1_d-1 main_sec-1_d-1_e-2';
      vContenedorTotal.className                = 'main_sec-1_d-1_d-3 g__display_none';
      vContenedorTotalMontoBotonPagar.className = 'main_sec-1_d-2 g__display_none';
      vContenedorCarritoVacio.className         = 'main_sec-1_d-1_d-2';
    }
    catch ( vError )
    {
      console.error ( vError );
    }
  }

  //
  function carritoTotalesFormatearValores ( vTotal )
  {
    try
    {
      //
      let vContenedorTotal =
        document.getElementsByClassName ( 'main_sec-1_d-1_d-3' ) [ 0 ]
                .getElementsByTagName ( 'p' ) [ 0 ]
                .getElementsByTagName ( 'span') [ 1 ];
      //
      let vContenedorTotalMontoBotonPagar =
        document.getElementsByClassName ( 'main_sec-1_d-2_d-1' ) [ 0 ]
                .getElementsByTagName ( 'p' ) [ 0 ]
                .getElementsByTagName ( 'span') [ 1 ];
      //
      vTotal = separarMilesNumeroString ( vTotal );
      vContenedorTotal.innerHTML = '$' + vTotal;
      vContenedorTotalMontoBotonPagar.innerHTML = '$' + vTotal;
    }
    catch ( vError )
    {
      console.error ( vError );
    }
  }

  //
  function carritoCalcularTotal ( vCarrito )
  {
    //
    let vTotal = 0;
    //
    for ( let vElemento in vCarrito )
    {
      vTotal += vCarrito [ vElemento ].precio.actual;
    }
    //
    return vTotal;
  }

  //
  function carritoEliminarElemento ( vBoton )
  {
    try
    {
      //
      let vCarrito = JSON.parse ( localStorage.getItem ( 'carrito' ) ) || { };
      //
      if ( vCarrito.hasOwnProperty ( vBoton.vContenedorBaseId ) )
      {
        //
        delete vCarrito [ vBoton.vContenedorBaseId ];
        localStorage.setItem ( 'carrito', JSON.stringify ( vCarrito ) );
        //
        let vCantidadElementos = Object.keys ( vCarrito ).length;
        //
        let vTotal = carritoCalcularTotal ( vCarrito );
        //
        let vContenedorElemento = document.getElementById ( vBoton.vContenedorBaseId );
        vContenedorElemento.parentNode.removeChild ( vContenedorElemento );
        //
        carritoIconoFormatearEstado ( vCantidadElementos );
        //
        carritoElementosFormatearEstado ( vCantidadElementos );
        //
        carritoTotalesFormatearValores ( vTotal );
        //
        if ( ! vTotal )
        {
          carritoFormatearEstadoVacio ( );
        }
      }
    }
    catch ( vError)
    {
      console.error ( vError );
    }
  }

  //
  function desplegarElementos ( )
  {
    try
    {
      //
      let vCarrito = JSON.parse ( localStorage.getItem ( 'carrito' ) ) || { };
      //
      let vClavesElementos = Object.keys ( vCarrito ).reverse ( );
      //
      let vCantidadElementos = vClavesElementos.length;
      //
      let vTotal = 0;
      //
      carritoIconoFormatearEstado ( vCantidadElementos );
      //
      carritoElementosFormatearEstado ( vCantidadElementos );
      //
      if ( vCantidadElementos )
      {
        //
        let vContenedorCarritoCantidadElementos =
          document.getElementsByClassName ( 'main_sec-1_d-1_d-1' ) [ 0 ];
        //
        vClavesElementos.forEach ( vClaveElemento =>
        {
          // <!-- == Contenedor (Tipo 1) de elemento: imagen, nombre, descuento, precio del juego y botón Eliminar == -->
          // <div id="${vCarrito [ vClaveElemento ].id}" class="main_sec-1_d-1_d-t-1"> ... </div>
          let vContenedorElemento = document.createElement ( 'div' );
          vContenedorElemento.id = vCarrito [ vClaveElemento ].id;
          vContenedorElemento.className = 'main_sec-1_d-1_d-t-1';
          //
          let vElementoHtml = `
                  <!-- == Contenedor de imagen del juego == -->
                  <div class="main_sec-1_d-1_d-t-1_d-1">

                    <!-- == Imagen del juego == -->
                    <img src="${vCarrito [ vClaveElemento ].imagen}" alt="${vCarrito [ vClaveElemento ].nombre}">

                  </div>

                  <!-- == Contenedor de nombre, descuento, precio del juego y botón Eliminar == -->
                  <div class="main_sec-1_d-1_d-t-1_d-2">

                    <!-- == Contenedor de nombre, descuento y precio del juego == -->
                    <div class="main_sec-1_d-1_d-t-1_d-2_d-1">

                      <!-- == Contenedor de nombre del juego == -->
                      <div class="main_sec-1_d-1_d-t-1_d-2_d-1_d-1">

                        <!-- == Nombre del juego == -->
                        <p class="dm-sans-medium">${vCarrito [ vClaveElemento ].nombre}</p>

                      </div>

                      <!-- == Contenedor de descuento y precio del juego == -->
                      <div class="main_sec-1_d-1_d-t-1_d-2_d-1_d-2">`
          ;
          //
          if ( vCarrito [ vClaveElemento ].descuento )
          {
            //
            vElementoHtml += `
                        <!-- == Contenedor de descripción y porcentaje del descuento == -->
                        <div class="main_sec-1_d-1_d-t-1_d-2_d-1_d-2_d-1">`
            ;
            //
            if ( vCarrito [ vClaveElemento ].descuento.descripcion !== undefined
                 && vCarrito [ vClaveElemento ].descuento.descripcion !== null )
            {
              vElementoHtml += `
                          <!-- == Descripcion del descuento == -->
                          <p class="dm-sans-bold-italic main_sec-1_d-1_d-t-1_d-2_d-1_d-2_d-1_p-1">${vCarrito [ vClaveElemento ].descuento.descripcion}</p>`
              ;
            }
            //
            if ( vCarrito [ vClaveElemento ].descuento.porcentaje !== undefined
                 && vCarrito [ vClaveElemento ].descuento.porcentaje !== null )
            {
              vElementoHtml +=`
                          <!-- == Contenedor del porcentaje de descuento == -->
                          <div class="main_sec-1_d-1_d-t-1_d-2_d-1_d-2_d-1_d-1">

                            <!-- == Porcentaje de descuento == -->
                            <p class="dm-sans-bold">${vCarrito [ vClaveElemento ].descuento.porcentaje}%</p>

                          </div>`
              ;
            }
            //
            vElementoHtml += `
                        </div>`
            ;
          }
          //
          if ( vCarrito [ vClaveElemento ].precio
               && vCarrito [ vClaveElemento ].precio.anterior !== undefined
               && vCarrito [ vClaveElemento ].precio.anterior !== null )
          {
            //
            vElementoHtml += `
                        <!-- == Precio anterior == -->
                        <p class="dm-sans-medium main_sec-1_d-1_d-t-1_d-2_d-1_d-2_p-1">$${separarMilesNumeroString ( vCarrito [ vClaveElemento ].precio.anterior )}</p>`
            ;
          }
          //
          vElementoHtml += `
                        <!-- == Precio actual == -->
                        <p class="dm-sans-bold main_sec-1_d-1_d-t-1_d-2_d-1_d-2_p-2">$${separarMilesNumeroString ( vCarrito [ vClaveElemento ].precio.actual )}</p>

                      </div>

                    </div>

                    <!-- == Botón Eliminar == -->
                    <button class="main_sec-1_d-1_d-t-1_d-2_d-2_button-1">

                      <!-- == Icono eliminar == -->
                      <img src="recursos/iconos/icono-carrito_t-1_e-3_t-2.png" alt="Eliminar" class="dm-sans-regular">

                      <!-- == Eliminar == -->
                      <p class="dm-sans-medium">Eliminar</p>

                    </button>

                  </div>
          `;
          //
          vContenedorElemento.innerHTML = vElementoHtml;
          //
          let vBotonEliminar = vContenedorElemento.querySelector ( 'button' );
          vBotonEliminar.vContenedorBaseId = vContenedorElemento.id;
          //
          vBotonEliminar.addEventListener ( 'click', ( ) =>
          {
            carritoEliminarElemento ( vBotonEliminar );
          });
          //
          vContenedorCarritoCantidadElementos.insertAdjacentElement ( 'afterend', vContenedorElemento );
          //
          vTotal += vCarrito [ vClaveElemento ].precio.actual;
        });
        //
        carritoTotalesFormatearValores ( vTotal );
      }
      //
      else
      {
        carritoFormatearEstadoVacio ( );
      }
    }
    catch ( vError )
    {
      console.error ( vError );
    }
  }
  // =============================================================

  //
  desplegarElementos ( );

  // =============================================================

});