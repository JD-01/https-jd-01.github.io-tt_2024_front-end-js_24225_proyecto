// =============================================================
// == Funciones globales =======================================

//
function separarMilesNumeroString ( vN, vSeparador = '.' )
{
  return vN.toString ( ).replace ( /\B(?=(\d{3})+(?!\d))/g, vSeparador );
}

//
function carritoIconoFormatearEstado ( vCantidadElementos = 0 )
{
  try
  {
    //
    let vParrafoCantidadElementos =
      document.getElementsByClassName ( 'header_d-2_nav-1_a-1' ) [ 0 ]
              .getElementsByTagName ( 'p' ) [ 0 ];
    // == Pruebas ==================
    //console.log ( typeof vIconoCarrito );
    //console.log ( vIconoCarrito );
    //console.log ( vIconoCarrito.innerHTML );
    // =============================
    //
    vParrafoCantidadElementos.className = 
      ( vCantidadElementos )
      ? 'dm-sans-regular header_d-2_nav-1_a-1_p-1_e-2'
      : 'dm-sans-regular header_d-2_nav-1_a-1_p-1_e-1';
    //
    vParrafoCantidadElementos.innerHTML = vCantidadElementos;
  }
  catch ( vError ) {
    console.error ( vError, '( vParrafoCantidadElementos )' );
  }
}