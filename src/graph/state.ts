import { Annotation } from "@langchain/langgraph";

export const SupportState = Annotation.Root({
  userQuery: Annotation<string>(),
  category: Annotation<string>({
    reducer: (_, next) => next,
    default: () => "unknown"
  }),
  priority: Annotation<string>({
    reducer: (_, next) => next,
    default: () => "normal"
  }),
  waybill: Annotation<string | null>({
    reducer: (_, next) => next,
    default: () => null
  }),
  accountNumber: Annotation<string | null>({
    reducer: (_, next) => next,
    default: () => null
  }),
  context: Annotation<string>({
    reducer: (_, next) => next,
    default: () => ""
  }),
  response: Annotation<string>({
    reducer: (_, next) => next,
    default: () => ""
  })
});

export type SupportStateType = typeof SupportState.State;