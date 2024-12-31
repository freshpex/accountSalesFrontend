import { put, takeLatest, call } from "redux-saga/effects";
import {
  fetch_tickets,
  fetch_tickets_success,
  fetch_tickets_error,
  create_ticket,
  create_ticket_success,
  create_ticket_error,
  add_response,
  add_response_success,
  add_response_error,
  update_ticket_status
} from "./reducer";
import { ApiEndpoints } from "../../../store/types";
import api from "../../../services/DataService";
import toast from "react-hot-toast";

function* fetchTicketsSaga({ payload }) {
  try {
    const { status, priority, page = 1, limit = 10 } = payload || {};
    const params = { status, priority, page, limit };
    const response = yield call(api.get, ApiEndpoints.HELP_TICKETS, { params });
    yield put(fetch_tickets_success(response.data));
  } catch (error) {
    const errorMessage = error.response?.data?.error || "Failed to fetch tickets";
    toast.error(errorMessage);
    yield put(fetch_tickets_error(errorMessage));
  }
}

function* createTicketSaga({ payload }) {
  try {
    const response = yield call(api.post, ApiEndpoints.HELP_TICKETS, payload);
    yield put(create_ticket_success(response.data));
    toast.success("Support ticket created successfully");
  } catch (error) {
    const errorMessage = error.response?.data?.error || "Failed to create ticket";
    toast.error(errorMessage);
    yield put(create_ticket_error(errorMessage));
  }
}

function* addResponseSaga({ payload }) {
  try {
    const { ticketId, response } = payload;
    const result = yield call(
      api.post,
      `${ApiEndpoints.HELP_TICKETS}/${ticketId}/responses`,
      response
    );
    yield put(add_response_success({
      ticketId,
      response: result.data
    }));
    toast.success("Response added successfully");
  } catch (error) {
    const errorMessage = error.response?.data?.error || "Failed to add response";
    toast.error(errorMessage);
    yield put(add_response_error(errorMessage));
  }
}

function* updateTicketStatusSaga({ payload }) {
  try {
    const { ticketId, status } = payload;
    yield call(
      api.patch,
      `${ApiEndpoints.HELP_TICKETS}/${ticketId}/status`,
      { status }
    );
    yield put(update_ticket_status({ ticketId, status }));
    toast.success("Ticket status updated successfully");
  } catch {
    toast.error("Failed to update ticket status");
  }
}

function* helpSagas() {
  yield takeLatest(fetch_tickets.type, fetchTicketsSaga);
  yield takeLatest(create_ticket.type, createTicketSaga);
  yield takeLatest(add_response.type, addResponseSaga);
  yield takeLatest(update_ticket_status.type, updateTicketStatusSaga);
}

export default helpSagas;
