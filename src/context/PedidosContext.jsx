import React, { createContext, useState, useContext, useEffect } from 'react';

// 1. Creamos el Contexto para los pedidos
const PedidosContext = createContext(null);

// 2. Pedidos iniciales de ejemplo para que el panel no arranque vacío
const pedidosIniciales = [
    { id: 101, cliente: 'Mariana Gomez', detalle: 'Gel Limpiador Facial (x1)', total: 45000, estado: 'Pendiente' },
    { id: 102, cliente: 'Carlos Ruiz', detalle: 'Molde Facial de Hielo (x2)', total: 56000, estado: 'Completado' }
];

// 3. Proveedor del Contexto que envolverá la aplicación
export const PedidosProvider = ({ children }) => {
    // Cargamos los pedidos guardados en localStorage o usamos los iniciales
    const [pedidos, setPedidos] = useState(() => {
        const guardados = localStorage.getItem('luminaria_pedidos');
        return guardados ? JSON.parse(guardados) : pedidosIniciales;
    });

    // Cada vez que cambie la lista de pedidos, se guarda automáticamente en localStorage
    useEffect(() => {
        localStorage.setItem('luminaria_pedidos', JSON.stringify(pedidos));
    }, [pedidos]);

    // Función que usará el CLIENTE al finalizar una compra
    const registrarPedido = (nombreCliente, itemsCarrito, totalCompra) => {
        // Agrupamos los nombres de los productos comprados en un texto resumen
        const resumenProductos = itemsCarrito.map(item => item.nombre).join(', ');

        const nuevoPedido = {
            id: Math.floor(100 + Math.random() * 900), // Generamos un número de orden corto
            cliente: nombreCliente,
            detalle: resumenProductos,
            total: totalCompra,
            estado: 'Pendiente' // Todo pedido nuevo entra como Pendiente
        };

        // Agregamos el nuevo pedido al principio de la lista
        setPedidos((prev) => [nuevoPedido, ...prev]);
    };

    // Función que usará el VENDEDOR para cambiar el estado (Pendiente <-> Completado)
    const toggleEstadoPedido = (id) => {
        setPedidos((prev) =>
            prev.map((p) =>
                p.id === id ? { ...p, estado: p.estado === 'Pendiente' ? 'Completado' : 'Pendiente' } : p
            )
        );
    };

    return (
        <PedidosContext.Provider value={{ pedidos, registrarPedido, toggleEstadoPedido }}>
            {children}
        </PedidosContext.Provider>
    );
};

// Hook personalizado para usar los pedidos en cualquier página
export const usePedidos = () => useContext(PedidosContext);