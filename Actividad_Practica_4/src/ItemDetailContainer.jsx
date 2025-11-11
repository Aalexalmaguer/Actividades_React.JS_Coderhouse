import React, { useState, useEffect } from 'react';
import ItemDetail from './ItemDetail.jsx';


const getItem = () => {
  // Esta función debe retornar la promesa que resuelve con delay
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id: 1,
                title: 'Producto Ejemplo',
                description: 'Descripción del producto.',
                price: 100,
                imageUrl: 'https://assets.eleconomista.net/__export/1699379235176/sites/prensagrafica/img/2023/11/07/autos_del_futuro.png_554688468.png',
            });
        }, 2000);
    });
};

function ItemDetailContainer() {
    const [item, setItem] = useState(null);

    useEffect(() => {
        getItem().then((item) => setItem(item));
    }, []);

    return (
        <div>
            {item ? <ItemDetail item={item} /> : <p>Cargando detalles del producto...</p>}
        </div>
    );
}

export default ItemDetailContainer;