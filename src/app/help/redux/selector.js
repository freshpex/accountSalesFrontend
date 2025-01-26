import { createSelector } from "@reduxjs/toolkit";

const helpState = (state) => state.help;

export const getTickets = createSelector(
  helpState,
  (state) => state.data.tickets,
);

export const getTicketStats = createSelector(
  helpState,
  (state) => state.data.stats,
);

export const getNotifications = createSelector(
  helpState,
  (state) => state.data.notifications,
);

export const getUnreadNotifications = createSelector(
  getNotifications,
  (notifications) => notifications.filter((n) => !n.read),
);

export const getTicketsByStatus = createSelector(getTickets, (tickets) => ({
  open: tickets.filter((t) => t.status === "open"),
  pending: tickets.filter((t) => t.status === "pending"),
  resolved: tickets.filter((t) => t.status === "resolved"),
}));

export const getLoading = createSelector(
  helpState,
  (state) => state.ui.loading,
);

export const getError = createSelector(helpState, (state) => state.ui.error);

export const getSuccess = createSelector(
  helpState,
  (state) => state.ui.success,
);
