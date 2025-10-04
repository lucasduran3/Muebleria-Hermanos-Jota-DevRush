import React, { useState, useMemo } from "react";
import ProductList from "../components/ProductList";
import ProductDetail from "../components/ProductDetail";
import products from "../data/products";
import Banner from "../components/Banner";

export default function Catalog({ onSelectProducto, onBack, onAddToCart }) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const productosFiltrados = useMemo(
    () =>
      products.filter((p) =>
        p.nombre.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  return (
    <>
      {!selected ? (
        <main data-bg="light">
          <Banner titulo="CATÁLOGO DE PRODUCTOS" ariaLabel="banner-catálogo">
            <div className="form-group">
              <input
                type="text"
                id="searchInput"
                placeholder="🔍 Buscar productos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </Banner>

          <section className="catalogo">
            <ProductList
              productos={productosFiltrados}
              onSelect={(prod) =>
                onSelectProducto ? onSelectProducto(prod) : setSelected(prod)
              } // cuando clickeas pasa a detalle
            />
          </section>
        </main>
      ) : (
        // Vista detalle
        <ProductDetail
          producto={selected}
          onClose={() => setSelected(null)} // vuelve al catálogo
          onAddToCart={onAddToCart}
        />
      )}
    </>
  );
}
