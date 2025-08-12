export type TicketStatus = "Open" | "In Progress" | "Resolved" | "Closed";
export type TicketPriority = "Low" | "Normal" | "High" | "Urgent";

export type TicketNote = {
  at: string; // ISO
  author: string; // "user" | "admin:Name"
  message: string;
};

export type Ticket = {
  id: string;
  subject: string;
  message: string;
  name: string;
  email: string;
  priority: TicketPriority;
  status: TicketStatus;
  createdAt: string; // ISO
  updatedAt: string; // ISO
  notes: TicketNote[];
};

const STORAGE_KEY = "ts_tickets";

function read(): Ticket[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function write(tickets: Ticket[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
}

export function getTickets(): Ticket[] {
  return read();
}

export function addTicket(data: Omit<Ticket, "id" | "status" | "createdAt" | "updatedAt" | "notes">): Ticket {
  const tickets = read();
  const now = new Date().toISOString();
  const t: Ticket = {
    id: Math.random().toString(36).slice(2, 10).toUpperCase(),
    status: "Open",
    createdAt: now,
    updatedAt: now,
    notes: [],
    ...data,
  };
  tickets.unshift(t);
  write(tickets);
  return t;
}

export function updateTicketStatus(id: string, status: TicketStatus) {
  const tickets = read();
  const idx = tickets.findIndex((t) => t.id === id);
  if (idx >= 0) {
    tickets[idx].status = status;
    tickets[idx].updatedAt = new Date().toISOString();
    write(tickets);
  }
}

export function addTicketNote(id: string, note: TicketNote) {
  const tickets = read();
  const idx = tickets.findIndex((t) => t.id === id);
  if (idx >= 0) {
    tickets[idx].notes.push(note);
    tickets[idx].updatedAt = new Date().toISOString();
    write(tickets);
  }
}
