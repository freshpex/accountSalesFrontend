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
      // Handle the nested data structure from the API
      if (action.payload.success && action.payload.data) {
        state.data.customers = action.payload.data.items || [];
        state.data.metrics = action.payload.data.metrics || initialState.data.metrics;
        state.data.segments = action.payload.data.segments || initialState.data.segments;
        state.data.meta = action.payload.data.meta || initialState.data.meta;
      }
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
    update_customer_segment: (state, action) => {
      const { customerId, oldSegment, newSegment } = action.payload;
      state.data.segments[oldSegment.toLowerCase()]--;
      state.data.segments[newSegment.toLowerCase()]++;
      const customerIndex = state.data.customers.findIndex(c => c.id === customerId);
      if (customerIndex !== -1) {
        state.data.customers[customerIndex].segment = newSegment;
      }
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
  search_customers,
  search_customers_success,
  search_customers_error
} = customerSlice.actions;

export default customerSlice.reducer;
