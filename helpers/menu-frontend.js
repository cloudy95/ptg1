const getMenuFrontend = ( role ) =>{

    const menu = [ 

        {
          title:'Clientes, proveedores y rubros',
          icon: 'bi bi-people',
          children: [
            {
              title:'Cliente',
              url:'user/clientes'
            },
            {
              title:'Proveedores',
              url:'user/proveedores'
            },
            {
              title:'Rubros',
              url:'user/rubro'
            }
          ]
        },
       
    
      ]

      if( role === 'administrador' ){

        menu[1] = {
          title:'Compras',
          icon:'bi bi-bag-check-fill',
          children:[
            {
              title:'Crear compra',
              url:'compra/crear-compra'
            },
            {
              title:'Registro de compras',
              url:'compra/registro-compra'
            }
          ]
          
        }
        
        menu[2] = {
          title:'Ventas',
          icon:'bi bi-truck',
          children:[
            {
              title:'Crear venta',
              url:'venta/crear-venta'
            },
            {
              title:'Registro ventas',
              url:'venta/registro-venta'
            }
          ]
          
        }


        menu.push({
            title:'Notas',
            icon:'bi bi-journal-check',
            children:[
              {
                title:'Abonos - Pagos',
                url:'nota/abono-pagos'
              },
              {
                title:'Registro de notas de credito',
                url:'nota/nota-credito'
              },
              {
                title:'Registro de notas de debido',
                url:'nota/nota-debito'
              }
            ]
            
          },
          {
            title:'Cuentas',
            icon:'bi bi-cash',
            children:[
              {
                title:'Cuentas por pagar',
                url:'cuenta/cuenta-pagar'
              },
              {
                title:'Cuentas por cobrar',
                url:'cuenta/cuenta-cobrar'
              }
            ]
            
          },
          { 
            title:'Reportes',
            icon:'bi bi-clipboard-check',
            children:[
              {
                title:'Todos los reportes',
                url:'reporte/all'
              }
            ]
          })

      }else{

        menu[1] = {
          title:'Ventas',
          icon:'bi bi-truck',
          children:[
            {
              title:'Crear venta',
              url:'venta/crear-venta'
            },
            {
              title:'Registro ventas',
              url:'venta/registro-venta'
            }
          ]
          
        }

      }

    return menu;

}

module.exports = {

    getMenuFrontend
}