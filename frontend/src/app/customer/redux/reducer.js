import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ui: {
    loading: false,
    error: null,
    success: false
  },
  data: {
    customers: [],
    metrics: {
      totalCustomers: 0,
      activeCustomers: 0,
      newCustomers: 0,
      churnRate: 0
    },
    segments: {
      platinum: 0,
      gold: 0,
      silver: 0,
      bronze: 0
    },
    recentActivity: [],
    meta: {
      currentPage: 1,
      totalPages: 1,
      totalItems: 0
    }
  }
};

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    fetch_customers: (state) => {
      state.ui.loading = true;
      state.ui.error = null;
      if (!state.data) {
        state.data = initialState.data;
      }
    },
    fetch_customers_success: (state, action) => {
      state.ui.loading = false;
      state.ui.success = true;
      state.data = {
        ...state.data,
        customers: action.payload.customers || [],
        metrics: action.payload.metrics || initialState.data.metrics,
        segments: action.payload.segments || initialState.data.segments,
        meta: action.payload.meta || initialState.data.meta
      };
    },
    fetch_customers_error: (state, action) => {
      state.ui.loading = false;
      state.ui.error = action.payload;
    },
    search_customers: (state) => {
      state.ui.loading = true;
      state.ui.error = null;
    },
    search_customers_success: (state, action) => {
      state.ui.loading = false;
      state.ui.success = true;
      state.data.customers = action.payload.items;
      state.data.metrics = action.payload.metrics;
      state.data.segments = action.payload.segments;
      state.data.meta = action.payload.meta;
    },
    search_customers_error: (state, action) => {
      state.ui.loading = false;
      state.ui.error = action.payload;
    },
    fetch_customer_activity: (state) => {
      state.ui.loading = true;
    },
    fetch_customer_activity_success: (state, action) => {
      state.ui.loading = false;
      state.data.recentActivity = action.payload;
    },
    fetch_customer_activity_error: (state, action) => {
      state.ui.loading = false;
      state.ui.error = action.payload;
    },
    add_customer: (state) => {
      state.ui.loading = true;
    },
    add_customer_success: (state, action) => {
      state.ui.loading = false;
      state.ui.success = true;
      if (action.payload.success) {
        const customerData = action.payload.data;
        state.data.customers.unshift(customerData);
        state.data.metrics.totalCustomers++;
        state.data.metrics.newCustomers++;
        state.data.segments[customerData.segment.toLowerCase()]++;
      }
    },
    add_customer_error: (state, action) => {
      state.ui.loading = false;
      state.ui.error = action.payload;
    },
    update_customer_segment: (state) => {
      state.ui.loading = true;
      state.ui.error = null;
    },
    update_segment_success: (state, action) => {
      state.ui.loading = false;
      state.ui.error = null;
      
      // Update the customer in the list
      const customerIndex = state.data.customers.findIndex(
        c => c._id === action.payload.customer._id
      );
      
      if (customerIndex !== -1) {
        state.data.customers[customerIndex] = action.payload.customer;
      }
      
      // Update segment counts
      state.data.segments = action.payload.segments;
    },
    update_segment_error: (state, action) => {
      state.ui.loading = false;
      state.ui.error = action.payload;
    }
  }
});

export const {
  fetch_customers,
  fetch_customers_success,
  fetch_customers_error,
  fetch_customer_activity,
  fetch_customer_activity_success,
  fetch_customer_activity_error,
  add_customer,
  add_customer_success,
  add_customer_error,
  update_customer_segment,
  update_segment_success,
  update_segment_error,
  search_customers,
  search_customers_success,
  search_customers_error
} = customerSlice.actions;

export default customerSlice.reducer;
