import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ui: {
    loading: false,
    error: null,
    success: false
  },
  data: {
    products: [],
    stats: {
      instagram: 0,
      facebook: 0,
      twitter: 0,
      whatsapp: 0,
      total: 0
    },
    meta: {
      currentPage: 1,
      totalPages: 1,
      totalItems: 0
    }
  },
  selectedProduct: null,
  tableSettings: {
    currentPage: 1,
    pageSize: 10,
    totalPages: 1,
    totalItems: 0,
    selectedItems: [],
    sortBy: null,
    sortOrder: 'asc'
  }
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    fetch_products: (state) => {
      state.ui.loading = true;
      state.ui.error = null;
    },
    fetch_products_success: (state, action) => {
      state.ui.loading = false;
      state.ui.success = true;
      state.data.products = action.payload.items;
      state.data.stats = action.payload.stats;
      state.data.meta = action.payload.meta;
      state.tableSettings = {
        ...state.tableSettings,
        currentPage: action.payload.meta.currentPage || 1,
        totalPages: action.payload.meta.totalPages || 1,
        totalItems: action.payload.meta.totalItems || 0
      };
    },
    fetch_products_error: (state, action) => {
      state.ui.loading = false;
      state.ui.error = action.payload;
    },
    add_product: (state) => {
      state.ui.loading = true;
      state.ui.error = null;
    },
    add_product_success: (state, action) => {
      state.ui.loading = false;
      state.ui.success = true;
      state.data.products.unshift(action.payload);
      state.data.stats[action.payload.type]++;
      state.data.stats.total++;
    },
    add_product_error: (state, action) => {
      state.ui.loading = false;
      state.ui.error = action.payload;
    },
    update_product: (state) => {
      state.ui.loading = true;
      state.ui.error = null;
    },
    update_product_success: (state, action) => {
      state.ui.loading = false;
      state.ui.success = true;
      const index = state.data.products.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        const oldType = state.data.products[index].type;
        const newType = action.payload.type;
        if (oldType !== newType) {
          state.data.stats[oldType]--;
          state.data.stats[newType]++;
        }
        state.data.products[index] = action.payload;
      }
    },
    update_product_error: (state, action) => {
      state.ui.loading = false;
      state.ui.error = action.payload;
    },
    delete_product: (state) => {
      state.ui.loading = true;
      state.ui.error = null;
    },
    delete_product_success: (state, action) => {
      state.ui.loading = false;
      state.ui.success = true;
      const product = state.data.products.find(p => p.id === action.payload);
      if (product) {
        state.data.stats[product.type]--;
        state.data.stats.total--;
      }
      state.data.products = state.data.products.filter(p => p.id !== action.payload);
    },
    delete_product_error: (state, action) => {
      state.ui.loading = false;
      state.ui.error = action.payload;
    },
    set_selected_product: (state, action) => {
      state.selectedProduct = action.payload;
    },
    update_table_settings: (state, action) => {
      state.tableSettings = {
        ...state.tableSettings,
        ...action.payload
      };
    },
    select_table_items: (state, action) => {
      state.tableSettings.selectedItems = action.payload;
    }
  }
});

export const {
  fetch_products,
  fetch_products_success,
  fetch_products_error,
  add_product,
  add_product_success,
  add_product_error,
  update_product,
  update_product_success,
  update_product_error,
  delete_product,
  delete_product_success,
  delete_product_error,
  set_selected_product,
  update_table_settings,
  select_table_items
} = productSlice.actions;

export default productSlice.reducer;
