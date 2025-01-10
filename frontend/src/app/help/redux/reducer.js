import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ui: {
    loading: false,
    error: null,
    success: false
  },
  data: {
    tickets: [],
    notifications: [],
    stats: {
      open: 0,
      pending: 0,
      resolved: 0,
      total: 0
    },
    meta: {
      currentPage: 1,
      totalPages: 1,
      totalItems: 0
    }
  }
};

export const helpSlice = createSlice({
  name: "help",
  initialState,
  reducers: {
    fetch_tickets: (state) => {
      state.ui.loading = true;
      state.ui.error = null;
    },
    fetch_tickets_success: (state, action) => {
      state.ui.loading = false;
      state.ui.success = true;
      state.data.tickets = action.payload.tickets || [];
      state.data.notifications = action.payload.notifications || [];
      state.data.stats = action.payload.stats || {
        open: 0,
        pending: 0,
        resolved: 0,
        total: 0
      };
      state.data.meta = action.payload.meta || {
        currentPage: 1,
        totalPages: 1,
        totalItems: 0
      };
    },
    fetch_tickets_error: (state, action) => {
      state.ui.loading = false;
      state.ui.error = action.payload;
    },
    create_ticket: (state) => {
      state.ui.loading = true;
      state.ui.error = null;
    },
    create_ticket_success: (state, action) => {
      state.ui.loading = false;
      state.ui.success = true;
      state.data.tickets.unshift(action.payload);
      state.data.stats.open++;
      state.data.stats.total++;
    },
    create_ticket_error: (state, action) => {
      state.ui.loading = false;
      state.ui.error = action.payload;
    },
    add_response: (state) => {
      state.ui.loading = true;
    },
    add_response_success: (state, action) => {
      state.ui.loading = false;
      const ticket = state.data.tickets.find(t => t.id === action.payload.ticketId);
      if (ticket) {
        ticket.responses.push(action.payload.response);
      }
    },
    add_response_error: (state, action) => {
      state.ui.loading = false;
      state.ui.error = action.payload;
    },
    update_ticket_status: (state, action) => {
      const { ticketId, status } = action.payload;
      const ticket = state.data.tickets.find(t => t.id === ticketId);
      if (ticket) {
        state.data.stats[ticket.status.toLowerCase()]--;
        state.data.stats[status.toLowerCase()]++;
        ticket.status = status;
      }
    },
    mark_notification_read: (state, action) => {
      const notification = state.data.notifications.find(n => n._id === action.payload);
      if (notification) {
        notification.read = true;
      }
    }
  }
});

export const {
  fetch_tickets,
  fetch_tickets_success,
  fetch_tickets_error,
  create_ticket,
  create_ticket_success,
  create_ticket_error,
  add_response,
  add_response_success,
  add_response_error,
  update_ticket_status,
  mark_notification_read
} = helpSlice.actions;

export default helpSlice.reducer;
