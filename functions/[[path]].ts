interface EventContext {
  next: () => Promise<Response>;
}

export async function onRequest(context: EventContext) {
  return context.next();
}