import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ui: {
    loading: false,
    error: null,
    success: false,
    purchaseStatus: null,
    escrowStatus: null
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
  },
  transactionProducts: [],
  loading: false,
  error: null
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    fetch_products: (state) => {
      state.ui.loading = true;
      state.ui.error = null;
    },
    fetch_products_transaction: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetch_products_success: (state, action) => {
      state.ui.loading = false;
      state.ui.success = true;
      
      // Ensure products array is properly set
      state.data.products = Array.isArray(action.payload.items) 
        ? action.payload.items 
        : [];
      
      // Update stats
      state.data.stats = {
        ...initialState.data.stats,
        ...action.payload.stats
      };
      
      // Update meta
      state.data.meta = {
        ...initialState.data.meta,
        ...action.payload.meta
      };
      
      // Update table settings
      state.tableSettings = {
        ...state.tableSettings,
        currentPage: action.payload.meta?.currentPage || 1,
        totalPages: action.payload.meta?.totalPages || 1,
        totalItems: action.payload.meta?.totalItems || 0
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

      // Ensure we have valid data
      if (action.payload) {
        const productType = action.payload.type?.toLowerCase();
        
        state.data.products.unshift({
          ...action.payload,
          type: productType
        });

        if (productType && state.data.stats[productType] !== undefined) {
          state.data.stats[productType]++;
          state.data.stats.total++;
        }
      }
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
      const index = state.data.products.findIndex(p => p.id === action.payload._id || p.id === action.payload.id);
      if (index !== -1) {
        const oldType = state.data.products[index].type;
        const newType = action.payload.type;
        if (oldType !== newType) {
          state.data.stats[oldType]--;
          state.data.stats[newType]++;
        }
        // Ensure consistent id format
        state.data.products[index] = {
          ...action.payload,
          id: action.payload._id || action.payload.id
        };
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
    fetch_products_transaction_success: (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.error = null;
    },
    fetch_products_transaction_error: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.products = [];
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
    },
    clear_product_error: (state) => {
      state.ui.error = null;
    },
    reset_product_state: () => initialState,
    set_product_filter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    set_product_sort: (state, action) => {
      state.tableSettings.sortBy = action.payload.sortBy;
      state.tableSettings.sortOrder = action.payload.sortOrder;
    },
    fetch_transaction_products: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetch_transaction_products_success: (state, action) => {
      state.loading = false;
      state.transactionProducts = action.payload;
      state.error = null;
    },
    fetch_transaction_products_error: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.transactionProducts = [];
    },
    fetch_single_product: (state) => {
      state.ui.loading = true;
      state.ui.error = null;
    },
    fetch_single_product_success: (state, action) => {
      state.ui.loading = false;
      state.selectedProduct = action.payload;
    },
    fetch_single_product_error: (state, action) => {
      state.ui.loading = false;
      state.ui.error = action.payload;
    },
    clear_selected_product: (state) => {
      state.selectedProduct = null;
    },
    initiate_purchase: (state) => {
      state.ui.loading = true;
      state.ui.error = null;
    },
    initiate_purchase_success: (state) => {
      state.ui.loading = false;
      state.ui.success = true;
    },
    initiate_purchase_error: (state, action) => {
      state.ui.loading = false;
      state.ui.error = action.payload;
    },
    request_escrow: (state) => {
      state.ui.loading = true;
      state.ui.error = null;
    },
    request_escrow_success: (state, action) => {
      state.ui.loading = false;
      state.ui.success = true;
      state.escrowData = {
        escrowId: action.payload.escrowId,
        success: action.payload.success
      };
    },
    request_escrow_error: (state, action) => {
      state.ui.loading = false;
      state.ui.error = action.payload;
    },
    set_purchase_status: (state, action) => {
      state.ui.purchaseStatus = action.payload;
    },
    set_escrow_status: (state, action) => {
      state.ui.escrowStatus = action.payload;
    },
    clear_purchase_status: (state) => {
      state.ui.purchaseStatus = null;
    },
    clear_escrow_status: (state) => {
      state.ui.escrowStatus = null;
    }
  }
});

export const {
  fetch_products,
  fetch_products_success,
  fetch_products_error,
  fetch_products_transaction,
  fetch_products_transaction_error,
  fetch_products_transaction_success,
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
  select_table_items,
  clear_product_error,
  reset_product_state,
  set_product_filter,
  set_product_sort,
  fetch_transaction_products,
  fetch_transaction_products_success,
fetch_transaction_products_error,
  fetch_single_product,
  fetch_single_product_success,
  fetch_single_product_error,
  clear_selected_product,
  initiate_purchase,
  initiate_purchase_success,
  initiate_purchase_error,
  request_escrow,
  request_escrow_success,
  request_escrow_error,
  set_purchase_status,
  set_escrow_status,
  clear_purchase_status,
  clear_escrow_status
} = productSlice.actions;

export default productSlice.reducer;
