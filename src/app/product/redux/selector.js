import { createSelector } from "@reduxjs/toolkit";

const productState = (state) => state.product;

export const getProducts = createSelector(
  productState,
  (state) => {
    return state?.data?.products || [];
  }
);

export const getAllProducts = createSelector(
  getProducts,
  (products) => {
    if (!Array.isArray(products)) {
      console.warn('Products is not an array:', products);
      return [];
    }
    
    return products.map(product => ({
      ...product,
      type: product.type?.toLowerCase()
    }));
  }
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

export const getInstagramProducts = createSelector(
  getProducts,
  (products) => {
    if (!Array.isArray(products)) {
      console.warn('Products is not an array:', products);
      return [];
    }
    const filtered = products.filter(p => p?.type?.toLowerCase() === 'instagram');
    return filtered;
  }
);

export const getFacebookProducts = createSelector(
  getProducts,
  (products) => {
    if (!Array.isArray(products)) return [];
    return products.filter(p => p?.type?.toLowerCase() === 'facebook');
  }
);

export const getTwitterProducts = createSelector(
  getProducts,
  (products) => {
    if (!Array.isArray(products)) return [];
    return products.filter(p => p?.type?.toLowerCase() === 'twitter');
  }
);

export const getWhatsappProducts = createSelector(
  getProducts,
  (products) => {
    if (!Array.isArray(products)) return [];
    return products.filter(p => p?.type?.toLowerCase() === 'whatsapp');
  }
);

export const getYoutubeProducts = createSelector(
  getProducts,
  (products) => {
    if (!Array.isArray(products)) return [];
    return products.filter(p => p?.type?.toLowerCase() === 'youtube');
  }
);

export const getTiktokProducts = createSelector(
  getProducts,
  (products) => {
    if (!Array.isArray(products)) return [];
    return products.filter(p => p?.type?.toLowerCase() === 'tiktok');
  }
);

export const getForeignNumberProducts = createSelector(
  getProducts,
  (products) => {
    if (!Array.isArray(products)) return [];
    return products.filter(p => p?.type?.toLowerCase() === 'foreignnumber');
  }
);

export const getWhatsappNumberProducts = createSelector(
  getProducts,
  (products) => {
    if (!Array.isArray(products)) return [];
    return products.filter(p => p?.type?.toLowerCase() === 'whatsappnumber');
  }
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
  (state) => state.selectedProduct || null
);

export const getProductDetailLoading = createSelector(
  productState,
  (state) => state.ui.loading
);

export const getProductDetailError = createSelector(
  productState,
  (state) => state.ui.error
);

export const getProductPurchaseStatus = createSelector(
  productState,
  (state) => ({
    loading: state.ui.loading,
    error: state.ui.error,
    success: state.ui.success
  })
);

export const getEscrowStatus = createSelector(
  productState,
  (state) => ({
    loading: state.ui.loading,
    error: state.ui.error,
    success: state.ui.success,
    escrowData: state.escrowData
  })
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

export const getPlatformStats = createSelector(
  [productState],
  (state) => ({
    instagram: state.data.stats.instagram || 0,
    facebook: state.data.stats.facebook || 0,
    twitter: state.data.stats.twitter || 0,
    whatsapp: state.data.stats.whatsapp || 0,
    youtube: state.data.stats.youtube || 0,
    tiktok: state.data.stats.tiktok || 0,
    foreignnumber: state.data.stats.foreignnumber || 0,
    whatsappnumber: state.data.stats.whatsappnumber || 0,
    total: state.data.stats.total || 0
  })
);

export const getPurchasedCredentials = createSelector(
  productState,
  state => ({
    loading: state.ui.loading,
    error: state.ui.error,
    data: state.ui.data
  })
);
