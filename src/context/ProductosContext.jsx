import React, { createContext, useState, useContext, useEffect } from 'react';

// 1. Creamos el Contexto para los productos
const ProductosContext = createContext(null);

// 2. Lista inicial de productos por defecto para la tienda
const productosIniciales = [
    { id: 1, nombre: 'Gel Limpiador Facial', precio: 45000, estado: 'Activo', desc: 'Limpieza profunda con extracto de manzanilla.', img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&auto=format&fit=crop&q=60' },
    { id: 2, nombre: 'Molde Facial de Hielo', precio: 28000, estado: 'Activo', desc: 'Ideal para reducir poros y desinflamar el rostro.', img: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&auto=format&fit=crop&q=60' },
    { id: 3, nombre: 'Mascarilla Hidratante', precio: 15000, estado: 'Activo', desc: 'Tela nutritiva con ácido hialurónico.', img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&auto=format&fit=crop&q=60' },
    { id: 4, nombre: 'Sérum Facial Antioxidante', precio: 62000, estado: 'Activo', desc: 'Vitamina C pura para iluminar la piel.', img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&auto=format&fit=crop&q=60' }
];

// 3. Proveedor del Contexto que envolverá la aplicación
export const ProductosProvider = ({ children }) => {
    // Cargamos los productos desde localStorage del navegador, o usamos los iniciales si está vacío
    const [productos, setProductos] = useState(() => {
        const guardados = localStorage.getItem('luminaria_productos');
        return guardados ? JSON.parse(guardados) : productosIniciales;
    });

    // Cada vez que la lista de productos cambie, se actualiza automáticamente en localStorage
    useEffect(() => {
        localStorage.setItem('luminaria_productos', JSON.stringify(productos));
    }, [productos]);

    // Función para añadir un nuevo producto al estado y guardarlo
    const agregarProducto = (nuevoProd) => {
        setProductos((prev) => [...prev, nuevoProd]);
    };

    // Función para cambiar el estado de un producto entre 'Activo' y 'Suspendido'
    const toggleEstadoProducto = (id) => {
        setProductos((prev) =>
            prev.map((p) =>
                p.id === id ? { ...p, estado: p.estado === 'Activo' ? 'Suspendido' : 'Activo' } : p
            )
        );
    };

    return (
        <ProductosContext.Provider value={{ productos, agregarProducto, toggleEstadoProducto }}>
            {children}
        </ProductosContext.Provider>
    );
};

// Hook personalizado para consumir el contexto de productos fácilmente
export const useProductos = () => useContext(ProductosContext);