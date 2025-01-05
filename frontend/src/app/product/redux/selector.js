import { createSelector } from "@reduxjs/toolkit";

const productState = (state) => state.product;

export const getProducts = createSelector(
  productState,
  (state) => state.data.products
);

export const getProductStats = createSelector(
  productState,
  (state) => state.data.stats
);

export const getProductMeta = createSelector(
  productState,
  (state) => state.data.meta
);

export const getLoading = createSelector(
  productState,
  (state) => state.ui.loading
);

export const getError = createSelector(
  productState,
  (state) => state.ui.error
);

export const getSuccess = createSelector(
  productState,
  (state) => state.ui.success
);

// Platform-specific selectors
export const getInstagramProducts = createSelector(
  getProducts,
  (products) => products.filter(p => p.type === 'instagram')
);

export const getFacebookProducts = createSelector(
  getProducts,
  (products) => products.filter(p => p.type === 'facebook')
);

export const getTwitterProducts = createSelector(
  getProducts,
  (products) => products.filter(p => p.type === 'twitter')
);

export const getWhatsappProducts = createSelector(
  getProducts,
  (products) => products.filter(p => p.type === 'whatsapp')
);

export const getTableSettings = createSelector(
  productState,
  (state) => state.tableSettings
);

export const getSelectedItems = createSelector(
  getTableSettings,
  (settings) => settings.selectedItems
);

export const getCurrentPage = createSelector(
  getTableSettings,
  (settings) => settings.currentPage || 1
);

export const getPageSize = createSelector(
  getTableSettings,
  (settings) => settings.pageSize || 10
);

export const getSelectedProduct = createSelector(
  productState,
  (state) => state.selectedProduct
);

// Platform-specific filtered selectors
export const getFilteredProducts = createSelector(
  [getProducts, (_, filters) => filters],
  (products, filters) => {
    return products.filter(product => {
      const matchesSearch = !filters.search || 
        product.username.toLowerCase().includes(filters.search.toLowerCase()) ||
        product.about.toLowerCase().includes(filters.search.toLowerCase());
        
      const matchesStatus = !filters.status || product.status === filters.status;
      const matchesType = !filters.type || product.type === filters.type;
      
      return matchesSearch && matchesStatus && matchesType;
    });
  }
);

export const getTransactionProducts = createSelector(
  productState,
  state => state.transactionProducts
);

export const getProductsLoading = createSelector(
  productState,
  state => state.loading
);
