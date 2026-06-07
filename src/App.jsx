import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, setSearch } from './features/products/productsSlice';
import './App.css';
import debounce from 'lodash/debounce';

function App() {
  const dispatch = useDispatch();
  const { filteredProducts, status, error, search } = useSelector(
    (state) => state.products
  );

 //show all products
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Debounced search function 1000ms delay
  const debouncedSearch = useMemo(
    () =>
      debounce((value) => {
        dispatch(setSearch(value));
      }, 1000), 
    [dispatch]
  );

  // Handle input change
  const handleSearchChange = (e) => {
    debouncedSearch(e.target.value);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Product Search App</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search Product...(name)"
        defaultValue={search} 
        onChange={handleSearchChange}
        style={{ padding: '10px', width: '60%' }}
      />

      {/* Status Messages */}
      {status === 'loading' && <p>Loading...</p>}
      {status === 'error' && <p>Error: {error}...</p>}

      {/* No products found */}
      {filteredProducts.length === 0 && status === 'success' && (
        <p>No products found</p>
      )}

      {/* Products List */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4,1fr)',
          gap: '15px',
          marginTop: '20px',
        }}
      >
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            style={{ border: '1px solid #ccc', padding: '10px' }}
          >
            <img
              src={product.thumbnail}
              width="100%"
              height="200"
              alt={product.title}
            />
            <h3>{product.title}</h3>
            <h6>{product.description}</h6>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
