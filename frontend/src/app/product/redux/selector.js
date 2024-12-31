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
